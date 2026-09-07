import { NewsArticle, PdfNewspaper, JournalistUser } from '../types';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';

const STORAGE_KEY_ARTICLES = 'sinu_news_articles_sinuxx_v1';
const STORAGE_KEY_PDFS = 'sinu_pdf_newspapers_v2';
const STORAGE_KEY_SESSION = 'sinu_journalist_session_v1';

// Sem notícias postadas por padrão (a serem adicionadas pelos jornalistas)
const DEFAULT_ARTICLES: NewsArticle[] = [];

// Seed data para Jornais em formato PDF das duas editoras
const DEFAULT_PDF_NEWSPAPERS: PdfNewspaper[] = [
  {
    id: 'pdf-01',
    title: 'Edição Especial • Panorama e Ordem Internacional',
    edition: '1ª Edição Oficial',
    date: '28 de Julho de 2026',
    description: 'Edição inaugural cobrindo os pronunciamentos de chefes de Estado, soberania nacional e análise estratégica das resoluções em debate.',
    pdfUrl: 'https://drive.google.com/file/d/1zxEIGEIt-nA4AUgkvGgFZ1XZTL6IWQCR/view?usp=sharing',
    fileName: 'O_Ufanista_Edicao_01.pdf',
    coverImageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
    author: 'Redação O Ufanista',
    publisher: 'O UFANISTA',
    pageCount: 8
  },
  {
    id: 'pdf-02',
    title: 'Vozes dos Bastidores • Direitos, Crises e Sociedade Civil',
    edition: '1ª Edição Oficial',
    date: '28 de Julho de 2026',
    description: 'Cobertura aprofundada dos impactos sociais, minorias, debates nos corredores diplomáticos e reivindicações dos comitês da simulação.',
    pdfUrl: 'https://drive.google.com/file/d/1zxEIGEIt-nA4AUgkvGgFZ1XZTL6IWQCR/view?usp=sharing',
    fileName: 'Sans_Culottes_Edicao_01.pdf',
    coverImageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    author: 'Redação Sans Culottes',
    publisher: 'SANS CULOTTES',
    pageCount: 12
  }
];

// Helper to get initial articles from localStorage cache
function getInitialCachedArticles(): NewsArticle[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem(STORAGE_KEY_ARTICLES);
      if (stored) {
        return JSON.parse(stored);
      }
    }
  } catch {}
  return [];
}

// In-memory real-time state
let currentArticles: NewsArticle[] = getInitialCachedArticles();
const articleListeners = new Set<(articles: NewsArticle[]) => void>();

// Subscribe to Firestore collection for global real-time synchronization across all devices
try {
  const articlesCol = collection(db, 'articles');
  onSnapshot(
    articlesCol,
    (snapshot) => {
      const remoteArticles: NewsArticle[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        remoteArticles.push({
          id: docSnap.id,
          title: data.title || '',
          subtitle: data.subtitle || undefined,
          content: data.content || '',
          category: data.category || 'Geral',
          committee: data.committee || undefined,
          publisher: data.publisher || 'O UFANISTA',
          author: data.author || 'Equipe de Imprensa',
          authorRole: data.authorRole || '',
          imageUrl: data.imageUrl || '',
          date: data.date || '',
          time: data.time || '',
          readingTime: data.readingTime || '',
          tags: Array.isArray(data.tags) ? data.tags : [],
          isPinned: Boolean(data.isPinned),
          ...(typeof data.createdAt === 'number' ? { createdAt: data.createdAt } : {})
        } as NewsArticle);
      });

      // Sort: newest first based on createdAt or ID
      remoteArticles.sort((a, b) => {
        const aTime = (a as any).createdAt || 0;
        const bTime = (b as any).createdAt || 0;
        if (aTime !== bTime) return bTime - aTime;
        return b.id.localeCompare(a.id);
      });

      currentArticles = remoteArticles;
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(currentArticles));
        }
      } catch {}

      // Notify all UI subscribers across the app
      articleListeners.forEach((listener) => {
        try {
          listener([...currentArticles]);
        } catch (e) {
          console.error('Error notifying article listener:', e);
        }
      });
    },
    (error) => {
      console.warn('Firestore real-time subscription error:', error);
    }
  );
} catch (err) {
  console.warn('Could not initialize Firestore snapshot listener:', err);
}

