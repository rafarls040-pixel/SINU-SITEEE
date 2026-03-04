import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Newspaper, Clapperboard, Star, ArrowRight, Play, ExternalLink, Image as ImageIcon, X, Download, FileText, ChevronRight, ChevronLeft, FolderOpen } from 'lucide-react';

// --- TIPOS DE DADOS ---
interface TimelineEvent {
  title: string;
  year: string;
  description: string;
  isGrayscale?: boolean;
}

interface VideoItem {
  title: string;
  duration: string;
  thumbnail: string;
  url: string;
}

interface ArchiveDocument {
  title: string;
  url: string;
}

interface ArchiveItem {
  year: string;
  edition: string; // Roman numerals typically
  documents: ArchiveDocument[];
  isGrayscale?: boolean;
}

// --- DADOS ---
const timelineData: TimelineEvent[] = [
  {
    title: "SINU I",
    year: "2007",
    description: "Em 2007, a SINU realizou sua primeira edição com quatro comitês: Comissão de Desenvolvimento Sustentável, Conselho de Segurança, OMC e Imprensa. Desde o início, destacou-se como uma iniciativa inovadora ao promover o protagonismo estudantil na organização e participação do evento."
  },
  {
    title: "SINU XIV",
    year: "2020",
    description: "",
    isGrayscale: true
  },
  {
    title: "SINU XV",
    year: "2021",
    description: "Na edição de 2021, já era possível perceber um avanço significativo na dimensão do evento, com a criação de novos comitês, como o CDH e o CSH. Ao mesmo tempo, a SINU manteve sua tradição com comitês como o CSNU, a OMC e a Imprensa. Quinze anos após a primeira edição, o número de alunos engajados na organização e na participação cresceu expressivamente. Esse crescimento evidencia a relevância e o impacto da SINU ao longo dos anos."
  },
  {
    title: "SINU XVI",
    year: "2022",
    description: "Em 2022, a XVI SINU reuniu os comitês CI, CDH, UNIFEM, CSH, CSNU e OMC e inovou com a adoção do PNUMA, colocando o meio ambiente em evidência, ampliando o alcance e a relevância dos debates internacionais promovidos pelo evento."
  },
  {
    title: "SINU XVII",
    year: "2023",
    description: "Realizada em 2023, a XVII SINU reuniu os comitês CSNU, CI, OMC, PNUMA, CDH, UNIFEM e CSH, inovando com a adoção do TPI. A inclusão do comitê destacou a responsabilização penal individual no cenário do direito internacional."
  },
  {
    title: "SINU XVIII",
    year: "2024",
    description: "No ano de 2024, chegamos a XVIII SINU. Contando com CI, CDH, UNIFEM, CSH, CSNU, OMC e PNUMA, tivemos a criação do Senado Federal. Além disso, pela primeira vez tivemos conteúdos audiovisuais. Essas inovações deixaram um grande legado, impactando a experiência na simulação até hoje."
  },
  {
    title: "SINU XIX",
    year: "2025",
    description: "Em 2025, a XIX SINU reuniu os comitês CI, CDH, UNIFEM, CSH, CSNU, OMC e o Congresso Nacional, inovando ao substituir o Senado Federal e ao introduzir crises conjuntas, que ampliaram a integração entre os comitês e fortaleceram a relevância dos debates promovidos pelo evento."
  },
  {
    title: "SINU XX",
    year: "2026",
    description: "Neste ano, a XX SINU terá propostas ainda a serem reveladas, mas que reforçam o compromisso do evento com a excelência acadêmica, a integração entre os comitês e a relevância dos temas debatidos."
  }
];

