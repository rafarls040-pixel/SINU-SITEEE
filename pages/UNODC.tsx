import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Users, PlayCircle, Quote, FileDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import MemberCarousel, { Member } from '../components/MemberCarousel';
import StudyGuideSection from '../components/StudyGuideSection';

const UNODC: React.FC = () => {
  const mesaDiretora: Member[] = [
    { name: 'Bethânia Labate Mellis', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Bethania.png' },
    { name: 'Felipe Gonçalves Hungria', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/fotos+das+mesas+comissao/Felipe+Hungria.png' },
    { name: 'Flávia Souto Muliterno', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/fotos+das+mesas+comissao/Flavia.png' },
    { name: 'Rafael Souza Santos', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Rafael.png' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-[#4c4c4c] selection:text-white bg-slate-50/50">
      {/* Header/Hero Section */}
      <header className="relative py-8 sm:py-16 md:py-24 overflow-hidden bg-[#18181b]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#18181b] via-[#27272a] to-[#09090b]"></div>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
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
              <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl -z-10"></div>
              <img 
                src="https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/UNODC.png" 
                alt="Logo UNODC" 
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <div className="flex-1 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-zinc-300 font-bold tracking-widest uppercase text-[10px] sm:text-xs">
                <span>Comitê Oficial</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white drop-shadow-md tracking-tight leading-tight">
                Escritório das Nações Unidas sobre Drogas e Crime
              </h1>
              
              {/* Theme Callout Box */}
              <div className="bg-black/35 backdrop-blur-md border border-white/15 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-2xl relative overflow-hidden text-left">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#71717a]"></div>
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400 shrink-0 mt-0.5 opacity-80" />
                  <div>
                    <span className="text-zinc-300 font-sans font-black text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] block mb-1">Tema Oficial</span>
                    <p className="text-sm sm:text-lg md:text-xl text-white font-serif font-bold leading-snug">
                      “Expansão da metanfetamina no Sudeste Asiático e Oceania”
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
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 min-h-[240px] sm:min-h-[280px] flex items-center group"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src="https://sinu-csl-site.s3.sa-east-1.amazonaws.com/fotos+das+mesas+comissao/Design+sem+nome.png" 
                  alt="Background Comissão" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-5 sm:p-8 md:p-10 w-full space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-2.5 bg-zinc-700 rounded-xl sm:rounded-2xl text-white shadow-lg flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-300 block">Apresentação</span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md">Sobre o Comitê</h2>
                  </div>
                </div>
                
                <p className="text-white/95 leading-relaxed text-xs sm:text-sm md:text-base text-justify font-medium drop-shadow-sm pt-2 border-t border-white/10">
                  O Escritório das Nações Unidas sobre Drogas e Crime tem como missão apoiar os países no combate ao crime organizado, ao tráfico de drogas, à corrupção, ao terrorismo e ao tráfico de pessoas, oferecendo assistência técnica e promovendo políticas públicas voltadas para a segurança, a justiça criminal e a saúde. Além disso, incentiva a cooperação internacional para enfrentar crimes que ultrapassam fronteiras.
                </p>
              </div>
            </motion.section>

            {/* Sobre o Tema Card */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl border border-slate-100 border-l-6 sm:border-l-8 border-l-zinc-700"
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-100">
                <div className="p-2.5 sm:p-3 bg-zinc-100 rounded-xl sm:rounded-2xl text-zinc-700">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Contexto e Objetivos</span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-slate-900">Sobre o Tema</h2>
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4 text-slate-700 leading-relaxed text-xs sm:text-sm md:text-base text-justify">
                <p className="font-normal">
                  O tema "Expansão da metanfetamina no Sudeste Asiático e Oceania" analisa o crescimento alarmante da produção e do tráfico de drogas sintéticas nessas regiões. O comitê debaterá as rotas do tráfico, o papel do crime organizado transnacional, os impactos na saúde pública e a necessidade de cooperação internacional fortalecida para conter essa crise que desafia as autoridades de segurança e justiça criminal.
                </p>
              </div>
            </motion.section>

            {/* Study Guide Section (Full Width) */}
            <StudyGuideSection 
              committeeId="unodc" 
              committeeName="Escritório das Nações Unidas sobre Drogas e Crime" 
              accentColor="#4c4c4c" 
            />

            {/* Theme Video */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl border border-slate-100 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-zinc-700" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3.5 bg-zinc-100 rounded-xl sm:rounded-2xl text-zinc-800 shadow-inner">
                    <PlayCircle className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Apresentação Audiovisual</span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-slate-900 tracking-tight">Vídeo do Tema</h2>
                  </div>
                </div>
                <a
                  href="https://drive.google.com/file/d/1Ul1bZTwj_bMnavgFGd5SFK8SVF0NbZ8d/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all bg-zinc-800 shrink-0 self-start sm:self-auto"
                >
                  <FileDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:w-5 sm:h-5" />
                  <span>Baixar Guia (PDF)</span>
                </a>
              </div>
              
              <div className="relative aspect-video rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 md:border-8 border-slate-50 bg-slate-900 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10"></div>
                <iframe 
                  className="absolute top-0 left-0 w-full h-full z-0"
                  src="https://www.youtube.com/embed/KVUfvbcnANI"
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
                  src="https://www.youtube.com/embed/RAo8yWOQ2jE"
                  title="Vídeo Apresentação UNODC"
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
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-zinc-600 via-zinc-400 to-zinc-600"></div>
              
              <div className="flex items-center gap-3 sm:gap-3.5 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-800">
                <div className="p-2.5 sm:p-3 bg-zinc-800 text-zinc-300 rounded-xl sm:rounded-2xl border border-zinc-700">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-400 block">Equipe de Direção</span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white tracking-tight">Mesa Diretora</h3>
                </div>
              </div>

              <div>
                <MemberCarousel members={mesaDiretora} isDark={true} accentColor="bg-zinc-600" />
              </div>
            </motion.section>
          </div>

        </div>
      </main>
    </div>
  );
};

export default UNODC;
