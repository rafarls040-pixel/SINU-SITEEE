import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import SinuLogo from './SinuLogo';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none mix-blend-multiply"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Large Background Watermark Text (Marquee) */}
      <div className="absolute inset-0 flex items-center z-0 select-none pointer-events-none overflow-hidden opacity-[0.03]">
        <motion.div 
          animate={{ 
            x: ["0%", "-50%"] 
          }}
          transition={{ 
            duration: 60, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex whitespace-nowrap"
        >
          <h2 className="text-[30vw] font-serif font-black text-slate-900 leading-none pr-20">
            SINU XX SINU XX SINU XX SINU XX
          </h2>
          <h2 className="text-[30vw] font-serif font-black text-slate-900 leading-none pr-20">
            SINU XX SINU XX SINU XX SINU XX
          </h2>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Geometric Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-slate-100 to-transparent opacity-50"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent opacity-50"></div>
      </div>

      {/* Decorative Vertical Text */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block z-10"
      >
        <p className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400 select-none">
          Colégio São Luís • São Paulo • Brasil
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block z-10"
      >
        <p className="[writing-mode:vertical-rl] text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400 select-none">
          Vigésima Edição • 2026
        </p>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl px-6 -mt-16">
        {/* Logo with floating animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: [0, -15, 0] 
          }}
          transition={{ 
            opacity: { duration: 1.2, ease: "easeOut" },
            scale: { duration: 1.2, ease: "easeOut" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="mb-4"
        >
          <div className="relative">
            <SinuLogo className="w-72 h-72 md:w-[28rem] md:h-[28rem] relative z-10 drop-shadow-[0_15px_50px_rgba(65,143,222,0.1)]" />
          </div>
        </motion.div>

        {/* Typography Section */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <span className="h-px w-12 bg-slate-200"></span>
            <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-un-accent">
              XX Edição
            </span>
            <span className="h-px w-12 bg-slate-200"></span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-[#03005c] text-8xl md:text-[10rem] lg:text-[12rem] font-serif font-black tracking-tighter leading-[0.8]"
          >
            SINU <span className="text-un-accent font-light italic">XX</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-10 text-un-blue font-sans font-bold text-[10px] md:text-xs tracking-[0.5em] uppercase max-w-3xl mx-auto"
          >
            Simulação Interna das Nações Unidas
          </motion.p>

          {/* Bottom Center Dot from Screenshot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-8 flex justify-center"
          >
            <div className="w-4 h-4 rounded-full border border-slate-200 flex items-center justify-center">
              <div className="w-1 h-1 bg-un-blue rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>



      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center"
          >
            <div className="w-5 h-8 border-2 border-slate-200 rounded-full flex justify-center p-1">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-1 bg-un-blue rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background Decorative Numbers with Blue Box */}
      <div className="absolute bottom-8 left-8 z-10 hidden md:block">
        <div className="border border-un-blue/40 p-1 rounded-sm">
          <div className="border border-un-blue/20 px-6 py-2">
            <p className="text-5xl font-serif font-black text-slate-100 italic">2007</p>
          </div>
        </div>
      </div>
      <div className="absolute top-8 right-8 z-10 hidden md:block">
        <p className="text-4xl font-serif font-black text-slate-100 italic">2026</p>
      </div>
    </section>
  );
};

export default Hero;