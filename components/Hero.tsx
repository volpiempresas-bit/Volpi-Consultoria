import React from 'react';
import { Simulator } from './Simulator';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-slate-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" 
          alt="Modern Architecture" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="max-w-xl">
          <div className="inline-block px-3 py-1 mb-6 border border-gold-400/30 bg-gold-400/10 backdrop-blur-sm">
            <span className="text-gold-400 text-xs font-bold tracking-[0.2em] uppercase">Especialista em Consórcios</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white leading-tight mb-6">
            Construa seu patrimônio com <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-white">solidez e estratégia.</span>
          </h1>
          
          <p className="text-lg text-slate-300 mb-8 font-light leading-relaxed">
            Consultoria personalizada para aquisição de imóveis e veículos sem juros abusivos. A segurança de um grande grupo com o atendimento exclusivo que você merece.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-gold-400"></div>
              <span>Atendimento Nacional</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-gold-400"></div>
              <span>Taxas Competitivas</span>
            </div>
          </div>
        </div>

        {/* Right Content - Simulator */}
        <div className="flex justify-center lg:justify-end">
          <Simulator />
        </div>

      </div>
    </section>
  );
};