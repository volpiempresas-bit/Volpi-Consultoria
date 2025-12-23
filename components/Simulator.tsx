import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingDown, Building, Coins, Car, Info, ShieldCheck } from 'lucide-react';
import { ConsortiumType, WHATSAPP_NUMBER } from '../types';
import { Button } from './Button';
import { OffPlanSimulator } from './OffPlanSimulator';

export const Simulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'consortium' | 'offplan'>('consortium');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: ConsortiumType.PROPERTY,
    amount: 300000,
    months: 60,
    name: '',
    phone: ''
  });

  const handleTypeChange = (type: ConsortiumType) => {
    let newAmount = formData.amount;
    let newMonths = formData.months;

    if (type === ConsortiumType.VEHICLE) {
      newAmount = 50000;
      newMonths = 60;
    } else if (type === ConsortiumType.PROPERTY) {
      newAmount = 300000;
    }

    setFormData({ ...formData, type, amount: newAmount, months: newMonths });
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const calculatePropertyComparison = (amount: number) => {
    const finRateYear = 0.1149;
    const finMonths = 480;
    const finRateMonth = Math.pow(1 + finRateYear, 1/12) - 1;
    const finPMT = amount * (finRateMonth * Math.pow(1 + finRateMonth, finMonths)) / (Math.pow(1 + finRateMonth, finMonths) - 1);
    const finTotal = finPMT * finMonths;
    const consRateYear = 0.0144;
    const consYears = 20;
    const consMonths = 240;
    const consTotalFeePercentage = consRateYear * consYears; 
    const consTotal = amount * (1 + consTotalFeePercentage);
    const consPMT = consTotal / consMonths;

    return {
      finTotal, finPMT, finMonths, finRateDisplay: "11,49% a.a.",
      consTotal, consPMT, consMonths, consRateDisplay: "1,44% a.a.",
      economy: finTotal - consTotal,
      labelFin: "Financiamento (40 Anos)",
      labelCons: "Consórcio (20 Anos)"
    };
  };

  const calculateVehicleComparison = (amount: number, months: number) => {
    const finRateYear = 0.28;
    const finRateMonth = Math.pow(1 + finRateYear, 1/12) - 1;
    const finPMT = amount * (finRateMonth * Math.pow(1 + finRateMonth, months)) / (Math.pow(1 + finRateMonth, months) - 1);
    const finTotal = finPMT * months;
    const consTotalFeePercentage = 0.22;
    const consTotal = amount * (1 + consTotalFeePercentage);
    const consPMT = consTotal / months;

    return {
      finTotal, finPMT, finMonths: months, finRateDisplay: "28% a.a.",
      consTotal, consPMT, consMonths: months, consRateDisplay: "Tx. Adm Total 22%",
      economy: finTotal - consTotal,
      labelFin: `Financiamento (${months}x)`,
      labelCons: `Consórcio (${months}x)`
    };
  };

  const comparison = formData.type === ConsortiumType.VEHICLE 
    ? calculateVehicleComparison(formData.amount, formData.months)
    : calculatePropertyComparison(formData.amount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá, Volpi. Fiz uma simulação no site.\n\n*Objetivo:* ${formData.type}\n*Crédito:* ${formatCurrency(formData.amount)}\n*Economia:* ${formatCurrency(comparison.economy)}\n\nNome: ${formData.name}\nWhatsApp: ${formData.phone}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const rangeConfig = formData.type === ConsortiumType.VEHICLE 
    ? { min: 30000, max: 500000, step: 1000, labelMin: 'R$ 30 mil', labelMax: 'R$ 500 mil' }
    : { min: 150000, max: 2000000, step: 5000, labelMin: 'R$ 150 mil', labelMax: 'R$ 2 mi+' };

  return (
    <div id="simulador" className="relative bg-bordeaux-950/40 backdrop-blur-xl shadow-2xl max-w-md w-full ml-auto overflow-hidden rounded-sm border border-gold-500/20">
      
      <div className="flex border-b border-white/5 bg-white/5">
        <button 
          onClick={() => setActiveTab('consortium')}
          className={`flex-1 py-5 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
            activeTab === 'consortium' 
              ? 'bg-bordeaux-950 text-gold-500 border-b-2 border-gold-500 shadow-inner' 
              : 'text-white/40 hover:text-white/60'
          }`}
        >
          <Coins size={16} strokeWidth={2.5} />
          Comparativo
        </button>
        <button 
          onClick={() => setActiveTab('offplan')}
          className={`flex-1 py-5 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
            activeTab === 'offplan' 
              ? 'bg-bordeaux-950 text-gold-500 border-b-2 border-gold-500 shadow-inner' 
              : 'text-white/40 hover:text-white/60'
          }`}
        >
          <Building size={16} strokeWidth={2.5} />
          Imóvel Planta
        </button>
      </div>

      <div className="p-8">
        {activeTab === 'consortium' && (
           <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
             
             <div className="mb-2">
                <p className="text-white/50 text-sm mt-1 font-medium">Selecione seu objetivo para começar.</p>
             </div>
        
            <div className={step === 1 ? 'block space-y-8' : 'hidden'}>
                <div className="grid grid-cols-3 gap-3">
                    {[ConsortiumType.PROPERTY, ConsortiumType.VEHICLE, ConsortiumType.SERVICE].map((type) => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => handleTypeChange(type)}
                        className={`px-2 py-4 text-xs font-bold rounded-sm transition-all border ${
                        formData.type === type
                            ? 'border-gold-500 bg-gold-500/10 text-gold-500 shadow-glow'
                            : 'border-white/10 bg-white/5 text-white/40 hover:border-white/20'
                        }`}
                    >
                        {type === ConsortiumType.VEHICLE ? <div className="flex flex-col items-center gap-1"><Car size={20}/> {type}</div> : type}
                    </button>
                    ))}
                </div>

                <div className="bg-white/5 p-5 rounded-sm border border-white/5">
                  <div className="flex justify-between items-end mb-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Valor do Crédito</label>
                      <span className="text-2xl font-extrabold text-gold-500">{formatCurrency(formData.amount)}</span>
                  </div>
                  <input
                      type="range"
                      min={rangeConfig.min}
                      max={rangeConfig.max}
                      step={rangeConfig.step}
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold-500"
                  />
                </div>

                <Button 
                    type="button" 
                    fullWidth 
                    onClick={() => setStep(2)}
                    className="py-5"
                >
                Simular Economia
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            <div className={step === 2 ? 'block space-y-6 animate-in slide-in-from-right-4 fade-in' : 'hidden'}>
                <div className="bg-white/5 border border-white/10 p-5 rounded-sm space-y-4">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                        <TrendingDown size={18} className="text-gold-500" />
                        <span className="text-[10px] font-extrabold text-white/40 uppercase tracking-widest">Análise Comparativa</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-white/40">
                        <div>
                            <span className="block font-semibold text-[10px] uppercase mb-1">{comparison.labelFin}</span>
                            <span className="text-[9px] bg-white/5 px-1 py-0.5 rounded font-bold">Juros {comparison.finRateDisplay}</span>
                        </div>
                        <div className="text-right">
                            <span className="block font-medium text-lg line-through decoration-red-900/50">{formatCurrency(comparison.finTotal)}</span>
                        </div>
                    </div>

                     <div className="flex justify-between items-center py-4 px-4 bg-gold-500/5 border border-gold-500/20 rounded-sm">
                        <div>
                            <span className="block font-bold text-gold-400 text-sm mb-1 uppercase tracking-wider">Consórcio Volpi</span>
                            <span className="text-[9px] bg-gold-500 text-bordeaux-950 px-1.5 py-0.5 rounded font-black">{comparison.consRateDisplay}</span>
                        </div>
                        <div className="text-right">
                            <span className="block font-extrabold text-2xl text-white">{formatCurrency(comparison.consTotal)}</span>
                        </div>
                    </div>

                    <div className="bg-white text-bordeaux-950 p-4 rounded-sm text-center shadow-glow border-b-4 border-gold-600">
                        <span className="text-[10px] font-black block uppercase tracking-widest mb-1 opacity-60">Economia Gerada</span>
                        <span className="text-3xl font-serif font-black tracking-tight">{formatCurrency(comparison.economy)}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-sm focus:border-gold-500 focus:bg-white/10 outline-none transition-all placeholder:text-white/20 text-sm font-bold text-white uppercase"
                        placeholder="Seu Nome Completo"
                    />
                    <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-sm focus:border-gold-500 focus:bg-white/10 outline-none transition-all placeholder:text-white/20 text-sm font-bold text-white uppercase"
                        placeholder="Seu WhatsApp"
                    />
                </div>
                
                <div className="flex gap-4 pt-2 items-center">
                  <button type="button" onClick={() => setStep(1)} className="text-[10px] font-black text-white/30 hover:text-white uppercase">Voltar</button>
                  <Button type="submit" fullWidth>Receber Proposta</Button>
                </div>
            </div>
          </form>
        )}

        {activeTab === 'offplan' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
               <OffPlanSimulator />
            </div>
        )}
      </div>
    </div>
  );
};