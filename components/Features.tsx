import React from 'react';
import { Users, Home, CarFront, Bike, PlusCircle } from 'lucide-react';

interface FeaturesProps {
  onOpenPropertyForm: () => void;
  onOpenVehicleForm: () => void;
  onOpenServiceForm: () => void;
  onOpenOtherForm: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ 
  onOpenPropertyForm, 
  onOpenVehicleForm, 
  onOpenServiceForm,
  onOpenOtherForm
}) => {
  const features = [
    {
      id: 'property',
      icon: <Home className="text-gold-500" size={32} strokeWidth={1.5} />,
      title: "Imóvel",
      description: "casa, apartamento, casa geminada, sobrado, imóvel na planta.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      handler: onOpenPropertyForm
    },
    {
      id: 'vehicle',
      icon: <CarFront className="text-gold-500" size={32} strokeWidth={1.5} />,
      title: "Automóveis",
      description: "Carros, SUVs, Importados, Caminhões, Máquinas pesadas.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80",
      handler: onOpenVehicleForm
    },
    {
      id: 'moto',
      icon: <Bike className="text-gold-500" size={32} strokeWidth={1.5} />,
      title: "Motos e Serviços",
      description: "motocicletas, reformas, viagens, casamentos, eventos.",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80",
      handler: onOpenServiceForm
    },
    {
      id: 'other',
      icon: <PlusCircle className="text-gold-500" size={32} strokeWidth={1.5} />,
      title: "Outro",
      description: "Descreva o bem que deseja.",
      image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80",
      handler: onOpenOtherForm
    }
  ];

  return (
    <section id="diferenciais" className="py-24 bg-bordeaux-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 uppercase tracking-tight text-center">Qual bem você deseja ?</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-lg text-white/70 font-medium leading-relaxed">
            Escolha uma das opções para uma simulação personalizada
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              onClick={() => feature.handler && feature.handler()}
              className={`group rounded-sm transition-all duration-300 bg-white/5 border border-white/5 hover:border-gold-500/30 hover:bg-white/10 flex flex-col h-full overflow-hidden ${feature.handler ? 'cursor-pointer' : ''}`}
            >
              {feature.image && (
                <div className="w-full h-48 overflow-hidden relative">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bordeaux-900 via-transparent to-transparent"></div>
                  {feature.handler && (
                    <div className="absolute top-4 right-4 bg-gold-500 text-bordeaux-950 text-[10px] font-black px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      CLIQUE PARA SIMULAR
                    </div>
                  )}
                </div>
              )}
              
              <div className="p-8 flex-grow">
                <div className="mb-6 p-4 bg-bordeaux-950 rounded-full inline-block group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 font-serif uppercase tracking-wider">{feature.title}</h3>
                <p className="text-white/50 text-sm font-medium leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};