export const newsService = {
  // Subscribe to real-time updates across all devices
  subscribeArticles(listener: (articles: NewsArticle[]) => void): () => void {
    articleListeners.add(listener);
    // Immediately notify with current cache
    listener([...currentArticles]);
    return () => {
      articleListeners.delete(listener);
    };
  },

  // Get current articles synchronously (from in-memory cache)
  getArticles(): NewsArticle[] {
    return [...currentArticles];
  },

  getArticleById(id: string): NewsArticle | undefined {
    return currentArticles.find((a) => a.id === id);
  },

  // Save Article (persists globally to Cloud Firestore and updates local state optimistically)
  saveArticle(data: Omit<NewsArticle, 'id'> & { id?: string }): NewsArticle {
    const id = data.id || `art-${Date.now()}`;
    const now = Date.now();
    const dateFormatted = data.date || new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    const timeFormatted = data.time || new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const article: NewsArticle = {
      ...data,
      id,
      date: dateFormatted,
      time: timeFormatted,
      ...(data as any).createdAt ? { createdAt: (data as any).createdAt } : { createdAt: now }
    };

    // Optimistic local update
    const index = currentArticles.findIndex((a) => a.id === id);
    if (index >= 0) {
      currentArticles[index] = article;
    } else {
      currentArticles.unshift(article);
    }

    try {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(currentArticles));
    } catch {}

    articleListeners.forEach((listener) => {
      try {
        listener([...currentArticles]);
      } catch {}
    });

    // Cloud Firestore synchronization (sanitized without undefined)
    const firestoreData: Record<string, any> = {
      title: article.title,
      content: article.content,
      category: article.category || 'Geral',
      publisher: article.publisher || 'O UFANISTA',
      author: article.author || 'Imprensa SINU',
      authorRole: article.authorRole || '',
      imageUrl: article.imageUrl || '',
      date: article.date,
      time: article.time || '',
      readingTime: article.readingTime || '1 min de leitura',
      tags: article.tags || [article.category, 'SINU XX'],
      isPinned: Boolean(article.isPinned),
      createdAt: (article as any).createdAt || now
    };

    if (article.subtitle) {
      firestoreData.subtitle = article.subtitle;
    }
    if (article.committee) {
      firestoreData.committee = article.committee;
    }

    setDoc(doc(db, 'articles', id), firestoreData, { merge: true }).catch((err) => {
      console.error('Failed to sync article to Cloud Firestore:', err);
    });

    return article;
  },

  // Delete Article (removes from Cloud Firestore and local state globally)
  deleteArticle(id: string): boolean {
    // Optimistic local update
    currentArticles = currentArticles.filter((a) => String(a.id) !== String(id));
    try {
      localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(currentArticles));
    } catch {}

    articleListeners.forEach((listener) => {
      try {
        listener([...currentArticles]);
      } catch {}
    });

    // Delete in Cloud Firestore
    deleteDoc(doc(db, 'articles', id)).catch((err) => {
      console.error('Failed to delete article from Cloud Firestore:', err);
    });

    return true;
  },

  // Jornais em PDF
  getPdfNewspapers(): PdfNewspaper[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('sinu_pdf_newspapers_v1');
      }
      const stored = localStorage.getItem(STORAGE_KEY_PDFS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY_PDFS, JSON.stringify(DEFAULT_PDF_NEWSPAPERS));
        return DEFAULT_PDF_NEWSPAPERS;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_PDF_NEWSPAPERS;
    }
  },

  savePdfNewspaper(data: Omit<PdfNewspaper, 'id'> & { id?: string }): PdfNewspaper {
    const pdfs = this.getPdfNewspapers();
    const id = data.id || `pdf-${Date.now()}`;
    const newspaper: PdfNewspaper = {
      ...data,
      id,
      date: data.date || new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    };

    const index = pdfs.findIndex((p) => p.id === id);
    if (index >= 0) {
      pdfs[index] = newspaper;
    } else {
      pdfs.unshift(newspaper);
    }

    localStorage.setItem(STORAGE_KEY_PDFS, JSON.stringify(pdfs));
    return newspaper;
  },

  deletePdfNewspaper(id: string): boolean {
    const pdfs = this.getPdfNewspapers();
    const filtered = pdfs.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY_PDFS, JSON.stringify(filtered));
    return true;
  },

  // Autenticação de Jornalistas
  getJournalistSession(): JournalistUser | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SESSION);
      if (!stored) return null;
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  setJournalistSession(user: JournalistUser | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    }
  },

  loginJournalist(loginInput: string, passwordInput?: string): { success: boolean; user?: JournalistUser; error?: string } {
    const cleanLogin = (loginInput || '').trim();
    const cleanPass = (passwordInput || '').trim();

    if (!cleanLogin) {
      return { success: false, error: 'Por favor, informe seu login de imprensa.' };
    }
    if (!cleanPass) {
      return { success: false, error: 'Por favor, digite a senha.' };
    }

    const isLoginValid = cleanLogin.toLowerCase() === 'comite-de-imprensa' || cleanLogin === 'COMITE-de-IMPRENSA';
    const isPasswordValid = cleanPass === 'SINUXX2o' || cleanPass.toLowerCase() === 'sinuxx2o';

    if (!isLoginValid) {
      return { 
        success: false, 
        error: 'Login incorreto. Utilize o login oficial da imprensa (COMITE-de-IMPRENSA).' 
      };
    }

    if (!isPasswordValid) {
      return { 
        success: false, 
        error: 'Senha incorreta. Verifique suas credenciais de imprensa.' 
      };
    }

    const user: JournalistUser = {
      id: `usr-ci-${Date.now()}`,
      name: 'Comitê de Imprensa',
      email: 'comite-de-imprensa@sinu.org',
      role: 'Jornalista',
      badgeCode: 'SINU-XX-PRESS',
      avatar: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/CI.png'
    };
    this.setJournalistSession(user);
    return { success: true, user };
  },

  logoutJournalist(): void {
    this.setJournalistSession(null);
  },

  // Reset e Backup
  resetToDefaults(): void {
    // Delete all remote articles
    currentArticles.forEach((art) => {
      deleteDoc(doc(db, 'articles', art.id)).catch(() => {});
    });
    currentArticles = [];
    localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(DEFAULT_ARTICLES));
    localStorage.setItem(STORAGE_KEY_PDFS, JSON.stringify(DEFAULT_PDF_NEWSPAPERS));
    articleListeners.forEach((cb) => cb([]));
  },

  exportBackup(): string {
    return JSON.stringify({
      articles: this.getArticles(),
      pdfs: this.getPdfNewspapers(),
      exportedAt: new Date().toISOString()
    }, null, 2);
  },

  importBackup(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.articles)) {
        parsed.articles.forEach((art: NewsArticle) => {
          this.saveArticle(art);
        });
      }
      if (Array.isArray(parsed.pdfs)) {
        localStorage.setItem(STORAGE_KEY_PDFS, JSON.stringify(parsed.pdfs));
      }
      return true;
    } catch {
      return false;
    }
  }
};
