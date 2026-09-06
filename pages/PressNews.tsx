import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  Lock, 
  Sparkles, 
  ChevronRight, 
  Tag, 
  FileDown,
  Layers,
  ShieldCheck,
  Share2
} from 'lucide-react';
import SinuLogo from '../components/SinuLogo';
import { newsService } from '../services/newsService';
import { NewsArticle, PdfNewspaper, JournalistUser } from '../types';
import { JournalistLoginModal } from '../components/press/JournalistLoginModal';
import { ArticleDetailModal } from '../components/press/ArticleDetailModal';
import { PdfViewerModal } from '../components/press/PdfViewerModal';
import { JournalistDashboard } from '../components/press/JournalistDashboard';

const CATEGORIES = ['Todas', 'Comitês', 'Geral', 'Bastidores', 'Declarações', 'Crise'];
const COMMITTEES = ['Todos', 'CSNU', 'CSH', 'UNODC', 'CDH', 'UNIFEM', 'TO', 'PNUMA', 'OPEP+', 'CN', 'CI'];

export const PressNews: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [pdfNewspapers, setPdfNewspapers] = useState<PdfNewspaper[]>([]);
  const [currentJournalist, setCurrentJournalist] = useState<JournalistUser | null>(null);

  // Navigation & filter states
  const [activeMainTab, setActiveMainTab] = useState<'news' | 'pdfs' | 'dashboard'>('news');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedCommittee, setSelectedCommittee] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedArticleForDetail, setSelectedArticleForDetail] = useState<NewsArticle | null>(null);
  const [selectedPdfForViewer, setSelectedPdfForViewer] = useState<PdfNewspaper | null>(null);

  const loadData = () => {
    setArticles(newsService.getArticles());
    setPdfNewspapers(newsService.getPdfNewspapers());
    setCurrentJournalist(newsService.getJournalistSession());
  };

  useEffect(() => {
    document.title = 'Notícias SINUXX';
    loadData();

    // If query param ?action=login or ?tab=pdfs is present
    if (searchParams.get('action') === 'login') {
      setIsLoginModalOpen(true);
    }
    if (searchParams.get('tab') === 'pdfs') {
      setActiveMainTab('pdfs');
    }
    if (searchParams.get('tab') === 'dashboard') {
      setActiveMainTab('dashboard');
    }
  }, [searchParams]);

  const handleLogout = () => {
    newsService.logoutJournalist();
    setCurrentJournalist(null);
    if (activeMainTab === 'dashboard') {
      setActiveMainTab('news');
    }
  };

  // Filter articles
  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory === 'Todas' || art.category === selectedCategory;
    const matchesCommittee = selectedCommittee === 'Todos' || art.committee === selectedCommittee || (!art.committee && selectedCommittee === 'Todos');
    const matchesQuery = 
      !searchQuery.trim() ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.subtitle && art.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesCommittee && matchesQuery;
  });

  // Pinned or latest highlight article
  const pinnedArticle = articles.find(a => a.isPinned) || articles[0];
  const regularArticles = filteredArticles.filter(a => a.id !== (pinnedArticle ? pinnedArticle.id : ''));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#03005c] selection:text-white pb-20">
      
      {/* Top Header Bar */}
      <header className="bg-[#03005c] text-white border-b border-white/10 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand / Logo */}
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 group transition-transform hover:scale-105"
                title="Voltar para a página inicial"
              >
                <SinuLogo className="h-10 sm:h-12 w-auto brightness-0 invert" />
              </Link>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#fecc00] block">
                  XX SINU • Cobertura de Imprensa
                </span>
                <h1 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight">
                  Notícias SINUXX
                </h1>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Página Inicial</span>
              </Link>

              {currentJournalist ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveMainTab('dashboard')}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
                      activeMainTab === 'dashboard'
                        ? 'bg-[#fecc00] text-[#03005c]'
                        : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span className="hidden md:inline">Redação:</span>
                    <span>{currentJournalist.name.split(' ')[0]}</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-white/80 hover:text-white transition-colors text-xs"
                    title="Encerrar sessão de imprensa"
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#fecc00] hover:bg-white text-[#03005c] text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Área do Jornalista</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-b from-[#03005c] to-slate-900 text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fecc00_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fecc00]/15 border border-[#fecc00]/30 text-[#fecc00] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Jornalismo Diplomático em Tempo Real</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight leading-tight">
                Notícias SINUXX
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans font-normal">
                Acompanhe a cobertura completa dos 10 comitês, declarações de delegados, crises diplomáticas e leia as edições diagramadas da Gazeta SINU em formato digital.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0">
              <div className="text-center px-3 border-r border-white/10">
                <span className="block text-2xl font-black text-[#fecc00]">{articles.length}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Matérias</span>
              </div>
              <div className="text-center px-3">
                <span className="block text-2xl font-black text-[#fecc00]">{pdfNewspapers.length}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Edições PDF</span>
              </div>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-white/10">
            <button
              onClick={() => setActiveMainTab('news')}
              className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeMainTab === 'news'
                  ? 'bg-white text-[#03005c] shadow-lg'
                  : 'bg-white/10 text-white/90 hover:bg-white/20'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Notícias SINUXX ({articles.length})</span>
            </button>

            <button
              onClick={() => setActiveMainTab('pdfs')}
              className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeMainTab === 'pdfs'
                  ? 'bg-[#fecc00] text-[#03005c] shadow-lg'
                  : 'bg-white/10 text-white/90 hover:bg-white/20'
              }`}
            >
              <FileDown className="w-4 h-4" />
              <span>Jornais em PDF • Gazeta ({pdfNewspapers.length})</span>
            </button>

            {currentJournalist && (
              <button
                onClick={() => setActiveMainTab('dashboard')}
                className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ml-auto ${
                  activeMainTab === 'dashboard'
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'bg-white/10 text-emerald-300 hover:bg-white/20'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Painel da Redação (Publicar)</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">

        {/* 1. JOURNALIST DASHBOARD (If active) */}
        {activeMainTab === 'dashboard' && currentJournalist && (
          <div className="mb-12">
            <JournalistDashboard
              user={currentJournalist}
              onLogout={handleLogout}
              onDataChanged={loadData}
              onViewArticle={(art) => setSelectedArticleForDetail(art)}
              onViewPdf={(pdf) => setSelectedPdfForViewer(pdf)}
            />
          </div>
        )}

        {/* 2. PDF NEWSPAPERS SECTION */}
        {activeMainTab === 'pdfs' && (
          <div className="space-y-8">
            {/* Banner card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#03005c] block">
                  Edições Diagramadas & Impressas
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  Gazeta SINU • Jornais Oficiais em PDF
                </h3>
                <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Consulte ou baixe todas as edições diárias, edições especiais e dossiês produzidos pela imprensa da XX SINU. Você pode visualizar diretamente no navegador ou fazer o download no seu dispositivo.
                </p>
              </div>

              {currentJournalist ? (
                <button
                  onClick={() => setActiveMainTab('dashboard')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#03005c] hover:bg-[#050080] text-white text-xs font-bold shadow-lg transition-all shrink-0 cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-[#fecc00]" />
                  <span>+ Adicionar Novo Jornal em PDF</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all shrink-0 cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-[#03005c]" />
                  <span>É da imprensa? Faça login para postar</span>
                </button>
              )}
            </div>

            {/* Grid of PDF Newspapers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pdfNewspapers.map((newspaper) => (
                <motion.div
                  key={newspaper.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200/80 transition-all flex flex-col group"
                >
                  {/* Newspaper Cover Preview */}
                  <div className="relative aspect-[3/4] max-h-72 overflow-hidden bg-slate-900">
                    <img
                      src={newspaper.coverImageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80'}
                      alt={newspaper.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                    
                    {/* Badge top */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 bg-[#fecc00] text-[#03005c] rounded-full text-xs font-black uppercase tracking-wider shadow-md">
                        {newspaper.edition}
                      </span>
                      {newspaper.pageCount && (
                        <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white rounded-full text-xs font-bold">
                          {newspaper.pageCount} páginas
                        </span>
                      )}
                    </div>

                    {/* Bottom overlay title */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase font-bold text-[#fecc00] block mb-1">
                        Publicado em {newspaper.date}
                      </span>
                      <h4 className="font-serif font-bold text-lg leading-snug line-clamp-2 drop-shadow-md">
                        {newspaper.title}
                      </h4>
                    </div>
                  </div>

                  {/* Body description */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {newspaper.description}
                    </p>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                      <button
                        onClick={() => setSelectedPdfForViewer(newspaper)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-[#03005c] hover:bg-[#050080] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <Eye className="w-4 h-4 text-[#fecc00]" />
                        <span>Ler Jornal Online</span>
                      </button>

                      <a
                        href={newspaper.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={newspaper.fileName || 'Gazeta_SINU.pdf'}
                        className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                        title="Baixar arquivo PDF"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {pdfNewspapers.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="font-serif font-bold text-lg text-slate-700">Nenhum jornal em PDF publicado</h4>
                <p className="text-xs text-slate-500 mt-1">Utilize a área do jornalista para postar a primeira edição.</p>
              </div>
            )}
          </div>
        )}

        {/* 3. NEWS ARTICLES SECTION */}
        {activeMainTab === 'news' && (
          <div className="space-y-10">
            {articles.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-5 shadow-sm">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#03005c]/5 flex items-center justify-center text-[#03005c]">
                  <Newspaper className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h4 className="font-serif font-bold text-2xl text-slate-800">
                    Nenhuma notícia publicada no momento
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    A equipe de jornalistas publicará matérias, bastidores e entrevistas em tempo real durante a realização da XX SINU.
                  </p>
                </div>
                <div className="pt-2">
                  {currentJournalist ? (
                    <button
                      onClick={() => setActiveMainTab('dashboard')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#03005c] hover:bg-[#050080] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#fecc00]" />
                      <span>Publicar Primeira Notícia</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#03005c] hover:bg-[#050080] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-[#fecc00]" />
                      <span>Área do Jornalista (Fazer Login)</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <>
            {/* Filter & Search Bar */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search input */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar notícias, comitês, temas ou autores..."
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#03005c] focus:ring-2 focus:ring-[#03005c]/10 transition-all bg-slate-50/50"
                  />
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>

                {/* Committee dropdown filter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" /> Comitê:
                  </span>
                  <select
                    value={selectedCommittee}
                    onChange={(e) => setSelectedCommittee(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-xs font-bold focus:outline-none focus:border-[#03005c] bg-white cursor-pointer"
                  >
                    {COMMITTEES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#03005c] text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Pinned / Top Headline Feature (only when no search active and on "Todas") */}
            {!searchQuery && selectedCategory === 'Todas' && selectedCommittee === 'Todos' && pinnedArticle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 grid grid-cols-1 lg:grid-cols-12 group cursor-pointer"
                onClick={() => setSelectedArticleForDetail(pinnedArticle)}
              >
                <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] bg-slate-900 overflow-hidden">
                  <img
                    src={pinnedArticle.imageUrl || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80'}
                    alt={pinnedArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#fecc00] text-[#03005c] rounded-full text-xs font-black uppercase tracking-wider shadow-md">
                      Destaque Principal
                    </span>
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white rounded-full text-xs font-bold uppercase">
                      {pinnedArticle.category}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {pinnedArticle.date}
                      </span>
                      {pinnedArticle.readingTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {pinnedArticle.readingTime}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 group-hover:text-[#03005c] transition-colors leading-tight">
                      {pinnedArticle.title}
                    </h3>

                    {pinnedArticle.subtitle && (
                      <p className="text-sm text-slate-600 leading-relaxed font-sans line-clamp-3">
                        {pinnedArticle.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="w-7 h-7 rounded-full bg-[#03005c] text-white flex items-center justify-center font-bold text-[11px]">
                        {pinnedArticle.author.charAt(0)}
                      </div>
                      <span className="font-bold">{pinnedArticle.author}</span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#03005c] group-hover:translate-x-1 transition-transform">
                      Ler reportagem completa <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Regular Articles Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  {searchQuery ? `Resultados da busca (${filteredArticles.length})` : 'Últimas Matérias Publicadas'}
                </h3>
              </div>

              {regularArticles.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
                  <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h4 className="font-serif font-bold text-base text-slate-700">
                    Nenhuma notícia encontrada com os filtros selecionados.
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Tente buscar com outro termo ou selecione a categoria "Todas".
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularArticles.map((article) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setSelectedArticleForDetail(article)}
                      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-slate-200/80 transition-all flex flex-col cursor-pointer group"
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video overflow-hidden bg-slate-900">
                        {article.imageUrl ? (
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                            <FileText className="w-8 h-8" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="px-2.5 py-0.5 bg-black/70 backdrop-blur-md text-white rounded-full text-[11px] font-bold uppercase">
                            {article.category}
                          </span>
                          {article.committee && (
                            <span className="px-2 py-0.5 bg-[#fecc00] text-[#03005c] rounded-full text-[11px] font-bold uppercase shadow-sm">
                              {article.committee}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-[11px] text-slate-400">
                            <span>{article.date}</span>
                            {article.readingTime && <span>• {article.readingTime}</span>}
                          </div>

                          <h4 className="font-serif font-bold text-lg text-slate-900 group-hover:text-[#03005c] transition-colors line-clamp-2 leading-snug">
                            {article.title}
                          </h4>

                          {article.subtitle && (
                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {article.subtitle}
                            </p>
                          )}
                        </div>

                        {/* Footer author */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                          <span className="font-bold truncate max-w-[160px]">
                            {article.author}
                          </span>
                          <span className="text-[#03005c] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                            Ler mais <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Floating Action / Login Helper */}
      {!currentJournalist && (
        <div className="fixed bottom-6 right-6 z-30">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#03005c] text-white shadow-2xl hover:bg-[#050080] active:scale-95 transition-all text-xs font-bold border border-white/20 cursor-pointer group"
          >
            <Lock className="w-4 h-4 text-[#fecc00]" />
            <span>Área da Imprensa • Login</span>
          </button>
        </div>
      )}

      {/* Modals */}
      <JournalistLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentJournalist(user);
          setActiveMainTab('dashboard');
        }}
      />

      <ArticleDetailModal
        article={selectedArticleForDetail}
        onClose={() => setSelectedArticleForDetail(null)}
      />

      <PdfViewerModal
        newspaper={selectedPdfForViewer}
        onClose={() => setSelectedPdfForViewer(null)}
      />

    </div>
  );
};

export default PressNews;
