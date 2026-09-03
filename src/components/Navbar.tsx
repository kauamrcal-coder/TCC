import React from 'react';
import { ShieldCheck, Info, BookOpen, AlertTriangle } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-gray-200 transition-all shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand logo & name matching the user's laptop screen */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3.5 group text-left cursor-pointer focus:outline-none"
          id="nav-logo-btn"
        >
          {/* Logo container with the user's official logo */}
          <div className="w-12 h-12 rounded-xl bg-[#F4EFEA] border border-gray-200 overflow-hidden flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform shrink-0">
            <img
              src="/logo.jpg"
              alt="NutriNews Logo - Cuide-se e Viva Feliz!"
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback to svg if needed
                (e.target as HTMLImageElement).src = '/logo.svg';
              }}
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span 
                className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                NUTRI NEWS
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#9A1C24]">
              CUIDE-SE E VIVA FELIZ!
            </p>
          </div>
        </button>

        {/* Right side items: IA + Evidência Científica badge & navigation */}
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden lg:flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 mr-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeSection === 'home' || activeSection === 'verifier'
                  ? 'text-[#9A1C24] bg-red-50/70 font-black'
                  : 'hover:text-[#9A1C24] hover:bg-gray-50'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeSection === 'about'
                  ? 'text-[#9A1C24] bg-red-50/70 font-black'
                  : 'hover:text-[#9A1C24] hover:bg-gray-50'
              }`}
            >
              Sobre o TCC
            </button>
            <button
              onClick={() => onNavigate('tips')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeSection === 'tips'
                  ? 'text-[#9A1C24] bg-red-50/70 font-black'
                  : 'hover:text-[#9A1C24] hover:bg-gray-50'
              }`}
            >
              Guia Anti-Mitos
            </button>
          </nav>

          {/* Prominent pill badge from user's screen */}
          <div 
            id="nav-badge-evidence"
            className="px-3.5 py-1.5 rounded-full border border-gray-300 bg-[#FAFAFA] text-[#851C22] text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#9A1C24] animate-pulse"></span>
            <span>IA + EVIDÊNCIA CIENTÍFICA</span>
          </div>
        </div>
      </div>
    </header>
  );
};
