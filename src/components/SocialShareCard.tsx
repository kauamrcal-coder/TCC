import React from 'react';
import { VerificationResult } from '../types';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  HelpCircle, 
  BookOpen, 
  HeartHandshake, 
  ShieldAlert,
  Sparkles,
  Info
} from 'lucide-react';

interface SocialShareCardProps {
  result: VerificationResult;
  id?: string;
}

export const SocialShareCard: React.FC<SocialShareCardProps> = ({ result, id = 'social-card-to-export' }) => {
  const getBadge = () => {
    switch (result.classification) {
      case 'Falso':
        return {
          bg: 'bg-[#D10000]',
          text: 'text-white',
          border: 'border-red-600',
          pillBg: 'bg-red-50',
          pillText: 'text-[#D10000]',
          icon: <XCircle className="w-5 h-5 text-white" />,
          title: 'MITO DESMENTIDO • FALSO',
        };
      case 'Verdadeiro':
        return {
          bg: 'bg-emerald-600',
          text: 'text-white',
          border: 'border-emerald-600',
          pillBg: 'bg-emerald-50',
          pillText: 'text-emerald-700',
          icon: <CheckCircle2 className="w-5 h-5 text-white" />,
          title: 'COMPROVADO PELA CIÊNCIA • VERDADEIRO',
        };
      case 'Parcialmente verdadeiro':
        return {
          bg: 'bg-amber-500',
          text: 'text-white',
          border: 'border-amber-500',
          pillBg: 'bg-amber-50',
          pillText: 'text-amber-800',
          icon: <AlertCircle className="w-5 h-5 text-white" />,
          title: 'REQUER CONTEXTO • PARCIALMENTE VERDADEIRO',
        };
      default:
        return {
          bg: 'bg-purple-600',
          text: 'text-white',
          border: 'border-purple-600',
          pillBg: 'bg-purple-50',
          pillText: 'text-purple-800',
          icon: <HelpCircle className="w-5 h-5 text-white" />,
          title: 'SEM EVIDÊNCIAS SUFICIENTES',
        };
    }
  };

  const badge = getBadge();
  const primaryRef = result.references && result.references.length > 0 ? result.references[0] : null;

  return (
    <div
      id={id}
      className="w-[600px] bg-white text-gray-900 border border-gray-300 shadow-md rounded-xl overflow-hidden font-sans select-none"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Top Editorial Red Ribbon */}
      <div className="bg-[#D10000] text-white px-5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-white" />
          <span className="text-[11px] font-black uppercase tracking-[0.25em]">
            NutriNews • Checagem de Fatos
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-red-100 bg-red-800/60 px-2 py-0.5 rounded">
          TCC 2026 • ETEC Camargo Aranha
        </span>
      </div>

      {/* Header with Logo and Brand */}
      <div className="p-6 pb-4 border-b border-gray-200 bg-[#FAFAFA] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="NutriNews"
            className="w-12 h-12 rounded-lg object-contain bg-white border border-gray-200 shadow-2xs"
            crossOrigin="anonymous"
          />
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black tracking-tight text-[#D10000]">
                Nutri<span className="text-[#1A1A1A]">News</span>
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Ciência & Nutrição
              </span>
            </div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Combate à Desinformação em Saúde Feminina
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono text-gray-400 block uppercase">
            {new Date(result.timestamp).toLocaleDateString('pt-BR')}
          </span>
          <span className="text-[9px] font-bold text-[#D10000] uppercase tracking-wider">
            #NutriçãoSemMitos
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 space-y-4">
        {/* The Claim Question */}
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-1">
            Boato em Circulação nas Redes Sociais:
          </span>
          <h2 className="text-lg font-bold text-gray-900 italic leading-snug bg-gray-50 p-3.5 rounded-lg border border-gray-200">
            "{result.claim}"
          </h2>
        </div>

        {/* Big Verdict Stamp */}
        <div className={`${badge.bg} text-white p-3.5 rounded-lg flex items-center justify-between shadow-xs`}>
          <div className="flex items-center gap-2.5">
            {badge.icon}
            <div>
              <span className="text-xs font-black uppercase tracking-wider block">
                {badge.title}
              </span>
              <span className="text-xs font-semibold text-white/95 leading-tight">
                {result.shortVerdict}
              </span>
            </div>
          </div>
        </div>

        {/* Scientific Explanation */}
        <div className="bg-white p-3.5 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D10000]" />
            <span>O que a ciência diz:</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed">
            {result.explanation}
          </p>
        </div>

        {/* Female Athlete Context */}
        {result.womenFitnessContext && (
          <div className="bg-red-50/70 border-l-4 border-[#D10000] p-3 rounded-r-lg">
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#D10000] mb-1">
              <HeartHandshake className="w-3.5 h-3.5 text-[#D10000]" />
              <span>Para Mulheres que Treinam:</span>
            </div>
            <p className="text-[11px] text-gray-700 leading-relaxed">
              {result.womenFitnessContext}
            </p>
          </div>
        )}

        {/* Practical Safe Tip */}
        {result.practicalTip && (
          <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              <Info className="w-3.5 h-3.5 text-gray-500" />
              <span>Orientação Profissional:</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              {result.practicalTip}
            </p>
          </div>
        )}

        {/* ABNT Reference Citation */}
        {primaryRef && (
          <div className="pt-2 border-t border-dashed border-gray-200">
            <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">
              <BookOpen className="w-3 h-3 text-[#D10000]" />
              <span>Fonte Acadêmica (ABNT NBR 6023):</span>
            </div>
            <p className="text-[10px] font-mono text-gray-600 leading-snug bg-gray-50 p-2 rounded border border-gray-200">
              {primaryRef.abnt}
            </p>
          </div>
        )}
      </div>

      {/* Footer / Watermark */}
      <div className="bg-[#1A1A1A] text-gray-300 px-6 py-3 border-t border-gray-200 flex items-center justify-between text-[10px]">
        <div>
          <span className="font-bold text-white uppercase tracking-wider">NutriNews</span>
          <span className="text-gray-400 ml-1">• ETEC Professor Camargo Aranha</span>
        </div>
        <div className="text-gray-400 text-right">
          <span>Consulte sempre um(a) nutricionista</span>
        </div>
      </div>
    </div>
  );
};
