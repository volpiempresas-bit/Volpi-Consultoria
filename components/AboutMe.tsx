import React from 'react';
import { Briefcase, MapPin, Award } from 'lucide-react';

export const AboutMe: React.FC = () => {
  return (
    <section id="sobre-mim" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Background Texture Element (Optional subtle detail) */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-800/20 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="order-1">
            <div className="inline-block px-3 py-1 mb-6 border border-gold-400/30 bg-gold-400/10">
                <span className="text-gold-400 text-xs font-bold tracking-[0.2em] uppercase">Consultor Especialista</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
              Felipe Volpi
            </h2>
            
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-light">
              <p>
                Consultor especializado em soluções financeiras e consórcios, atuo no escritório da <strong className="text-white font-semibold">Embracon em Florianópolis</strong>, atendendo clientes que buscam solidez e inteligência patrimonial.
              </p>
              <p>
                Com certificação <strong className="text-white font-semibold">ANBIMA CPA-20</strong> e vasta experiência em negociações de alto valor, ofereço segurança técnica e estratégias personalizadas. Meu foco é entregar clareza para quem deseja comprar, investir ou ampliar bens fugindo dos juros abusivos.
              </p>
              <p className="italic text-slate-400 border-l-2 border-gold-500 pl-4">
                "Aqui, você encontra atendimento humano e visão de longo prazo. Vamos construir seu próximo patrimônio juntos."
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Cards adapted for Dark Mode */}
               <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 shadow-sm hover:border-gold-400/30 transition-colors">
                 <div className="text-gold-400"><MapPin size={24}/></div>
                 <div>
                    <span className="block text-xs text-slate-400 uppercase tracking-wide">Base</span>
                    <span className="text-sm font-semibold text-slate-100">Florianópolis & Região</span>
                 </div>
               </div>
               <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 shadow-sm hover:border-gold-400/30 transition-colors">
                 <div className="text-gold-400"><Briefcase size={24}/></div>
                 <div>
                    <span className="block text-xs text-slate-400 uppercase tracking-wide">Especialidade</span>
                    <span className="text-sm font-semibold text-slate-100">Construção Patrimonial</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative order-2 flex justify-center lg:justify-end">
             <div className="relative w-full max-w-md lg:max-w-full aspect-[3/4] lg:aspect-auto lg:h-[600px]">
               {/* Image Container with premium shadow */}
               <img 
                 src="/volpi-perfil.png" 
                 alt="Felipe Volpi" 
                 className="w-full h-full object-cover object-top shadow-2xl shadow-black/50"
               />
               
               {/* Floating Badge (Dark Mode Version) */}
               <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-md p-4 shadow-lg border-l-4 border-gold-400 max-w-[200px]">
                 <div className="flex items-center gap-2 mb-1">
                   <Award className="text-gold-400" size={20} />
                   <span className="font-bold text-white text-sm">CPA-20</span>
                 </div>
                 <p className="text-xs text-slate-400">Certificação ANBIMA de Especialista</p>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};