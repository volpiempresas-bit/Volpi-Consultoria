import React, { useState } from 'react';
import { X, Bike, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { WHATSAPP_NUMBER } from '../types';

interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceFormModal: React.FC<ServiceFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    serviceType: 'moto',
    maxInstallment: '',
    entry: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá Volpi! Tenho interesse em um consórcio de Motos/Serviços.\n\n` +
      `*Tipo:* ${formData.serviceType.toUpperCase()}\n` +
      `*Parcela Máxima:* ${formData.maxInstallment}\n` +
      `*Valor de Entrada:* ${formData.entry}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-bordeaux-950/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-bordeaux-900 border border-gold-500/20 w-full max-w-lg rounded-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gold-500"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gold-500/10 rounded-sm">
              <Bike className="text-gold-500" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-black text-white uppercase tracking-tight">Motos e Serviços</h2>
              <p className="text-gold-500 text-[10px] font-black uppercase tracking-widest">Planejamento e Lazer</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Selecione o Objetivo</label>
                <select
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white font-bold outline-none focus:border-gold-500 transition-colors appearance-none cursor-pointer"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                >
                  <option value="moto" className="bg-bordeaux-900">Moto</option>
                  <option value="reforma" className="bg-bordeaux-900">Reforma</option>
                  <option value="viagem" className="bg-bordeaux-900">Viagem</option>
                  <option value="evento" className="bg-bordeaux-900">Evento (Casamento/Festa)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Parcela Máxima Disponível</label>
                <input
                  required
                  type="text"
                  placeholder="Ex: R$ 500,00"
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white font-bold outline-none focus:border-gold-500 transition-colors"
                  value={formData.maxInstallment}
                  onChange={(e) => setFormData({...formData, maxInstallment: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Valor de Entrada</label>
                <input
                  required
                  type="text"
                  placeholder="Ex: R$ 5.000,00 ou Não Tenho"
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white font-bold outline-none focus:border-gold-500 transition-colors"
                  value={formData.entry}
                  onChange={(e) => setFormData({...formData, entry: e.target.value})}
                />
              </div>
            </div>

            <Button type="submit" fullWidth className="py-5 shadow-glow">
              Solicitar Análise de Crédito
              <ArrowRight size={20} className="ml-2" />
            </Button>
            
            <p className="text-center text-[9px] text-white/20 uppercase font-black tracking-widest">
              Consultoria Técnica por Felipe Volpi
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};