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
        {/* Blue Circle */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full bg-un-blue/5 border border-un-blue/10 blur-xl"
        />
        {/* Gold Accent */}
        <motion.div 
          animate={{ 
            y: [0, 30, 0],
            x: [0, -15, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[15%] w-48 h-48 rounded-full bg-un-accent/5 border border-un-accent/10 blur-2xl"
        />
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
      <div className="relative z-10 flex flex-col items-center max-w-5xl px-6">
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
          className="mb-10"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-un-blue/10 blur-3xl rounded-full scale-150 opacity-50"></div>
            <SinuLogo className="w-40 h-40 md:w-52 md:h-52 relative z-10 drop-shadow-[0_15px_50px_rgba(65,143,222,0.2)]" />
          </div>
        </motion.div>

        {/* Typography Section */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="h-px w-8 bg-slate-200"></span>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-un-accent">
              XX Edição
            </span>
            <span className="h-px w-8 bg-slate-200"></span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-slate-900 text-7xl md:text-9xl lg:text-[10rem] font-serif font-black tracking-tighter leading-[0.85]"
          >
            SINU <span className="text-un-accent italic font-light">XX</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 text-slate-500 text-sm md:text-base lg:text-lg font-sans tracking-[0.3em] uppercase max-w-2xl mx-auto leading-relaxed"
          >
            Simulação Interna das Nações Unidas
          </motion.p>
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
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-2">Explore</span>
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

      {/* Background Decorative Numbers */}
      <div className="absolute bottom-8 left-8 z-10 hidden md:block">
        <p className="text-4xl font-serif font-black text-slate-100 italic">2007</p>
      </div>
      <div className="absolute top-8 right-8 z-10 hidden md:block">
        <p className="text-4xl font-serif font-black text-slate-100 italic">2026</p>
      </div>
    </section>
  );
};

export default Hero;