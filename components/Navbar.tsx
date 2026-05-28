import React, { useState, useEffect } from 'react';
import SinuLogo from './SinuLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Star, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '#home', highlight: false },
  { name: 'Sobre', href: '#sobre', highlight: false },
  { name: 'Comitês', href: '#comites', highlight: false, hasDropdown: true },
  { name: 'Secretariado', href: '#secretariado', highlight: false },
  { name: 'Legado', href: '#legado', highlight: true },
  { name: 'Parceiros', href: '#parceiros', highlight: false },
];

const committees = [
  { name: 'CSNU', href: '/comite/csnu' },
  { name: 'CSH', href: '/comite/historico' },
  { name: 'UNODC', href: '/comite/unodc' },
  { name: 'CDH', href: '/comite/cdh' },
  { name: 'UNIFEM', href: '/comite/unifem' },
  { name: 'TO', href: '/comite/to' },
  { name: 'PNUMA', href: '/comite/pnuma' },
  { name: 'OPEP+', href: '/comite/opep' },
  { name: 'CN', href: '/comite/cn' },
  { name: 'CI', href: '/comite/ci' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setIsOpen(false);

      if (location.pathname !== '/') {
        navigate('/' + href);
        return;
      }

      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);

      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-[#03005c]/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group cursor-pointer"
            >
               <SinuLogo className={`h-12 w-auto transition-all duration-300 group-hover:scale-105 ${!scrolled ? 'brightness-0' : ''}`} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => link.hasDropdown && setDropdownOpen(true)}
                onMouseLeave={() => link.hasDropdown && setDropdownOpen(false)}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 relative flex items-center gap-2 ${
                    link.highlight
                      ? scrolled 
                        ? 'text-[#fecc00] border border-[#fecc00] hover:bg-[#fecc00] hover:text-[#03005c] px-4 py-2 rounded-full shadow-[0_0_10px_rgba(254,204,0,0.1)] hover:shadow-[0_0_20px_rgba(254,204,0,0.4)]'
                        : 'text-[#03005c] border border-[#03005c] hover:bg-[#03005c] hover:text-white px-4 py-2 rounded-full shadow-sm'
                      : scrolled 
                        ? 'text-white/80 hover:text-white py-2'
                        : 'text-[#03005c]/70 hover:text-[#03005c] py-2'
                  }`}
                >
                  {link.name}
                  {link.highlight && <Star className="w-3 h-3 fill-current mb-0.5" />}
                  {link.hasDropdown && <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />}
                  {!link.highlight && !link.hasDropdown && (
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full opacity-80 ${scrolled ? 'bg-[#fecc00]' : 'bg-[#03005c]'}`}></span>
                  )}
                </a>

                {/* Dropdown Menu */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-0 w-[320px] bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 p-4"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {committees.map((committee) => (
                            <Link
                              key={committee.name}
                              to={committee.href}
                              className="block px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#03005c] rounded-lg transition-colors"
                            >
                              {committee.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            
            <motion.a
              href="#delegado"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, '#delegado')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all cursor-pointer ${
                scrolled
                  ? 'bg-[#fecc00] text-[#03005c] hover:bg-white shadow-[0_0_15px_rgba(254,204,0,0.3)] hover:shadow-[0_0_20px_rgba(254,204,0,0.6)]'
                  : 'bg-[#03005c] text-white hover:bg-un-blue shadow-lg'
              }`}
            >
              Área do Delegado
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 focus:outline-none rounded-lg transition-colors ${scrolled ? 'text-white hover:bg-white/10' : 'text-[#03005c] hover:bg-[#03005c]/5'}`}
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
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#03005c] border-t border-white/10 overflow-y-auto fixed inset-0 top-[64px]"
          >
            <div className="px-6 py-10 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-white/5 last:border-0 pb-2">
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.hasDropdown) {
                        e.preventDefault();
                        setDropdownOpen(!dropdownOpen);
                      } else {
                        handleNavClick(e, link.href);
                      }
                    }}
                    className={`flex items-center justify-between w-full text-xl font-bold uppercase tracking-wider py-4 ${
                      link.highlight ? 'text-[#fecc00]' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {link.name}
                      {link.highlight && <Star className="w-5 h-5 fill-current" />}
                    </span>
                    {link.hasDropdown && (
                      <ChevronDown 
                        className={`w-6 h-6 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} 
                      />
                    )}
                  </a>
                  
                  <AnimatePresence>
                    {link.hasDropdown && dropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 mb-4 grid grid-cols-2 gap-x-4 gap-y-2"
                      >
                        {committees.map((committee) => (
                          <Link
                            key={committee.name}
                            to={committee.href}
                            onClick={() => setIsOpen(false)}
                            className="block py-3 text-base font-bold text-white/60 hover:text-white active:text-[#fecc00] transition-colors"
                          >
                            {committee.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
               <a
                  href="#delegado"
                  onClick={(e) => {
                    setIsOpen(false);
                    handleNavClick(e, '#delegado');
                  }}
                  className="block text-center w-full bg-[#fecc00] text-[#03005c] px-6 py-4 rounded-xl text-lg font-bold uppercase tracking-widest mt-8 shadow-[0_0_20px_rgba(254,204,0,0.3)] active:scale-95 transition-transform"
                >
                  Área do Delegado
                </a>
                
                <div className="pt-12 text-center">
                   <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold">
                     Colégio São Luís • Vigésima Edição
                   </p>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;