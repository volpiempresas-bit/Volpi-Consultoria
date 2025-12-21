import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { WHATSAPP_NUMBER } from '../types';

export const Hero: React.FC = () => {
  const handleContactClick = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center bg-graphite-900 overflow-hidden pt-20 pb-12">
      {/* Background Image with Heavier Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" 
          alt="Modern Architecture" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite-900/90 via-graphite-900/95 to-graphite-900"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
            <span className="text-gold-400 text-xs font-bold tracking-widest uppercase font-sans">Especialista em Consórcios Premium</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
            Seu patrimônio construído <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-white">com inteligência.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-10 font-medium leading-relaxed max-w-2xl">
            Consultoria estratégica para aquisição de imóveis e veículos. Fuja dos juros bancários e utilize o consórcio como ferramenta de alavancagem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              onClick={handleContactClick}
              className="group py-5 px-10 text-lg font-bold shadow-2xl shadow-gold-400/10"
            >
              Falar com Especialista
              <ArrowRight size={22} className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <div className="flex flex-col gap-3 justify-center text-slate-400 text-sm font-bold uppercase tracking-widest pl-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-gold-400" size={18} />
                <span>Zero Juros Bancários</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-gold-400" size={18} />
                <span>Poder de Compra à Vista</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};