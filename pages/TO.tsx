import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swords, ArrowLeft, FileText, Users, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import MemberCarousel, { Member } from '../components/MemberCarousel';

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
    <div className="min-h-screen font-sans selection:bg-[#541a03] selection:text-white">
      {/* Header/Hero Section */}
      <header className="relative py-16 md:py-32 overflow-hidden bg-[#1a0505]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#330a0a] via-[#441005] to-[#541a03]"></div>
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#541a03]/30 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm transition-all duration-300 mb-8 text-xs sm:text-sm font-medium border border-white/20 hover:border-white/40 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o início
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center md:items-center gap-6 text-center md:text-left"
          >
            <div className="flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 shrink-0 drop-shadow-2xl">
              <img 
                src="https://sinu-csl-site.s3.sa-east-1.amazonaws.com/to-opep/37.png" 
                alt="Logo TO" 
                className="w-full h-full object-contain"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <span className="text-[#541a03] font-bold tracking-widest uppercase text-xs sm:text-sm">
                  Comitê
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-black text-white drop-shadow-lg mb-4">
                Teatro de Operações (TO)
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-serif font-bold tracking-tight leading-tight uppercase">
                <span className="text-un-accent font-sans font-black text-[10px] uppercase tracking-[0.4em] block mb-2 opacity-90">Tema Oficial</span>
                “Guerra das Coreias (1950-1953)”
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16 -mt-8 md:-mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: Theme and Description */}
          <div className="lg:col-span-2 space-y-8">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-100 min-h-[300px] flex items-center bg-slate-900"
            >
              <div className="relative z-10 p-8 md:p-10 w-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/10 rounded-lg text-white shadow-sm">
                    <Users className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white drop-shadow-md">Sobre o Comitê</h2>
                </div>
                
                <div className="space-y-4 text-white leading-relaxed text-justify drop-shadow-sm">
                  <p className="font-medium">
                    O Teatro de Operações (TO) é um comitê focado em simulações de crises militares e estratégicas em tempo real. Os delegados devem lidar com movimentações de tropas, inteligência e diplomacia sob pressão extrema para alcançar seus objetivos nacionais.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Theme Content */}
            <div className="space-y-8">
              {/* Theme Text */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900">Sobre o Tema</h2>
                </div>
                
                <div className="space-y-4 text-slate-600 leading-relaxed text-justify">
                  <p>
                    A simulação da Guerra das Coreias (1950-1953) transporta os delegados para um dos momentos mais críticos da Guerra Fria. No Teatro de Operações, os delegados enfrentarão o desafio de coordenar estratégias militares em terrenos difíceis, gerenciar alianças internacionais voláteis e tomar decisões táticas que podem alterar o curso da história, tudo isso enquanto lidam com a constante ameaça de uma escalada global.
                  </p>
                </div>
              </motion.section>

              {/* Theme Video */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-100 overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-[#541a03]/10 rounded-xl text-[#541a03] shadow-inner">
                    <PlayCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Vídeo do Tema</h2>
                    <p className="text-slate-500 text-sm font-medium">Assista à apresentação oficial do tema do Teatro de Operações</p>
                  </div>
                </div>
                
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-50 bg-slate-900 group">
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
            </div>

            {/* General Presentation Video Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
                  <PlayCircle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">Vídeo de Apresentação</h2>
              </div>
              
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-900">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/CLljMZzedcw"
                  title="Vídeo Tema TO"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.section>
          </div>

          {/* Sidebar: Directing Board (Mesa Diretora) */}
          <div className="lg:col-span-1 space-y-8">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#330a0a]/95 rounded-2xl overflow-hidden border-t-4 border-[#541a03] relative backdrop-blur-sm transition-all duration-300 group flex flex-col shadow-xl"
            >
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#541a03]/30 to-transparent pointer-events-none"></div>

              <div className="p-5 flex flex-col relative z-10">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-[#541a03]/20 text-[#541a03] rounded-lg group-hover:bg-[#541a03] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-serif font-bold leading-tight transition-colors text-white group-hover:text-[#541a03]">Mesa Diretora</h4>
                </div>
                
                <div>
                  <MemberCarousel members={mesaDiretora} isDark={true} accentColor="bg-[#541a03]" />
                </div>
              </div>
            </motion.section>
          </div>

        </div>
      </main>
    </div>
  );
};

export default TO;
