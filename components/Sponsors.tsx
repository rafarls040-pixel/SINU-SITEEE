import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Handshake, ChevronLeft, ChevronRight } from 'lucide-react';

interface Sponsor {
  name: string;
  logoUrl: string;
  websiteUrl: string;
}

const sponsors: Sponsor[] = [
  { 
    name: "Insper", 
    logoUrl: "https://sinu-csl-site.s3.sa-east-1.amazonaws.com/insper-logo-on-light.svg",
    websiteUrl: "https://www.insper.edu.br/pt/home"
  },
  { 
    name: "Instituto Capim Santo", 
    logoUrl: "https://sinu-csl-site.s3.sa-east-1.amazonaws.com/logo-green-300x151.png",
    websiteUrl: "https://institutocapimsanto.org.br/?gad_source=1&gad_campaignid=21005129464&gbraid=0AAAAAodwFnIor0P0HTReOJKswpVuaG552&gclid=CjwKCAiAkbbMBhB2EiwANbxtbdSdTl-rdj6d8ynemIk7LkmsY8-Tk1iKYBa1J6JzB_WCHMJT9ocFcRoC1Z8QAvD_BwE"
  },
  { 
    name: "IBMEC", 
    logoUrl: "https://cdn.portal.estacio.br/1_Desktop_ibmec_logo_430884bed1.svg",
    websiteUrl: "https://www.ibmec.br/"
  },
  { 
    name: "La Pastina", 
    logoUrl: "https://lapastinaio.vtexassets.com/assets/vtex.file-manager-graphql/images/22280e57-2c15-4a36-bb8d-ff5f6135f03f___67525e6c2d07a764553b9b369334a7db.svg",
    websiteUrl: "https://www.lapastina.com/?srsltid=AfmBOor88kVNA0xA_U6-mKYTFyQ4J7W56ZPEtx-_PAEtYPmXUkwxtP6C"
  },
  { 
    name: "Meeting Way", 
    logoUrl: "https://www.meetingway.com.br/wp-content/uploads/2023/03/logoMW350x100.png",
    websiteUrl: "https://www.meetingway.com.br/"
  },
  { 
    name: "Conservatório da Vila Mariana", 
    logoUrl: "https://cmvilamariana.com.br/site/wp-content/uploads/2020/01/logo-cm.png",
    websiteUrl: "https://cmvilamariana.com.br/"
  },
  { 
    name: "Rl Higiene", 
    logoUrl: "https://sinu-csl-site.s3.sa-east-1.amazonaws.com/logo-rl-header.png.webp",
    websiteUrl: "https://rl.com.br/"
  },
  { 
    name: "CARAM Advogados", 
    logoUrl: "https://sinu-csl-site.s3.sa-east-1.amazonaws.com/Logo-1-1.jpg",
    websiteUrl: "https://www.caramadvogados.com.br/"
  }
];

const Sponsors: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 para esquerda, 1 para direita
  const [isPaused, setIsPaused] = useState(false); // Controle para pausar o carrossel no hover

  // Ajusta número de itens por página baseado na largura da janela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize(); // Executa ao montar
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(sponsors.length / itemsPerPage);

  const nextPage = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (pageIndex: number) => {
    setDirection(pageIndex > currentPage ? 1 : -1);
    setCurrentPage(pageIndex);
  };

  // Reseta a página se o número de itens mudar (evita bug de página vazia)
  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);

  // Carrossel Automático
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextPage();
    }, 4000); // Muda a cada 4 segundos

    return () => clearInterval(interval);
  }, [currentPage, isPaused, totalPages]); // Dependências para reiniciar o timer corretamente

  // Itens visíveis na página atual
  const visibleSponsors = sponsors.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -20 : 20,
      opacity: 0
    })
  };

  return (
    <section id="parceiros" className="py-24 relative overflow-hidden select-none">
      {/* Background patterns with Gold Gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-un-dark via-un-accent to-un-blue"></div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fecc00 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-md mb-4 border border-un-accent/20">
            <Handshake className="w-6 h-6 text-un-accent" />
          </div>
          <h2 className="text-un-accent font-bold tracking-wide uppercase text-sm mb-2">Parceiros</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">Nossos Patrocinadores</h3>
          
          <p className="max-w-4xl mx-auto text-slate-600 text-lg leading-relaxed text-justify md:text-center">
            A <span className="text-un-accent font-bold">SINU XX</span> é mais do que uma simulação acadêmica. Trata-se de um projeto educacional que forma jovens críticos, engajados e preparados para debater os principais desafios do cenário global. Ao apoiar a SINU, sua instituição investe diretamente em educação de qualidade, protagonismo juvenil e impacto social, além de fortalecer sua marca junto a um público jovem, qualificado e altamente engajado. Acreditamos que transformar o futuro começa ao dar espaço para jovens que estão dispostos a dialogar de forma mais democrática e justa.
          </p>
        </motion.div>

        {/* CONTAINER DO CARROSSEL */}
        <div 
          className="relative max-w-6xl mx-auto px-8 md:px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Botão Anterior */}
          <button 
            onClick={prevPage}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-md text-un-dark hover:bg-un-accent hover:text-un-dark transition-all disabled:opacity-50 border border-slate-100"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Área dos Cards */}
          <div className="overflow-hidden min-h-[220px] flex items-center">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex justify-center w-full gap-6 md:gap-8"
              >
                {visibleSponsors.map((sponsor, idx) => (
                  <div
                    key={`${currentPage}-${idx}`}
                    className="flex-1 min-w-[260px] max-w-[350px]"
                  >
                    <a
                      href={sponsor.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-xl shadow-sm border border-slate-100 
                        flex items-center justify-center p-6 relative overflow-hidden group
                        transition-all duration-300 
                        hover:shadow-2xl hover:border-un-accent hover:scale-105
                        h-48 w-full cursor-pointer block"
                    >
                      {/* Efeito de brilho no hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-un-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <img 
                        src={sponsor.logoUrl} 
                        alt={`Logo ${sponsor.name}`}
                        className="max-h-24 max-w-[85%] w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                      />
                    </a>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Botão Próximo */}
          <button 
            onClick={nextPage}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white shadow-md text-un-dark hover:bg-un-accent hover:text-un-dark transition-all border border-slate-100"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>

        {/* Paginação (Dots) */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentPage === idx 
                  ? 'w-8 h-2.5 bg-un-accent shadow-[0_0_8px_rgba(212,175,55,0.6)]' 
                  : 'w-2.5 h-2.5 bg-slate-300 hover:bg-un-accent/50'
              }`}
              aria-label={`Ir para página ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Sponsors;