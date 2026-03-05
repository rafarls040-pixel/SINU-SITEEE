import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 
           1. Animação do Container (Imagem de Fundo):
           Aparece assim que o usuário rola até a seção.
        */}
        <motion.div 
          className="relative rounded-3xl shadow-xl overflow-hidden border border-slate-100 min-h-[600px] flex items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        >
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://sinu-csl-site.s3.sa-east-1.amazonaws.com/LEGACYY/Design+sem+nome+(2).png" 
              alt="SINU Ilustração" 
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* 
             2. Animação do Conteúdo (Texto + Vidro):
             Tem um delay de 1.0s (delay: 1) para permitir que a imagem seja vista primeiro.
          */}
          <motion.div 
            className="relative z-10 w-full lg:w-7/12 p-4 sm:p-8 md:p-12 lg:p-16 mx-auto lg:ml-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
          >
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 p-6 sm:p-10 rounded-3xl shadow-2xl">
              <h2 className="text-un-accent font-bold tracking-wide uppercase text-[10px] sm:text-xs mb-4 drop-shadow-sm border-l-4 border-un-accent pl-3">O que é a SINU?</h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight drop-shadow-sm">
                Mais que um evento, uma experiência transformadora.
              </h3>
              
              <div className="space-y-4 sm:space-y-6 text-slate-900 text-base sm:text-lg leading-relaxed text-justify font-medium">
                <p className="drop-shadow-sm">
                  A Simulação Interna das Nações Unidas (SINU) é um tradicional evento acadêmico de debates sobre temas atuais da geopolítica brasileira e internacional, organizado pelos estudantes do Colégio São Luís e, em 2026, chega a sua vigésima edição. Nele, os participantes representam delegações ou deputados, instigando o pensamento crítico e oratória por meio de problemáticas, crises e resoluções acerca dos maiores desafios contemporâneos.
                </p>
                <p className="drop-shadow-sm">
                  Além de um evento escolar, a SINU clama pelo desenvolvimento de jovens conscientes, competentes e compassivos, superando as barreiras da sala de aula e incentivando o diálogo, a empatia e a responsabilidade social.
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;