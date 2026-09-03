import React, { useState } from 'react';
import { ArrowRight, Loader2, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onVerify: (query: string) => void;
  isLoading: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onVerify, isLoading }) => {
  const [inputQuery, setInputQuery] = useState('');

  // The 3 exact suggestion chips from the user's laptop layout
  const suggestionChips = [
    'Creatina causa queda de cabelo?',
    'Carboidrato à noite engorda?',
    'Proteína ajuda na recuperação?'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;
    onVerify(inputQuery.trim());
  };

  const handleChipClick = (question: string) => {
    setInputQuery(question);
    onVerify(question);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 bg-[#F8F9FA] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Headline & Copy from User's Screenshot */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Top kicker */}
            <div className="inline-flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
                Nutrição sem fake news
              </span>
            </div>

            {/* Big Editorial Headline */}
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-normal text-gray-900 tracking-tight leading-[1.12]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Será que isso é <br />
              <span 
                className="italic text-[#9A1C24] font-normal"
                style={{ fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" }}
              >
                verdade?
              </span>
            </h1>

            {/* Subtitle paragraph */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal max-w-xl">
              Digite uma afirmação que você viu nas redes sociais. Nossa IA pesquisa evidências científicas e explica o veredito.
            </p>

            {/* Academic Badges & Scope */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200/80 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Fontes ABNT (NBR 6023)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200/80 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#9A1C24]" />
                <span>Foco em Saúde Feminina & Treino</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200/80 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>ETEC Prof. Camargo Aranha</span>
              </div>
            </div>
          </div>

          {/* Right Column: Verification Card matching User's Laptop Screenshot */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 transition-all">
              
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                O que você quer verificar?
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Textarea container */}
                <div className="relative bg-white border border-gray-300 rounded-2xl p-3.5 sm:p-4 focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-red-100 transition-all">
                  <textarea
                    id="verification-input"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Creatina causa queda de cabelo?"
                    rows={4}
                    className="w-full bg-transparent p-0 text-gray-900 placeholder-gray-400 text-sm sm:text-base outline-none resize-none leading-relaxed"
                    disabled={isLoading}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                        handleSubmit(e);
                      }
                    }}
                  />

                  {/* Character helper & quick clear */}
                  {inputQuery && (
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => setInputQuery('')}
                        className="text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-gray-700 cursor-pointer"
                      >
                        Limpar
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick suggestion chips right under the textarea */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestionChips.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleChipClick(chip)}
                      disabled={isLoading}
                      className="px-3 py-1.5 bg-[#F4F5F7] hover:bg-red-50 hover:text-[#9A1C24] hover:border-red-200 text-gray-600 border border-gray-200 rounded-lg text-xs font-medium transition-all text-left cursor-pointer disabled:opacity-50"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Primary Wine Red Button with Arrow */}
                <button
                  type="submit"
                  id="btn-verify-hero"
                  disabled={isLoading || !inputQuery.trim()}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer ${
                    isLoading || !inputQuery.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#9A1C24] hover:bg-[#83161C] active:scale-[0.99]'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span>Analisando literatura científica...</span>
                    </>
                  ) : (
                    <>
                      <span>Verificar com IA</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Status / Footnote text matching the user's laptop layout */}
              <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] sm:text-xs text-gray-500 leading-relaxed text-left">
                <p>
                  O <strong>Nutri News</strong> pesquisa evidências científicas, artigos indexados e consensos de nutrição (SBAN, CFN, PubMed) para fundamentar o veredito com rigor acadêmico.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
