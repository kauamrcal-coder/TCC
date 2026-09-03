import React from 'react';
import { ShieldAlert, AlertCircle, Ban, TrendingDown, Eye, CheckCircle } from 'lucide-react';

export const FakeNewsTips: React.FC = () => {
  const redFlags = [
    {
      icon: <Ban className="w-5 h-5 text-red-600" />,
      title: 'Vilões e Salvadores',
      desc: 'Desconfie de vídeos que rotulam alimentos básicos como "venenos inflamatórios" (frutas, leite, glúten sem diagnóstico celíaco) ou que elegem superalimentos milagrosos.',
    },
    {
      icon: <TrendingDown className="w-5 h-5 text-amber-600" />,
      title: 'Promessas de Emagrecimento Rápido',
      desc: 'Alegações de secar 5kg a 10kg em poucos dias sem esforço ou sem déficit calórico ignoram a fisiologia humana e causam perda de água e massa muscular.',
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
      title: 'Venda Casada de Produtos',
      desc: 'Muitos posts alarmistas nas redes sociais servem apenas como "isca" para vender chás secadores, cápsulas termogênicas duvidosas ou e-books milagrosos.',
    },
    {
      icon: <Eye className="w-5 h-5 text-purple-600" />,
      title: 'Ausência de Fontes Científicas',
      desc: 'Afirmações apoiadas apenas em "eu testei", fotos de antes e depois manipuladas com iluminação ou "médicos/famosos disseram", sem artigos ou diretrizes em ABNT.',
    },
  ];

  return (
    <section id="tips" className="py-14 bg-white border-t border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#D10000] block mb-2">
            Educação Nutricional Crítica
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Como Identificar Fake News nas Redes Sociais
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto mt-2 font-normal">
            Sinais de alerta frequentes no TikTok e Instagram identificados na pesquisa acadêmica do nosso TCC.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {redFlags.map((flag, idx) => (
            <div
              key={idx}
              className="bg-[#F9F9F9] border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-md bg-white border border-gray-200 shrink-0 shadow-2xs">
                  {flag.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5">
                    {flag.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {flag.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Affirmation Checklist */}
        <div className="bg-[#F9F9F9] border-l-4 border-[#D10000] rounded-r-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#D10000] flex items-center justify-center sm:justify-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#D10000]" />
              Princípio Fundamental da Nutrição Baseada em Evidências
            </h4>
            <p className="text-xs text-gray-600 max-w-xl font-normal leading-relaxed">
              A alimentação saudável para mulheres que praticam esportes deve ser equilibrada, prazerosa, individualizada e sustentável em longo prazo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
