import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';


interface HeaderProps {
  onOpenOpportunities: () => void;
  onOpenAulas: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenOpportunities, onOpenAulas }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Quero um bem', id: 'diferenciais' },
    { label: 'Quero ter renda', id: 'renda' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-bordeaux-950/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          className="flex flex-col group cursor-pointer" 
          onClick={() => scrollToSection('sobre-mim')}
        >
          <span className="font-serif text-2xl font-black tracking-tight text-white group-hover:text-gold-500 transition-colors">
            VOLPI
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-500">
            Consultor
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-[10px] font-black transition-colors hover:text-gold-500 text-white/70 uppercase tracking-widest"
            >
              {item.label}
            </button>
          ))}
          
          <button
            onClick={onOpenOpportunities}
            className="flex items-center gap-2 text-[10px] font-black transition-colors hover:text-gold-500 text-white/70 uppercase tracking-widest"
          >
            Grupos no Whatsapp
            <MessageCircle size={14} className="text-green-500" />
          </button>

          <button
            onClick={onOpenAulas}
            className="text-[10px] font-black transition-colors hover:text-gold-500 text-white/70 uppercase tracking-widest"
          >
            Aulas
          </button>
          
          <div className="w-px h-5 bg-white/10 mx-1"></div>

          <button
             onClick={() => scrollToSection('contato')}
             className="flex items-center gap-2 px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-bordeaux-950 shadow-glow"
          >
            Reunião
            <ArrowUpRight size={14} strokeWidth={3} />
          </button>
        </nav>

        <button className="md:hidden text-gold-500 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-bordeaux-950 border-t border-white/5 shadow-2xl p-8 md:hidden flex flex-col gap-6 animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-left text-white font-black text-xl uppercase tracking-widest border-b border-white/5 pb-4">
              {item.label}
            </button>
          ))}
          <button onClick={onOpenOpportunities} className="flex items-center gap-3 text-white font-black text-xl uppercase tracking-widest border-b border-white/5 pb-4 text-left">
             Grupos no Whatsapp <MessageCircle size={20} className="text-green-500" />
          </button>
          <button onClick={onOpenAulas} className="text-left text-white font-black text-xl uppercase tracking-widest border-b border-white/5 pb-4">
              Aulas
          </button>
        </div>
      )}
    </header>
  );
};