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
    <footer id="contato" className="bg-bordeaux-950 text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-3 gap-16 mb-20">
          <div className="space-y-6">
            <div>
              <span className="font-serif text-3xl font-black tracking-tight text-white block">VOLPI</span>
              <span className="text-xs uppercase tracking-[0.4em] text-gold-500 block mt-1">Consultor</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm font-medium">
              Especialista financeiro em créditos. Transformando planejamento financeiro em patrimônio real com transparência e sofisticação.
            </p>
            <div className="flex flex-col gap-3">
              <Button className="py-4" onClick={handleContactClick}>Agendar Conversa</Button>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-lg font-serif font-black border-b border-white/5 pb-4 inline-block pr-12 uppercase tracking-tight text-gold-500">Contato</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group cursor-pointer" onClick={handleContactClick}>
                <div className="mt-1 text-gold-500 group-hover:scale-110 transition-transform"><Phone size={20} /></div>
                <div>
                  <span className="block text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">WhatsApp</span>
                  <span className="text-white font-bold group-hover:text-gold-500 transition-colors">(48) 99145-5194</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-start gap-4 group">
                    <div className="mt-1 text-gold-500 group-hover:scale-110 transition-transform"><Instagram size={20} /></div>
                    <div>
                    <span className="block text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">Instagram</span>
                    <span className="text-white font-bold group-hover:text-gold-500 transition-colors">{INSTAGRAM_HANDLE}</span>
                    </div>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-lg font-serif font-black border-b border-white/5 pb-4 inline-block pr-12 uppercase tracking-tight text-gold-500">Localização</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-gold-500"><MapPin size={20} /></div>
                <div>
                  <span className="block text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">Escritório Central</span>
                  <address className="text-white font-bold not-italic leading-relaxed">
                    R. Dr. Heitor Blum, 309<br/>
                    Estreito, Florianópolis<br/>
                    SC, 88075-110
                  </address>
                </div>
              </div>
              
              <div className="w-full h-48 rounded-sm overflow-hidden border border-white/10 grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-500">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.012351234567!2d-48.5830!3d-27.5920!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952739ea65a1b32b%3A0x64e83f3f2e27c050!2sR.%20Dr.%20Heitor%20Blum%2C%20309%20-%20Estreito%2C%20Florian%C3%B3polis%20-%20SC%2C%2088075-110!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">
          <p>&copy; {currentYear} Volpi Consultoria. Premium Asset Management.</p>
        </div>
      </div>
    </footer>
  );
};