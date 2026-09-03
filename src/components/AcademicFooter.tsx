import React from 'react';
import { GraduationCap, Users, School, BookMarked } from 'lucide-react';

export const AcademicFooter: React.FC = () => {
  const teamMembers = [
    'Kauã Vinicius Marçal Faria',
    'Laysa Kertesz Gouvêa',
    'Maria Beatriz dos Santos Oliveira',
    'Maria Eduarda Alves Talão',
    'Sofia Perillo',
    'Sophia Felix da Silva Strazzeri',
    'Yasmin Naomi Lourenço Takiya',
  ];

  return (
    <footer className="bg-[#111111] text-gray-300 border-t border-gray-800 pt-12 pb-10" id="academic-footer">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Brand & Project Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-8 border-b border-gray-800 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <img
              src="/logo.jpg"
              alt="NutriNews Logo"
              className="w-12 h-12 rounded-lg object-contain bg-white p-1 border border-gray-700 shadow-2xs"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-2xl font-black text-white tracking-tighter">
                Nutri<span className="text-[#D10000]">News</span>
              </h3>
              <p className="text-[10px] text-[#D10000] font-bold uppercase tracking-widest">
                CUIDE-SE E VIVA FELIZ!
              </p>
              <p className="text-[11px] text-gray-400">
                Informação sobre nutrição sem fake news.
              </p>
            </div>
          </div>

          <div className="text-xs text-gray-400 max-w-sm text-center sm:text-right">
            <span className="inline-block bg-gray-900 text-gray-300 px-3 py-1 rounded border border-gray-700 font-mono text-[10px] uppercase tracking-wider">
              Trabalho de Conclusão de Curso (TCC)
            </span>
          </div>
        </div>

        {/* Institutional & Thesis Title */}
        <div className="py-8 border-b border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Institutional Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#D10000] text-[10px] font-black uppercase tracking-[0.2em]">
              <School className="w-3.5 h-3.5" />
              <span>Instituição de Ensino</span>
            </div>
            <div className="space-y-1 text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
              <p className="font-bold text-white">
                Centro Estadual de Educação Tecnológica Paula Souza
              </p>
              <p className="text-gray-300">
                Escola Técnica Estadual Professor Camargo Aranha
              </p>
              <p className="text-xs text-gray-400">
                Ensino Médio com habilitação profissional em Técnico em Nutrição e Dietética
              </p>
            </div>
          </div>

          {/* Thesis Title */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#D10000] text-[10px] font-black uppercase tracking-[0.2em]">
              <BookMarked className="w-3.5 h-3.5" />
              <span>Tema do Trabalho</span>
            </div>
            <div className="bg-gray-900/90 p-4 rounded-lg border border-gray-800">
              <p className="text-xs font-bold text-white tracking-wide uppercase leading-relaxed font-mono">
                INFLUÊNCIA DAS MÍDIAS SOCIAIS NAS ATITUDES ALIMENTARES DE MULHERES PRATICANTES DE ATIVIDADE FÍSICA
              </p>
            </div>
          </div>
        </div>

        {/* Team Members List */}
        <div className="pt-8 pb-4">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
            <Users className="w-3.5 h-3.5 text-[#D10000]" />
            <span>Integrantes da Pesquisa Acadêmica (TCC):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {teamMembers.map((name, index) => (
              <div
                key={index}
                className="bg-gray-900/60 border border-gray-800/80 px-3.5 py-2.5 rounded text-xs font-medium text-gray-200 flex items-center gap-2 hover:border-gray-700 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D10000] shrink-0" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright & Disclaimer Note */}
        <div className="pt-8 text-center text-xs text-gray-500 border-t border-gray-800/60 mt-6 space-y-1">
          <p>
            © {new Date().getFullYear()} NutriNews • ETEC Professor Camargo Aranha / Centro Paula Souza.
          </p>
          <p className="text-[11px] text-gray-500">
            Ferramenta desenvolvida exclusivamente para fins educacionais e de pesquisa. Não substitui consulta com nutricionista.
          </p>
        </div>
      </div>
    </footer>
  );
};
