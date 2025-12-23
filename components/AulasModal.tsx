import React from 'react';
import { X, BookOpen, Download, Play, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from './Button';
import { WHATSAPP_NUMBER } from '../types';

interface AulasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AulasModal: React.FC<AulasModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    const msg = "Olá Volpi! Vi no site o 'Guia definitivo de alavancagem patrimonial' e gostaria de receber o PDF gratuito.";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 bg-bordeaux-950/95 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="bg-bordeaux-900 border border-gold-500/20 w-full max-w-4xl rounded-sm shadow-2xl relative overflow-hidden my-auto">
        <div className="absolute top-0 left-0 w-full h-1 bg-gold-500"></div>
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white z-10"><X size={24} /></button>

        <div className="p-6 md:p-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-gold-500/30 bg-gold-500/10 rounded-full">
              <BookOpen className="text-gold-500" size={14} />
              <span className="text-gold-500 text-[10px] font-black tracking-widest uppercase">Conteúdo Educativo</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-white uppercase tracking-tight mb-4">Aulas e Materiais</h2>
            <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto">
              Domine as estratégias de crédito que os grandes investidores utilizam para construir patrimônio.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Bloco Destaque: PDF */}
            <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-gold-500/10 to-transparent border border-gold-500/30 p-8 rounded-sm flex flex-col md:flex-row items-center gap-8 group">
              <div className="w-24 h-32 bg-bordeaux-950 border border-gold-500/40 flex items-center justify-center rounded-sm shadow-2xl relative group-hover:scale-105 transition-transform">
                <FileText size={48} className="text-gold-500" />
                <div className="absolute -bottom-2 -right-2 bg-gold-500 text-bordeaux-950 p-1 rounded-full"><Download size={14} strokeWidth={3} /></div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-serif font-black text-white uppercase mb-2">Guia Definitivo de Alavancagem Patrimonial</h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  O passo a passo completo para utilizar o consórcio como ferramenta de investimento e multiplicação de capital.
                </p>
                <Button onClick={handleDownloadPDF} className="shadow-glow py-4 px-8">
                  Baixar PDF Gratuito
                  <Download size={18} className="ml-2" />
                </Button>
              </div>
            </div>

            {/* Outros Blocos */}
            <div className="bg-white/5 border border-white/5 p-8 rounded-sm hover:border-gold-500/30 transition-all flex flex-col">
              <div className="mb-6 p-4 bg-bordeaux-950 rounded-full inline-block self-start"><Play className="text-gold-500" size={24} /></div>
              <h4 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">Aulas em Vídeo</h4>
              <p className="text-white/40 text-sm mb-6 flex-grow">Acesse minha biblioteca de aulas sobre contemplação estratégica e análise de lances.</p>
              <button onClick={() => window.open('https://instagram.com/volpiconsultor', '_blank')} className="text-gold-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all">
                Ver no Instagram <ArrowRight size={14} />
              </button>
            </div>

            <div className="bg-white/5 border border-white/5 p-8 rounded-sm hover:border-gold-500/30 transition-all flex flex-col">
              <div className="mb-6 p-4 bg-bordeaux-950 rounded-full inline-block self-start"><ShieldCheck className="text-gold-500" size={24} /></div>
              <h4 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">Mentoria VIP</h4>
              <p className="text-white/40 text-sm mb-6 flex-grow">Entenda como funciona o acompanhamento exclusivo para investidores de alta renda.</p>
              <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')} className="text-gold-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all">
                Saber Mais <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};