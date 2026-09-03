import React from 'react';
import { VerificationResult } from '../types';

interface AcademicReportDocumentProps {
  result: VerificationResult;
  id?: string;
}

export const AcademicReportDocument: React.FC<AcademicReportDocumentProps> = ({
  result,
  id = 'academic-report-to-export',
}) => {
  const getClassificationStyles = () => {
    switch (result.classification) {
      case 'Falso':
        return {
          headerBg: 'bg-red-700',
          badgeBg: 'bg-red-100 text-red-800 border-red-300',
          textColor: 'text-red-700',
          label: 'FALSO (MITO SEM BASE CIENTÍFICA)',
        };
      case 'Verdadeiro':
        return {
          headerBg: 'bg-emerald-700',
          badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          textColor: 'text-emerald-700',
          label: 'VERDADEIRO (SUSTENTADO POR EVIDÊNCIAS)',
        };
      case 'Parcialmente verdadeiro':
        return {
          headerBg: 'bg-amber-600',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
          textColor: 'text-amber-800',
          label: 'PARCIALMENTE VERDADEIRO (REQUER CONTEXTUALIZAÇÃO)',
        };
      default:
        return {
          headerBg: 'bg-purple-700',
          badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
          textColor: 'text-purple-700',
          label: 'INCONCLUSIVO (EVIDÊNCIAS CIENTÍFICAS INSUFICIENTES)',
        };
    }
  };

  const styles = getClassificationStyles();
  const formattedDate = new Date(result.timestamp).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const formattedTime = new Date(result.timestamp).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      id={id}
      className="w-[794px] bg-white text-gray-900 p-8 font-sans select-none border border-gray-300 shadow-lg leading-normal"
      style={{ minHeight: '1120px', boxSizing: 'border-box' }}
    >
      {/* Institutional Top Header */}
      <div className="border-b-2 border-gray-900 pb-4 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Centro Estadual de Educação Tecnológica Paula Souza
            </p>
            <h1 className="text-sm font-black uppercase tracking-tight text-gray-900">
              ETEC Professor Camargo Aranha • São Paulo - SP
            </h1>
            <p className="text-[11px] font-semibold text-gray-700">
              Curso Técnico em Nutrição e Dietética • Trabalho de Conclusão de Curso (TCC 2026)
            </p>
          </div>

          <div className="flex items-center gap-2 text-right">
            <img
              src="/logo.jpg"
              alt="NutriNews Logo"
              className="w-12 h-12 object-contain rounded border border-gray-300"
              crossOrigin="anonymous"
            />
          </div>
        </div>

        {/* Title Ribbon */}
        <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D10000] block">
              Projeto NutriNews • Divulgação Científica
            </span>
            <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">
              Dossiê Técnico de Checagem Nutricional
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-mono text-gray-500 uppercase block">
              Protocolo: NN-{result.id.slice(0, 8).toUpperCase()}
            </span>
            <span className="text-[9px] font-mono text-gray-500 block">
              Data: {formattedDate} às {formattedTime}
            </span>
          </div>
        </div>
      </div>

      {/* Research Scope & Theme Banner */}
      <div className="bg-gray-100 p-3 rounded mb-6 border border-gray-200 text-[11px] leading-relaxed">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="font-bold text-gray-700 uppercase tracking-wider block text-[10px]">
              Tema da Pesquisa Acadêmica:
            </span>
            <p className="text-gray-900 font-medium">
              Influência das Mídias Sociais nas Atitudes Alimentares de Mulheres Praticantes de Atividade Física
            </p>
          </div>
          <div>
            <span className="font-bold text-gray-700 uppercase tracking-wider block text-[10px]">
              Finalidade Metodológica:
            </span>
            <p className="text-gray-900 font-medium">
              Avaliação crítica de alegações nutricionais veiculadas no TikTok e Instagram fundamentada em literatura científica.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Afirmação Avaliada */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-gray-200">
          <span className="text-xs font-black uppercase tracking-wider text-gray-700">
            1. Afirmação Submetida à Checagem
          </span>
        </div>
        <div className="bg-[#FAFAFA] p-3.5 rounded border border-gray-200">
          <p className="text-sm font-semibold italic text-gray-800 leading-relaxed">
            "{result.claim}"
          </p>
        </div>
      </div>

      {/* Section 2: Veredito e Classificação */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-gray-200">
          <span className="text-xs font-black uppercase tracking-wider text-gray-700">
            2. Veredito Técnico e Classificação
          </span>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded border border-gray-200">
          <div className={`px-3 py-1.5 rounded font-black text-xs uppercase tracking-wider border ${styles.badgeBg}`}>
            {styles.label}
          </div>
          <div className="text-xs font-bold text-gray-800">
            {result.shortVerdict}
          </div>
        </div>
      </div>

      {/* Section 3: Análise e Justificativa Científica */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-gray-200">
          <span className="text-xs font-black uppercase tracking-wider text-gray-700">
            3. Fundamentação Científica em Linguagem Acessível
          </span>
        </div>
        <div className="text-xs text-gray-800 leading-relaxed space-y-2 p-3 bg-[#FAFAFA] rounded border border-gray-200">
          <p>{result.explanation}</p>
        </div>
      </div>

      {/* Section 4: Contexto de Saúde Feminina e Prática de Atividades Físicas */}
      {result.womenFitnessContext && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-gray-200">
            <span className="text-xs font-black uppercase tracking-wider text-[#D10000]">
              4. Impacto em Mulheres Praticantes de Atividade Física
            </span>
          </div>
          <div className="text-xs text-gray-800 leading-relaxed p-3 bg-red-50/60 rounded border-l-4 border-[#D10000] border-t border-r border-b border-red-200">
            <p>{result.womenFitnessContext}</p>
          </div>
        </div>
      )}

      {/* Section 5: Recomendações Práticas */}
      {result.practicalTip && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-gray-200">
            <span className="text-xs font-black uppercase tracking-wider text-gray-700">
              5. Orientações Nutricionais Seguras
            </span>
          </div>
          <div className="text-xs text-gray-700 leading-relaxed p-3 bg-gray-50 rounded border border-gray-200">
            <p>{result.practicalTip}</p>
          </div>
        </div>
      )}

      {/* Section 6: Referências Bibliográficas ABNT NBR 6023 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-gray-200">
          <span className="text-xs font-black uppercase tracking-wider text-gray-700">
            6. Referências Bibliográficas (Norma ABNT NBR 6023)
          </span>
          <span className="text-[10px] text-gray-500 font-mono">Fontes Científicas Oficiais</span>
        </div>
        <div className="space-y-2 bg-[#FAFAFA] p-3 rounded border border-gray-200">
          {result.references.map((ref, idx) => (
            <div key={idx} className="text-[10.5px] font-mono text-gray-800 leading-snug border-b border-gray-200/60 pb-1.5 last:border-0 last:pb-0">
              <span className="font-bold text-gray-500 mr-1.5">[{idx + 1}]</span>
              {ref.abnt}
            </div>
          ))}
        </div>
      </div>

      {/* Section 7: Aviso Ético Obrigatório */}
      <div className="p-3 bg-amber-50 border border-amber-300 rounded text-[10px] text-amber-950 leading-relaxed mb-6">
        <span className="font-bold uppercase tracking-wider text-amber-900 block mb-0.5">
          Nota Ética e Declaração de Responsabilidade
        </span>
        O projeto NutriNews é uma ferramenta acadêmica de apoio e educação nutricional desenvolvida no âmbito do TCC do curso Técnico em Nutrição e Dietética. Este relatório técnico não substitui consulta, diagnóstico ou prescrição dietética individualizada realizada por profissional nutricionista legalmente habilitado no Conselho Regional de Nutricionistas (CRN).
      </div>

      {/* Institutional Sign-off Footer */}
      <div className="pt-4 border-t-2 border-gray-900 text-center text-[10px] text-gray-600">
        <p className="font-bold uppercase tracking-wider text-gray-900">
          ETEC Professor Camargo Aranha • Centro Estadual de Educação Tecnológica Paula Souza
        </p>
        <p className="text-[9px] text-gray-500 mt-0.5">
          Trabalho de Conclusão de Curso 2026 • Orientador: Prof. Me. Flávio Santos • Nutrição e Dietética
        </p>
      </div>
    </div>
  );
};
