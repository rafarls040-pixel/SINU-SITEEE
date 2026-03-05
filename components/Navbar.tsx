import React, { useState, useEffect } from 'react';
import SinuLogo from './SinuLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Star } from 'lucide-react';

const navLinks = [
  { name: 'Sobre', href: '#sobre', highlight: false },
  { name: 'Secretariado', href: '#secretariado', highlight: false },
  { name: 'Legado', href: '#legado', highlight: true },
  { name: 'Parceiros', href: '#parceiros', highlight: false },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ativa a navbar após 100px de scroll
      setScrolled(window.scrollY > 100);
    };

    // Verifica estado inicial
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 80; // Ajuste para o cabeçalho fixo
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out transform ${
        scrolled 
          ? 'translate-y-0 opacity-100 bg-[#03005c]/95 backdrop-blur-md shadow-lg py-2' 
          : '-translate-y-full opacity-0 py-4 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a 
              href="#" 
              onClick={(e) => { 
                e.preventDefault(); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
               {/* 
                 Logo sempre branca pois o fundo quando visível será azul escuro.
               */}
               <SinuLogo className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 relative group flex items-center gap-2 ${
                  link.highlight
                    ? 'text-[#fecc00] border border-[#fecc00] hover:bg-[#fecc00] hover:text-[#03005c] px-4 py-2 rounded-full shadow-[0_0_10px_rgba(254,204,0,0.1)] hover:shadow-[0_0_20px_rgba(254,204,0,0.4)]'
                    : 'text-white/80 hover:text-white py-2'
                }`}
              >
                {link.name}
                {link.highlight && <Star className="w-3 h-3 fill-current mb-0.5" />}
                {!link.highlight && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#fecc00] transition-all duration-300 group-hover:w-full opacity-80"></span>
                )}
              </a>
            ))}
            
            <motion.a
              href="#inscricao"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, '#inscricao')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#fecc00] text-[#03005c] hover:bg-white hover:text-[#03005c] px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all shadow-[0_0_15px_rgba(254,204,0,0.3)] hover:shadow-[0_0_20px_rgba(254,204,0,0.6)] cursor-pointer"
            >
              Inscreva-se
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 focus:outline-none hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Abrir menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#03005c] border-t border-white/10 overflow-hidden"
  >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block text-base font-bold uppercase tracking-wider py-2 border-b border-white/5 last:border-0 ${
                    link.highlight ? 'text-[#fecc00] flex items-center gap-2' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                  {link.highlight && <Star className="w-4 h-4 fill-current" />}
                </a>
              ))}
               <a
                  href="#inscricao"
                  onClick={(e) => handleNavClick(e, '#inscricao')}
                  className="block text-center w-full bg-[#fecc00] text-[#03005c] px-6 py-3 rounded-lg text-base font-bold uppercase tracking-wide mt-6 shadow-md active:scale-95 transition-transform"
                >
                  Inscreva-se
                </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;