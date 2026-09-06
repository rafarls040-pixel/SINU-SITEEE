import React from 'react';
import { motion } from 'framer-motion';
import { X, Download, ExternalLink, FileText, Calendar, User, Eye, AlertCircle } from 'lucide-react';
import { PdfNewspaper } from '../../types';

interface PdfViewerModalProps {
  newspaper: PdfNewspaper | null;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  newspaper,
  onClose
}) => {
  if (!newspaper) return null;

  // Convert Google Drive view URL to preview URL for embedding if applicable
  const getEmbedUrl = (url: string) => {
    if (url.includes('drive.google.com/file/d/')) {
      const match = url.match(/\/file\/d\/([^/]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    return url;
  };

  const embedUrl = getEmbedUrl(newspaper.pdfUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
      >
        {/* Modal Top Header */}
        <div className="bg-[#03005c] text-white px-6 py-4 flex items-center justify-between gap-4 shrink-0 shadow-md">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2.5 bg-[#fecc00] text-[#03005c] rounded-2xl shrink-0 shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#fecc00] block truncate">
                {newspaper.edition} • Gazeta Oficial SINU
              </span>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white truncate">
                {newspaper.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={newspaper.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={newspaper.fileName || 'Gazeta_SINU.pdf'}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#fecc00] hover:bg-white text-[#03005c] font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Baixar PDF</span>
            </a>

            <a
              href={newspaper.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Abrir em nova aba"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors ml-1 cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metadata sub-bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2 shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {newspaper.date}
            </span>
            {newspaper.author && (
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {newspaper.author}
              </span>
            )}
            {newspaper.pageCount && (
              <span className="px-2 py-0.5 bg-slate-200 rounded text-[11px] font-medium text-slate-700">
                {newspaper.pageCount} páginas
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 italic truncate max-w-md hidden md:inline">
            {newspaper.description}
          </span>
        </div>

        {/* PDF Frame Viewer */}
        <div className="relative flex-1 w-full bg-slate-100 overflow-hidden">
          <iframe
            src={embedUrl}
            title={newspaper.title}
            className="w-full h-full border-0"
            allow="autoplay"
          />

          {/* Fallback floating button if iframe doesn't load */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-slate-200 flex items-center gap-3 text-xs pointer-events-auto">
            <span className="text-slate-600 hidden sm:inline">Problemas para visualizar no navegador?</span>
            <a
              href={newspaper.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#03005c] hover:underline flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Abrir PDF diretamente
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
