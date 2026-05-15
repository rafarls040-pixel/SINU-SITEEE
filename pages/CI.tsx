import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ArrowLeft, FileText, Users, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import MemberCarousel, { Member } from '../components/MemberCarousel';

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
    <div className="min-h-screen font-sans selection:bg-[#ED5757] selection:text-white">
      {/* Header/Hero Section */}
      <header className="relative py-16 md:py-32 overflow-hidden bg-[#C70000]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C70000] via-[#ED5757] to-[#C70000]"></div>
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
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
                src="https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/CI.png" 
                alt="Logo CI" 
                className="w-full h-full object-contain"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <span className="text-[#ED5757] font-bold tracking-widest uppercase text-xs sm:text-sm">
                  Comitê
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-black text-white drop-shadow-lg mb-4">
                Comitê de Imprensa
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-serif font-bold tracking-tight leading-tight uppercase">
                <span className="text-un-accent font-sans font-black text-[10px] uppercase tracking-[0.4em] block mb-2 opacity-90">Tema Oficial</span>
                COBERTURA DA SINU
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
                    O Comitê de Imprensa desempenha o papel de cobrir as sessões de todos os comitês, podendo fazer intervenções com questionamentos acerca do andamento e posicionamento das delegações. A partir disto, produz notícias, imagens, charges e conteúdo audiovisual que apontam os acontecimentos mais importantes da simulação, bem como outros conteúdos criativos, promovendo informação e integração entre todos.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Theme Content */}
            <div className="space-y-8">
              {/* Theme Video */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-100 overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-[#C70000]/5 rounded-xl text-[#ED5757] shadow-inner">
                    <PlayCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Vídeo de Apresentação</h2>
                    <p className="text-slate-500 text-sm font-medium">Assista à apresentação oficial do comitê de imprensa</p>
                  </div>
                </div>
                
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-50 bg-slate-900 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10"></div>
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full z-0"
                    src="https://www.youtube.com/embed/7d14wVDEYyU"
                    title="Vídeo Tema CI"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.section>
            </div>
          </div>

          {/* Sidebar: Directing Board (Mesa Diretora) */}
          <div className="lg:col-span-1 space-y-8">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#C70000]/90 rounded-2xl overflow-hidden border-t-4 border-[#ED5757] relative backdrop-blur-sm transition-all duration-300 group flex flex-col shadow-xl"
            >
              {/* Glow effect at top */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#ED5757]/20 to-transparent pointer-events-none"></div>

              <div className="p-5 flex flex-col relative z-10">
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-white/10 text-[#ED5757] rounded-lg group-hover:bg-[#ED5757] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-serif font-bold leading-tight transition-colors text-white group-hover:text-[#ED5757]">Mesa Diretora</h4>
                </div>
                
                <div>
                  <MemberCarousel members={mesaDiretora} isDark={true} accentColor="bg-[#ED5757]" />
                </div>
              </div>
            </motion.section>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CI;
