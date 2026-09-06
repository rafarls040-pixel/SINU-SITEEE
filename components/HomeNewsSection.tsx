import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Newspaper, 
  ChevronRight, 
  Lock, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';
import { newsService } from '../services/newsService';
import { NewsArticle } from '../types';
import { ArticleDetailModal } from './press/ArticleDetailModal';

export const HomeNewsSection: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    const loadedArticles = newsService.getArticles();
    setArticles(loadedArticles.slice(0, 6));
  }, []);

  return (
    <section id="imprensa" className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#03005c]/10 text-[#03005c] text-xs font-bold uppercase tracking-widest">
              <Newspaper className="w-3.5 h-3.5 text-[#03005c]" />
              <span>Imprensa Oficial SINUXX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 tracking-tight">
              Notícias SINUXX
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Fique por dentro das negociações, moções e polêmicas diplomáticas com a cobertura jornalística em tempo real das editoras <strong>O UFANISTA</strong> e <strong>SANS CULOTTES</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/imprensa"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#03005c] hover:bg-[#050080] text-white font-bold text-xs shadow-lg shadow-[#03005c]/15 transition-all cursor-pointer group"
            >
              <span>Ver Todas as Notícias</span>
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

        {/* Content Layout */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#03005c]" />
              Últimas Reportagens dos Comitês
            </h3>
            <Link to="/imprensa" className="text-xs font-bold text-[#03005c] hover:underline flex items-center gap-1">
              Acessar Portal Completo <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {articles.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-3">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                      {art.publisher && (
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                          art.publisher === 'O UFANISTA'
                            ? 'bg-blue-600 text-white'
                            : 'bg-[#7a1828] text-white'
                        }`}>
                          {art.publisher}
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 bg-black/70 backdrop-blur-sm text-white rounded text-[10px] font-bold uppercase">
                        {art.category}
                      </span>
                      {art.committee && (
                        <span className="px-2 py-0.5 bg-[#fecc00] text-[#03005c] rounded text-[10px] font-bold">
                          {art.committee}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 block">{art.date}</span>
                      <h4 className="font-serif font-bold text-base text-slate-900 group-hover:text-[#03005c] transition-colors line-clamp-2 leading-snug">
                        {art.title}
                      </h4>
                      {art.subtitle && (
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {art.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span className="truncate font-medium text-slate-600">{art.author}</span>
                      <span className="text-[#03005c] font-bold flex items-center gap-0.5">
                        Ler matéria <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
};
