import { NewsArticle, PdfNewspaper, JournalistUser } from '../types';

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

// Contas de Jornalistas padrão para a equipe de imprensa
const DEFAULT_JOURNALISTS: { [email: string]: { pass: string; user: JournalistUser } } = {
  'imprensa@sinu.org': {
    pass: 'sinu2026',
    user: {
      id: 'usr-01',
      name: 'Redação Geral SINU',
      email: 'imprensa@sinu.org',
      role: 'Editor-Chefe',
      badgeCode: 'SINU-PRESS-001',
      avatar: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/CI.png'
    }
  },
  'jornalista@sinu.org': {
    pass: 'imprensa123',
    user: {
      id: 'usr-02',
      name: 'Equipe de Jornalistas SINU',
      email: 'jornalista@sinu.org',
      role: 'Jornalista',
      badgeCode: 'SINU-PRESS-002',
      avatar: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/CI.png'
    }
  },
  'editor@sinu.org': {
    pass: 'editor2026',
    user: {
      id: 'usr-03',
      name: 'Editoria da Gazeta',
      email: 'editor@sinu.org',
      role: 'Coordenador de Imprensa',
      badgeCode: 'SINU-PRESS-003',
      avatar: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/CI.png'
    }
  }
};

export const newsService = {
  // Notícias
  getArticles(): NewsArticle[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('sinu_news_articles_v1');
        localStorage.removeItem('sinu_news_articles_v2');
      }
      const stored = localStorage.getItem(STORAGE_KEY_ARTICLES);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify([]));
        return [];
      }
      return JSON.parse(stored);
    } catch {
      return [];
    }
  },

  getArticleById(id: string): NewsArticle | undefined {
    const articles = this.getArticles();
    return articles.find(a => a.id === id);
  },

  saveArticle(data: Omit<NewsArticle, 'id'> & { id?: string }): NewsArticle {
    const articles = this.getArticles();
    const id = data.id || `art-${Date.now()}`;
    const article: NewsArticle = {
      ...data,
      id,
      date: data.date || new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      time: data.time || new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    const index = articles.findIndex(a => a.id === id);
    if (index >= 0) {
      articles[index] = article;
    } else {
      articles.unshift(article); // Adiciona no topo
    }

    localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(articles));
    return article;
  },

  deleteArticle(id: string): boolean {
    const articles = this.getArticles();
    const filtered = articles.filter(a => String(a.id) !== String(id));
    localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(filtered));
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
        localStorage.setItem(STORAGE_KEY_PDFS, JSON.stringify(DEFAULT_PDFNEWSPAPERS_FALLBACK()));
        return DEFAULT_PDFNEWSPAPERS_FALLBACK();
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_PDFNEWSPAPERS_FALLBACK();
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

    const index = pdfs.findIndex(p => p.id === id);
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
    const filtered = pdfs.filter(p => p.id !== id);
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
    localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(DEFAULT_ARTICLES));
    localStorage.setItem(STORAGE_KEY_PDFS, JSON.stringify(DEFAULT_PDF_NEWSPAPERS));
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
        localStorage.setItem(STORAGE_KEY_ARTICLES, JSON.stringify(parsed.articles));
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

function DEFAULT_PDFNEWSPAPERS_FALLBACK(): PdfNewspaper[] {
  return DEFAULT_PDF_NEWSPAPERS;
}
