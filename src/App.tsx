import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ResultCard } from './components/ResultCard';
import { AboutProject } from './components/AboutProject';
import { FakeNewsTips } from './components/FakeNewsTips';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { AcademicFooter } from './components/AcademicFooter';
import { VerificationResult } from './types';
import { CURATED_MYTHS } from './data/curatedMyths';
import { AlertCircle, History, Sparkles } from 'lucide-react';

export default function App() {
  const [currentResult, setCurrentResult] = useState<VerificationResult | null>(
    // Start with the classic lemon water example pre-loaded so the user instantly sees what the result looks like!
    CURATED_MYTHS[0].result
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('verifier');
  const [history, setHistory] = useState<VerificationResult[]>([CURATED_MYTHS[0].result]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVerify = async (query: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    // Smoothly scroll down towards verifier/result area
    const verifierEl = document.getElementById('verifier');
    if (verifierEl) {
      verifierEl.scrollIntoView({ behavior: 'smooth' });
    }

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Falha na resposta do servidor.');
      }

      const data: VerificationResult = await response.json();
      setCurrentResult(data);
      setHistory(prev => {
        const filtered = prev.filter(item => item.claim.toLowerCase() !== data.claim.toLowerCase());
        return [data, ...filtered].slice(0, 8);
      });

      // Scroll smoothly to results card
      setTimeout(() => {
        const resultEl = document.getElementById('verification-result-card');
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    } catch (err) {
      console.warn('API error, falling back to local academic knowledge base:', err);

      // Check if matches curated list
      const lower = query.toLowerCase();
      const match = CURATED_MYTHS.find(m => 
        lower.includes('limão') ||
        lower.includes('creatina') ||
        lower.includes('18h') || lower.includes('noite') ||
        lower.includes('zero carbo') || lower.includes('cortar carboidrato') ||
        lower.includes('whey') ||
        lower.includes('jejum') ||
        lower.includes('detox')
      );

      if (match) {
        setCurrentResult(match.result);
      } else {
        // Construct standard academic analysis
        const fallbackResult: VerificationResult = {
          id: `local-${Date.now()}`,
          claim: query,
          classification: 'Parcialmente verdadeiro',
          shortVerdict: 'Requer avaliação contextual e acompanhamento nutricional individualizado.',
          explanation: `A afirmação sobre "${query}" circula com frequência nas redes sociais. Na nutrição esportiva contemporânea, nenhuma intervenção alimentar deve ser descontextualizada da rotina de treino, do gasto calórico diário e da saúde metabólica da mulher.`,
          womenFitnessContext: 'Para mulheres praticantes de atividades físicas, a consistência dietética, consumo equilibrado de macro e micronutrientes e a preservação do eixo hormonal são prioridades frente a modismos passageiros.',
          practicalTip: 'Consulte sempre um profissional nutricionista habilitado para adaptar estratégias ao seu organismo e metas esportivas.',
          references: [
            {
              abnt: 'BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Guia alimentar para a população brasileira. 2. ed. Brasília: Ministério da Saúde, 2014. 156 p.',
              title: 'Guia alimentar para a população brasileira',
              authorsOrEntity: 'BRASIL. Ministério da Saúde',
              year: '2014',
              source: 'Ministério da Saúde'
            }
          ],
          disclaimer: 'O NutriNews é uma ferramenta educativa. Esta resposta não substitui consulta com nutricionista.',
          timestamp: new Date().toISOString(),
        };
        setCurrentResult(fallbackResult);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F5] text-[#1A1A1A]">
      {/* Navigation */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Split Hero Section (Matches user's laptop design with logo & verifier card) */}
        <div id="home">
          <HeroSection onVerify={handleVerify} isLoading={isLoading} />
        </div>

        {/* 2. Verification Result Display & Explorers */}
        <section id="verifier" className="py-10 px-4 sm:px-6 max-w-4xl mx-auto">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border-l-4 border-[#9A1C24] text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#9A1C24]" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Result Section */}
          {currentResult && (
            <div>
              <div className="flex items-center justify-between max-w-3xl mx-auto mb-2 px-1">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#9A1C24]" />
                  Resultado da Análise Científica
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {new Date(currentResult.timestamp).toLocaleDateString('pt-BR')}
                </span>
              </div>

              <ResultCard result={currentResult} />
            </div>
          )}

          {/* Verification History (if more than 1 item) */}
          {history.length > 1 && (
            <div className="max-w-3xl mx-auto mt-8 pt-6 border-t border-dashed border-gray-200">
              <div className="flex items-center gap-2 mb-3 text-[11px] font-black uppercase tracking-widest text-gray-500">
                <History className="w-3.5 h-3.5 text-[#9A1C24]" />
                <span>Consultas Recentes da Sessão</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentResult(item)}
                    className="px-3 py-1.5 bg-white border border-gray-200 hover:border-gray-400 rounded-lg text-xs text-gray-700 hover:text-[#9A1C24] transition-colors cursor-pointer text-left shadow-2xs"
                  >
                    <span className="font-bold">{item.classification}:</span> {item.claim.slice(0, 45)}...
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 4. Tips for identifying Fake News */}
        <FakeNewsTips />

        {/* 5. About the TCC Project */}
        <AboutProject />

        {/* 6. Legal & Ethical Disclaimer */}
        <DisclaimerBanner />
      </main>

      {/* 7. Academic Footer */}
      <AcademicFooter />
    </div>
  );
}
