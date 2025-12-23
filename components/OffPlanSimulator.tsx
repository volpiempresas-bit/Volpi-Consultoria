import React, { useState, useEffect } from 'react';
import { TrendingUp, Building2, Calendar, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

export const OffPlanSimulator: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Inputs
  const [propertyValue, setPropertyValue] = useState(500000);
  const [entryPercent, setEntryPercent] = useState(20); // 10% to 40%
  const [constructionMonths, setConstructionMonths] = useState(36);
  const [keysPercentOfEntry, setKeysPercentOfEntry] = useState(30); // % of the entry value aimed for keys
  
  // Corrections
  const [inccRate, setInccRate] = useState(0.6); // Monthly %
  const [financingRateYear, setFinancingRateYear] = useState(10.5); // Year %
  const [financingYears, setFinancingYears] = useState(30);

  // Results State
  const [results, setResults] = useState<any>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  useEffect(() => {
    calculateOffPlan();
  }, [propertyValue, entryPercent, constructionMonths, keysPercentOfEntry, inccRate, financingRateYear, financingYears]);

  const calculateOffPlan = () => {
    // 1. Definição da Entrada Total
    const totalEntry = propertyValue * (entryPercent / 100);
    
    // 2. Divisão da Entrada
    const signal = totalEntry * 0.10; // 10% da entrada é sinal (fixo conforme prompt)
    const keysValueBase = totalEntry * (keysPercentOfEntry / 100);
    const monthlyTotalBase = totalEntry - signal - keysValueBase;
    
    const baseMonthlyInstallment = monthlyTotalBase / constructionMonths;
    const baseLoanAmount = propertyValue - totalEntry;

    // 3. Evolução durante a obra (INCC)
    let currentLoanBalance = baseLoanAmount;
    let totalPaidDuringConstruction = signal; // Começa com o sinal pago
    let currentCumulativeINCC = 1;
    
    const schedule = [];

    // Loop da Obra
    for (let i = 1; i <= constructionMonths; i++) {
      // INCC do mês
      const monthlyFactor = 1 + (inccRate / 100);
      currentCumulativeINCC *= monthlyFactor;

      // Parcela do mês corrigida (Parcela base * fator acumulado)
      // Nota: Algumas construtoras corrigem o saldo devedor da entrada, outras corrigem a parcela.
      // Assumindo correção direta na parcela base pelo INCC acumulado (comum em calculadoras simples)
      const correctedInstallment = baseMonthlyInstallment * currentCumulativeINCC;
      
      // O Saldo Devedor (que será financiado) também é corrigido pelo INCC mensalmente
      currentLoanBalance *= monthlyFactor;

      totalPaidDuringConstruction += correctedInstallment;

      schedule.push({
        month: i,
        baseParcel: baseMonthlyInstallment,
        inccAccumulated: (currentCumulativeINCC - 1) * 100,
        correctedParcel: correctedInstallment,
        loanBalance: currentLoanBalance
      });
    }

    // Pagamento nas chaves também é corrigido pelo INCC total do período
    const correctedKeysPayment = keysValueBase * currentCumulativeINCC;
    totalPaidDuringConstruction += correctedKeysPayment;

    // O Saldo Devedor final nas chaves
    const finalLoanBalance = currentLoanBalance;

    // 4. Financiamento Pós-Chaves (Sistema PRICE)
    const rateMonth = Math.pow(1 + (financingRateYear / 100), 1/12) - 1;
    const totalMonthsFinancing = financingYears * 12;
    
    const financingParcel = finalLoanBalance * (rateMonth * Math.pow(1 + rateMonth, totalMonthsFinancing)) / (Math.pow(1 + rateMonth, totalMonthsFinancing) - 1);

    setResults({
      signal,
      baseMonthlyInstallment,
      monthlyTotalBase,
      keysValueBase,
      correctedKeysPayment,
      totalPaidDuringConstruction,
      finalLoanBalance,
      financingParcel,
      schedule
    });
  };

  if (!results) return null;

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Input Section */}
      <div className="space-y-4">
        {/* Valor Imóvel */}
        <div>
           <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
             <span>Valor do Imóvel</span>
             <span className="text-graphite-900 font-bold">{formatCurrency(propertyValue)}</span>
           </div>
           <input 
             type="range" min="150000" max="1000000" step="10000" 
             value={propertyValue} onChange={(e) => setPropertyValue(Number(e.target.value))}
             className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-graphite-900"
           />
        </div>

        {/* Grid Inputs */}
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Entrada ({entryPercent}%)</label>
                <div className="flex items-center gap-2 mt-1">
                    <input 
                        type="range" min="10" max="40" step="1"
                        value={entryPercent} onChange={(e) => setEntryPercent(Number(e.target.value))}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
                    />
                </div>
            </div>
            <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Prazo Obra</label>
                 <select 
                    value={constructionMonths}
                    onChange={(e) => setConstructionMonths(Number(e.target.value))}
                    className="w-full mt-1 bg-slate-50 border border-slate-200 text-xs py-1 px-2 rounded font-medium text-graphite-900"
                 >
                    <option value="12">12 meses</option>
                    <option value="24">24 meses</option>
                    <option value="36">36 meses</option>
                    <option value="48">48 meses</option>
                 </select>
            </div>
        </div>
        
        {/* Advanced Config Toggle */}
        <div className="pt-2 border-t border-dashed border-slate-200">
             <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
                <span className="text-xs font-semibold text-gold-600 flex items-center gap-1">
                    <DollarSign size={12}/> Configurar Taxas e Balões
                </span>
                {showDetails ? <ChevronUp size={14} className="text-slate-400"/> : <ChevronDown size={14} className="text-slate-400"/>}
             </div>
             
             {showDetails && (
                 <div className="grid grid-cols-2 gap-3 mt-3 bg-slate-50 p-3 rounded text-xs">
                    <div>
                        <label className="block text-slate-500 mb-1">INCC Mensal (%)</label>
                        <input type="number" step="0.1" value={inccRate} onChange={(e) => setInccRate(Number(e.target.value))} className="w-full border border-slate-300 rounded px-2 py-1"/>
                    </div>
                    <div>
                        <label className="block text-slate-500 mb-1">Nas Chaves (% da Entr.)</label>
                        <input type="number" step="5" value={keysPercentOfEntry} onChange={(e) => setKeysPercentOfEntry(Number(e.target.value))} className="w-full border border-slate-300 rounded px-2 py-1"/>
                    </div>
                    <div>
                        <label className="block text-slate-500 mb-1">Juros Financ. (% a.a)</label>
                        <input type="number" step="0.1" value={financingRateYear} onChange={(e) => setFinancingRateYear(Number(e.target.value))} className="w-full border border-slate-300 rounded px-2 py-1"/>
                    </div>
                    <div>
                        <label className="block text-slate-500 mb-1">Anos Financ.</label>
                        <input type="number" value={financingYears} onChange={(e) => setFinancingYears(Number(e.target.value))} className="w-full border border-slate-300 rounded px-2 py-1"/>
                    </div>
                 </div>
             )}
        </div>
      </div>

      {/* Results Display */}
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
        <h4 className="text-xs font-bold text-graphite-900 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Building2 size={14} className="text-gold-500"/> Fluxo de Pagamento
        </h4>
        
        <div className="space-y-3">
            {/* Fluxo Obra */}
            <div className="grid grid-cols-2 gap-y-2 text-xs border-b border-slate-200 pb-3">
                <span className="text-slate-500">Ato (Sinal):</span>
                <span className="text-right font-medium text-graphite-900">{formatCurrency(results.signal)}</span>
                
                <span className="text-slate-500">Mensais ({constructionMonths}x):</span>
                <div className="text-right">
                    <span className="block font-medium text-graphite-900">Inicia em {formatCurrency(results.schedule[0].baseParcel)}</span>
                    <span className="text-[10px] text-red-500">Termina ~ {formatCurrency(results.schedule[results.schedule.length - 1].correctedParcel)}</span>
                </div>

                <span className="text-slate-500">Nas Chaves:</span>
                <div className="text-right">
                     <span className="block font-medium text-graphite-900">{formatCurrency(results.keysValueBase)}</span>
                     <span className="text-[10px] text-red-500">Corr. {formatCurrency(results.correctedKeysPayment)}</span>
                </div>
            </div>

            {/* Pós Obra */}
            <div className="pt-1">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-700">Saldo a Financiar:</span>
                    <span className="text-sm font-bold text-graphite-900">{formatCurrency(results.finalLoanBalance)}</span>
                </div>
                <div className="bg-white border border-slate-200 p-2 rounded flex justify-between items-center">
                    <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Parcela Pós-Chaves</span>
                        <span className="text-[10px] text-slate-400">Price • {financingYears} anos</span>
                    </div>
                    <span className="text-lg font-serif font-bold text-graphite-900">{formatCurrency(results.financingParcel)}</span>
                </div>
            </div>
        </div>
      </div>

      {/* Mini Table Preview */}
      <div className="border border-slate-100 rounded overflow-hidden">
          <div className="bg-slate-100 px-3 py-2 text-[10px] font-bold text-slate-500 flex justify-between uppercase tracking-wider">
              <span>Mês</span>
              <span>Parcela + INCC</span>
          </div>
          <div className="max-h-24 overflow-y-auto custom-scrollbar">
              {results.schedule.map((row: any) => (
                  <div key={row.month} className="flex justify-between px-3 py-1.5 text-xs border-b border-slate-50 last:border-0 hover:bg-slate-50 text-slate-600">
                      <span>{row.month}º</span>
                      <span className="font-mono">{formatCurrency(row.correctedParcel)}</span>
                  </div>
              ))}
          </div>
      </div>

      <div className="text-[10px] text-center text-slate-400 leading-tight bg-yellow-50 p-2 rounded border border-yellow-100">
         <strong>Atenção:</strong> Simulação educativa. O INCC varia mensalmente e impacta o saldo devedor e as parcelas. O financiamento bancário depende de aprovação de crédito na entrega das chaves.
      </div>

    </div>
  );
};