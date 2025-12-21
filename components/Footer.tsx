import React from 'react';
import { MapPin, Phone, Instagram, Mail } from 'lucide-react';
import { ADDRESS, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_NUMBER } from '../types';
import { Button } from './Button';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleContactClick = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
  };

  return (
    <footer id="contato" className="bg-graphite-900 text-white pt-24 pb-12 border-t border-gold-600/30">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-3 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div>
              <span className="font-serif text-3xl font-bold tracking-tight text-white block">VOLPI</span>
              <span className="text-xs uppercase tracking-[0.2em] text-gold-400 block mt-1">Consultoria</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Especialistas em consórcios imobiliários, automotivos e de serviços. Transformando planejamento financeiro em patrimônio real com transparência e sofisticação.
            </p>
            <Button variant="outline" className="border-gold-600 text-gold-400 hover:bg-gold-600 hover:text-white" onClick={handleContactClick}>
              Agendar Conversa
            </Button>
          </div>

          {/* Contact Column */}
          <div className="space-y-8">
            <h4 className="text-lg font-serif font-medium border-b border-gray-800 pb-4 inline-block pr-12">Contato</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group cursor-pointer" onClick={handleContactClick}>
                <div className="mt-1 text-gold-500 group-hover:text-white transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 uppercase tracking-wider mb-1">WhatsApp Business</span>
                  <span className="text-slate-300 font-medium group-hover:text-gold-400 transition-colors">
                   (48) 99145-5194
                  </span>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-start gap-4 group">
                    <div className="mt-1 text-gold-500 group-hover:text-white transition-colors">
                    <Instagram size={20} />
                    </div>
                    <div>
                    <span className="block text-xs text-slate-500 uppercase tracking-wider mb-1">Instagram</span>
                    <span className="text-slate-300 font-medium group-hover:text-gold-400 transition-colors">
                        {INSTAGRAM_HANDLE}
                    </span>
                    </div>
                </a>
              </li>

              <li className="flex items-start gap-4">
                <div className="mt-1 text-gold-500">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 uppercase tracking-wider mb-1">Email</span>
                  <span className="text-slate-300 font-medium">contato@volpiconsultor.com.br</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Address Column */}
          <div className="space-y-8">
            <h4 className="text-lg font-serif font-medium border-b border-gray-800 pb-4 inline-block pr-12">Endereço</h4>
            <div className="flex items-start gap-4">
              <div className="mt-1 text-gold-500">
                <MapPin size={20} />
              </div>
              <div>
                <span className="block text-xs text-slate-500 uppercase tracking-wider mb-1">Escritório Central</span>
                <address className="text-slate-300 font-medium not-italic leading-relaxed">
                  {ADDRESS.split(' - ').map((part, i) => (
                    <span key={i} className="block">{part}</span>
                  ))}
                </address>
              </div>
            </div>
            {/* Embedded Map Image Static Placeholder */}
            <div className="w-full h-32 bg-slate-800 rounded-sm overflow-hidden relative group cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
               <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80" 
                alt="Map Background" 
                className="w-full h-full object-cover grayscale mix-blend-overlay"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-xs font-semibold tracking-wider text-white border border-white/30 px-3 py-1 bg-black/30 backdrop-blur-sm">VER NO MAPA</span>
               </div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {currentYear} Volpi Consultoria. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold-400 transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};