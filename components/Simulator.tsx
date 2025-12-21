import React, { useState } from 'react';
import { ArrowRight, TrendingDown, Building, Coins } from 'lucide-react';
import { ConsortiumType, WHATSAPP_NUMBER } from '../types';
import { Button } from './Button';
import { OffPlanSimulator } from './OffPlanSimulator';

export const Simulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'consortium' | 'offplan'>('consortium');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: ConsortiumType.PROPERTY,
    amount: 300000,
    name: '',
    phone: ''
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  // Logic for comparison based on user prompt
  const calculateComparison = (amount: number) => {
    // Financing: 11.49% a.a., 40 years (480 months)
    const finRateYear = 0.1149;
    const finMonths = 480;
    // Monthly rate conversion for Compound Interest (SAC/Price approximation for total)
    const finRateMonth = Math.pow(1 + finRateYear, 1/12) - 1;
    // PMT Formula: P * i * (1+i)^n / ((1+i)^n - 1)
    const finPMT = amount * (finRateMonth * Math.pow(1 + finRateMonth, finMonths)) / (Math.pow(1 + finRateMonth, finMonths) - 1);
    const finTotal = finPMT * finMonths;

    // Consortium: 1.44% a.a. (admin fee cost), 20 years (240 months)
    const consRateYear = 0.0144;
    const consYears = 20;
    const consMonths = 240;
    // Consortium Cost = Amount * (1 + (RateYear * Years))
    // Note: This is an approximation of the Total Admin Fee
    const consTotalFeePercentage = consRateYear * consYears; // 28.8% total fee
    const consTotal = amount * (1 + consTotalFeePercentage);
    const consPMT = consTotal / consMonths;

    return {
      finTotal,
      finPMT,
      consTotal,
      consPMT,
      economy: finTotal - consTotal
    };
  };

  const comparison = calculateComparison(formData.amount);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, amount: Number(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build WhatsApp Message with comparison data
    const message = `Olá, Volpi. Fiz uma simulação de Comparativo no site.\n\n*Objetivo:* ${formData.type}\n*Crédito:* ${formatCurrency(formData.amount)}\n\n*Comparativo Visualizado:*\nFinanciamento (40 anos): ${formatCurrency(comparison.finTotal)}\nConsórcio (20 anos): ${formatCurrency(comparison.consTotal)}\n*Economia Projetada:* ${formatCurrency(comparison.economy)}\n\n*Meus dados:*\nNome: ${formData.name}\nTelefone: ${formData.phone}`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div id="simulador" className="relative bg-white shadow-2xl shadow-slate-900/50 max-w-md w-full ml-auto overflow-hidden rounded-sm">
      
      {/* Tab Header */}
      <div className="flex border-b border-slate-100">
        <button 
          onClick={() => setActiveTab('consortium')}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'consortium' 
              ? 'bg-white text-graphite-900 border-b-2 border-gold-400' 
              : 'bg-slate-50 text-slate-400 hover:text-slate-600'
          }`}
        >
          <Coins size={16} />
          Comparativo
        </button>
        <button 
          onClick={() => setActiveTab('offplan')}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'offplan' 
              ? 'bg-white text-graphite-900 border-b-2 border-gold-400' 
              : 'bg-slate-50 text-slate-400 hover:text-slate-600'
          }`}
        >
          <Building size={16} />
          Imóvel Planta
        </button>
      </div>

      <div className="p-6 md:p-8">
        
        {/* Render Consortium Simulator */}
        {activeTab === 'consortium' && (
           <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
             
             <div className="mb-2">
                <h3 className="text-xl font-serif text-graphite-900">Consórcio vs Financiamento</h3>
                <p className="text-slate-500 text-xs mt-1">Veja quanto você economiza eliminando juros.</p>
             </div>
        
            {/* Step 1: Selection & Slider */}
            <div className={step === 1 ? 'block space-y-6' : 'hidden'}>
                <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Seu objetivo</label>
                <div className="grid grid-cols-3 gap-2">
                    {[ConsortiumType.PROPERTY, ConsortiumType.VEHICLE, ConsortiumType.SERVICE].map((type) => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, type })}
                        className={`px-2 py-3 text-xs md:text-sm font-medium transition-all border ${
                        formData.type === type
                            ? 'border-gold-400 bg-gold-400/10 text-graphite-900'
                            : 'border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}
                    >
                        {type}
                    </button>
                    ))}
                </div>
                </div>

                <div>
                <div className="flex justify-between items-end mb-4">
                    <label className="text-sm font-medium text-slate-700">Valor do Crédito</label>
                    <span className="text-xl font-bold text-graphite-900 font-serif">{formatCurrency(formData.amount)}</span>
                </div>
                <input
                    type="range"
                    min="15000"
                    max="2000000"
                    step="5000"
                    value={formData.amount}
                    onChange={handleRangeChange}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-graphite-900"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                    <span>R$ 15 mil</span>
                    <span>R$ 2 mi+</span>
                </div>
                </div>

                <Button 
                    type="button" 
                    fullWidth 
                    onClick={() => setStep(2)}
                    className="group"
                >
                Ver Comparativo
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            {/* Step 2: Comparison Result & Form */}
            <div className={step === 2 ? 'block space-y-5 animate-in slide-in-from-right-4 fade-in' : 'hidden'}>
                
                {/* Comparison Card */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-sm space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingDown size={18} className="text-gold-500" />
                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Comparativo de Mercado</span>
                    </div>
                    
                    {/* Financing */}
                    <div className="flex justify-between items-center text-xs text-slate-400 pb-2 border-b border-slate-200">
                        <div>
                            <span className="block font-medium text-slate-500">Financiamento (40 anos)</span>
                            <span className="text-[10px]">Juros aprox. 11,49% a.a.</span>
                        </div>
                        <div className="text-right">
                            <span className="block font-medium line-through decoration-red-400/50">{formatCurrency(comparison.finTotal)}</span>
                            <span className="text-[10px]">~ {formatCurrency(comparison.finPMT)}/mês</span>
                        </div>
                    </div>

                     {/* Consortium */}
                     <div className="flex justify-between items-center text-sm pb-1 pt-1">
                        <div>
                            <span className="block font-bold text-graphite-900">Consórcio Volpi (20 anos)</span>
                            <span className="text-[10px] text-slate-500">Taxa aprox. 1,44% a.a.</span>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-graphite-900">{formatCurrency(comparison.consTotal)}</span>
                            <span className="text-[10px] text-slate-500">~ {formatCurrency(comparison.consPMT)}/mês</span>
                        </div>
                    </div>

                    {/* Economy */}
                    <div className="bg-gold-400/10 p-3 rounded text-center border border-gold-400/20">
                        <span className="text-xs text-gold-600 font-semibold block uppercase tracking-wide">Sua Economia</span>
                        <span className="text-xl font-bold text-gold-600 font-serif">{formatCurrency(comparison.economy)}</span>
                    </div>
                </div>

                {/* Lead Form */}
                <div className="space-y-3">
                    <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Seu Nome</label>
                    <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 outline-none transition-all placeholder:text-slate-300 text-sm"
                        placeholder="Nome completo"
                    />
                    </div>
                    <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Seu WhatsApp</label>
                    <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 outline-none transition-all placeholder:text-slate-300 text-sm"
                        placeholder="(DDD) 99999-9999"
                    />
                    </div>
                </div>
                
                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-slate-500 underline decoration-slate-300 hover:text-slate-800"
                  >
                    Refazer
                  </button>
                  <Button type="submit" fullWidth className="group text-sm py-2">
                    Receber Proposta Detalhada
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <p className="text-[10px] text-center text-slate-400 leading-tight">
                  *Simulação estimada. Valores sujeitos a aprovação de crédito e alterações de tabela das administradoras.
                </p>
            </div>
          </form>
        )}

        {/* Render OffPlan Simulator */}
        {activeTab === 'offplan' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="mb-4">
                 <h3 className="text-xl font-serif text-graphite-900">Calculadora Imóvel na Planta</h3>
                 <p className="text-slate-500 text-xs mt-1">Entenda o impacto do INCC e a projeção de parcelas.</p>
               </div>
               <OffPlanSimulator />
            </div>
        )}

      </div>
    </div>
  );
};