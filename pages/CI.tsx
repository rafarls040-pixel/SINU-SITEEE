import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, PlayCircle, Quote, Newspaper, FileDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import MemberCarousel, { Member } from '../components/MemberCarousel';
import StudyGuideSection from '../components/StudyGuideSection';

const CI: React.FC = () => {
  const mesaDiretora: Member[] = [
    { name: 'Luiz Eduardo Gagliardi Pimazzoni', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Luiz+pimazzoni.png' },
    { name: 'Gabriella Ferreira Duarte', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Gabriella+ferreira.png' },
    { name: 'Julia Araujo Ferreira', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Julia+araujo.png' },
    { name: 'Rafaela Lopes Sfeir', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Rafaela+sfeir.png' },
    { name: 'Marya Eduarda Seixas Ferreira', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Maria.png' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-[#ED5757] selection:text-white bg-slate-50/50">
      {/* Header/Hero Section */}
      <header className="relative py-16 md:py-24 overflow-hidden bg-[#7a0000]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7a0000] via-[#c70000] to-[#ed5757]"></div>
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-300 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all duration-300 mb-8 text-xs sm:text-sm font-semibold border border-white/20 hover:border-white/40 shadow-lg hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o início
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-12 text-center md:text-left"
          >
            <div className="relative flex items-center justify-center w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 shrink-0">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl -z-10"></div>
              <img 
                src="https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/CI.png" 
                alt="Logo CI" 
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-red-100 font-bold tracking-widest uppercase text-xs">
                <span>Comitê Especial</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white drop-shadow-md tracking-tight leading-tight">
                Comitê de Imprensa
              </h1>
              
              {/* Theme Callout Box */}
              <div className="bg-black/35 backdrop-blur-md border border-white/15 p-5 md:p-6 rounded-2xl shadow-2xl relative overflow-hidden text-left">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#ED5757]"></div>
                <div className="flex items-start gap-3">
                  <Quote className="w-6 h-6 text-red-300 shrink-0 mt-0.5 opacity-80" />
                  <div>
                    <span className="text-red-200 font-sans font-black text-[10px] uppercase tracking-[0.3em] block mb-1">Função Oficial</span>
                    <p className="text-base sm:text-lg md:text-xl text-white font-serif font-bold leading-snug uppercase">
                      COBERTURA JORNALÍSTICA INTEGRAL DA SINU
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sobre o Comitê Card */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 min-h-[280px] flex items-center bg-slate-900 group"
            >
              <div className="relative z-10 p-8 md:p-10 w-full space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#ED5757] rounded-2xl text-white shadow-lg flex items-center justify-center shrink-0">
                    <Newspaper className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-red-300 block">Apresentação</span>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md">Sobre o Comitê</h2>
                  </div>
                </div>
                
                <p className="text-white/95 leading-relaxed text-sm md:text-base text-justify font-medium drop-shadow-sm pt-2 border-t border-white/10">
                  O Comitê de Imprensa desempenha o papel de cobrir as sessões de todos os comitês, podendo fazer intervenções com questionamentos acerca do andamento e posicionamento das delegações. A partir disto, produz notícias, imagens, charges e conteúdo audiovisual que apontam os acontecimentos mais importantes da simulação, bem como outros conteúdos criativos, promovendo informação e integração entre todos.
                </p>
              </div>
            </motion.section>

            {/* Study Guide Section (Full Width) */}
            <StudyGuideSection 
              committeeId="ci" 
              committeeName="Comitê de Imprensa (CI)" 
              accentColor="#C70000" 
            />

            {/* General Presentation Video Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#C70000]" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-[#C70000]/10 rounded-2xl text-[#ED5757] shadow-inner">
                    <PlayCircle className="w-7 h-7 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Apresentação Audiovisual</span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">Vídeo de Apresentação</h2>
                  </div>
                </div>
                <a
                  href="https://drive.google.com/file/d/1U_fa_XDp67cia95Q23zNsSyOyi8S4VHs/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all bg-[#C70000] shrink-0"
                >
                  <FileDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Baixar Guia (PDF)</span>
                </a>
              </div>
              
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-slate-50 bg-slate-900 group max-w-5xl mx-auto">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/7d14wVDEYyU"
                  title="Vídeo Tema CI"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.section>
          </div>

          {/* Sidebar: Directing Board (Mesa Diretora) */}
          <div className="lg:col-span-1 space-y-8 sticky top-8">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-slate-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative p-6 md:p-8"
            >
              {/* Accent top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#C70000] via-[#ED5757] to-[#C70000]"></div>
              
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-800">
                <div className="p-3 bg-[#C70000]/20 text-[#ED5757] rounded-2xl border border-[#ED5757]/30">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#ED5757] block">Equipe de Direção</span>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight">Mesa Diretora</h3>
                </div>
              </div>

              <div>
                <MemberCarousel members={mesaDiretora} isDark={true} accentColor="bg-[#ED5757]" />
              </div>
            </motion.section>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CI;
