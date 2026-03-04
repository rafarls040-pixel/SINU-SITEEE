import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Legacy from './components/Legacy';
import Secretariat from './components/Secretariat';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import BackgroundText from './components/BackgroundText';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans relative selection:bg-un-accent selection:text-un-dark">
      <BackgroundText />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        
        {/* Container with some spacing/transparency management if needed */}
        <div className="space-y-0">
          <About />
          
          {/* Adicionando a seção de Secretariado após o Sobre */}
          <Secretariat />
          
          <Legacy />
          
          <Sponsors />
          
          {/* Registration CTA Section */}
          <section id="inscricao" className="py-24 bg-un-dark/80 backdrop-blur-md relative overflow-hidden border-t border-white/10">
            <div className="absolute inset-0 opacity-10">
               <div className="absolute transform -rotate-45 -left-20 -top-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
               <div className="absolute transform rotate-45 right-0 bottom-0 w-80 h-80 bg-un-accent rounded-full blur-3xl"></div>
            </div>
            
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">
                Faça parte dessa história
              </h2>
              
              <div className="inline-flex flex-col items-center justify-center p-10 border border-un-accent/30 rounded-2xl bg-white/5 backdrop-blur-sm shadow-2xl">
                <span className="text-un-accent font-bold tracking-[0.3em] uppercase text-sm mb-4 bg-un-accent/10 px-4 py-1 rounded-full">
                  Edição 2026
                </span>
                <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-xl">
                  EM BREVE
                </h3>
                <p className="text-un-light/80 text-lg max-w-lg mx-auto leading-relaxed">
                  Estamos preparando algo incrível. As inscrições para delegados e escolas abrirão nos próximos dias.
                </p>
                <div className="mt-8 w-16 h-1 bg-un-accent rounded-full opacity-50"></div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;