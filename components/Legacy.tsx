import React, { useState, useRef, useEffect } from 'react';
import SinuLogo from './SinuLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Newspaper, Clapperboard, Star, ArrowRight, Play, ExternalLink, Image as ImageIcon, X, Download, FileText, ChevronRight, ChevronLeft, FolderOpen } from 'lucide-react';

// --- TIPOS DE DADOS ---
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
  },
  {
    title: "SINU - Senado Federal",
    duration: "Assista Agora",
    thumbnail: "https://img.youtube.com/vi/RDGZUmZP0vA/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=RDGZUmZP0vA"
  }
];

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

const VideosView: React.FC = () => {
  const featuredVideo = videosData[0];
  const otherVideos = videosData.slice(1);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-12"
    >
      {/* Featured Video */}
      <div className="w-full max-w-4xl mx-auto">
        <a 
          href={featuredVideo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block rounded-2xl overflow-hidden aspect-video shadow-2xl border border-white/10"
        >
          <img 
            src={featuredVideo.thumbnail} 
            alt={featuredVideo.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-un-dark via-transparent to-transparent opacity-80"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 bg-un-accent rounded-full flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            >
              <Play className="w-8 h-8 text-un-dark fill-current" />
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-un-accent text-un-dark text-[10px] font-bold uppercase rounded">Destaque</span>
              <span className="text-white/60 text-xs font-mono">{featuredVideo.duration}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white group-hover:text-un-accent transition-colors">
              {featuredVideo.title}
            </h3>
          </div>
        </a>
      </div>

      {/* Other Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {otherVideos.map((video, idx) => (
          <a 
            key={idx} 
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group cursor-pointer block"
          >
            <div className="relative rounded-xl overflow-hidden aspect-video mb-4 border border-white/10 shadow-lg">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" loading="lazy" decoding="async" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-un-accent/90 rounded-full flex items-center justify-center pl-1 shadow-lg transform group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-un-dark fill-current" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            <h4 className="text-white font-bold font-serif text-lg group-hover:text-un-accent transition-colors">
              {video.title}
            </h4>
            <p className="text-white/50 text-xs mt-1">Canal Oficial SINU</p>
          </a>
        ))}
      </div>
      
      <div className="text-center">
        <a href="https://www.youtube.com/@sinucsl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-white/5 hover:bg-un-accent hover:text-un-dark text-white rounded-full transition-all border border-white/10 font-bold">
          Explorar Canal no YouTube <ArrowRight className="w-4 h-4 ml-2" />
        </a>
      </div>
    </motion.div>
  );
};

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
          whileHover={{ y: -10 }}
          className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl cursor-pointer"
        >
          {/* Background Image with Zoom */}
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={gallery.image} 
              alt={gallery.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-60"
              loading="lazy"
              decoding="async"
            />
          </div>
          
          {/* Overlay Gradient - Dynamic */}
          <div className="absolute inset-0 bg-gradient-to-t from-un-dark via-un-dark/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
          
          {/* Content - Centered and Animated */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <motion.div 
              initial={{ opacity: 0.5, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              className="mb-6 p-4 rounded-full bg-white/5 backdrop-blur-md text-un-accent border border-white/10 group-hover:border-un-accent/50 transition-all duration-500"
            >
              <ImageIcon className="w-10 h-10" />
            </motion.div>
            
            <h4 className="text-4xl font-serif font-bold text-white mb-2 group-hover:text-un-accent transition-colors duration-500 tracking-tight">
              {gallery.title}
            </h4>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-un-accent/50"></div>
              <p className="text-un-accent font-mono text-sm uppercase tracking-[0.3em]">
                {gallery.year}
              </p>
              <div className="h-px w-6 bg-un-accent/50"></div>
            </div>
            
            <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest group-hover:bg-un-accent group-hover:text-un-dark group-hover:border-un-accent transition-all duration-500">
              <span>Acessar Álbum</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Technical Corner Accents */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 group-hover:border-un-accent transition-colors"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 group-hover:border-un-accent transition-colors"></div>
        </motion.a>
      ))}
    </motion.div>
  );
};

// --- COMPONENTE PRINCIPAL ---

const Legacy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'videos' | 'gallery'>('news');

  return (
    <section id="legado" className="py-24 bg-un-dark relative overflow-hidden text-white min-h-screen">
      {/* Atmospheric Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-un-blue/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-un-accent/5 rounded-full blur-[100px] pointer-events-none opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #fecc00 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      {/* Floating Decorative Icons */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] opacity-10 pointer-events-none hidden lg:block"
      >
        <History className="w-24 h-24 text-un-accent" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 right-[10%] opacity-10 pointer-events-none hidden lg:block"
      >
        <Newspaper className="w-32 h-32 text-un-blue" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6 md:mb-8 hover:scale-105 transition-transform duration-300 inline-block">
             <SinuLogo className="h-24 sm:h-28 md:h-32 w-auto object-contain" />
          </div>
          <h2 className="text-un-accent font-bold tracking-widest uppercase text-xs sm:text-sm mb-3">Nossa História & Mídia</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-xl">
            Legado SINU
          </h3>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12 md:mb-16 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          <div className="bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10 flex gap-1 min-w-max">
            
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