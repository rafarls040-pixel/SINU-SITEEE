import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Users, PlayCircle, Quote, Fuel, FileDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import MemberCarousel, { Member } from '../components/MemberCarousel';
import StudyGuideSection from '../components/StudyGuideSection';

const OPEP: React.FC = () => {
  const mesaDiretora: Member[] = [
    { name: 'Joaquim Francisco', shift: '', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/to-opep/Joaquim+Francisco.png' },
    { name: 'Lorenna Gerodetti', shift: '', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/to-opep/Lorenna+Gerodetti.png' },
    { name: 'Victor Alexandre Lisauskas', shift: '', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/to-opep/Victor+Alexandre.png' },
    { name: 'Ana Vaiteka', shift: '', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/to-opep/Ana+Vaiteka.png' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-[#00FFFF] selection:text-black bg-slate-50/50">
      {/* Header/Hero Section */}
      <header className="relative py-16 md:py-24 overflow-hidden bg-[#002828]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#002828] via-[#004d4d] to-[#008b8b]"></div>
          <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-300 via-transparent to-transparent"></div>
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
            <div className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 shrink-0">
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-2xl -z-10"></div>
              <img 
                src="https://sinu-csl-site.s3.sa-east-1.amazonaws.com/to-opep/36.png" 
                alt="Logo OPEP+" 
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-cyan-200 font-bold tracking-widest uppercase text-xs">
                <span>Comitê Especial</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white drop-shadow-md tracking-tight leading-tight">
                OPEP+
              </h1>
              
              {/* Theme Callout Box */}
              <div className="bg-black/35 backdrop-blur-md border border-white/15 p-5 md:p-6 rounded-2xl shadow-2xl relative overflow-hidden text-left">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00FFFF]"></div>
                <div className="flex items-start gap-3">
                  <Quote className="w-6 h-6 text-cyan-300 shrink-0 mt-0.5 opacity-80" />
                  <div>
                    <span className="text-cyan-200 font-sans font-black text-[10px] uppercase tracking-[0.3em] block mb-1">Tema Oficial</span>
                    <p className="text-base sm:text-lg md:text-xl text-white font-serif font-bold leading-snug">
                      “Guerras regionais e disrupções nos recursos naturais: instrumentalização do petróleo na violação da soberania e da ordem internacional”
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
                  <div className="p-2.5 bg-[#008B8B] rounded-2xl text-white shadow-lg flex items-center justify-center shrink-0">
                    <Fuel className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan-300 block">Apresentação</span>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-md">Sobre o Comitê</h2>
                  </div>
                </div>
                
                <p className="text-white/95 leading-relaxed text-sm md:text-base text-justify font-medium drop-shadow-sm pt-2 border-t border-white/10">
                  A Organização dos Países Exportadores de Petróleo Plus (OPEP+) é uma aliança que inclui os membros da OPEP e outros grandes produtores de petróleo. Seu principal objetivo é coordenar e unificar as políticas petrolíferas de seus países membros para garantir a estabilização dos mercados de petróleo.
                </p>
              </div>
            </motion.section>

            {/* Sobre o Tema Card */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100 border-l-8 border-l-[#008B8B]"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-3 bg-[#008B8B]/10 rounded-2xl text-[#008B8B]">
                  <FileText className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Contexto e Objetivos</span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">Sobre o Tema</h2>
                </div>
              </div>
              
              <div className="space-y-4 text-slate-700 leading-relaxed text-sm md:text-base text-justify">
                <p className="font-normal">
                  Este tema aborda a complexa relação entre conflitos geopolíticos regionais e a segurança energética global. Em um cenário onde o petróleo não é apenas um recurso econômico, mas uma ferramenta de poder político, o comitê discutirá como crises em regiões produtoras podem levar à instrumentalização da oferta de energia. O debate focará nas consequências dessas disrupções para a soberania das nações, a estabilidade da ordem internacional e os desafios enfrentados pelos países exportadores e importadores diante de sanções, bloqueios e volatilidade extrema de preços.
                </p>
              </div>
            </motion.section>

            {/* Study Guide Section (Full Width) */}
            <StudyGuideSection 
              committeeId="opep" 
              committeeName="Organização dos Países Exportadores de Petróleo (OPEP+)" 
              accentColor="#008B8B" 
            />

            {/* Theme Video */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#008B8B]" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-[#008B8B]/10 rounded-2xl text-[#008B8B] shadow-inner">
                    <PlayCircle className="w-7 h-7 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-0.5">Apresentação Audiovisual</span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">Vídeo do Tema</h2>
                  </div>
                </div>
                <a
                  href="https://drive.google.com/file/d/19L-FN_T29BEpQ8m0N72bHcyc9tBWVmaR/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all bg-[#008B8B] shrink-0"
                >
                  <FileDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Baixar Guia (PDF)</span>
                </a>
              </div>
              
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-slate-50 bg-slate-900 group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10"></div>
                <iframe 
                  className="absolute top-0 left-0 w-full h-full z-0"
                  src="https://www.youtube.com/embed/EVLPOR7E7oQ"
                  title="Vídeo de Apresentação do Tema"
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
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#008B8B] via-cyan-400 to-[#008B8B]"></div>
              
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-800">
                <div className="p-3 bg-[#008B8B]/20 text-cyan-300 rounded-2xl border border-[#008B8B]/30">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 block">Equipe de Direção</span>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-tight">Mesa Diretora</h3>
                </div>
              </div>

              <div>
                <MemberCarousel members={mesaDiretora} isDark={true} accentColor="bg-[#008B8B]" />
              </div>
            </motion.section>
          </div>

        </div>
      </main>
    </div>
  );
};

export default OPEP;
