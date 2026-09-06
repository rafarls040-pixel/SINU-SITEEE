import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, User, Clock, Share2, Check, Printer, Bookmark } from 'lucide-react';
import { NewsArticle } from '../../types';

interface ArticleDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>${article.title} - Gazeta SINU</title>
        <style>
          body { font-family: Georgia, serif; line-height: 1.6; max-width: 760px; margin: 40px auto; padding: 0 20px; color: #111; }
          .header { border-bottom: 2px solid #03005c; padding-bottom: 16px; margin-bottom: 24px; }
          .agency { font-size: 11px; text-transform: uppercase; font-family: sans-serif; letter-spacing: 2px; color: #03005c; font-weight: bold; }
          h1 { font-size: 28px; line-height: 1.2; margin: 12px 0 8px; }
          .subtitle { font-size: 16px; color: #555; font-style: italic; margin-bottom: 16px; }
          .meta { font-size: 12px; font-family: sans-serif; color: #777; border-top: 1px solid #eee; padding-top: 8px; margin-bottom: 24px; }
          .content { font-size: 16px; text-align: justify; }
          .content p { margin-bottom: 16px; }
          .footer { margin-top: 40px; border-top: 1px solid #eee; padding-top: 16px; font-size: 11px; font-family: sans-serif; color: #888; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="agency">Imprensa Oficial • Simulação Interna das Nações Unidas</div>
          <h1>${article.title}</h1>
          ${article.subtitle ? `<div class="subtitle">${article.subtitle}</div>` : ''}
          <div class="meta">
            <strong>Por ${article.author}</strong> (${article.authorRole || 'Correspondente'}) • ${article.date}
            ${article.committee ? ` • Comitê: ${article.committee}` : ''}
          </div>
        </div>
        <div class="content">
          ${article.content.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>
        <div class="footer">
          Publicado pela Agência de Notícias da XX SINU • Colégio São Luís
        </div>
        <script>window.print();</script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Sticky Top Bar with Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/95 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#03005c]/10 text-[#03005c] rounded-full text-xs font-bold uppercase tracking-wider">
              {article.category}
            </span>
            {article.committee && (
              <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200/60 rounded-full text-xs font-bold uppercase">
                {article.committee}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-[#03005c] hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title="Copiar link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Compartilhar'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-500 hover:text-[#03005c] hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title="Imprimir notícia"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-1 cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-6">
          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-tight">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-normal">
                {article.subtitle}
              </p>
            )}

            {/* Author Byline & Date */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 py-4 border-y border-slate-100 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#03005c] text-white font-bold flex items-center justify-center text-xs shadow-sm">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">{article.author}</span>
                  <span className="text-[11px] text-slate-400">{article.authorRole || 'Correspondente de Imprensa'}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-500 ml-auto">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{article.date}</span>
                {article.time && <span className="text-slate-400">• {article.time}</span>}
              </div>

              {article.readingTime && (
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{article.readingTime}</span>
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 max-h-[420px] bg-slate-900">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-[11px] text-white/90">
                Cobertura oficial da Agência de Notícias • XX SINU
              </div>
            </div>
          )}

          {/* Article Full Paragraphs */}
          <div className="space-y-4 text-slate-800 leading-relaxed text-base sm:text-lg font-sans">
            {article.content.split('\n\n').map((paragraph, index) => {
              if (!paragraph.trim()) return null;

              // Se for citação entre aspas ou iniciada com >
              if (paragraph.startsWith('>') || (paragraph.startsWith('"') && paragraph.endsWith('"'))) {
                return (
                  <blockquote
                    key={index}
                    className="p-5 my-4 bg-slate-50 border-l-4 border-[#03005c] rounded-r-2xl italic text-slate-700 text-base"
                  >
                    {paragraph.replace(/^>\s*/, '')}
                  </blockquote>
                );
              }

              return (
                <p key={index} className="text-justify">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
                <Bookmark className="w-3.5 h-3.5" /> Tags:
              </span>
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
