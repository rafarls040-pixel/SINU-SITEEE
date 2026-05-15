import React from 'react';
import { Mail, MapPin, Instagram, Linkedin, Youtube } from 'lucide-react';
import SinuLogo from './SinuLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-un-dark/95 backdrop-blur-md text-white pt-16 pb-8 border-t border-un-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 sm:col-span-2">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 mb-6 text-center sm:text-left">
              {/* Logo CSL */}
              <img 
                src="https://static.saoluis.org/wp-content/uploads/2020/04/colegio-saoluis.png" 
                alt="Colégio São Luís" 
                className="h-8 w-auto"
                loading="lazy"
                decoding="async"
              />
              
              {/* Divider */}
              <div className="hidden sm:block h-8 w-px bg-white/20"></div>

              <div className="flex items-center space-x-3">
                <SinuLogo className="h-16 w-16 sm:h-20 sm:w-20" />
                <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight">SINU <span className="text-un-accent">XX</span></span>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex justify-center sm:justify-start space-x-4 mt-6">
              <a href="https://www.instagram.com/sinucsl/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-un-accent hover:text-un-dark transition-all duration-300 group" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/111723413/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-un-accent hover:text-un-dark transition-all duration-300 group" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@sinucsl" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2.5 rounded-full hover:bg-un-accent hover:text-un-dark transition-all duration-300 group" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold mb-6 text-un-accent border-b border-un-accent/30 pb-2 inline-block">Links Rápidos</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li><a href="#sobre" className="hover:text-un-accent hover:translate-x-1 transition-all duration-300 flex items-center justify-center sm:justify-start">Sobre Nós</a></li>
              <li><a href="#agenda" className="hover:text-un-accent hover:translate-x-1 transition-all duration-300 flex items-center justify-center sm:justify-start">Cronograma</a></li>
              <li><a href="#secretariado" className="hover:text-un-accent hover:translate-x-1 transition-all duration-300 flex items-center justify-center sm:justify-start">Secretariado</a></li>
              <li><a href="#legado" className="hover:text-un-accent hover:translate-x-1 transition-all duration-300 flex items-center justify-center sm:justify-start">Legado</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold mb-6 text-un-accent border-b border-un-accent/30 pb-2 inline-block">Contato</h4>
            <ul className="space-y-4 text-white/70 text-sm">
              <li className="flex flex-col sm:flex-row items-center sm:items-start gap-3 group">
                <MapPin className="h-5 w-5 text-un-accent shrink-0 mt-0.5 group-hover:text-white transition-colors" />
                <span>Colégio São Luís<br />Av. Dr. Dante Pazzanese, 295<br />Vila Mariana, São Paulo - SP</span>
              </li>
              <li className="flex flex-col sm:flex-row items-center sm:items-center gap-3 group">
                <Mail className="h-5 w-5 text-un-accent shrink-0 group-hover:text-white transition-colors" />
                <a href="mailto:contato@sinu.com.br" className="hover:text-un-accent transition-colors">contato@sinu.com.br</a>
              </li>
            </ul>
          </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;