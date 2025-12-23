import React, { useState } from 'react';
import { X, ArrowRight, ClipboardCheck, Building2, Car, Bike, Briefcase, HelpCircle } from 'lucide-react';
import { Button } from './Button';
import { WHATSAPP_NUMBER } from '../types';

interface SpecialistFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpecialistFormModal: React.FC<SpecialistFormModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    status: 'Estou decidindo',
    objective: 'Imóvel',
    value: '',
    maxInstallment: '',
    entry: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá Volpi! Solicito uma consultoria personalizada.\n\n` +
      `*Momento:* ${formData.status}\n` +
      `*Objetivo:* ${formData.objective.toUpperCase()}\n` +
      `*Valor do Bem:* ${formData.value}\n` +
      `*Parcela Máxima:* ${formData.maxInstallment}\n` +
      `*Recurso de Entrada:* ${formData.entry}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
    setStep(1); // Reset step for next open
  };

  const objectives = [
    { id: 'Imóvel', icon: <Building2 size={20} /> },
    { id: 'Automóvel', icon: <Car size={20} /> },
    { id: 'Moto', icon: <Bike size={20} /> },
    { id: 'Serviços', icon: <Briefcase size={20} /> },
  ];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-6 bg-bordeaux-950/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-bordeaux-900 border border-gold-500/20 w-full max-w-xl rounded-sm shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gold-500"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gold-500/10 rounded-sm">
              <ClipboardCheck className="text-gold-500" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-black text-white uppercase tracking-tight">Consultoria Técnica</h2>
              <p className="text-gold-500 text-[10px] font-black uppercase tracking-widest">Felipe Volpi • Especialista de Crédito</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Status & Objective */}
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <HelpCircle size={12} className="text-gold-500" /> Em que momento você está?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Estou decidindo', 'Estou pesquisando'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData({...formData, status})}
                      className={`py-3 px-4 text-xs font-bold rounded-sm border transition-all ${
                        formData.status === status 
                        ? 'border-gold-500 bg-gold-500/10 text-gold-500' 
                        : 'border-white/10 bg-white/5 text-white/40 hover:border-white/20'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">O que deseja adquirir?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {objectives.map((obj) => (
                    <button
                      key={obj.id}
                      type="button"
                      onClick={() => setFormData({...formData, objective: obj.id})}
                      className={`flex flex-col items-center gap-2 py-4 px-2 text-[10px] font-bold rounded-sm border transition-all ${
                        formData.objective === obj.id 
                        ? 'border-gold-500 bg-gold-500/10 text-gold-500 shadow-glow' 
                        : 'border-white/10 bg-white/5 text-white/40 hover:border-white/20'
                      }`}
                    >
                      {obj.icon}
                      {obj.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2: Financials */}
            <div className="space-y-5 pt-6 border-t border-white/5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Valor Estimado do Bem</label>
                  <input
                    required
                    type="text"
                    placeholder="Ex: R$ 450.000,00"
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white font-bold outline-none focus:border-gold-500 transition-colors placeholder:text-white/10"
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Parcela Máxima Disponível</label>
                  <input
                    required
                    type="text"
                    placeholder="Ex: R$ 2.800,00"
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white font-bold outline-none focus:border-gold-500 transition-colors placeholder:text-white/10"
                    value={formData.maxInstallment}
                    onChange={(e) => setFormData({...formData, maxInstallment: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Recurso de Entrada</label>
                <input
                  required
                  type="text"
                  placeholder="Ex: R$ 30 mil ou Bem Quitado (Carro/Moto)"
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-4 text-white font-bold outline-none focus:border-gold-500 transition-colors placeholder:text-white/10"
                  value={formData.entry}
                  onChange={(e) => setFormData({...formData, entry: e.target.value})}
                />
                <p className="mt-2 text-[9px] text-gold-500/50 uppercase font-bold tracking-wider">Pode ser FGTS ou veículo quitado como oferta de lance.</p>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" fullWidth className="py-5 shadow-glow text-base">
                Iniciar Minha Consulta Gratuita
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </div>
            
            <p className="text-center text-[9px] text-white/20 uppercase font-black tracking-[0.3em]">
              Seus dados estão protegidos • Atendimento em Florianópolis-SC
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};