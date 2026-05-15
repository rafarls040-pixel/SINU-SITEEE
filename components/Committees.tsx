import React, { useState } from 'react';
import { Committee } from '../types';
import { Gavel, ShieldAlert, HeartPulse, Scale, FileDown, ExternalLink, ChevronLeft, ChevronRight, Landmark, Shield, Leaf, Users, Newspaper, Fuel, Swords } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const committeesList: Committee[] = [
  {
    id: 'unsc',
    name: 'CSNU',
    topic: '“O Corolário Trump” à Doutrina Monroe: segurança, intervencionismo e soberania na América Latina”',
    iconName: 'ShieldAlert',
    logoUrl: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/CSNU.png',
    description: 'O Conselho de Segurança das Nações Unidas é responsável por buscar a paz e a segurança internacional, atuando na prevenção e mediação de conflitos. Podendo impor sanções econômicas e diplomáticas, autorizar operações de manutenção da paz e, quando necessário, aprovar intervenções militares, o Conselho também recomenda a admissão de novos membros na ONU e participa da escolha do Secretário-Geral.',
    gradientFrom: '#B80707',
    gradientTo: '#ef4444',
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1629809977873-195c64360e2c?auto=format&fit=crop&q=80&w=800"
    ],
    pageUrl: '/comite/csnu'
  },
  {
    id: 'historic',
    name: 'CSH',
    topic: '“Crise dos Misseis de Cuba: em iminência de uma guerra nuclear” (14 – 28 de outubro 1962)',
    iconName: 'Gavel',
    logoUrl: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/CSH.png',
    description: 'O Conselho de Segurança Histórico tem por finalidade a simulação de sessões do Conselho de Segurança das Nações Unidas em contextos históricos determinados. O comitê possibilita a análise de cenários políticos e estratégicos do período simulado, promovendo o debate e a tomada de decisões conforme as condições e limitações próprias do momento histórico em questão.',
    gradientFrom: '#602A04',
    gradientTo: '#FF7B01',
    images: [
      "https://images.unsplash.com/photo-1528669826296-dbd6f641707d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1605152276897-4f618f831968?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1532153955177-f59af40d6472?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800"
    ],
    pageUrl: '/comite/historico'
  },
  {
    id: 'unodc',
    name: 'UNODC',
    topic: '“Expansão da metanfetamina no Sudeste Asiático e Oceania”',
    iconName: 'Shield',
    logoUrl: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/UNODC.png',
    description: 'O Escritório das Nações Unidas sobre Drogas e Crime tem como missão apoiar os países no combate ao crime organizado, ao tráfico de drogas, à corrupção, ao terrorismo e ao tráfico de pessoas, oferecendo assistência técnica e promovendo políticas públicas voltadas para a segurança, a justiça criminal e a saúde. Além disso, incentiva a cooperação internacional para enfrentar crimes que ultrapassam fronteiras.',
    gradientFrom: '#000000',
    gradientTo: '#4c4c4c',
    images: [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1453873531674-2151bcd01707?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1563240619-44ce027c8aaf?auto=format&fit=crop&q=80&w=800"
    ],
    pageUrl: '/comite/unodc'
  },
  {
    id: 'unhrc',
    name: 'CDH',
    topic: '“Limpeza Étnica na Ásia: detenção em massa, repressão Estatal e o colapso dos Direitos Humanos”',
    iconName: 'Scale',
    logoUrl: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/CDH.png',
    description: 'O Comitê de Direitos Humanos tem como objetivo a discussão de situações relacionadas à violação de direitos fundamentais. No âmbito do comitê, são analisados casos concretos e debatidas medidas voltadas à promoção, à proteção e à garantia dos direitos humanos no cenário internacional.',
    gradientFrom: '#D68821',
    gradientTo: '#FFE714',
    images: [
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1531297461136-82lw427663e0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800"
    ],
    pageUrl: '/comite/cdh'
  },
  {
    id: 'unifem',
    name: 'UNIFEM',
    topic: '“Entre Armas e Direitos: A Realidade das Mulheres diante das Intervenções Militares no Sahel”',
    iconName: 'Users',
    logoUrl: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/UNIFEM.png',
    description: 'O UNIFEM é responsável pela discussão de políticas e ações internacionais voltadas à promoção da igualdade de gênero. O comitê debate estratégias para o fortalecimento dos direitos das mulheres, o enfrentamento das desigualdades estruturais e a ampliação da participação feminina em espaços de decisão.',
    gradientFrom: '#420076',
    gradientTo: '#8609c0',
    images: [
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
    ],
    pageUrl: '/comite/unifem'
  },
  {
    id: 'to',
    name: 'TO',
    topic: '“Guerra das Coreias (1950-1953)”',
    iconName: 'Swords',
    logoUrl: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/to-opep/37.png',
    description: 'O Teatro de Operações (TO) é um comitê focado em simulações de crises militares e estratégicas em tempo real. Os delegados devem lidar com movimentações de tropas, inteligência e diplomacia sob pressão extrema para alcançar seus objetivos nacionais.',
    gradientFrom: '#330a0a',
    gradientTo: '#541a03',
    images: [
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1579933334615-03984d7f4e82?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1590086782792-42dd2350140d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1526510747491-58f928ec870f?auto=format&fit=crop&q=80&w=800"
    ],
    pageUrl: '/comite/to'
  },
  {
    id: 'pnuma',
    name: 'PNUMA',
    topic: '“Neocolonialismo verde na América Latina e a transição energética: justiça climática, exploração de recursos e desigualdade ambiental”',
    iconName: 'Leaf',
    logoUrl: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/PNUMA.png',
    description: 'O Programa das Nações Unidas para o Meio Ambiente tem por finalidade o debate de questões ambientais de caráter global. O comitê discute políticas ambientais, negocia compromissos multilaterais e propõe medidas voltadas à proteção do meio ambiente e à promoção do desenvolvimento sustentável.',
    gradientFrom: '#226214',
    gradientTo: '#43CC25',
    images: [
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800"
    ],
    pageUrl: '/comite/pnuma'
  },
  {
    id: 'opep',
    name: 'OPEP+',
    topic: '“Guerras regionais e disrupções nos recursos naturais: instrumentalização do petróleo na violação da soberania e da ordem internacional”',
    iconName: 'Fuel',
    logoUrl: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/to-opep/36.png',
    description: 'A Organização dos Países Exportadores de Petróleo Plus (OPEP+) é uma aliança que inclui os membros da OPEP e Commission outros grandes produtores de petróleo. Seu principal objetivo é coordenar e unificar as políticas petrolíferas de seus países membros para garantir a estabilização dos mercados de petróleo.',
    gradientFrom: '#00FFFF',
    gradientTo: '#008B8B',
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1516192511155-2c9d40616bc2?auto=format&fit=crop&q=80&w=800"
    ],
    pageUrl: '/comite/opep'
  },
  {
    id: 'cn',
    name: 'CN',
    topic: '“A Indústria de Bets no Brasil: O desafio Social na Economia Digital”',
    iconName: 'Landmark',
    logoUrl: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/CN.png',
    description: 'Sendo o principal órgão do Poder Legislativo Federal, composto pela Câmera dos Deputados e o Senado Federal, o Congresso Nacional tem como principais funções elaborar, discutir e aprovais as leis do país, fiscalizar as ações do Poder Executivo e analisar e aprovar o orçamento da União. É a representação da população e dos estados nas decisões nacionais.',
    gradientFrom: '#010219',
    gradientTo: '#00abff',
    images: [
      "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=800"
    ],
    pageUrl: '/comite/cn'
  },
  {
    id: 'ci',
    name: 'CI',
    topic: 'COBERTURA DA SINU',
    iconName: 'Newspaper',
    logoUrl: 'https://sinu-csl-site.s3.sa-east-1.amazonaws.com/icone+dos+comites/CI.png',
    description: 'O Comitê de Imprensa desempenha o papel de cobrir as sessões de todos os comitês, podendo fazer intervenções com questionamentos acerca do andamento e posicionamento das delegações. A partir disto, produz notícias, imagens, charges e conteúdo audiovisual que apontam os acontecimentos mais importantes da simulação, bem como outros conteúdos criativos, promovendo informação e integração entre todos.',
    gradientFrom: '#C70000',
    gradientTo: '#ED5757',
    images: [
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=800"
    ],
    pageUrl: '/comite/ci'
  }
];

