import React from 'react';
import { X, MessageCircle, Home, Car, Bike, Truck, ArrowRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../types';

interface OpportunitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OpportunitiesModal: React.FC<OpportunitiesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const groups = [
    { title: 'Grupo de Imóvel', icon: <Home size={20} />, message: 'Olá! Quero entrar no grupo de oportunidades de IMÓVEIS.' },
    { title: 'Grupo de Carro', icon: <Car size={20} />, message: 'Olá! Quero entrar no grupo de oportunidades de CARROS.' },
    { title: 'Grupo de Moto', icon: <Bike size={20} />, message: 'Olá! Quero entrar no grupo de oportunidades de MOTOS.' },
    { title: 'Grupo de Pesados', icon: <Truck size={20} />, message: 'Olá! Quero entrar no grupo de oportunidades de PESADOS.' },
  ];

  const handleJoin = (msg: string) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-bordeaux-950/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-bordeaux-900 border border-gold-500/20 w-full max-w-md rounded-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gold-500"></div>
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white"><X size={24} /></button>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-green-500/10 rounded-sm">
              <MessageCircle className="text-green-500" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-black text-white uppercase tracking-tight">Oportunidades</h2>
              <p className="text-gold-500 text-[10px] font-black uppercase tracking-widest">Grupos Exclusivos WhatsApp</p>
            </div>
          </div>

          <div className="space-y-3">
            {groups.map((group, i) => (
              <button
                key={i}
                onClick={() => handleJoin(group.message)}
                className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-gold-500/40 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="text-gold-500 group-hover:scale-110 transition-transform">{group.icon}</div>
                  <span className="text-sm font-bold text-white uppercase tracking-widest">{group.title}</span>
                </div>
                <ArrowRight size={16} className="text-white/20 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
          
          <p className="mt-8 text-center text-[9px] text-white/20 uppercase font-black tracking-widest">
            Acompanhe as melhores cotas e lances em tempo real
          </p>
        </div>
      </div>
    </div>
  );
};