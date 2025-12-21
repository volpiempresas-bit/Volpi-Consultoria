import React from 'react';
import { Briefcase, MapPin, Award } from 'lucide-react';

export const AboutMe: React.FC = () => {
  return (
    <section id="sobre-mim" className="py-24 bg-graphite-900 text-white overflow-hidden relative">
      {/* Background Texture Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-gold-400/30 bg-gold-400/10 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                <span className="text-gold-400 text-xs font-bold tracking-widest uppercase">Consultor Especialista</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
              Felipe Volpi
            </h2>
            
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-medium">
              <p>
                Consultor especializado em soluções financeiras e consórcios, atuo no escritório da <strong className="text-white">Embracon em Florianópolis</strong>, atendendo clientes que buscam solidez e inteligência patrimonial.
              </p>
              <p>
                Com certificação <strong className="text-white">ANBIMA CPA-20</strong> e vasta experiência em negociações de alto valor, ofereço segurança técnica e estratégias personalizadas. Meu foco é entregar clareza para quem deseja comprar, investir ou ampliar bens fugindo dos juros abusivos.
              </p>
              <div className="pl-6 border-l-4 border-gold-500 py-2 mt-8">
                <p className="italic text-white font-serif text-xl">
                  "Aqui, você encontra atendimento humano e visão de longo prazo. Vamos construir seu próximo patrimônio juntos."
                </p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Cards adapted for Dark Mode */}
               <div className="flex items-center gap-4 p-5 bg-white/5 rounded-lg border border-white/10 hover:border-gold-400/50 transition-colors group">
                 <div className="text-gold-400 group-hover:scale-110 transition-transform"><MapPin size={24}/></div>
                 <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Base</span>
                    <span className="text-base font-bold text-white">Florianópolis & Região</span>
                 </div>
               </div>
               <div className="flex items-center gap-4 p-5 bg-white/5 rounded-lg border border-white/10 hover:border-gold-400/50 transition-colors group">
                 <div className="text-gold-400 group-hover:scale-110 transition-transform"><Briefcase size={24}/></div>
                 <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Especialidade</span>
                    <span className="text-base font-bold text-white">Construção Patrimonial</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative order-2 flex justify-center lg:justify-end">
             <div className="relative w-full max-w-md lg:max-w-full aspect-[3/4] lg:aspect-auto lg:h-[600px] rounded-sm overflow-hidden group">
               {/* Image Container */}
               <img 
                 src="/volpi-perfil.png" 
                 alt="Felipe Volpi" 
                 className="w-full h-full object-cover object-top shadow-2xl transition-transform duration-700 group-hover:scale-105"
               />
               
               {/* Floating Badge (Dark Mode Version) */}
               <div className="absolute bottom-6 left-6 right-6 lg:right-auto bg-slate-900/95 backdrop-blur-xl p-5 shadow-2xl border-l-4 border-gold-400">
                 <div className="flex items-center gap-3 mb-1">
                   <Award className="text-gold-400" size={24} />
                   <span className="font-extrabold text-white text-xl tracking-tight">CPA-20</span>
                 </div>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">Certificação ANBIMA de Especialista</p>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};