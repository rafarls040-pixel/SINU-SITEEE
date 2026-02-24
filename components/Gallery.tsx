import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const photos = [
  {
    src: "https://photos.fife.usercontent.google.com/pw/AP1GczPYHuajyWnNP-DM2sFYJeNqCdzxWyIev0u1WPydL9CeXLyAm4-7Gvkr=w800-h533-s-no-gm?authuser=3",
    alt: "Delegados debatendo no Conselho",
    size: "large"
  },
  {
    src: "https://images.unsplash.com/photo-1577962917302-cd874c4e3169?auto=format&fit=crop&q=80&w=800",
    alt: "Mesa diretora",
    size: "small"
  },
  {
    src: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800",
    alt: "Plenária cheia",
    size: "small"
  },
  {
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
    alt: "Entrega de menções honrosas",
    size: "small"
  },
  {
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
    alt: "Intervalo e networking",
    size: "large"
  },
  {
    src: "https://i.ibb.co/tPsgMpGB",
    alt: "Edição anterior SINU",
    size: "small"
  }
];

const Gallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden'; // Previne scroll da página
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset'; // Restaura scroll
  };

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % photos.length);
  }, [selectedIndex]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + photos.length) % photos.length);
  }, [selectedIndex]);

  // Suporte para teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, nextImage, prevImage]);

  return (
    <>
      <section id="galeria" className="py-24 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-un-blue font-bold tracking-wide uppercase mb-2">Galeria</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Momentos Inesquecíveis</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {photos.map((photo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onClick={() => openLightbox(idx)}
                className={`relative overflow-hidden rounded-xl shadow-md group cursor-pointer ${
                  photo.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay de Hover com ícone de Zoom */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                   <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 w-10 h-10 drop-shadow-lg" />
                </div>

                {/* Etiqueta */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 pointer-events-none">
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg inline-block border border-slate-100">
                    <p className="text-slate-800 text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                      {photo.alt}
                    </p>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={closeLightbox}
          >
            {/* Botão Fechar */}
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-[70]"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navegação Esquerda */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-[70] hidden md:block"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Imagem Principal */}
            <motion.div 
              className="relative max-w-full max-h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Impede que clicar na imagem feche o modal
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={selectedIndex} // Força re-render da animação ao trocar imagem
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <img
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].alt}
                decoding="async"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              <p className="mt-4 text-white/90 text-lg font-medium text-center font-serif">
                {photos[selectedIndex].alt}
              </p>
              <p className="text-white/50 text-sm mt-1">
                {selectedIndex + 1} de {photos.length}
              </p>
            </motion.div>

            {/* Navegação Direita */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-[70] hidden md:block"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            
            {/* Navegação Mobile (Toque nas laterais não implementado, mas botões inferiores sim) */}
            <div className="absolute bottom-10 flex gap-8 md:hidden z-[70]" onClick={(e) => e.stopPropagation()}>
               <button onClick={prevImage} className="p-4 bg-white/10 rounded-full text-white"><ChevronLeft /></button>
               <button onClick={nextImage} className="p-4 bg-white/10 rounded-full text-white"><ChevronRight /></button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;