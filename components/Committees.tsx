import React, { useState } from 'react';
import { Committee } from '../types';
import { Gavel, ShieldAlert, HeartPulse, Scale, FileDown, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const committeesList: Committee[] = [
  {
    id: 'unsc',
    name: 'Conselho de Segurança',
    topic: 'A Ciberguerra e a Soberania Digital',
    level: 'Avançado',
    iconName: 'ShieldAlert',
    description: 'O órgão máximo da ONU. Debate crisis em tempo real, exigindo respostas rápidas e resoluções mandatórias.',
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", // Cibersegurança
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800", // Matrix code
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800", // Reunião séria
      "https://images.unsplash.com/photo-1629809977873-195c64360e2c?auto=format&fit=crop&q=80&w=800"  // Servidores
    ],
    guideUrl: 'https://s3.amazonaws.com/sinu-public-assets/guias/2026/guia-unsc.pdf'
  },
  {
    id: 'who',
    name: 'OMS',
    topic: 'Saúde Mental em Zonas de Conflito',
    level: 'Intermediário',
    iconName: 'HeartPulse',
    description: 'A Organização Mundial da Saúde busca estabelecer protocolos para proteção psicológica de refugiados.',
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800", // Médicos
      "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=800", // Ajuda humanitária
      "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&q=80&w=800", // Refugiados/Tenda
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800"  // Estetoscópio/Saúde
    ],
    guideUrl: 'https://s3.amazonaws.com/sinu-public-assets/guias/2026/guia-oms.pdf'
  },
  {
    id: 'unhrc',
    name: 'CDH',
    topic: 'Direitos Humanos e Inteligência Artificial',
    level: 'Iniciante',
    iconName: 'Scale',
    description: 'O Conselho de Direitos Humanos debate os limites éticos do uso de IA em vigilância governamental.',
    images: [
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800", // Tecnologia IA
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800", // Balança Justiça
      "https://images.unsplash.com/photo-1531297461136-82lw427663e0?auto=format&fit=crop&q=80&w=800", // Robô humanoide
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"  // Mãos escrevendo/Documentos
    ],
  },
  {
    id: 'historic',
    name: 'Comitê Histórico',
    topic: 'A Crise dos Mísseis de Cuba (1962)',
    level: 'Avançado',
    iconName: 'Gavel',
    description: 'Reescreva a história. Evite (ou inicie) a Terceira Guerra Mundial neste comitê de crise intensa.',
    images: [
      "https://images.unsplash.com/photo-1528669826296-dbd6f641707d?auto=format&fit=crop&q=80&w=800", // Preto e branco estilo antigo
      "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=800", // Míssil/Foguete
      "https://images.unsplash.com/photo-1532153955177-f59af40d6472?auto=format&fit=crop&q=80&w=800", // Bandeira Cuba/EUA vibe
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800"  // Mapa antigo
    ],
    guideUrl: 'https://s3.amazonaws.com/sinu-public-assets/guias/2026/guia-historico.pdf'
  }
];

const getIcon = (name: string) => {
  switch (name) {
    case 'ShieldAlert': return <ShieldAlert className="w-8 h-8" />;
    case 'HeartPulse': return <HeartPulse className="w-8 h-8" />;
    case 'Scale': return <Scale className="w-8 h-8" />;
    default: return <Gavel className="w-8 h-8" />;
  }
};

const CommitteeCard: React.FC<{ committee: Committee; index: number }> = ({ committee, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % committee.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + committee.images.length) % committee.images.length);
  };

  const goToImage = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(idx);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col border border-white/10 h-full"
    >
      {/* Image Carousel Header */}
      <div className="relative h-48 w-full overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={committee.images[currentImageIndex]}
            alt={`${committee.name} image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-white/90 text-white hover:text-slate-900 p-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-white/90 text-white hover:text-slate-900 p-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Level Badge - Posicionado sobre a imagem agora */}
        <div className="absolute top-4 right-4">
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md
            ${committee.level === 'Avançado' ? 'bg-red-500/90 text-white' : 
              committee.level === 'Intermediário' ? 'bg-yellow-500/90 text-white' : 
              'bg-green-500/90 text-white'}`}>
            {committee.level}
          </span>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {committee.images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => goToImage(e, idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 lg:p-8 flex-grow flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-un-blue bg-un-blue/10 p-2.5 rounded-xl">
            {getIcon(committee.iconName)}
          </div>
          <h4 className="text-xl font-bold text-slate-900 leading-tight">{committee.name}</h4>
        </div>
        
        <div className="mb-4">
          <p className="text-xs font-bold text-un-blue uppercase tracking-wider mb-1">Tópico</p>
          <p className="text-sm font-semibold text-slate-800 leading-snug">{committee.topic}</p>
        </div>
        
        <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">{committee.description}</p>
        
        <div className="pt-4 border-t border-slate-100 mt-auto">
          {committee.guideUrl ? (
            <a 
              href={committee.guideUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-un-blue/5 text-un-blue hover:bg-un-blue hover:text-white rounded-lg text-sm font-bold transition-all duration-300 group"
            >
              <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              Baixar Guia
            </a>
          ) : (
            <span className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-400 rounded-lg text-sm font-medium cursor-not-allowed">
              <ExternalLink className="w-4 h-4" />
              Guia em breve
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Committees: React.FC = () => {
  return (
    <section id="comites" className="py-24 bg-un-dark relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-un-blue/20 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-un-accent/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge styled container for better contrast */}
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
             <h2 className="text-white font-bold tracking-wide uppercase text-sm">Os Comitês</h2>
          </span>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-lg">Escolha o seu campo de batalha</h3>
          <p className="mt-4 text-slate-100 max-w-2xl mx-auto drop-shadow-md font-medium">
            Da diplomacia clássica às crises históricas, oferecemos comitês para todos os níveis de experiência.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-10">
          {committeesList.map((committee, idx) => (
            <CommitteeCard key={committee.id} committee={committee} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Committees;