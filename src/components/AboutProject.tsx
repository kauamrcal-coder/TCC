import React from 'react';
import { BookOpen, Target, Users2, Brain, AlertOctagon, ShieldAlert } from 'lucide-react';

export const AboutProject: React.FC = () => {
  return (
    <section id="about" className="py-14 bg-[#F5F5F5] border-t border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Tag */}
        <div className="text-center mb-10">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-[#D10000] block mb-2">
            Trabalho de Conclusão de Curso (TCC)
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Sobre o Projeto NutriNews
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto mt-2 font-normal">
            Ferramenta acadêmica desenvolvida para desmistificar promessas irreais e valorizar a ciência nutricional.
          </p>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card 1: Contexto e Finalidade */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-2xs">
            <div className="w-9 h-9 rounded-md bg-red-50 border border-red-200 flex items-center justify-center text-[#D10000] mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Objetivo & Justificativa
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              O <strong>NutriNews</strong> nasceu como parte integrante do Trabalho de Conclusão de Curso (TCC) do curso <strong>Técnico em Nutrição e Dietética</strong> na ETEC Professor Camargo Aranha. Seu propósito central é combater a propagação descontrolada de desinformação, dietas restritivas e modismos sem embasamento propagados em redes sociais (como TikTok, Instagram e YouTube).
            </p>
          </div>

          {/* Card 2: Público-Alvo Feminino */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-2xs">
            <div className="w-9 h-9 rounded-md bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4">
              <Users2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              Público-Alvo: Mulheres Ativas
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              O projeto foca primariamente em <strong>mulheres praticantes de atividades físicas</strong>, um público altamente exposto a cobranças estéticas e receitas milagrosas que podem comprometer a saúde hormonal, causar a Síndrome da Baixa Disponibilidade Energética (REDs) e prejudicar o rendimento esportivo.
            </p>
          </div>
        </div>

        {/* Observation for Academic Rigor & AI ethics */}
        <div className="bg-white border-l-4 border-[#D10000] border-t border-r border-b border-gray-200 rounded-r-lg p-6 sm:p-7 relative">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-md bg-[#D10000] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-base font-bold text-gray-900">
                Observação Acadêmica Importante: Uso Ético da IA e Fontes ABNT
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                Como modelos de inteligência artificial podem produzir alucinações ou imprecisões, o <strong>NutriNews</strong> foi programado e estruturado como uma <em>ferramenta de apoio pedagógico e checagem</em>, jamais como uma fonte diagnóstica definitiva.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                Para atender aos rígidos critérios do TCC, as referências apresentadas pela ferramenta correspondem a fontes legítimas da literatura (como o <strong>Guia Alimentar para a População Brasileira do Ministério da Saúde</strong>, diretrizes da <strong>SBME</strong>, <strong>CFN</strong>, <strong>ISSN</strong> e artigos científicos indexados), formatadas sob a norma <strong>ABNT NBR 6023</strong> para permitir consulta e checagem direta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
