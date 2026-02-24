import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  // Mapeia o scroll da página (0 a 1000px) para um deslocamento Y (0 a 400px)
  // Isso faz com que o fundo desça mais devagar que o resto da página (efeito parallax)
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image Container com Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="http://sinu-csl-site.s3.sa-east-1.amazonaws.com/6.png"
          alt="SINU Background"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        
        {/* Dark Overlay - Reduzido já que não há texto para ler */}
        <div className="absolute inset-0 bg-slate-900/10"></div>
        {/* Gradient for smooth transition - Move junto com a imagem */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-transparent to-slate-900/90 pointer-events-none"></div>
      </motion.div>

      {/* Scroll Indicator - Mantém fixo relativo à section para não sofrer o parallax da imagem */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="flex flex-col items-center gap-2 opacity-60">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;