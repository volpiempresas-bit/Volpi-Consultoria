import React from 'react';
import { Briefcase, MapPin, Award } from 'lucide-react';

export const AboutMe: React.FC = () => {
  return (
    <section id="sobre-mim" className="py-24 bg-bordeaux-950 text-white overflow-hidden relative border-t border-white/5">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold-500/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-gold-500/30 bg-gold-500/10 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                <span className="text-gold-500 text-xs font-bold tracking-widest uppercase">Consultor Especialista</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight uppercase tracking-tight">
              Quem é Volpi?
            </h2>
            
            <div className="space-y-6 text-white/70 text-lg leading-relaxed font-medium">
              <p>
                Consultor especializado em soluções financeiras atua no escritório em <strong className="text-gold-500">Florianópolis - Santa Catarina</strong>, atendendo todas as regiões do Brasil. Sua função é assessorar através de uma consulta financeira 100% gratuita, tanto para empresas quanto para pessoas físicas, a estarem adquirindo sua casa dos sonhos, carro dos sonhos ou a levantar patrimônio e ter uma renda passiva.
              </p>
              <p>
                Com certificação <strong className="text-white font-bold">ANBIMA CPA-20</strong> e vasta experiência em negociações de alto valor, ofereço segurança técnica e estratégias personalizadas. Tudo isso orientando você a escolher a melhor forma de crédito.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/5 hover:border-gold-500/40 transition-colors group rounded-sm">
                 <div className="text-gold-500 group-hover:scale-110 transition-transform"><MapPin size={24}/></div>
                 <div>
                    <span className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Abrangência</span>
                    <span className="text-base font-bold text-white">Atendimento Nacional</span>
                 </div>
               </div>
               <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/5 hover:border-gold-500/40 transition-colors group rounded-sm">
                 <div className="text-gold-500 group-hover:scale-110 transition-transform"><Briefcase size={24}/></div>
                 <div>
                    <span className="block text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Foco Estratégico</span>
                    <span className="text-base font-bold text-white">Renda Passiva & Bens</span>
                 </div>
               </div>
            </div>
          </div>

          <div className="relative order-2 flex justify-center lg:justify-end">
             <div className="relative w-full max-w-md aspect-[3/4] rounded-sm overflow-hidden group border-2 border-gold-500/20">
               <img 
                 src="/volpi-perfil.png" 
                 alt="Felipe Volpi" 
                 className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
               />
               
               <div className="absolute bottom-6 left-6 right-6 bg-bordeaux-950/95 backdrop-blur-xl p-6 border-l-4 border-gold-500 shadow-2xl">
                 <div className="flex items-center gap-3 mb-1">
                   <Award className="text-gold-500" size={24} />
                   <span className="font-extrabold text-white text-xl tracking-tight">CPA-20</span>
                 </div>
                 <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Certificação ANBIMA de Especialista</p>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};