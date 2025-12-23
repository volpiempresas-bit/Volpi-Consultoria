import React from 'react';
import { X, MessageCircle, Home, Car, Truck, ArrowRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../types';

interface OpportunitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OpportunitiesModal: React.FC<OpportunitiesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const groups = [
    { 
      title: 'Compra e venda de imóveis', 
      icon: <Home size={20} />, 
      message: 'Olá! Quero entrar no grupo de COMPRA E VENDA DE IMÓVEIS.' 
    },
    { 
      title: 'Compra e venda de automóveis e motos', 
      icon: <Car size={20} />, 
      message: 'Olá! Quero entrar no grupo de COMPRA E VENDA DE AUTOMÓVEIS E MOTOS.' 
    },
    { 
      title: 'Compra e venda Caminhões e Pesados', 
      icon: <Truck size={20} />, 
      message: 'Olá! Quero entrar no grupo de COMPRA E VENDA DE CAMINHÕES E PESADOS.' 
    },
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
              <h2 className="text-xl font-serif font-black text-white uppercase tracking-tight">Grupos Exclusivos</h2>
              <p className="text-gold-500 text-[10px] font-black uppercase tracking-widest">Oportunidades no Whatsapp</p>
            </div>
          </div>

          <div className="space-y-3">
            {groups.map((group, i) => (
              <button
                key={i}
                onClick={() => handleJoin(group.message)}
                className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-gold-500/40 hover:bg-white/10 transition-all group text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="text-gold-500 group-hover:scale-110 transition-transform shrink-0">{group.icon}</div>
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">{group.title}</span>
                </div>
                <ArrowRight size={16} className="text-white/20 group-hover:text-gold-500 group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            ))}
          </div>
          
          <p className="mt-8 text-center text-[9px] text-white/20 uppercase font-black tracking-widest">
            Acompanhe ofertas e negociações em tempo real
          </p>
        </div>
      </div>
    </div>
  );
};