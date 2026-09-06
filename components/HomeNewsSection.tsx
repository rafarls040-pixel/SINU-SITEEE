import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Newspaper, 
  FileDown, 
  Eye, 
  ChevronRight, 
  Calendar, 
  Lock, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';
import { newsService } from '../services/newsService';
import { NewsArticle, PdfNewspaper } from '../types';
import { ArticleDetailModal } from './press/ArticleDetailModal';
import { PdfViewerModal } from './press/PdfViewerModal';

export const HomeNewsSection: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [latestPdf, setLatestPdf] = useState<PdfNewspaper | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<PdfNewspaper | null>(null);

  useEffect(() => {
    const loadedArticles = newsService.getArticles();
    const loadedPdfs = newsService.getPdfNewspapers();
    setArticles(loadedArticles.slice(0, 3));
    if (loadedPdfs.length > 0) {
      setLatestPdf(loadedPdfs[0]);
    }
  }, []);

  return (
    <section id="imprensa" className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#03005c]/10 text-[#03005c] text-xs font-bold uppercase tracking-widest">
              <Newspaper className="w-3.5 h-3.5 text-[#03005c]" />
              <span>Imprensa & Gazeta Oficial</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-tight">
              Notícias SINUXX & Jornais em PDF
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Fique por dentro das negociações, moções e polêmicas diplomáticas com a cobertura em tempo real da equipe de jornalistas e as edições oficiais da Gazeta.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/imprensa"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#03005c] hover:bg-[#050080] text-white font-bold text-xs shadow-lg shadow-[#03005c]/15 transition-all cursor-pointer group"
            >
              <span>Ver Notícias SINUXX</span>
              <ChevronRight className="w-4 h-4 text-[#fecc00] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/imprensa?action=login"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-300 hover:bg-white text-slate-700 font-bold text-xs transition-all cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#03005c]" />
              <span>Área do Jornalista</span>
            </Link>
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Latest Articles List (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#03005c]" />
                Últimas Reportagens dos Comitês
              </h3>
              <Link to="/imprensa" className="text-xs font-bold text-[#03005c] hover:underline flex items-center gap-1">
                Ver Notícias SINUXX <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {articles.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
                <Newspaper className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="font-serif font-bold text-base text-slate-800">
                  Nenhuma notícia publicada no momento
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  A equipe de imprensa da XX SINU publicará artigos e reportagens durante a conferência.
                </p>
                <div className="pt-2">
                  <Link
                    to="/imprensa"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#03005c] hover:underline"
                  >
                    Acessar Notícias SINUXX <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {articles.map((art) => (
                  <motion.article
                    key={art.id}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedArticle(art)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-200/80 transition-all flex flex-col cursor-pointer group"
                  >
                    <div className="relative aspect-video bg-slate-900 overflow-hidden">
                      <img
                        src={art.imageUrl || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80'}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 flex items-center gap-1">
                        <span className="px-2 py-0.5 bg-black/70 backdrop-blur-sm text-white rounded text-[10px] font-bold uppercase">
                          {art.category}
                        </span>
                        {art.committee && (
                          <span className="px-1.5 py-0.5 bg-[#fecc00] text-[#03005c] rounded text-[10px] font-bold">
                            {art.committee}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <span className="text-[10px] text-slate-400 block">{art.date}</span>
                        <h4 className="font-serif font-bold text-sm text-slate-900 group-hover:text-[#03005c] transition-colors line-clamp-2 leading-snug">
                          {art.title}
                        </h4>
                        {art.subtitle && (
                          <p className="text-xs text-slate-500 line-clamp-2">
                            {art.subtitle}
                          </p>
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="truncate font-medium text-slate-600">{art.author}</span>
                        <span className="text-[#03005c] font-bold flex items-center">
                          Ler <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>

          {/* Right: PDF Newspaper Feature Card (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col">
            {latestPdf ? (
              <div className="bg-gradient-to-b from-[#03005c] to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-white/10 flex-1 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#fecc00]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-[#fecc00] text-[#03005c] rounded-full text-xs font-black uppercase tracking-wider">
                      {latestPdf.edition}
                    </span>
                    <span className="text-xs text-white/70 font-medium">
                      PDF Oficial
                    </span>
                  </div>

                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-white/10 group">
                    <img
                      src={latestPdf.coverImageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80'}
                      alt={latestPdf.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                      <span className="text-xs font-bold text-[#fecc00] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Publicado em {latestPdf.date}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-serif font-bold text-white leading-tight">
                      {latestPdf.title}
                    </h4>
                    <p className="text-xs text-white/70 mt-2 line-clamp-3 leading-relaxed">
                      {latestPdf.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-white/10 flex items-center gap-3 relative z-10">
                  <button
                    onClick={() => setSelectedPdf(latestPdf)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#fecc00] hover:bg-white text-[#03005c] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ler Jornal em PDF</span>
                  </button>

                  <a
                    href={latestPdf.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={latestPdf.fileName || 'Gazeta_SINU.pdf'}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title="Baixar PDF no dispositivo"
                  >
                    <FileDown className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 flex-1 flex flex-col items-center justify-center text-center">
                <FileDown className="w-10 h-10 text-slate-300 mb-2" />
                <h4 className="font-serif font-bold text-base text-slate-800">Gazeta em PDF</h4>
                <p className="text-xs text-slate-400 mt-1">Acesse a área de imprensa para publicar o jornal.</p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Modals */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <PdfViewerModal
        newspaper={selectedPdf}
        onClose={() => setSelectedPdf(null)}
      />
    </section>
  );
};
