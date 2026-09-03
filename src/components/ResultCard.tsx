import React, { useState, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  HelpCircle, 
  BookOpen, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  HeartHandshake, 
  ExternalLink,
  Info,
  Download,
  FileText,
  Image as ImageIcon,
  Loader2,
  Eye
} from 'lucide-react';
import { VerificationResult, ClassificationType } from '../types';
import { ExportModal } from './ExportModal';
import { SocialShareCard } from './SocialShareCard';
import { AcademicReportDocument } from './AcademicReportDocument';
import { downloadResultAsImage, downloadResultAsPdf } from '../utils/exportUtils';

interface ResultCardProps {
  result: VerificationResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const offscreenCardRef = useRef<HTMLDivElement>(null);
  const offscreenPdfRef = useRef<HTMLDivElement>(null);

  const getClassificationMeta = (classification: ClassificationType) => {
    switch (classification) {
      case 'Falso':
        return {
          bg: 'bg-red-50/60',
          border: 'border-red-200',
          badgeBg: 'bg-red-600',
          badgeText: 'text-white',
          pillBg: 'bg-red-100',
          pillText: 'text-[#D10000]',
          icon: <XCircle className="w-4 h-4 text-white" />,
          label: 'Falso (Mito / Sem Comprovação)',
          tag: 'Mito Desmentido',
        };
      case 'Verdadeiro':
        return {
          bg: 'bg-emerald-50/60',
          border: 'border-emerald-200',
          badgeBg: 'bg-emerald-600',
          badgeText: 'text-white',
          pillBg: 'bg-emerald-100',
          pillText: 'text-emerald-800',
          icon: <CheckCircle2 className="w-4 h-4 text-white" />,
          label: 'Verdadeiro (Baseado em Evidências)',
          tag: 'Evidência Científica',
        };
      case 'Parcialmente verdadeiro':
        return {
          bg: 'bg-amber-50/60',
          border: 'border-amber-200',
          badgeBg: 'bg-amber-500',
          badgeText: 'text-white',
          pillBg: 'bg-amber-100',
          pillText: 'text-amber-900',
          icon: <AlertCircle className="w-4 h-4 text-white" />,
          label: 'Parcialmente Verdadeiro (Requer Contexto)',
          tag: 'Requer Contexto',
        };
      default:
        return {
          bg: 'bg-purple-50/60',
          border: 'border-purple-200',
          badgeBg: 'bg-purple-600',
          badgeText: 'text-white',
          pillBg: 'bg-purple-100',
          pillText: 'text-purple-900',
          icon: <HelpCircle className="w-4 h-4 text-white" />,
          label: 'Sem Evidências Suficientes',
          tag: 'Literatura Limitada',
        };
    }
  };

  const meta = getClassificationMeta(result.classification);

