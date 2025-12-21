import React, { useState, useEffect } from 'react';
import { Instagram, Menu, X, ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../types';

export const Header: React.FC = () => {
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
    { label: 'Simulador', id: 'simulador' },
    { label: 'Diferenciais', id: 'diferenciais' },
    { label: 'Sobre Mim', id: 'sobre-mim' },
    { label: 'Contato', id: 'contato' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col">
          <span className={`font-serif text-2xl font-bold tracking-tight ${isScrolled ? 'text-graphite-900' : 'text-graphite-900 lg:text-white'}`}>
            VOLPI
          </span>
          <span className={`text-[10px] uppercase tracking-[0.2em] ${isScrolled ? 'text-gold-600' : 'text-gold-600 lg:text-gold-400'}`}>
            Consultoria
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium transition-colors hover:text-gold-400 ${
                isScrolled ? 'text-slate-600' : 'text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="w-px h-6 bg-slate-300/30 mx-4"></div>

          <a 
            href={INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isScrolled ? 'text-slate-900 hover:text-gold-600' : 'text-white hover:text-gold-400'
            }`}
          >
            <Instagram size={18} />
            <span>{INSTAGRAM_HANDLE}</span>
          </a>

          <button
             onClick={() => scrollToSection('contato')}
             className={`flex items-center gap-2 px-5 py-2 text-sm font-semibold transition-all border ${
               isScrolled 
                ? 'border-graphite-900 text-graphite-900 hover:bg-graphite-900 hover:text-white' 
                : 'border-white text-white hover:bg-white hover:text-graphite-900'
             }`}
          >
            Agendar Reunião
            <ArrowUpRight size={16} />
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gold-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl p-6 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left text-slate-800 font-medium py-2 border-b border-gray-50"
            >
              {item.label}
            </button>
          ))}
          <a 
            href={INSTAGRAM_URL}
            className="flex items-center gap-2 text-slate-800 font-medium py-2"
          >
            <Instagram size={18} />
            {INSTAGRAM_HANDLE}
          </a>
        </div>
      )}
    </header>
  );
};