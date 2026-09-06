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
  AlertTriangle,
  X,
  LogOut, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Calendar, 
  User, 
  Layers, 
  Sparkles, 
  RefreshCw,
  DownloadCloud,
  UploadCloud,
  ChevronRight,
  Eye
} from 'lucide-react';
import { JournalistUser, NewsArticle, NewspaperPublisher } from '../../types';
import { newsService } from '../../services/newsService';

interface JournalistDashboardProps {
  user: JournalistUser;
  onLogout: () => void;
  onDataChanged: () => void;
  onViewArticle?: (article: NewsArticle) => void;
}

export const JournalistDashboard: React.FC<JournalistDashboardProps> = ({
  user,
  onLogout,
  onDataChanged,
  onViewArticle
}) => {
  const [activeTab, setActiveTab] = useState<'news' | 'manage'>('news');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // In-app confirmation dialog states (avoids blocked window.confirm in iframe)
  const [articleToDelete, setArticleToDelete] = useState<{ id: string; title: string } | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Form states for News Article
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsSubtitle, setNewsSubtitle] = useState('');
  const [newsPublisher, setNewsPublisher] = useState<NewspaperPublisher>('O UFANISTA');
  const [newsCategory, setNewsCategory] = useState<NewsArticle['category']>('Comitês');
  const [newsCommittee, setNewsCommittee] = useState('CSNU');
  const [newsAuthor, setNewsAuthor] = useState(user.name);
  const [newsAuthorRole, setNewsAuthorRole] = useState(user.role);
  const [newsContent, setNewsContent] = useState('');
  const [newsImageUrl, setNewsImageUrl] = useState('');

  const showNotification = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Image Upload Handler (converts to base64 Data URL)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showNotification('error', 'A imagem deve ter no máximo 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setNewsImageUrl(dataUrl);
      showNotification('success', 'Imagem carregada com sucesso!');
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

    const defaultTags = newsCategory === 'Comitês' && newsCommittee
      ? [newsCategory, newsCommittee]
      : [newsCategory, 'SINU XX'];

    newsService.saveArticle({
      id: editingArticleId || undefined,
      title: newsTitle.trim(),
      subtitle: newsSubtitle.trim(),
      category: newsCategory,
      committee: newsCategory === 'Comitês' ? newsCommittee : undefined,
      publisher: newsPublisher,
      author: newsAuthor.trim() || user.name,
      authorRole: newsAuthorRole.trim() || user.role,
      imageUrl: newsImageUrl.trim() || 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/CI.png',
      content: newsContent.trim(),
      tags: defaultTags,
      isPinned: false,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      readingTime: `${Math.max(1, Math.ceil(newsContent.split(/\s+/).length / 150))} min de leitura`
    });

    showNotification(
      'success',
      editingArticleId ? 'Matéria atualizada com sucesso!' : 'Matéria publicada com sucesso!'
    );

    // Reset Form
    setEditingArticleId(null);
    setNewsTitle('');
    setNewsSubtitle('');
    setNewsContent('');
    setNewsImageUrl('');
    setNewsPublisher('O UFANISTA');

    onDataChanged();
  };

  // Edit existing article
  const handleEditArticle = (art: NewsArticle) => {
    setEditingArticleId(art.id);
    setNewsTitle(art.title);
    setNewsSubtitle(art.subtitle || '');
    setNewsPublisher(art.publisher || 'O UFANISTA');
    setNewsCategory(art.category);
    setNewsCommittee(art.committee || 'CSNU');
    setNewsAuthor(art.author);
    setNewsAuthorRole(art.authorRole || '');
    setNewsContent(art.content);
    setNewsImageUrl(art.imageUrl || '');
    setActiveTab('news');
  };

  // Request delete article (opens in-app confirmation modal)
  const handleDeleteArticle = (id: string, title: string) => {
    setArticleToDelete({ id, title });
  };

  // Confirm and execute article deletion
  const confirmDeleteArticle = () => {
    if (!articleToDelete) return;
    const deletedId = articleToDelete.id;
    const deletedTitle = articleToDelete.title;

    newsService.deleteArticle(deletedId);
    showNotification('success', `Matéria "${deletedTitle}" apagada com sucesso.`);

    if (editingArticleId === deletedId) {
      setEditingArticleId(null);
      setNewsTitle('');
      setNewsSubtitle('');
      setNewsContent('');
      setNewsImageUrl('');
      setNewsPublisher('O UFANISTA');
    }

    setArticleToDelete(null);
    onDataChanged();
  };

  // Confirm and execute reset to defaults
  const confirmResetDefaults = () => {
    newsService.resetToDefaults();
    showNotification('success', 'Conteúdo restaurado para o padrão.');
    setIsResetConfirmOpen(false);
    onDataChanged();
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
            onClick={() => setActiveTab('manage')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'manage'
                ? 'bg-[#fecc00] text-[#03005c] shadow-lg shadow-[#fecc00]/20'
                : 'bg-white/5 hover:bg-white/10 text-white/80'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Gerenciar Publicações ({articles.length})</span>
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
            {/* Publisher Choice */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                Editora do Jornal *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setNewsPublisher('O UFANISTA')}
                  className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                    newsPublisher === 'O UFANISTA'
                      ? 'bg-blue-900 border-blue-600 text-white shadow-md ring-2 ring-blue-500/25'
                      : 'bg-white border-slate-200 hover:border-blue-400 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      newsPublisher === 'O UFANISTA' ? 'border-white bg-blue-500' : 'border-slate-300 bg-white'
                    }`}>
                      {newsPublisher === 'O UFANISTA' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <span className={`font-serif font-black tracking-wide text-sm block ${
                        newsPublisher === 'O UFANISTA' ? 'text-white' : 'text-blue-950'
                      }`}>
                        O UFANISTA
                      </span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    newsPublisher === 'O UFANISTA' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-800'
                  }`}>
                    Azul
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setNewsPublisher('SANS CULOTTES')}
                  className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                    newsPublisher === 'SANS CULOTTES'
                      ? 'bg-[#7a1828] border-[#9b2034] text-white shadow-md ring-2 ring-[#7a1828]/25'
                      : 'bg-white border-slate-200 hover:border-rose-400 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      newsPublisher === 'SANS CULOTTES' ? 'border-white bg-rose-500' : 'border-slate-300 bg-white'
                    }`}>
                      {newsPublisher === 'SANS CULOTTES' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <span className={`font-serif font-black tracking-wide text-sm block ${
                        newsPublisher === 'SANS CULOTTES' ? 'text-white' : 'text-[#58121d]'
                      }`}>
                        SANS CULOTTES
                      </span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    newsPublisher === 'SANS CULOTTES' ? 'bg-[#58121d] text-white' : 'bg-rose-100 text-[#7a1828]'
                  }`}>
                    Bordô
                  </span>
                </button>
              </div>
            </div>

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
                      onChange={handleImageUpload}
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

              {newsImageUrl && (
                <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-14 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 shrink-0">
                      <img src={newsImageUrl} alt="Prévia" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Foto selecionada para a matéria
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-xs sm:max-w-sm">
                        {newsImageUrl.startsWith('data:') ? 'Arquivo carregado do dispositivo' : newsImageUrl}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNewsImageUrl('')}
                    className="text-xs text-red-600 hover:text-red-700 font-bold px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                  >
                    Remover foto
                  </button>
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

            {/* Submit & Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
              {editingArticleId ? (
                <button
                  type="button"
                  onClick={() => setArticleToDelete({ id: editingArticleId, title: newsTitle || 'esta matéria' })}
                  className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer border border-red-200"
                  title="Excluir esta matéria permanentemente"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                  <span>Excluir Notícia</span>
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3">
                {editingArticleId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingArticleId(null);
                      setNewsTitle('');
                      setNewsSubtitle('');
                      setNewsContent('');
                      setNewsImageUrl('');
                      setNewsPublisher('O UFANISTA');
                    }}
                    className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Cancelar Edição
                  </button>
                )}
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-[#03005c] hover:bg-[#050080] text-white font-bold text-sm shadow-xl shadow-[#03005c]/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#fecc00]" />
                  <span>{editingArticleId ? 'Salvar Alterações' : 'Publicar Matéria Agora'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* TAB CONTENT 2: MANAGE PUBLICATIONS */}
      {activeTab === 'manage' && (
        <div className="p-6 sm:p-10 space-y-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Acervo da Imprensa
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Gerenciamento de Matérias
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
                onClick={() => setIsResetConfirmOpen(true)}
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
                          {art.publisher && (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              art.publisher === 'O UFANISTA'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-rose-100 text-[#7a1828] border border-rose-200'
                            }`}>
                              {art.publisher}
                            </span>
                          )}
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
        </div>
      )}

      {/* Modal de Confirmação para Apagar Matéria */}
      {articleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-center space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100 shadow-sm">
              <Trash2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-serif font-bold text-slate-900">
                Apagar Notícia?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tem certeza que deseja apagar a matéria <strong className="text-slate-900">"{articleToDelete.title}"</strong>? Esta ação não pode ser desfeita e a notícia será removida imediatamente da cobertura oficial.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setArticleToDelete(null)}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmDeleteArticle}
                className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Sim, apagar notícia</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação para Restaurar Padrão */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-center space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-100 shadow-sm">
              <RefreshCw className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-serif font-bold text-slate-900">
                Restaurar Conteúdo Padrão?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Deseja restaurar as notícias da SINU para o padrão de demonstração? Matérias criadas recentemente serão substituídas.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmResetDefaults}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-lg shadow-amber-600/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Restaurar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
