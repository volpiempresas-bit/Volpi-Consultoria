import React, { useState } from 'react';
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
    months: 60, // Default for vehicles
    name: '',
    phone: ''
  });

  // Reset defaults when type changes
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

  // Logic for Property Comparison (Legacy logic preserved for Property/Service)
  const calculatePropertyComparison = (amount: number) => {
    const finRateYear = 0.1149;
    const finMonths = 480;
    const finRateMonth = Math.pow(1 + finRateYear, 1/12) - 1;
    const finPMT = amount * (finRateMonth * Math.pow(1 + finRateMonth, finMonths)) / (Math.pow(1 + finRateMonth, finMonths) - 1);
    const finTotal = finPMT * finMonths;

    const consRateYear = 0.0144; // Custos administrativos aprox
    const consYears = 20;
    const consMonths = 240;
    const consTotalFeePercentage = consRateYear * consYears; 
    const consTotal = amount * (1 + consTotalFeePercentage);
    const consPMT = consTotal / consMonths;

    return {
      finTotal,
      finPMT,
      finMonths,
      finRateDisplay: "11,49% a.a.",
      consTotal,
      consPMT,
      consMonths,
      consRateDisplay: "1,44% a.a.",
      economy: finTotal - consTotal,
      labelFin: "Financiamento (40 Anos)",
      labelCons: "Consórcio (20 Anos)"
    };
  };

  // Logic for Vehicle Comparison (New Request)
  const calculateVehicleComparison = (amount: number, months: number) => {
    // Financing: 28% a.a. compound interest
    const finRateYear = 0.28;
    const finRateMonth = Math.pow(1 + finRateYear, 1/12) - 1;
    const finPMT = amount * (finRateMonth * Math.pow(1 + finRateMonth, months)) / (Math.pow(1 + finRateMonth, months) - 1);
    const finTotal = finPMT * months;
    const finInterest = finTotal - amount;

    // Consortium: 22% TOTAL admin fee embedded
    const consTotalFeePercentage = 0.22;
    const consTotal = amount * (1 + consTotalFeePercentage);
    const consPMT = consTotal / months;

    return {
      finTotal,
      finPMT,
      finMonths: months,
      finInterest,
      finRateDisplay: "28% a.a.",
      consTotal,
      consPMT,
      consMonths: months,
      consRateDisplay: "Tx. Adm Total 22%",
      economy: finTotal - consTotal,
      labelFin: `Financiamento (${months}x)`,
      labelCons: `Consórcio (${months}x)`
    };
  };

  const getComparison = () => {
    if (formData.type === ConsortiumType.VEHICLE) {
      return calculateVehicleComparison(formData.amount, formData.months);
    }
    return calculatePropertyComparison(formData.amount);
  };

  const comparison = getComparison();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let comparisonText = "";
    if (formData.type === ConsortiumType.VEHICLE) {
      comparisonText = `*Comparativo Veículo (${formData.months} meses):*\nFinanciamento: ${formatCurrency(comparison.finTotal)}\nConsórcio: ${formatCurrency(comparison.consTotal)}`;
    } else {
      comparisonText = `*Comparativo Imóvel:*\nFinanciamento (40 anos): ${formatCurrency(comparison.finTotal)}\nConsórcio (20 anos): ${formatCurrency(comparison.consTotal)}`;
    }

    const message = `Olá, Volpi. Fiz uma simulação de Comparativo no site.\n\n*Objetivo:* ${formData.type}\n*Crédito:* ${formatCurrency(formData.amount)}\n\n${comparisonText}\n*Economia Projetada:* ${formatCurrency(comparison.economy)}\n\n*Meus dados:*\nNome: ${formData.name}\nTelefone: ${formData.phone}`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  // Range configurations based on type
  const rangeConfig = formData.type === ConsortiumType.VEHICLE 
    ? { min: 30000, max: 500000, step: 1000, labelMin: 'R$ 30 mil', labelMax: 'R$ 500 mil' }
    : { min: 150000, max: 2000000, step: 5000, labelMin: 'R$ 150 mil', labelMax: 'R$ 2 mi+' };

  return (
    <div id="simulador" className="relative bg-white shadow-sharp max-w-md w-full ml-auto overflow-hidden rounded-xl border border-slate-100">
      
      {/* Tab Header */}
      <div className="flex border-b border-slate-100 bg-slate-50/50">
        <button 
          onClick={() => setActiveTab('consortium')}
          className={`flex-1 py-4 text-xs font-extrabold uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${
            activeTab === 'consortium' 
              ? 'bg-white text-graphite-900 border-b-2 border-gold-500 shadow-sm' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Coins size={16} strokeWidth={2.5} />
          Comparativo
        </button>
        <button 
          onClick={() => setActiveTab('offplan')}
          className={`flex-1 py-4 text-xs font-extrabold uppercase tracking-wide flex items-center justify-center gap-2 transition-all ${
            activeTab === 'offplan' 
              ? 'bg-white text-graphite-900 border-b-2 border-gold-500 shadow-sm' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Building size={16} strokeWidth={2.5} />
          Imóvel Planta
        </button>
      </div>

      <div className="p-6 md:p-8">
        
        {/* Render Consortium/Vehicle Simulator */}
        {activeTab === 'consortium' && (
           <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
             
             <div className="mb-2">
                <h3 className="text-2xl font-serif font-bold text-graphite-900 leading-tight">Simulador Inteligente</h3>
                <p className="text-slate-500 text-sm mt-1 font-medium">Selecione seu objetivo para começar.</p>
             </div>
        
            {/* Step 1: Selection & Slider */}
            <div className={step === 1 ? 'block space-y-8' : 'hidden'}>
                <div>
                  <div className="grid grid-cols-3 gap-3">
                      {[ConsortiumType.PROPERTY, ConsortiumType.VEHICLE, ConsortiumType.SERVICE].map((type) => (
                      <button
                          key={type}
                          type="button"
                          onClick={() => handleTypeChange(type)}
                          className={`px-2 py-4 text-sm font-bold rounded-lg transition-all border-2 ${
                          formData.type === type
                              ? 'border-gold-500 bg-gold-50 text-graphite-900 shadow-sm'
                              : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                          }`}
                      >
                          {type === ConsortiumType.VEHICLE ? <div className="flex flex-col items-center gap-1"><Car size={20}/> {type}</div> : type}
                      </button>
                      ))}
                  </div>
                </div>

                {/* Amount Slider */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="flex justify-between items-end mb-4">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Valor do Crédito</label>
                      <span className="text-2xl font-extrabold text-graphite-900">{formatCurrency(formData.amount)}</span>
                  </div>
                  <input
                      type="range"
                      min={rangeConfig.min}
                      max={rangeConfig.max}
                      step={rangeConfig.step}
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                      className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-graphite-900"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2 uppercase">
                      <span>{rangeConfig.labelMin}</span>
                      <span>{rangeConfig.labelMax}</span>
                  </div>
                </div>

                {/* Months Slider (Vehicle Only) */}
                {formData.type === ConsortiumType.VEHICLE && (
                   <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 animate-in fade-in slide-in-from-top-2">
                     <div className="flex justify-between items-end mb-4">
                         <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Prazo de Pagamento</label>
                         <span className="text-2xl font-extrabold text-graphite-900">{formData.months} meses</span>
                     </div>
                     <input
                         type="range"
                         min="36"
                         max="100"
                         step="1"
                         value={formData.months}
                         onChange={(e) => setFormData({ ...formData, months: Number(e.target.value) })}
                         className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
                     />
                     <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2 uppercase">
                         <span>36 meses</span>
                         <span>100 meses</span>
                     </div>
                   </div>
                )}

                <Button 
                    type="button" 
                    fullWidth 
                    onClick={() => setStep(2)}
                    className="group py-4 text-base font-bold shadow-lg shadow-graphite-900/20"
                >
                Simular Economia
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            {/* Step 2: Comparison Result & Form */}
            <div className={step === 2 ? 'block space-y-6 animate-in slide-in-from-right-4 fade-in' : 'hidden'}>
                
                {/* Comparison Card */}
                <div className="bg-white border-2 border-slate-100 p-5 rounded-xl space-y-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
                        <TrendingDown size={20} className="text-gold-600" />
                        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
                          {formData.type === ConsortiumType.VEHICLE ? 'Análise Comparativa' : 'Comparativo de Custo Final'}
                        </span>
                    </div>
                    
                    {/* Financing */}
                    <div className="flex justify-between items-center text-slate-400 opacity-80">
                        <div>
                            <span className="block font-semibold text-xs uppercase mb-1">{comparison.labelFin}</span>
                            <span className="text-[10px] bg-slate-100 px-1 py-0.5 rounded font-bold">Juros {comparison.finRateDisplay}</span>
                        </div>
                        <div className="text-right">
                            <span className="block font-medium text-lg line-through decoration-red-400 decoration-2">{formatCurrency(comparison.finTotal)}</span>
                            <span className="text-[10px] font-medium">~ {formatCurrency(comparison.finPMT)}/mês</span>
                        </div>
                    </div>

                     {/* Consortium */}
                     <div className="flex justify-between items-center py-3 px-3 -mx-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div>
                            <span className="block font-bold text-graphite-900 text-sm mb-1">Consórcio Volpi</span>
                            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">{comparison.consRateDisplay}</span>
                        </div>
                        <div className="text-right">
                            <span className="block font-extrabold text-2xl text-graphite-900">{formatCurrency(comparison.consTotal)}</span>
                            <span className="text-xs font-bold text-slate-500">~ {formatCurrency(comparison.consPMT)}/mês</span>
                        </div>
                    </div>

                    {/* Economy */}
                    <div className="bg-graphite-900 p-4 rounded-lg text-center shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gold-400"></div>
                        <span className="text-xs text-slate-400 font-bold block uppercase tracking-widest mb-1">Economia Gerada</span>
                        <span className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">{formatCurrency(comparison.economy)}</span>
                    </div>
                </div>
                
                {/* Explanation Text for Vehicles */}
                {formData.type === ConsortiumType.VEHICLE && (
                  <div className="flex gap-3 items-start bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <Info size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-900 font-medium leading-relaxed">
                      <strong>Entenda a diferença:</strong> No financiamento, você paga juros sobre juros (28% a.a.). No consórcio, a taxa é fixa (22% total) e diluída no prazo, resultando nessa economia expressiva.
                    </p>
                  </div>
                )}

                {/* Lead Form */}
                <div className="space-y-4">
                    <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Seu Nome</label>
                    <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold-500 focus:bg-white focus:ring-1 focus:ring-gold-500 outline-none transition-all placeholder:text-slate-300 text-sm font-semibold text-graphite-900"
                        placeholder="Digite seu nome"
                    />
                    </div>
                    <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Seu WhatsApp</label>
                    <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-gold-500 focus:bg-white focus:ring-1 focus:ring-gold-500 outline-none transition-all placeholder:text-slate-300 text-sm font-semibold text-graphite-900"
                        placeholder="(DDD) 99999-9999"
                    />
                    </div>
                </div>
                
                <div className="flex gap-4 pt-2 items-center">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 hover:underline px-2"
                  >
                    VOLTAR
                  </button>
                  <Button type="submit" fullWidth className="group text-sm font-bold py-3 shadow-lg hover:shadow-gold-400/20">
                    RECEBER PROPOSTA
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400">
                  <ShieldCheck size={12} />
                  <span>Seus dados estão seguros.</span>
                </div>
            </div>
          </form>
        )}

        {/* Render OffPlan Simulator */}
        {activeTab === 'offplan' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="mb-6">
                 <h3 className="text-xl font-serif font-bold text-graphite-900">Calculadora Imóvel na Planta</h3>
                 <p className="text-slate-500 text-sm font-medium mt-1">Entenda o impacto do INCC.</p>
               </div>
               <OffPlanSimulator />
            </div>
        )}

      </div>
    </div>
  );
};