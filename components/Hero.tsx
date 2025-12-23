import React from 'react';
import { ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onOpenSpecialistForm: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSpecialistForm }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-bordeaux-950 overflow-hidden pt-24 pb-16">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-bordeaux-950 via-bordeaux-900/10 to-bordeaux-950"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-500/5 blur-[120px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
            
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded-full">
                <ShieldCheck size={14} className="text-gold-500" />
                <span className="text-gold-400 text-[10px] font-black tracking-widest uppercase">Consultoria Estratégica</span>
              </div>
              
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-black text-white leading-tight uppercase tracking-tight max-w-3xl">
                Compre seu bem de forma <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-500 to-white">barata e sem burocracia.</span>
              </h1>
              
              <p className="text-sm md:text-base lg:text-lg text-white/60 font-medium leading-relaxed max-w-2xl">
                Ajudo pessoas na aquisição de imóveis, carros e algum bem no geral de forma rápida e segura, adequando as suas necessidades, orientando no curto a longo prazo gerando economia.
              </p>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
                  <ShieldCheck size={16} className="text-gold-500" />
                  <span>site protegido</span>
                </div>
                <div className="w-px h-4 bg-white/10"></div>
                <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
                  <Award size={16} className="text-gold-500" />
                  <span>profissional autorizado</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                onClick={onOpenSpecialistForm}
                className="group py-4 px-9 text-sm md:text-base shadow-glow border-2 border-gold-500/40"
              >
                quero mais informações
                <ArrowRight size={20} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="mt-4 text-[10px] text-white/30 uppercase font-black tracking-widest">
                Atendimento personalizado via WhatsApp
              </p>
            </div>

          </div>

          {/* Right Column: Larger Image with Luxury Lifestyle */}
          <div className="lg:col-span-5 animate-in fade-in slide-in-from-right-8 duration-1000 flex justify-center lg:justify-end">
            <div className="relative group max-w-[450px] w-full">
              {/* Subtle Decorative Frame */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-gold-500/30"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-gold-500/30"></div>
              
              <div className="relative overflow-hidden rounded-sm border border-white/10 shadow-2xl bg-bordeaux-900 aspect-video lg:aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80" 
                  alt="Patrimônio de Luxo - Ferrari e Mansão" 
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                
                {/* Branding Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bordeaux-950 via-bordeaux-950/70 to-transparent">
                  <h2 className="text-lg md:text-xl font-serif font-black text-white uppercase tracking-tight">
                    Seu Próximo Patrimônio
                  </h2>
                  <p className="text-gold-500 text-[9px] font-black uppercase tracking-[0.2em] mt-1">
                    Consultoria Volpi • Estratégia de Aquisição
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};