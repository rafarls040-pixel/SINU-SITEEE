import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Users, PlayCircle, Quote, Swords, FileDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import MemberCarousel, { Member } from '../components/MemberCarousel';
import StudyGuideSection from '../components/StudyGuideSection';

const TO: React.FC = () => {
  const mesaDiretora: Member[] = [
    { name: 'Raissa Scarasati', shift: '', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/to-opep/Raissa.png' },
    { name: 'Sophia Macedo', shift: '', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/to-opep/Sophia+Macedo.png' },
    { name: 'João Vitor', shift: '', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/to-opep/Joao+Vitor.png' },
    { name: 'Antonie Lecointre', shift: '', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/to-opep/Antonie.png' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-[#c84218] selection:text-white bg-slate-50/50">
      {/* Header/Hero Section */}
      <header className="relative py-8 sm:py-16 md:py-24 overflow-hidden bg-[#240803]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#240803] via-[#541a03] to-[#8b2b00]"></div>
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-400 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center px-3.5 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all duration-300 mb-4 sm:mb-8 text-xs sm:text-sm font-semibold border border-white/20 hover:border-white/40 shadow-lg hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
            Voltar para o início
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center md:items-center gap-5 sm:gap-8 md:gap-12 text-center md:text-left"
          >
            <div className="relative flex items-center justify-center w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 shrink-0">
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl -z-10"></div>
              <img 
                src="https://sinu-csl-site.s3.sa-east-1.amazonaws.com/to-opep/37.png" 
                alt="Logo TO" 
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <div className="flex-1 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-orange-200 font-bold tracking-widest uppercase text-[10px] sm:text-xs">
                <span>Comitê Especial</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white drop-shadow-md tracking-tight leading-tight">
                Teatro de Operações (TO)
              </h1>
              
              {/* Theme Callout Box */}
              <div className="bg-black/35 backdrop-blur-md border border-white/15 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-2xl relative overflow-hidden text-left">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c84218]"></div>
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 shrink-0 mt-0.5 opacity-80" />
                  <div>
                    <span className="text-orange-300 font-sans font-black text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] block mb-1">Tema Oficial</span>
                    <p className="text-sm sm:text-lg md:text-xl text-white font-serif font-bold leading-snug">
                      “Guerra das Coreias (1950-1953)”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Sobre o Comitê Card */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 min-h-[240px] sm:min-h-[280px] flex items-center bg-slate-900 group"
            >
              <div className="relative z-10 p-5 sm:p-8 md:p-10 w-full space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-2.5 bg-[#c84218] rounded-xl sm:rounded-2xl text-white shadow-lg flex items-center justify-center shrink-0">
                    <Swords className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-orange-300 block">Apresentação</span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md">Sobre o Comitê</h2>
                  </div>
                </div>
                
                <p className="text-white/95 leading-relaxed text-xs sm:text-sm md:text-base text-justify font-medium drop-shadow-sm pt-2 border-t border-white/10">
                  O Teatro de Operações (TO) é um comitê focado em simulações de crises militares e estratégicas em tempo real. Os delegados devem lidar com movimentações de tropas, inteligência e diplomacia sob pressão extrema para alcançar seus objetivos nacionais.
                </p>
              </div>
            </motion.section>

            {/* Sobre o Tema Card */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl border border-slate-100 border-l-6 sm:border-l-8 border-l-[#c84218]"
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-100">
                <div className="p-2.5 sm:p-3 bg-[#c84218]/10 rounded-xl sm:rounded-2xl text-[#c84218]">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Contexto e Objetivos</span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-slate-900">Sobre o Tema</h2>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4 text-slate-700 leading-relaxed text-xs sm:text-sm md:text-base text-justify">
                <p className="font-normal">
                  A simulação da Guerra das Coreias (1950-1953) transporta os delegados para um dos momentos mais críticos da Guerra Fria. No Teatro de Operações, os delegados enfrentarão o desafio de coordenar estratégias militares em terrenos difíceis, gerenciar alianças internacionais voláteis e tomar decisões táticas que podem alterar o curso da história, tudo isso enquanto lidam com a constante ameaça de uma escalada global.
                </p>
              </div>
            </motion.section>

            {/* Study Guide Section (Full Width) */}
            <StudyGuideSection 
              committeeId="to" 
              committeeName="Teatro de Operações (TO)" 
              accentColor="#541a03" 
            />

            {/* Theme Video */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl border border-slate-100 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#c84218]" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3.5 bg-[#c84218]/10 rounded-xl sm:rounded-2xl text-[#c84218] shadow-inner">
                    <PlayCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Apresentação Audiovisual</span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-slate-900 tracking-tight">Vídeo do Tema</h2>
                  </div>
                </div>
                <a
                  href="https://drive.google.com/file/d/1td_w6SBFe7FWfzcvmHmg3QEVqKQf-6BG/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all bg-[#c84218] shrink-0 self-start sm:self-auto"
                >
                  <FileDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:w-5 sm:h-5" />
                  <span>Baixar Guia (PDF)</span>
                </a>
              </div>
              
              <div className="relative aspect-video rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 md:border-8 border-slate-50 bg-slate-900 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10"></div>
                <iframe 
                  className="absolute top-0 left-0 w-full h-full z-0"
                  src="https://www.youtube.com/embed/513BeQh5RKA"
                  title="Vídeo de Apresentação do Tema"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.section>

            {/* General Presentation Video Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl border border-slate-100 overflow-hidden relative"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-100">
                <div className="p-2.5 sm:p-3 bg-slate-100 rounded-xl sm:rounded-2xl text-slate-700">
                  <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Visão Geral</span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">Vídeo de Apresentação da Comissão</h2>
                </div>
              </div>
              
              <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-slate-50 bg-slate-900">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/CLljMZzedcw"
                  title="Vídeo Apresentação TO"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.section>
          </div>

          {/* Sidebar: Directing Board (Mesa Diretora) */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8 sticky top-8">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative p-5 sm:p-6 md:p-8"
            >
              {/* Accent top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#541a03] via-[#c84218] to-[#541a03]"></div>
              
              <div className="flex items-center gap-3 sm:gap-3.5 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-800">
                <div className="p-2.5 sm:p-3 bg-[#c84218]/20 text-orange-400 rounded-xl sm:rounded-2xl border border-[#c84218]/30">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-orange-400 block">Equipe de Direção</span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white tracking-tight">Mesa Diretora</h3>
                </div>
              </div>

              <div>
                <MemberCarousel members={mesaDiretora} isDark={true} accentColor="bg-[#c84218]" />
              </div>
            </motion.section>
          </div>

        </div>
      </main>
    </div>
  );
};

export default TO;
