import React from 'react';
import { AlertTriangle, UserCheck, Shield } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <section id="disclaimer" className="py-10 bg-white border-t border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-amber-50/80 border-l-4 border-amber-500 border-t border-r border-b border-amber-200/80 rounded-r-lg p-6 sm:p-7">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-11 h-11 rounded-md bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-950 bg-amber-200/80 px-2.5 py-0.5 rounded">
                  Aviso Legal & Ético Obrigatório
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 hidden sm:inline">• Finalidade Educacional</span>
              </div>

              <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                ⚠️ <strong>Atenção:</strong> O <strong>NutriNews</strong> é uma ferramenta educativa desenvolvida para fins acadêmicos. As informações apresentadas não substituem uma avaliação individualizada. Antes de realizar mudanças na alimentação, utilizar suplementos ou seguir recomendações relacionadas à saúde, procure orientação de um <strong>nutricionista</strong> ou outro profissional de saúde habilitado.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[11px] font-bold uppercase tracking-wider text-amber-900">
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-amber-700" />
                  Consulta profissional individualizada
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-700" />
                  Sem prescrições automáticas de dietas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
