import React from 'react';
import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';

interface Sponsor {
  name: string;
  logoUrl: string;
  websiteUrl: string;
}

const sponsors: Sponsor[] = [
  { 
    name: "IBMEC", 
    logoUrl: "https://cdn.portal.estacio.br/1_Desktop_ibmec_logo_430884bed1.svg",
    websiteUrl: "https://www.ibmec.br/"
  }
];

const Sponsors: React.FC = () => {
  return (
    <section id="parceiros" className="py-12 md:py-24 relative overflow-hidden select-none">
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
          
          <p className="max-w-4xl mx-auto text-slate-600 text-lg leading-relaxed text-left sm:text-center">
            A <span className="text-un-accent font-bold">SINU XX</span> é mais do que uma simulação acadêmica. Trata-se de um projeto educacional que forma jovens críticos, engajados e preparados para debater os principais desafios do cenário global. Ao apoiar a SINU, sua instituição investe diretamente em educação de qualidade, protagonismo juvenil e impacto social, além de fortalecer sua marca junto a um público jovem, qualificado e altamente engajado. Acreditamos que transformar o futuro começa ao dar espaço para jovens que están dispostos a dialogar de forma mais democrática e justa.
          </p>
        </motion.div>

        {/* CONTAINER DO PATROCINADOR ÚNICO */}
        <div className="flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm"
          >
            {sponsors.map((sponsor, idx) => (
              <a
                key={idx}
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl shadow-xl border border-slate-100 
                  flex items-center justify-center p-8 relative overflow-hidden group
                  transition-all duration-500 
                  hover:shadow-2xl hover:border-un-accent hover:scale-105
                  h-56 w-full cursor-pointer block"
              >
                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-un-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <img 
                  src={sponsor.logoUrl} 
                  alt={`Logo ${sponsor.name}`}
                  className="max-h-32 max-w-[90%] w-auto object-contain transition-all duration-500"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
                
                {/* Overlay sutil indicando link */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-bold uppercase tracking-[.2em] text-un-accent">Visitar Website</span>
                </div>
              </a>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Sponsors;