const newspaperArchives: ArchiveItem[] = [
  { 
    year: '2025', 
    edition: 'XIX', 
    documents: [
      { title: 'Sábado - Edição 1', url: '#' },
      { title: 'Sábado - Edição 2', url: '#' },
      { title: 'Domingo - Edição 1', url: '#' },
      { title: 'Domingo - Edição 2', url: '#' }
    ]
  },
  { 
    year: '2024', 
    edition: 'XVIII', 
    documents: [
      { title: 'Sábado - Edição 1', url: 'https://drive.google.com/open?id=1Z8XbWLOa6RsJb0dBPN8iaEmdCzLTcZqY&usp=drive_copy' },
      { title: 'Sábado - Edição 2', url: 'https://drive.google.com/open?id=1_7WSBPfIwqs_bXdhjdd80J72q9Cz4MjG&usp=drive_copy' },
      { title: 'Domingo - Edição 1', url: 'https://drive.google.com/open?id=1Fpvj7Q4_2fa_kqCUlc5mTsnwdbw_6z_m&usp=drive_copy' },
      { title: 'Domingo - Edição 2', url: 'https://drive.google.com/open?id=1JF1VUxNtCTLCPJ_WmHFzO6nFl73p7l-e&usp=drive_copy' }
    ]
  },
  { 
    year: '2023', 
    edition: 'XVII', 
    documents: [
      { title: 'Sábado', url: 'https://drive.google.com/open?id=1kOyP0bgFQjqUWOzZHEOcazGR6zArASG9&usp=drive_copy' },
      { title: 'Domingo', url: 'https://drive.google.com/open?id=1wcfN3nJZcITCtdx-nZmCJ31WZTwTaMrO&usp=drive_copy' }
    ] 
  },
  { year: '2022', edition: 'XVI', documents: [{ title: 'Jornal Oficial', url: 'https://drive.google.com/open?id=1cfValxiIUTYdcEEQs8IH96LrrNIyZnbg&usp=drive_copy' }] },
  { year: '2021', edition: 'XV', documents: [{ title: 'Jornal Oficial', url: 'https://drive.google.com/open?id=1Sea83gqWjHHInp5T_n80OUVHes_BE8G_&usp=drive_copy' }] },
  { year: '2020', edition: 'XIV', documents: [], isGrayscale: true },
  { year: '2019', edition: 'XIII', documents: [{ title: 'Jornal Oficial', url: 'https://drive.google.com/open?id=1zhj15dKFyjDhE45otCfvxxdZToW6fHTE&usp=drive_copy' }] },
  { year: '2018', edition: 'XII', documents: [{ title: 'Jornal Oficial', url: 'https://drive.google.com/open?id=179aQO_rT1Wa5A2awmB1RGG-NCwPrbISO&usp=drive_copy' }] },
  { year: '2017', edition: 'XI', documents: [{ title: 'Jornal Oficial', url: 'https://drive.google.com/open?id=1wy3OwfNgQARnPzIr34YVzrD_XZyd7JLg&usp=drive_copy' }] },
  { year: '2016', edition: 'X', documents: [{ title: 'Jornal Oficial', url: 'https://drive.google.com/open?id=1GwbvXhmoqODQihh_xwaKMFyNWbxLc6Ev&usp=drive_copy' }] },
  { year: '2015', edition: 'IX', documents: [{ title: 'Jornal Oficial', url: 'https://drive.google.com/open?id=1Gcxlm9WchfrwptFSD0egoroqLcj7NGrb&usp=drive_copy' }] },
  { year: '2014', edition: 'VIII', documents: [{ title: 'Jornal Oficial', url: 'https://drive.google.com/open?id=1S1JcIxLQvfPavnmsZ0QuAEcpUm9FEmZK&usp=drive_copy' }] },
];

const videosData: VideoItem[] = [
  {
    title: "SINU - Vídeo Oficial",
    duration: "Assista Agora",
    thumbnail: "https://img.youtube.com/vi/oc3vMDVy9gg/hqdefault.jpg",
    url: "https://youtu.be/oc3vMDVy9gg"
  },
  {
    title: "SINU - Teaser Oficial",
    duration: "Assista Agora",
    thumbnail: "https://img.youtube.com/vi/qIa3C8dpbY4/hqdefault.jpg",
    url: "https://youtu.be/qIa3C8dpbY4"
  }
];

// --- SUB-COMPONENTES ---

