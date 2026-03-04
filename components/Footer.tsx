import React from 'react';
import { Mail, MapPin, Instagram, Linkedin, Youtube } from 'lucide-react';
import SinuLogo from './SinuLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-un-dark/95 backdrop-blur-md text-white pt-16 pb-8 border-t border-un-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              {/* Logo CSL */}
              <img 
                src="https://static.saoluis.org/wp-content/uploads/2020/04/colegio-saoluis.png" 
                alt="Colégio São Luís" 
                className="h-8 w-auto brightness-0 invert opacity-90"
              />
              
              {/* Divider */}
              <div className="h-8 w-px bg-white/20"></div>

              {/* Logo SINU */}
              <div className="flex items-center space-x-3">
                <div className="bg-white/5 p-2 rounded-full border border-white/10">
                  <SinuLogo className="h-14 w-14" />
                </div>
                <span className="text-2xl font-serif font-bold tracking-tight">SINU <span className="text-un-accent">XX</span></span>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-6">
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
          <div>
            <h4 className="text-lg font-bold mb-6 text-un-accent border-b border-un-accent/30 pb-2 inline-block">Links Rápidos</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li><a href="#sobre" className="hover:text-un-accent hover:translate-x-1 transition-all duration-300 flex items-center">Sobre Nós</a></li>
              <li><a href="#agenda" className="hover:text-un-accent hover:translate-x-1 transition-all duration-300 flex items-center">Cronograma</a></li>
              <li><a href="#secretariado" className="hover:text-un-accent hover:translate-x-1 transition-all duration-300 flex items-center">Secretariado</a></li>
              <li><a href="#legado" className="hover:text-un-accent hover:translate-x-1 transition-all duration-300 flex items-center">Legado</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-un-accent border-b border-un-accent/30 pb-2 inline-block">Contato</h4>
            <ul className="space-y-4 text-white/70 text-sm">
              <li className="flex items-start gap-3 group">
                <MapPin className="h-5 w-5 text-un-accent shrink-0 mt-0.5 group-hover:text-white transition-colors" />
                <span>Colégio São Luís<br />Av. Dr. Dante Pazzanese, 295<br />Vila Mariana, São Paulo - SP</span>
              </li>
              <li className="flex items-center gap-3 group">
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