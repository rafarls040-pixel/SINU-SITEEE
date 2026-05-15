import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scale, ArrowLeft, FileText, Users, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import MemberCarousel, { Member } from '../components/MemberCarousel';

const CDH: React.FC = () => {
  const mesaDiretora: Member[] = [
    { name: 'Arthur Ferreira de André', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Arthur.png' },
    { name: 'Luigi Arêa Leão Morillas', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/fotos+das+mesas+comissao/Luigi.png' },
    { name: 'Giulia Borella Paschoalin', shift: 'Integral', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Giulia.png' },
    { name: 'Pyetra Vitoria Kumar', shift: 'Noturno', image: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/secretariado/Pyetra.png' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-[#D68821] selection:text-white">
      {/* Header/Hero Section */}
      <header className="relative py-16 md:py-32 overflow-hidden bg-[#D68821]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D68821] via-[#FFE714] to-[#D68821]"></div>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent"></div>
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
            <div className="flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 shrink-0 drop-shadow-2xl">
              <img 
                src="https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/CDH.png" 
                alt="Logo CDH" 
                className="w-full h-full object-contain"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <span className="text-[#FFE714] font-bold tracking-widest uppercase text-xs sm:text-sm">
                  Comitê
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-black text-white drop-shadow-lg mb-4">
                Conselho de Direitos Humanos
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-serif font-bold tracking-tight leading-tight uppercase">
                <span className="text-un-accent font-sans font-black text-[10px] uppercase tracking-[0.4em] block mb-2 opacity-90">Tema Oficial</span>
                “Limpeza Étnica na Ásia: detenção em massa, repressão Estatal e o colapso dos Direitos Humanos”
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
              className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-100 min-h-[300px] flex items-center"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://sinu-csl-site.s3.sa-east-1.amazonaws.com/fotos+das+mesas+comissao/Mesa+CDH.png" 
                  alt="Background Comissão" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/70"></div>
              </div>

              {/* Content with delayed appearance */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="relative z-10 p-6 md:p-10 w-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-white/10 rounded-lg text-white shadow-sm">
                    <Users className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-white drop-shadow-md">Sobre o Comitê</h2>
                </div>
                
                <div className="space-y-4 text-white leading-relaxed text-sm md:text-base text-justify drop-shadow-sm">
                  <p className="font-medium">
                    O Comitê de Direitos Humanos tem como objetivo a discussão de situações relacionadas à violação de direitos fundamentais. No âmbito do comitê, são analisados casos concretos e debatidas medidas voltadas à promoção, à proteção e à garantia dos direitos humanos no cenário internacional.
                  </p>
                </div>
              </motion.div>
            </motion.section>

            {/* Theme Content */}
            <div className="space-y-8">
              {/* Theme Text */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-slate-100 rounded-lg text-slate-700">
                    <FileText className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900">Sobre o Tema</h2>
                </div>
                
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base text-justify">
                  <p>
                    O tema "Limpeza Étnica na Ásia: detenção em massa, repressão Estatal e o colapso dos Direitos Humanos" propõe uma análise profunda e urgente sobre as sistemáticas violações de direitos fundamentais que ocorrem em diversas regiões do continente asiático. Os delegados serão desafiados a debater casos de perseguição a minorias, o uso de tecnologias de vigilância para controle social e a eficácia dos mecanismos internacionais de proteção aos direitos humanos diante da soberania estatal.
                  </p>
                </div>
              </motion.section>

              {/* Theme Video */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-3xl p-6 md:p-12 shadow-2xl border border-slate-100 overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-[#D68821]/10 rounded-xl text-[#D68821] shadow-inner">
                    <PlayCircle className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 tracking-tight">Vídeo do Tema</h2>
                    <p className="text-slate-500 text-[10px] md:text-sm font-medium">Assista à apresentação oficial do tema do CDH</p>
                  </div>
                </div>
                
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-50 bg-slate-900 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10"></div>
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full z-0"
                    src="https://www.youtube.com/embed/eugOEz2SusU"
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
                  src="https://www.youtube.com/embed/eugOEz2SusU"
                  title="Vídeo Tema CDH"
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
              className="bg-[#D68821]/90 rounded-2xl overflow-hidden border-t-4 border-[#FFE714] relative backdrop-blur-sm transition-all duration-300 group flex flex-col shadow-xl"
            >
              {/* Glow effect at top */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#FFE714]/20 to-transparent pointer-events-none"></div>

              <div className="p-5 flex flex-col relative z-10">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-white/10 text-[#FFE714] rounded-lg group-hover:bg-[#FFE714] group-hover:text-[#D68821] transition-all duration-300 shadow-sm">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-serif font-bold leading-tight transition-colors text-white group-hover:text-[#FFE714]">Mesa Diretora</h4>
                </div>
                
                <div>
                  <MemberCarousel members={mesaDiretora} isDark={true} accentColor="bg-[#FFE714]" />
                </div>
              </div>
            </motion.section>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CDH;