const TimelineView: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;

    const scroll = () => {
      // Se não estiver pausado, move o scroll
      if (!isPaused && scrollContainer) {
        // Velocidade do scroll (0.8px por frame)
        scrollContainer.scrollLeft += 0.8;

        // Se chegou ao fim (com uma margem de erro pequena), volta pro começo
        // scrollWidth - clientWidth = máximo valor de scrollLeft
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 1) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Função para scroll manual
  const scrollManual = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350; // Largura do card + gap aproximado
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Botão Esquerdo */}
      <button 
        onClick={() => scrollManual('left')}
        className="absolute left-0 md:left-4 top-[55%] -translate-y-1/2 z-30 p-3 rounded-full bg-un-dark/60 border border-white/20 backdrop-blur-sm text-white hover:bg-un-accent hover:text-un-dark hover:scale-110 transition-all shadow-xl hidden md:flex"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Botão Direito */}
      <button 
        onClick={() => scrollManual('right')}
        className="absolute right-0 md:right-4 top-[55%] -translate-y-1/2 z-30 p-3 rounded-full bg-un-dark/60 border border-white/20 backdrop-blur-sm text-white hover:bg-un-accent hover:text-un-dark hover:scale-110 transition-all shadow-xl hidden md:flex"
        aria-label="Próximo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Container com scroll horizontal */}
      <div 
        ref={scrollRef}
        className="overflow-x-auto pb-12 pt-4 hide-scrollbar cursor-grab active:cursor-grabbing snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Esconde scrollbar nativa
      >
        <div className="flex px-4 md:px-12 gap-8 min-w-max relative items-start">
          
          {/* Linha Horizontal Conectora (Atrás do conteúdo) */}
          <div className="absolute top-[3rem] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-un-accent/50 to-transparent z-0"></div>

          {timelineData.map((item, index) => (
            <motion.div 
              key={index}
              className="relative flex flex-col items-center w-72 md:w-80 shrink-0 group snap-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              
              {/* Ano (Badge) - Topo */}
              <div className="z-10 mb-6">
                <span className={`font-bold tracking-widest uppercase text-sm px-4 py-1.5 rounded-full border shadow-lg transition-all duration-300 ${
                  item.isGrayscale 
                  ? 'text-slate-400 bg-slate-800 border-slate-600' 
                  : 'text-un-dark bg-un-accent border-un-accent group-hover:bg-white group-hover:text-un-dark'
                }`}>
                  {item.year}
                </span>
              </div>

              {/* Marcador (Bolinha) - Meio, sobre a linha */}
              <div className="absolute top-[3rem] -translate-y-1/2 z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                  item.isGrayscale 
                  ? 'bg-slate-700 border-slate-500 shadow-none' 
                  : 'bg-un-dark border-un-accent shadow-[0_0_15px_rgba(212,175,55,0.6)] group-hover:scale-125 group-hover:bg-un-accent group-hover:border-white'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${item.isGrayscale ? 'bg-slate-400' : 'bg-white group-hover:bg-un-dark'}`}></div>
                </div>
              </div>

              {/* Card de Conteúdo - Baixo */}
              <div className={`mt-8 w-full bg-white/5 backdrop-blur-sm border p-6 rounded-2xl transition-all duration-300 h-full flex flex-col items-center text-center ${
                item.isGrayscale 
                ? 'border-slate-700 grayscale' 
                : 'border-white/10 hover:border-un-accent/50 hover:bg-white/10 hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]'
              }`}>
                <h4 className={`text-xl font-serif font-bold ${item.description ? 'mb-3' : 'mb-0'} transition-colors ${
                  item.isGrayscale 
                  ? 'text-slate-400' 
                  : 'text-white group-hover:text-un-accent'
                }`}>
                  {item.title.includes('SINU XX') && !item.isGrayscale ? (
                    <>
                      {item.title.split('SINU XX').map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="text-un-accent font-extrabold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">SINU XX</span>
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  ) : item.title}
                </h4>
                {item.description && (
                  <p className={`leading-relaxed text-sm ${
                    item.isGrayscale ? 'text-slate-500' : 'text-white/70'
                  }`}>
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Indicador de scroll para UX (apenas mobile quando não está em hover) */}
      {!isPaused && (
        <div className="flex justify-center mt-2 text-white/30 text-xs animate-pulse md:hidden transition-opacity">
           <span className="flex items-center gap-2"><ArrowRight className="w-4 h-4" /> Toque para pausar</span>
        </div>
      )}

      <div className="flex justify-center mt-8">
          <div className="bg-un-accent text-un-dark px-6 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg text-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>O Futuro Continua</span>
          </div>
      </div>
    </div>
  );
};

const NewsView: React.FC = () => {
  const [selectedArchive, setSelectedArchive] = useState<ArchiveItem | null>(null);

  const handleArchiveClick = (archive: ArchiveItem) => {
    if (archive.documents.length === 1) {
      window.open(archive.documents[0].url, '_blank');
    } else {
      setSelectedArchive(archive);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-12"
      >
        {/* Arquivo de Jornais */}
        <div className="">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-4 border border-white/10">
              <FolderOpen className="w-6 h-6 text-un-accent" />
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">Acervo Digital</h3>
            <p className="text-white/60">Explore a cobertura jornalística das edições passadas.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          >
            {newspaperArchives.map((archive, idx) => {
              const isInteractive = archive.documents.length > 0;
              return (
                <motion.button
                  key={idx}
                  variants={itemVariants}
                  onClick={() => isInteractive && handleArchiveClick(archive)}
                  disabled={!isInteractive}
                  className={`group relative rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all duration-300 w-full aspect-[3/4] overflow-hidden
                    ${isInteractive 
                      ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-un-accent/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:-translate-y-2 cursor-pointer' 
                      : 'bg-slate-800/50 border border-white/5 opacity-50 cursor-not-allowed grayscale'
                    }
                  `}
                >
                  {/* Decorative Background Icon */}
                  <Newspaper className={`absolute -bottom-4 -right-4 w-32 h-32 opacity-5 pointer-events-none transform rotate-[-15deg] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-0 ${isInteractive ? 'text-white' : 'text-slate-500'}`} />
                  
                  {/* Header: Edition Info */}
                  <div className="w-full flex flex-col items-center relative z-10">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-un-accent uppercase mb-1">
                      Edição {archive.edition}
                    </span>
                    <div className="h-px w-8 bg-white/20 mb-2 group-hover:w-16 transition-all duration-500"></div>
                  </div>

                  {/* Body: Year */}
                  <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
                     <span className={`text-4xl md:text-5xl font-serif font-bold transition-all duration-300 ${isInteractive ? 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-un-accent' : 'text-slate-600'}`}>
                       {archive.year}
                     </span>
                  </div>
                  
                  {/* Footer: Status / Download */}
                  <div className="relative z-10 w-full mt-auto h-8 flex items-center justify-center">
                    {isInteractive ? (
                      <div className="flex items-center gap-2 text-xs font-medium text-white/60 group-hover:text-un-accent transition-colors">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                          {archive.documents.length} {archive.documents.length === 1 ? 'Arquivo' : 'Arquivos'}
                        </span>
                        <Download className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100" />
                      </div>
                    ) : (
                      <span className="text-[10px] text-white/20 uppercase tracking-widest">Indisponível</span>
                    )}
                  </div>

                  {/* Glow Effect on Hover */}
                  {isInteractive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-un-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Modal de Seleção de Jornal */}
      <AnimatePresence>
        {selectedArchive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedArchive(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedArchive(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="inline-block p-3 rounded-full bg-un-accent/10 text-un-accent mb-3">
                  <Newspaper className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-white mb-1">Arquivos de {selectedArchive.year}</h4>
                <p className="text-white/60 text-sm">Selecione uma edição para visualizar</p>
              </div>

              <div className="space-y-3">
                {selectedArchive.documents.map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-un-accent/30 rounded-xl transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-un-dark rounded-lg group-hover:bg-un-accent group-hover:text-un-dark transition-colors text-white shadow-lg">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="text-white font-medium group-hover:text-white/90 transition-colors">{doc.title}</span>
                    </div>
                    <div className="flex items-center text-white/30 group-hover:text-un-accent transition-colors">
                      <span className="text-xs mr-2 opacity-0 group-hover:opacity-100 transition-opacity">Ler</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const VideosView: React.FC = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="grid md:grid-cols-3 gap-6"
  >
    {videosData.map((video, idx) => (
      <a 
        key={idx} 
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group cursor-pointer block"
      >
        <div className="relative rounded-xl overflow-hidden aspect-video mb-4 border border-white/10 shadow-lg">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-un-accent/90 rounded-full flex items-center justify-center pl-1 shadow-lg transform group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-un-dark fill-current" />
            </div>
          </div>
          <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
        <h3 className="text-white font-bold font-serif text-lg group-hover:text-un-accent transition-colors">
          {video.title}
        </h3>
        <p className="text-white/50 text-sm mt-1">Canal Oficial SINU</p>
      </a>
    ))}
    
    <div className="col-span-full text-center mt-8">
      <a href="https://www.youtube.com/@sinucsl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 border border-white/20 hover:border-un-accent hover:text-un-accent text-white rounded-full transition-all">
        Ver canal completo no YouTube <ArrowRight className="w-4 h-4 ml-2" />
      </a>
    </div>
  </motion.div>
);

const GalleryView: React.FC = () => {
  const galleries = [
    {
      title: "SINU XIX",
      year: "2025",
      url: "https://saoluisacojeorg-my.sharepoint.com/:f:/g/personal/bruno_saba_saoluis_org/IgBx431zLemQQ6UqgNpN8ifJASYXD6nkVvCLrVEe01Dcmrc?e=1Dibil",
      image: "https://sinu-csl-site.s3.sa-east-1.amazonaws.com/LEGACYY/6a8985ec-3398-465b-9164-acc7cf1bb944.jpg"
    },
    {
      title: "SINU XVIII",
      year: "2024",
      url: "https://saoluisacojeorg.sharepoint.com/:f:/s/comissao.sinu/IgDlMK549H7zQ64iX1ZraGrdAVsUTGFz4y6jh6ggwVz6OxQ?e=TFIMoU",
      image: "https://sinu-csl-site.s3.sa-east-1.amazonaws.com/LEGACYY/ffada29f-35a6-440f-adef-26452e4419ad.jpg"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
    >
      {galleries.map((gallery, idx) => (
        <motion.a
          key={idx}
          href={gallery.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, y: -5 }}
          className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group shadow-2xl cursor-pointer"
        >
          {/* Background Image */}
          <img 
            src={gallery.image} 
            alt={gallery.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-un-dark via-un-dark/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 p-3 rounded-full bg-un-accent/20 text-un-accent border border-un-accent/30 transform group-hover:scale-110 transition-transform">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h4 className="text-3xl font-serif font-bold text-white mb-1 group-hover:text-un-accent transition-colors">
              {gallery.title}
            </h4>
            <p className="text-un-accent font-bold tracking-widest text-sm uppercase opacity-80">
              Edição {gallery.year}
            </p>
            
            <div className="mt-6 flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
              <span>Ver Álbum Completo</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>

          {/* Border Glow */}
          <div className="absolute inset-0 border-2 border-un-accent/0 group-hover:border-un-accent/30 transition-colors rounded-2xl"></div>
        </motion.a>
      ))}
    </motion.div>
  );
};

// --- COMPONENTE PRINCIPAL ---

const Legacy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'news' | 'videos' | 'gallery'>('timeline');

  return (
    <section id="legado" className="py-24 bg-un-dark relative overflow-hidden text-white min-h-screen">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-un-blue/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-un-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-8 hover:scale-105 transition-transform duration-300 inline-block">
             <img 
              src="https://sinu-csl-site.s3.sa-east-1.amazonaws.com/BRAINSTORMING+SINU+(2).png" 
              alt="SINU Legacy Logo" 
              className="h-32 w-auto object-contain"
            />
          </div>
          <h2 className="text-un-accent font-bold tracking-widest uppercase text-sm mb-3">Nossa História & Mídia</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-xl">
            Legado SINU
          </h3>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-16 overflow-x-auto pb-4 md:pb-0">
          <div className="bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10 flex gap-1 min-w-max">
            
            <button
              onClick={() => setActiveTab('timeline')}
              className={`relative px-4 md:px-6 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${
                activeTab === 'timeline' ? 'text-un-dark' : 'text-white/60 hover:text-white'
              }`}
            >
              {activeTab === 'timeline' && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-un-accent rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2"><History className="w-4 h-4" /> <span className="hidden md:inline">Linha do Tempo</span></span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`relative px-4 md:px-6 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${
                activeTab === 'news' ? 'text-un-dark' : 'text-white/60 hover:text-white'
              }`}
            >
              {activeTab === 'news' && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-un-accent rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2"><Newspaper className="w-4 h-4" /> <span className="hidden md:inline">Notícias</span></span>
            </button>

            <button
              onClick={() => setActiveTab('videos')}
              className={`relative px-4 md:px-6 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${
                activeTab === 'videos' ? 'text-un-dark' : 'text-white/60 hover:text-white'
              }`}
            >
              {activeTab === 'videos' && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-un-accent rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2"><Clapperboard className="w-4 h-4" /> <span className="hidden md:inline">Vídeos</span></span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`relative px-4 md:px-6 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${
                activeTab === 'gallery' ? 'text-un-dark' : 'text-white/60 hover:text-white'
              }`}
            >
              {activeTab === 'gallery' && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-un-accent rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2"><ImageIcon className="w-4 h-4" /> <span className="hidden md:inline">Galeria</span></span>
            </button>

          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <TimelineView />
              </motion.div>
            )}

            {activeTab === 'news' && (
              <motion.div
                key="news"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <NewsView />
              </motion.div>
            )}

            {activeTab === 'videos' && (
              <motion.div
                key="videos"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <VideosView />
              </motion.div>
            )}

            {activeTab === 'gallery' && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <GalleryView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Legacy;