  const handleCopyAbnt = (abntText: string, index: number) => {
    navigator.clipboard.writeText(abntText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleCopyFullVerdict = () => {
    const shareText = `NutriNews (Checagem Científica):
"${result.claim}"
Classificação: ${result.classification.toUpperCase()}
Veredito: ${result.shortVerdict}
Explicação: ${result.explanation}
Fontes (ABNT): ${result.references.map(r => r.abnt).join('; ')}
Saiba mais no projeto NutriNews (TCC ETEC Professor Camargo Aranha).`;
    navigator.clipboard.writeText(shareText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleDirectDownloadImage = async () => {
    if (!offscreenCardRef.current) return;
    setIsDownloadingImage(true);
    try {
      const sanitizedName = result.claim
        .slice(0, 30)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-');
      const filename = `nutrinews-card-${sanitizedName}.png`;
      await downloadResultAsImage(offscreenCardRef.current, filename);
      setDownloadSuccess('Card PNG baixado!');
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setIsExportModalOpen(true);
    } finally {
      setIsDownloadingImage(false);
    }
  };

  const handleDirectDownloadPdf = async () => {
    if (!offscreenPdfRef.current) return;
    setIsDownloadingPdf(true);
    try {
      const sanitizedName = result.claim
        .slice(0, 30)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-');
      const filename = `nutrinews-relatorio-${sanitizedName}.pdf`;
      await downloadResultAsPdf(offscreenPdfRef.current, result, filename);
      setDownloadSuccess('Relatório PDF baixado!');
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setIsExportModalOpen(true);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <>
      {/* Off-screen elements for pixel-perfect instant exports */}
      <div 
        style={{ 
          position: 'fixed', 
          left: '-9999px', 
          top: 0, 
          pointerEvents: 'none', 
          zIndex: -100, 
          opacity: 0 
        }} 
        aria-hidden="true"
      >
        <div ref={offscreenCardRef}>
          <SocialShareCard result={result} id="offscreen-social-card" />
        </div>
        <div ref={offscreenPdfRef}>
          <AcademicReportDocument result={result} id="offscreen-academic-pdf" />
        </div>
      </div>

      <article
        id="verification-result-card"
        className="w-full max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden transition-all animate-in fade-in duration-300"
      >
        {/* Editorial Top Bar with Kicker & Export Controls */}
        <div className="p-6 sm:p-7 border-b border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">
              Análise de Evidência Científica
            </span>

            {/* Top Action Toolbar */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className={`px-3 py-1 text-white text-[10px] font-bold rounded-full uppercase tracking-wider ${meta.badgeBg}`}>
                {result.classification}
              </span>

              {/* Direct Quick Download Image */}
              <button
                onClick={handleDirectDownloadImage}
                disabled={isDownloadingImage}
                className="px-2.5 py-1 bg-[#F5F5F5] hover:bg-gray-200 border border-gray-200 rounded text-[10px] font-bold uppercase tracking-wider text-gray-700 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                title="Baixar Card como imagem PNG para redes sociais"
                id="btn-quick-download-image"
              >
                {isDownloadingImage ? (
                  <Loader2 className="w-3 h-3 animate-spin text-[#D10000]" />
                ) : (
                  <ImageIcon className="w-3 h-3 text-[#D10000]" />
                )}
                <span>Imagem (PNG)</span>
              </button>

              {/* Direct Quick Download PDF */}
              <button
                onClick={handleDirectDownloadPdf}
                disabled={isDownloadingPdf}
                className="px-2.5 py-1 bg-[#F5F5F5] hover:bg-gray-200 border border-gray-200 rounded text-[10px] font-bold uppercase tracking-wider text-gray-700 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                title="Baixar Dossiê em formato PDF estruturado"
                id="btn-quick-download-pdf"
              >
                {isDownloadingPdf ? (
                  <Loader2 className="w-3 h-3 animate-spin text-[#D10000]" />
                ) : (
                  <FileText className="w-3 h-3 text-[#D10000]" />
                )}
                <span>PDF (ABNT)</span>
              </button>

              {/* Open Full Export Modal */}
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-200 rounded text-[10px] font-bold uppercase tracking-wider text-[#D10000] transition-colors flex items-center gap-1 cursor-pointer"
                title="Abrir pré-visualização e opções avançadas de exportação"
                id="btn-open-export-modal"
              >
                <Download className="w-3 h-3" />
                <span>Exportar</span>
              </button>

              {/* Copy Summary */}
              <button
                onClick={handleCopyFullVerdict}
                className="px-2 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded text-[10px] font-bold uppercase tracking-wider text-gray-600 transition-colors flex items-center gap-1 cursor-pointer"
                title="Copiar texto resumido para a área de transferência"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3 h-3 text-green-600" />
                    <span className="text-green-700">Copiado</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3 h-3 text-gray-500" />
                    <span>Texto</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Toast Notice for Successful Download */}
          {downloadSuccess && (
            <div className="mb-3 p-2 bg-emerald-50 border border-emerald-200 rounded text-[11px] font-bold text-emerald-800 flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{downloadSuccess} Arquivo salvo na pasta de downloads.</span>
            </div>
          )}

          {/* Claim in Editorial Italic */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 italic leading-snug">
            "{result.claim}"
          </h3>

          {/* Distinct Rectangular Verdict Badge from Design */}
          <div className="mb-2">
            <span className={`${meta.pillBg} ${meta.pillText} px-4 py-1.5 text-xs font-black rounded uppercase tracking-wider inline-block`}>
              {result.shortVerdict}
            </span>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Explanation Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D10000]" />
              Explicação em Linguagem Simples:
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base font-normal">
              {result.explanation}
            </p>
          </div>

          {/* Women Fitness Specific Context */}
          {result.womenFitnessContext && (
            <div className="bg-red-50/60 border-l-4 border-[#D10000] p-4 sm:p-5 rounded-r-md">
              <h4 className="text-xs font-black uppercase tracking-widest text-[#D10000] mb-1.5 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#D10000]" />
                Impacto em Mulheres Praticantes de Atividade Física:
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {result.womenFitnessContext}
              </p>
            </div>
          )}

          {/* Practical Nutrition Tip */}
          {result.practicalTip && (
            <div className="bg-[#F9F9F9] border border-gray-200 rounded-lg p-4">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#D10000]" />
                Orientação Prática e Segura:
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {result.practicalTip}
              </p>
            </div>
          )}

          {/* Scientific References (ABNT NBR 6023) */}
          <div className="pt-6 border-t border-dashed border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-[#D10000]" />
                Referências no Padrão ABNT
              </h4>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                NBR 6023
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-3">
              Fundamentação acadêmica do TCC baseada em órgãos oficiais e publicações indexadas:
            </p>

            <div className="space-y-2.5">
              {result.references.map((ref, idx) => (
                <div
                  key={idx}
                  className="bg-[#F9F9F9] rounded-md border border-gray-200 p-3 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 pr-2">
                      <p className="text-[11px] sm:text-xs text-gray-700 font-mono leading-relaxed select-all">
                        {ref.abnt}
                      </p>
                      {ref.source && (
                        <span className="inline-block text-[10px] text-[#D10000] font-bold uppercase tracking-wider">
                          Fonte: {ref.source} {ref.year ? `(${ref.year})` : ''}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopyAbnt(ref.abnt, idx)}
                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                        title="Copiar referência ABNT"
                      >
                        {copiedIndex === idx ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <a
                        href={`https://scholar.google.com/scholar?q=${encodeURIComponent(ref.title || ref.authorsOrEntity)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-200 rounded transition-colors"
                        title="Pesquisar no Google Acadêmico"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dedicated Social & Academic Export Callout Box */}
          <div className="p-5 sm:p-6 bg-gradient-to-br from-[#FAFAFA] to-[#F5F5F5] border border-gray-200 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#D10000]" />
                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wide text-gray-900">
                    Baixar & Compartilhar Esta Verificação
                  </h4>
                </div>
                <p className="text-xs text-gray-600 max-w-md leading-relaxed">
                  Exporte como <strong>imagem PNG</strong> para postar no Instagram e WhatsApp, ou como <strong>relatório em PDF</strong> para estudos e documentação acadêmica.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleDirectDownloadImage}
                  disabled={isDownloadingImage}
                  className="px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-md text-xs font-bold uppercase tracking-wider text-gray-800 transition-all flex items-center gap-2 cursor-pointer shadow-2xs disabled:opacity-50"
                  id="btn-bottom-download-image"
                >
                  {isDownloadingImage ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D10000]" />
                  ) : (
                    <ImageIcon className="w-3.5 h-3.5 text-[#D10000]" />
                  )}
                  <span>Baixar PNG</span>
                </button>

                <button
                  onClick={handleDirectDownloadPdf}
                  disabled={isDownloadingPdf}
                  className="px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-md text-xs font-bold uppercase tracking-wider text-gray-800 transition-all flex items-center gap-2 cursor-pointer shadow-2xs disabled:opacity-50"
                  id="btn-bottom-download-pdf"
                >
                  {isDownloadingPdf ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D10000]" />
                  ) : (
                    <FileText className="w-3.5 h-3.5 text-[#D10000]" />
                  )}
                  <span>Baixar PDF</span>
                </button>

                <button
                  onClick={() => setIsExportModalOpen(true)}
                  className="px-4 py-2.5 bg-[#D10000] hover:bg-black text-white rounded-md text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  id="btn-bottom-open-modal"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver Opções</span>
                </button>
              </div>
            </div>
          </div>

          {/* Disclaimer warning attached to result */}
          <div className="bg-amber-50/80 border-l-4 border-amber-400 p-4 rounded-r-md text-xs text-amber-950 leading-relaxed flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Lembrete pedagógico:</strong> As análises do NutriNews são de caráter informativo e educativo. Qualquer conduta alimentar deve ser prescrita de forma personalizada por um nutricionista.
            </div>
          </div>
        </div>
      </article>

      {/* Export & Share Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        result={result}
      />
    </>
  );
};

