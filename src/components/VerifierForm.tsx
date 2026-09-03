import React, { useState } from 'react';
import { Search, Loader2, Sparkles, HelpCircle, Clipboard, RotateCcw } from 'lucide-react';
import { CURATED_MYTHS } from '../data/curatedMyths';

interface VerifierFormProps {
  onVerify: (query: string) => void;
  isLoading: boolean;
}

export const VerifierForm: React.FC<VerifierFormProps> = ({ onVerify, isLoading }) => {
  const [inputQuery, setInputQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;
    onVerify(inputQuery.trim());
  };

  const handleSelectPredefined = (question: string) => {
    setInputQuery(question);
    onVerify(question);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputQuery(text);
      }
    } catch {
      // Clipboard permissions may not be granted in iframe
    }
  };

  const handleClear = () => {
    setInputQuery('');
  };

  return (
    <div className="w-full max-w-3xl mx-auto" id="verifier-container">
      <div className="bg-white rounded-lg shadow-xs border border-gray-200 p-6 sm:p-8 relative">
        {/* Editorial Section Header */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#D10000]">
              Módulo de Checagem
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Inteligência Artificial & Evidências
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-2">
          Verificador de Informações Nutricionais
        </h2>

        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Encontrou uma receita milagrosa, dica de emagrecimento ou alegação de treino no TikTok ou Instagram?
          Escreva ou cole abaixo para analisar se é <strong>Verdadeiro</strong>, <strong>Falso</strong> ou <strong>Parcialmente verdadeiro</strong>:
        </p>

        {/* Editorial Input Form matching the Design */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D10000] to-gray-400 rounded-lg blur opacity-15 transition-opacity group-focus-within:opacity-30"></div>
            <div className="relative bg-gray-50 border border-gray-200 rounded-lg p-3 transition-colors group-focus-within:border-gray-400">
              <textarea
                id="verification-input"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ex: Beber água com limão em jejum emagrece? Creatina retém líquido em mulheres? Cortar carboidratos à noite é obrigatório?"
                rows={3}
                className="w-full bg-transparent p-1 text-gray-800 italic placeholder-gray-400 text-sm sm:text-base outline-none resize-none"
                disabled={isLoading}
              />

              {/* Action Toolbar */}
              <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-gray-200/60">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  <Sparkles className="w-3.5 h-3.5 text-[#D10000]" />
                  <span>Citações ABNT (NBR 6023)</span>
                </div>

                <div className="flex items-center gap-2">
                  {inputQuery && (
                    <button
                      type="button"
                      onClick={handleClear}
                      disabled={isLoading}
                      className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 hover:bg-gray-200/60 rounded transition-colors flex items-center gap-1 cursor-pointer"
                      title="Limpar campo"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Limpar</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handlePaste}
                    disabled={isLoading}
                    className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-600 hover:text-gray-900 hover:bg-gray-200/60 rounded transition-colors flex items-center gap-1 cursor-pointer"
                    title="Colar da área de transferência"
                  >
                    <Clipboard className="w-3 h-3" />
                    <span>Colar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button with Editorial Styling */}
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              id="btn-verify"
              disabled={isLoading || !inputQuery.trim()}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-md font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer ${
                isLoading || !inputQuery.trim()
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#D10000] text-white hover:bg-black'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Analisando literatura científica...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Verificar Afirmação</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Editorial Notice Banner matching the design */}
        <div className="mt-6 p-4 bg-red-50/80 border-l-4 border-[#D10000] rounded-r-md">
          <h4 className="text-[#D10000] font-black text-xs uppercase tracking-widest mb-1.5 flex items-center">
            <span className="mr-2">⚠️</span> Aviso Acadêmico do TCC
          </h4>
          <p className="text-[11px] leading-relaxed text-gray-600">
            O NutriNews é uma ferramenta educativa elaborada para pesquisa acadêmica. As informações apresentadas não substituem uma avaliação individualizada. Antes de realizar mudanças na alimentação ou suplementação, procure um nutricionista habilitado.
          </p>
        </div>

        {/* Quick Example Chips */}
        <div className="mt-6 pt-5 border-t border-dashed border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black text-gray-700 uppercase tracking-widest flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#D10000]" />
              Mitos frequentes entre mulheres que treinam:
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Clique para checar</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {CURATED_MYTHS.slice(0, 6).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectPredefined(item.title)}
                disabled={isLoading}
                className="px-3 py-1.5 bg-[#F9F9F9] hover:bg-red-50 text-gray-700 hover:text-[#D10000] border border-gray-200 hover:border-red-200 rounded-md text-xs font-semibold transition-all text-left cursor-pointer flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D10000]" />
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
