import React from 'react';
import { Building2, Car, Bike, Truck, ArrowRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../types';
import { Button } from './Button';

export const IncomeSection: React.FC = () => {
  const plans = [
    {
      icon: <Building2 className="text-gold-500" size={32} strokeWidth={1.5} />,
      title: "Renda passiva com imóveis",
      message: "Olá Volpi! Quero entrar no grupo de Investidores Imobiliários",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80" // Kitnet/Studio moderno
    },
    {
      icon: <Car className="text-gold-500" size={32} strokeWidth={1.5} />,
      title: "Renda com aluguéis de carro",
      message: "Olá Volpi! Quero entrar no grupo de Alugueis de carros",
      image: "https://images.unsplash.com/photo-1510903117015-f1f964f06a70?auto=format&fit=crop&q=80" // Motorista de aplicativo / Interior de veículo
    },
    {
      icon: <Bike className="text-gold-500" size={32} strokeWidth={1.5} />,
      title: "Renda passiva aluguéis de moto",
      message: "Olá Volpi! Quero entrar no grupo de renda de motos",
      image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&q=80" // Motoboy / Delivery
    },
    {
      icon: <Truck className="text-gold-500" size={32} strokeWidth={1.5} />,
      title: "Renda passiva com caminhões e pesados",
      message: "Olá Volpi! Quero entrar no grupo de Renda com pesados",
      image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&q=80" // Máquina Agrícola / Trator
    }
  ];

  const handleJoinGroup = (message: string) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="renda" className="py-24 bg-bordeaux-950 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.03),transparent)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-gold-500/30 bg-gold-500/10 rounded-full">
            <span className="text-gold-500 text-[10px] font-black tracking-widest uppercase">Oportunidades de Investimento</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-6 uppercase tracking-tight">Quero ter Renda</h2>
          <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed">
            São planos próprios para investidores que buscam uma aposentadoria ou alavancagem de patrimônios através de estratégias inteligentes de crédito.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className="group bg-white/5 border border-white/5 hover:border-gold-500/40 transition-all duration-500 rounded-sm flex flex-col overflow-hidden"
            >
              <div className="h-40 overflow-hidden relative">
                <img 
                  src={plan.image} 
                  alt={plan.title} 
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bordeaux-950 via-transparent to-transparent"></div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-6 text-gold-500 group-hover:scale-110 transition-transform duration-300">
                  {plan.icon}
                </div>
                <h3 className="text-lg font-serif font-black text-white mb-6 uppercase tracking-tight leading-tight group-hover:text-gold-500 transition-colors">
                  {plan.title}
                </h3>
                
                <div className="mt-auto">
                  <Button 
                    variant="outline" 
                    fullWidth 
                    className="py-3 text-[10px]"
                    onClick={() => handleJoinGroup(plan.message)}
                  >
                    Entrar no Grupo
                    <ArrowRight size={14} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};