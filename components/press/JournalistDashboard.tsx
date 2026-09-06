import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  LogOut, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Calendar, 
  User, 
  Layers, 
  Sparkles, 
  FileDown, 
  RefreshCw,
  DownloadCloud,
  UploadCloud,
  ChevronRight,
  Eye
} from 'lucide-react';
import { JournalistUser, NewsArticle, PdfNewspaper } from '../../types';
import { newsService } from '../../services/newsService';

interface JournalistDashboardProps {
  user: JournalistUser;
  onLogout: () => void;
  onDataChanged: () => void;
  onViewArticle?: (article: NewsArticle) => void;
  onViewPdf?: (pdf: PdfNewspaper) => void;
}

const PRESET_IMAGES = [
  { label: 'Plenária ONU', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Debate Diplomático', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Direitos Humanos', url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Conferência & Microfone', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Guerra Fria / Crise', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Edição de Jornal Impresso', url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80' },
];

export const JournalistDashboard: React.FC<JournalistDashboardProps> = ({
  user,
  onLogout,
  onDataChanged,
  onViewArticle,
  onViewPdf
}) => {
  const [activeTab, setActiveTab] = useState<'news' | 'pdf' | 'manage'>('news');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form states for News Article
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsSubtitle, setNewsSubtitle] = useState('');
  const [newsCategory, setNewsCategory] = useState<NewsArticle['category']>('Comitês');
  const [newsCommittee, setNewsCommittee] = useState('CSNU');
  const [newsAuthor, setNewsAuthor] = useState(user.name);
  const [newsAuthorRole, setNewsAuthorRole] = useState(user.role);
  const [newsContent, setNewsContent] = useState('');
  const [newsImageUrl, setNewsImageUrl] = useState('');
  const [newsTags, setNewsTags] = useState('');
  const [newsIsPinned, setNewsIsPinned] = useState(false);

  // Form states for PDF Newspaper
  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfEdition, setPdfEdition] = useState('');
  const [pdfDescription, setPdfDescription] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfFileName, setPdfFileName] = useState('');
  const [pdfCoverUrl, setPdfCoverUrl] = useState('');
  const [pdfPageCount, setPdfPageCount] = useState<number>(4);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Image Upload Handler (converts to base64 Data URL)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'news' | 'pdf') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showNotification('error', 'A imagem deve ter no máximo 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (target === 'news') {
        setNewsImageUrl(dataUrl);
      } else {
        setPdfCoverUrl(dataUrl);
      }
      showNotification('success', 'Imagem carregada com sucesso!');
    };
    reader.readAsDataURL(file);
  };

  // PDF File Upload Handler (converts to base64 Data URL)
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      showNotification('error', 'Por favor, selecione um arquivo em formato PDF.');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      showNotification('error', 'O arquivo PDF deve ter menos de 8MB para armazenamento local. Caso seja maior, use um link do Google Drive.');
      return;
    }

    setPdfFileName(file.name);
    if (!pdfTitle) {
      setPdfTitle(file.name.replace('.pdf', '').replace(/_/g, ' '));
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPdfUrl(dataUrl);
      showNotification('success', `PDF "${file.name}" carregado com sucesso!`);
    };
    reader.readAsDataURL(file);
  };

  // Save News Article
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newsTitle.trim() || !newsContent.trim()) {
      showNotification('error', 'Título e conteúdo são obrigatórios.');
      return;
    }

    const tagsArray = newsTags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    newsService.saveArticle({
      id: editingArticleId || undefined,
      title: newsTitle.trim(),
      subtitle: newsSubtitle.trim(),
      category: newsCategory,
      committee: newsCategory === 'Comitês' ? newsCommittee : undefined,
      author: newsAuthor.trim() || user.name,
      authorRole: newsAuthorRole.trim() || user.role,
      imageUrl: newsImageUrl.trim() || PRESET_IMAGES[0].url,
      content: newsContent.trim(),
      tags: tagsArray.length ? tagsArray : ['SINU XX', 'Imprensa'],
      isPinned: newsIsPinned,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      readingTime: `${Math.max(1, Math.ceil(newsContent.split(/\s+/).length / 150))} min de leitura`
    });

    showNotification(
      'success',
      editingArticleId ? 'Matéria atualizada com sucesso!' : 'Matéria publicada na Gazeta SINU com sucesso!'
    );

    // Reset Form
    setEditingArticleId(null);
    setNewsTitle('');
    setNewsSubtitle('');
    setNewsContent('');
    setNewsTags('');
    setNewsImageUrl('');
    setNewsIsPinned(false);

    onDataChanged();
  };

  // Edit existing article
  const handleEditArticle = (art: NewsArticle) => {
    setEditingArticleId(art.id);
    setNewsTitle(art.title);
    setNewsSubtitle(art.subtitle || '');
    setNewsCategory(art.category);
    setNewsCommittee(art.committee || 'CSNU');
    setNewsAuthor(art.author);
    setNewsAuthorRole(art.authorRole || '');
    setNewsContent(art.content);
    setNewsImageUrl(art.imageUrl || '');
    setNewsTags(art.tags?.join(', ') || '');
    setNewsIsPinned(!!art.isPinned);
    setActiveTab('news');
  };

  // Delete article
  const handleDeleteArticle = (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja remover a matéria "${title}"?`)) {
      newsService.deleteArticle(id);
      showNotification('success', 'Matéria removida.');
      onDataChanged();
    }
  };

  // Save PDF Newspaper
  const handleSavePdf = (e: React.FormEvent) => {
    e.preventDefault();

    if (!pdfTitle.trim() || !pdfUrl.trim()) {
      showNotification('error', 'Título da edição e arquivo ou link PDF são obrigatórios.');
      return;
    }

    newsService.savePdfNewspaper({
      title: pdfTitle.trim(),
      edition: pdfEdition.trim() || `Edição Especial nº ${newsService.getPdfNewspapers().length + 1}`,
      description: pdfDescription.trim() || 'Edição oficial diagramada da Gazeta da XX SINU.',
      pdfUrl: pdfUrl.trim(),
      fileName: pdfFileName || `${pdfTitle.replace(/\s+/g, '_')}.pdf`,
      coverImageUrl: pdfCoverUrl.trim() || PRESET_IMAGES[5].url,
      author: user.name,
      pageCount: Number(pdfPageCount) || 4,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    });

    showNotification('success', 'Jornal em PDF publicado com sucesso na Gazeta SINU!');

    // Reset PDF Form
    setPdfTitle('');
    setPdfEdition('');
    setPdfDescription('');
    setPdfUrl('');
    setPdfFileName('');
    setPdfCoverUrl('');
    setPdfPageCount(4);

    onDataChanged();
  };

  // Delete PDF Newspaper
  const handleDeletePdf = (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja remover a edição "${title}"?`)) {
      newsService.deletePdfNewspaper(id);
      showNotification('success', 'Edição em PDF removida.');
      onDataChanged();
    }
  };

  // Reset defaults
  const handleResetDefaults = () => {
    if (window.confirm('Deseja restaurar as notícias e jornais iniciais da SINU?')) {
      newsService.resetToDefaults();
      showNotification('success', 'Conteúdo restaurado para o padrão.');
      onDataChanged();
    }
  };

  // Backup Export
  const handleExportBackup = () => {
    const json = newsService.exportBackup();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_imprensa_sinu_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showNotification('success', 'Backup exportado com sucesso!');
  };

  // Backup Import
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (newsService.importBackup(content)) {
        showNotification('success', 'Backup importado com sucesso!');
        onDataChanged();
      } else {
        showNotification('error', 'Arquivo de backup inválido.');
      }
    };
    reader.readAsText(file);
  };

  const articles = newsService.getArticles();
  const pdfNewspapers = newsService.getPdfNewspapers();

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Top Journalist Credential Bar */}
      <div className="bg-gradient-to-r from-[#03005c] via-[#08007a] to-[#03005c] text-white p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-[#fecc00] text-[#03005c] flex items-center justify-center font-serif font-black text-2xl shadow-lg border-2 border-white/20">
                {user.name.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center" title="Credencial Ativa">
                <span className="w-2 h-2 bg-white rounded-full animate-ping" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#fecc00]">
                  Painel do Jornalista • Imprensa Oficial
                </span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/80 font-mono">
                  {user.badgeCode}
                </span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
                {user.name}
              </h2>
              <p className="text-xs text-white/70">
                {user.role} • {user.email}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer border border-white/10 active:scale-95"
            >
              <LogOut className="w-4 h-4 text-red-300" />
              <span>Sair da Redação</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'news'
                ? 'bg-[#fecc00] text-[#03005c] shadow-lg shadow-[#fecc00]/20'
                : 'bg-white/5 hover:bg-white/10 text-white/80'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Publicar Notícia</span>
          </button>

          <button
            onClick={() => setActiveTab('pdf')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'pdf'
                ? 'bg-[#fecc00] text-[#03005c] shadow-lg shadow-[#fecc00]/20'
                : 'bg-white/5 hover:bg-white/10 text-white/80'
            }`}
          >
            <FileDown className="w-4 h-4" />
            <span>Publicar Jornal em PDF</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'manage'
                ? 'bg-[#fecc00] text-[#03005c] shadow-lg shadow-[#fecc00]/20'
                : 'bg-white/5 hover:bg-white/10 text-white/80'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Gerenciar Publicações ({articles.length + pdfNewspapers.length})</span>
          </button>
        </div>
      </div>

      {/* Notifications bar */}
      {feedback && (
        <div
          className={`p-4 text-sm font-medium flex items-center justify-between transition-all ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-200'
              : 'bg-red-50 text-red-800 border-b border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-xs underline font-bold cursor-pointer">
            Fechar
          </button>
        </div>
      )}

      {/* TAB CONTENT 1: POST NEWS */}
      {activeTab === 'news' && (
        <div className="p-6 sm:p-10 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Editoria de Cobertura
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                {editingArticleId ? 'Editar Matéria Jornalística' : 'Redigir Nova Matéria'}
              </h3>
            </div>
            {editingArticleId && (
              <button
                type="button"
                onClick={() => {
                  setEditingArticleId(null);
                  setNewsTitle('');
                  setNewsSubtitle('');
                  setNewsContent('');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancelar Edição
              </button>
            )}
          </div>

          <form onSubmit={handleSaveArticle} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Categoria da Notícia *
                </label>
                <select
                  value={newsCategory}
                  onChange={(e) => setNewsCategory(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#03005c] focus:ring-2 focus:ring-[#03005c]/10 transition-all bg-white"
                >
                  <option value="Comitês">Cobertura de Comitês</option>
                  <option value="Geral">Notícias Gerais da Simulação</option>
                  <option value="Bastidores">Bastidores e Negociações</option>
                  <option value="Declarações">Declarações e Entrevistas</option>
                  <option value="Crise">Atualizações de Crise</option>
                </select>
              </div>

              {/* Committee */}
              {newsCategory === 'Comitês' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Comitê Vinculado *
                  </label>
                  <select
                    value={newsCommittee}
                    onChange={(e) => setNewsCommittee(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#03005c] focus:ring-2 focus:ring-[#03005c]/10 transition-all bg-white"
                  >
                    <option value="CSNU">CSNU - Conselho de Segurança</option>
                    <option value="CSH">CSH - Histórico (Crise dos Mísseis)</option>
                    <option value="UNODC">UNODC - Drogas e Crime</option>
                    <option value="CDH">CDH - Direitos Humanos</option>
                    <option value="UNIFEM">UNIFEM - Mulheres na Liderança</option>
                    <option value="TO">TO - Tribunal Oral</option>
                    <option value="PNUMA">PNUMA - Meio Ambiente</option>
                    <option value="OPEP+">OPEP+ - Petróleo e Energia</option>
                    <option value="CN">CN - Congresso Nacional</option>
                    <option value="CI">CI - Comitê de Imprensa</option>
                  </select>
                </div>
              )}

              {/* Author */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Assinatura do Autor / Repórter
                </label>
                <input
                  type="text"
                  value={newsAuthor}
                  onChange={(e) => setNewsAuthor(e.target.value)}
                  placeholder="Nome do jornalista"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#03005c] focus:ring-2 focus:ring-[#03005c]/10 transition-all"
                />
              </div>
            </div>

            {/* Headline Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Manchete / Título da Notícia *
              </label>
              <input
                type="text"
                value={newsTitle}
                onChange={(e) => setNewsTitle(e.target.value)}
                placeholder="ex: Disputa acalorada no CSNU define novas sanções sobre segurança regional"
                required
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-slate-900 font-serif font-bold text-base sm:text-lg focus:outline-none focus:border-[#03005c] focus:ring-2 focus:ring-[#03005c]/10 transition-all placeholder:font-sans placeholder:font-normal placeholder:text-slate-400"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Subtítulo / Linha Fina (Resumo rápido)
              </label>
              <input
                type="text"
                value={newsSubtitle}
                onChange={(e) => setNewsSubtitle(e.target.value)}
                placeholder="Breve resumo em uma ou duas frases para despertar o interesse do leitor."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#03005c] focus:ring-2 focus:ring-[#03005c]/10 transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Featured Image Selection */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Imagem de Destaque da Matéria
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">
                    Opção 1: Upload de foto do seu computador
                  </span>
                  <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-[#03005c] bg-white cursor-pointer transition-colors text-xs font-bold text-slate-700">
                    <Upload className="w-4 h-4 text-[#03005c]" />
                    <span>Escolher arquivo de imagem</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'news')}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">
                    Opção 2: Inserir URL de imagem
                  </span>
                  <input
                    type="url"
                    value={newsImageUrl}
                    onChange={(e) => setNewsImageUrl(e.target.value)}
                    placeholder="https://exemplo.com/foto.jpg"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-[#03005c] bg-white"
                  />
                </div>
              </div>

              {/* Preset image buttons */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-2">
                  Ou selecione uma foto oficial da biblioteca da simulação:
                </span>
                <div className="flex flex-wrap gap-2">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNewsImageUrl(preset.url)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        newsImageUrl === preset.url
                          ? 'bg-[#03005c] text-white border-[#03005c] shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {newsImageUrl && (
                <div className="flex items-center gap-4 pt-2">
                  <div className="w-24 h-16 rounded-xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
                    <img src={newsImageUrl} alt="Prévia" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Foto selecionada com sucesso!
                  </span>
                </div>
              )}
            </div>

            {/* Content Textarea */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Texto Completo da Matéria *
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setNewsContent(
                      (prev) =>
                        prev +
                        '\n\n"Inserir aqui declaração ou aspas de algum delegado ou autoridade."\n\n'
                    );
                  }}
                  className="text-xs font-bold text-[#03005c] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" /> + Adicionar Bloco de Citação
                </button>
              </div>
              <textarea
                value={newsContent}
                onChange={(e) => setNewsContent(e.target.value)}
                rows={10}
                required
                placeholder="Escreva os parágrafos da reportagem. Use linhas em branco para separar os parágrafos..."
                className="w-full p-4 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#03005c] focus:ring-2 focus:ring-[#03005c]/10 transition-all font-sans leading-relaxed"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Dica: Destaque aspas dos delegados ou declarações oficiais utilizando aspas duplas no início e final do parágrafo.
              </p>
            </div>

            {/* Tags and Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Tags / Palavras-chave (separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={newsTags}
                  onChange={(e) => setNewsTags(e.target.value)}
                  placeholder="ex: CSNU, Veto, América Latina, Resolução"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#03005c]"
                />
              </div>

              <div className="pt-4 sm:pt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsIsPinned}
                    onChange={(e) => setNewsIsPinned(e.target.checked)}
                    className="w-4 h-4 rounded text-[#03005c] focus:ring-[#03005c]"
                  />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Fixar notícia em destaque principal no topo
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-[#03005c] hover:bg-[#050080] text-white font-bold text-sm shadow-xl shadow-[#03005c]/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5 text-[#fecc00]" />
                <span>{editingArticleId ? 'Salvar Alterações' : 'Publicar Matéria Agora'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB CONTENT 2: POST PDF NEWSPAPER */}
      {activeTab === 'pdf' && (
        <div className="p-6 sm:p-10 space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Edições Impressas & Diagramadas
            </span>
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Disponibilizar Jornal em PDF (Gazeta SINU)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Faça o upload do arquivo PDF oficial do jornal da simulação ou insira o link de compartilhamento (Google Drive, S3 ou site).
            </p>
          </div>

          <form onSubmit={handleSavePdf} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Título da Edição *
                </label>
                <input
                  type="text"
                  value={pdfTitle}
                  onChange={(e) => setPdfTitle(e.target.value)}
                  placeholder="ex: Gazeta SINU XX • 1ª Edição: Abertura e Primeiras Moções"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#03005c]"
                />
              </div>

              {/* Edition tag */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Número / Nome da Edição
                </label>
                <input
                  type="text"
                  value={pdfEdition}
                  onChange={(e) => setPdfEdition(e.target.value)}
                  placeholder="ex: Edição nº 02 - Vespertino"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#03005c]"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Resumo Editorial / Descrição da Edição
              </label>
              <textarea
                value={pdfDescription}
                onChange={(e) => setPdfDescription(e.target.value)}
                rows={3}
                placeholder="Breve descrição dos principais artigos, entrevistas e colunas presentes nesta edição do jornal impresso."
                className="w-full p-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#03005c]"
              />
            </div>

            {/* PDF File Source Box */}
            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-4">
              <div className="flex items-center gap-2 text-amber-900">
                <FileDown className="w-5 h-5 text-[#03005c]" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Arquivo PDF do Jornal *
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Upload PDF */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    Opção A: Upload direto do arquivo PDF (.pdf)
                  </span>
                  <label className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-amber-300 hover:border-[#03005c] bg-white cursor-pointer transition-colors text-center">
                    <Upload className="w-6 h-6 text-[#03005c] mb-1" />
                    <span className="text-xs font-bold text-slate-800">
                      {pdfFileName ? pdfFileName : 'Selecionar arquivo .PDF'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      Tamanho máximo recomendado: 8MB
                    </span>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Or Google Drive / Web URL */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">
                    Opção B: Ou cole o link do Google Drive / Web
                  </span>
                  <div className="relative">
                    <input
                      type="url"
                      value={pdfUrl.startsWith('data:') ? '' : pdfUrl}
                      onChange={(e) => {
                        setPdfUrl(e.target.value);
                        setPdfFileName('Jornal_SINU_Online.pdf');
                      }}
                      placeholder="https://drive.google.com/file/d/.../view"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-xs bg-white focus:outline-none focus:border-[#03005c]"
                    />
                    <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Insira o link público do Google Drive ou link direto para o PDF.
                  </p>
                </div>
              </div>

              {pdfUrl && (
                <div className="p-3 rounded-xl bg-white border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                  <span className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Arquivo PDF pronto para publicação!
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono truncate max-w-xs">
                    {pdfFileName || 'arquivo_selecionado.pdf'}
                  </span>
                </div>
              )}
            </div>

            {/* Cover Image for the Newspaper */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Capa Ilustrativa do Jornal
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">
                    Upload de Imagem da Capa
                  </span>
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 cursor-pointer text-xs font-bold text-slate-700 transition-colors">
                    <ImageIcon className="w-4 h-4 text-[#03005c]" />
                    <span>Upload da foto da capa</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'pdf')}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">
                    Número Estimado de Páginas
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={pdfPageCount}
                    onChange={(e) => setPdfPageCount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs bg-white focus:outline-none focus:border-[#03005c]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-[#03005c] hover:bg-[#050080] text-white font-bold text-sm shadow-xl shadow-[#03005c]/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileDown className="w-5 h-5 text-[#fecc00]" />
                <span>Publicar Edição em PDF na Gazeta</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB CONTENT 3: MANAGE PUBLICATIONS */}
      {activeTab === 'manage' && (
        <div className="p-6 sm:p-10 space-y-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Acervo da Imprensa
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Gerenciamento de Matérias e Jornais
              </h3>
            </div>

            {/* Backup actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleExportBackup}
                className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <DownloadCloud className="w-4 h-4 text-[#03005c]" />
                <span>Exportar Backup (JSON)</span>
              </button>

              <label className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer">
                <UploadCloud className="w-4 h-4 text-[#03005c]" />
                <span>Importar Backup</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={handleResetDefaults}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                title="Restaurar notícias e jornais de demonstração"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Restaurar Padrão</span>
              </button>
            </div>
          </div>

          {/* Section: News Articles */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#03005c]" />
              Matérias Publicadas ({articles.length})
            </h4>

            {articles.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Nenhuma notícia publicada ainda.</p>
            ) : (
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {articles.map((art) => (
                  <div
                    key={art.id}
                    className="p-4 bg-white hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      {art.imageUrl ? (
                        <img
                          src={art.imageUrl}
                          alt={art.title}
                          className="w-16 h-12 rounded-lg object-cover shrink-0 border border-slate-200"
                        />
                      ) : (
                        <div className="w-16 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                          <FileText className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-[#03005c]/10 text-[#03005c] rounded text-[10px] font-bold uppercase">
                            {art.category}
                          </span>
                          {art.committee && (
                            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">
                              {art.committee}
                            </span>
                          )}
                          {art.isPinned && (
                            <span className="px-1.5 py-0.5 bg-[#fecc00] text-[#03005c] rounded text-[10px] font-bold">
                              Fixado
                            </span>
                          )}
                        </div>
                        <h5 className="font-bold text-slate-900 text-sm line-clamp-1">
                          {art.title}
                        </h5>
                        <p className="text-xs text-slate-400">
                          Por {art.author} • {art.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {onViewArticle && (
                        <button
                          type="button"
                          onClick={() => onViewArticle(art)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                          title="Visualizar notícia"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleEditArticle(art)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors cursor-pointer"
                        title="Editar notícia"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteArticle(art.id, art.title)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 transition-colors cursor-pointer"
                        title="Excluir notícia"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: PDF Newspapers */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h4 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
              <FileDown className="w-5 h-5 text-[#03005c]" />
              Edições em PDF Publicadas ({pdfNewspapers.length})
            </h4>

            {pdfNewspapers.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Nenhum jornal em PDF publicado ainda.</p>
            ) : (
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {pdfNewspapers.map((pdf) => (
                  <div
                    key={pdf.id}
                    className="p-4 bg-white hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      {pdf.coverImageUrl ? (
                        <img
                          src={pdf.coverImageUrl}
                          alt={pdf.title}
                          className="w-12 h-16 rounded object-cover shrink-0 border border-slate-200 shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-16 rounded bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                          <FileText className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded text-[10px] font-bold uppercase block w-max mb-1">
                          {pdf.edition}
                        </span>
                        <h5 className="font-bold text-slate-900 text-sm line-clamp-1">
                          {pdf.title}
                        </h5>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {pdf.description}
                        </p>
                        <span className="text-[11px] text-slate-400 mt-1 block">
                          Publicado em {pdf.date} • {pdf.pageCount || 4} páginas
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {onViewPdf && (
                        <button
                          type="button"
                          onClick={() => onViewPdf(pdf)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                          title="Visualizar PDF"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}

                      <a
                        href={pdf.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={pdf.fileName || 'Gazeta_SINU.pdf'}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-800 transition-colors cursor-pointer"
                        title="Baixar arquivo PDF"
                      >
                        <FileDown className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDeletePdf(pdf.id, pdf.title)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 transition-colors cursor-pointer"
                        title="Excluir edição em PDF"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