const getIcon = (name: string) => {
  switch (name) {
    case 'ShieldAlert': return <ShieldAlert className="w-8 h-8" />;
    case 'HeartPulse': return <HeartPulse className="w-8 h-8" />;
    case 'Scale': return <Scale className="w-8 h-8" />;
    case 'Landmark': return <Landmark className="w-8 h-8" />;
    case 'Shield': return <Shield className="w-8 h-8" />;
    case 'Leaf': return <Leaf className="w-8 h-8" />;
    case 'Users': return <Users className="w-8 h-8" />;
    case 'Newspaper': return <Newspaper className="w-8 h-8" />;
    case 'Fuel': return <Fuel className="w-8 h-8" />;
    case 'Swords': return <Swords className="w-8 h-8" />;
    default: return <Gavel className="w-8 h-8" />;
  }
};

const CommitteeCard: React.FC<{ committee: Committee; index: number }> = ({ committee, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="h-full"
    >
      <Link 
        to={committee.pageUrl || '#'}
        className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col border border-white/10 h-full cursor-pointer block group"
        style={{
          background: committee.gradientFrom && committee.gradientTo 
            ? `linear-gradient(135deg, ${committee.gradientFrom}, ${committee.gradientTo})`
            : 'white'
        }}
      >
        <div className="p-4 sm:p-6 lg:p-8 flex-grow flex flex-col text-white items-center text-center justify-center">
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            {committee.logoUrl ? (
              <div className="h-32 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center w-full">
                <img 
                  src={committee.logoUrl} 
                  alt={`${committee.name} Logo`} 
                  className={`object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110 ${['to', 'opep'].includes(committee.id) ? 'w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28' : committee.id === 'unodc' ? 'w-20 h-20 sm:w-32 sm:h-32 lg:w-36 lg:h-36' : 'w-24 h-24 sm:w-48 sm:h-48 lg:w-64 lg:h-64'}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : (
              <div className="text-white bg-white/20 p-3 sm:p-4 rounded-2xl sm:rounded-3xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                {getIcon(committee.iconName)}
              </div>
            )}
            <h4 className="text-lg sm:text-2xl font-serif font-bold leading-tight drop-shadow-sm">{committee.name}</h4>
          </div>
          
          <div className="mt-4 sm:mt-8 flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-full transition-all duration-500 group-hover:bg-white group-hover:text-slate-900 group-hover:border-white group-hover:scale-105 shadow-lg group-hover:shadow-white/20">
            <span>Saiba mais</span>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-500 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Committees: React.FC = () => {
  return (
    <section id="comites" className="py-12 md:py-24 bg-un-dark relative overflow-hidden">
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
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Clique nos cards abaixo para saber mais sobre os temas, a mesa diretora e outras informações de cada comitê.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 lg:gap-4 xl:gap-6">
          {committeesList.map((committee, idx) => (
            <div key={committee.id} className="flex h-full">
              <CommitteeCard committee={committee} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Committees;