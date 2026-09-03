import React, { useState, useRef } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  Image as ImageIcon, 
  Share2, 
  Check, 
  Loader2, 
  Sparkles,
  Award,
  AlertCircle
} from 'lucide-react';
import { VerificationResult } from '../types';
import { SocialShareCard } from './SocialShareCard';
import { AcademicReportDocument } from './AcademicReportDocument';
import { downloadResultAsImage, downloadResultAsPdf, shareResultImage } from '../utils/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: VerificationResult;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, result }) => {
  const [activeTab, setActiveTab] = useState<'image' | 'pdf'>('image');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const socialCardRef = useRef<HTMLDivElement>(null);
  const pdfReportRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownloadImage = async () => {
    if (!socialCardRef.current) return;
    setIsExporting(true);
    setErrorMessage(null);
    try {
      const sanitizedName = result.claim
        .slice(0, 30)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-');
      const filename = `nutrinews-card-${sanitizedName}.png`;
      await downloadResultAsImage(socialCardRef.current, filename);
      setExportSuccess('Imagem PNG baixada com sucesso!');
      setTimeout(() => setExportSuccess(null), 3500);
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao gerar imagem. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!pdfReportRef.current) return;
    setIsExporting(true);
    setErrorMessage(null);
    try {
      const sanitizedName = result.claim
        .slice(0, 30)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-');
      const filename = `nutrinews-relatorio-${sanitizedName}.pdf`;
      await downloadResultAsPdf(pdfReportRef.current, result, filename);
      setExportSuccess('Relatório acadêmico em PDF gerado com sucesso!');
      setTimeout(() => setExportSuccess(null), 3500);
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao gerar PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleMobileShare = async () => {
    if (!socialCardRef.current) return;
    setIsExporting(true);
    setErrorMessage(null);
    try {
      const shared = await shareResultImage(socialCardRef.current, result);
      if (!shared) {
        // Fallback to downloading
        await handleDownloadImage();
      } else {
        setExportSuccess('Compartilhado com sucesso!');
        setTimeout(() => setExportSuccess(null), 3000);
      }
    } catch (error) {
      console.error(error);
      await handleDownloadImage();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      id="export-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl border border-gray-300 w-full max-w-4xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        id="export-modal-dialog"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-red-50 border border-red-200 flex items-center justify-center text-[#D10000]">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900 uppercase tracking-tight">
                Exportar e Compartilhar Checagem
              </h3>
              <p className="text-[11px] text-gray-500 font-medium">
                Gere arquivos estruturados para redes sociais ou arquivo acadêmico (TCC)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            title="Fechar"
            id="btn-close-export-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-3 pb-2 bg-[#F9F9F9] border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-gray-200/70 rounded-lg w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'image'
                  ? 'bg-white text-[#D10000] shadow-2xs font-black'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Card Redes Sociais (PNG)</span>
            </button>

            <button
              onClick={() => setActiveTab('pdf')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'pdf'
                  ? 'bg-white text-[#D10000] shadow-2xs font-black'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Relatório Acadêmico (PDF)</span>
            </button>
          </div>

          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider hidden sm:flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#D10000]" />
            <span>Padrão ABNT NBR 6023</span>
          </div>
        </div>

        {/* Feedback Alert Banners */}
        {exportSuccess && (
          <div className="mx-6 mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{exportSuccess}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mx-6 mt-3 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Modal Body / Scrollable Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-100 flex justify-center">
          {activeTab === 'image' ? (
            <div className="flex flex-col items-center">
              <div className="text-center mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  Pré-visualização do Card Social (Otimizado para Instagram / WhatsApp)
                </span>
              </div>
              <div className="transform origin-top scale-[0.85] sm:scale-100 transition-transform">
                <div ref={socialCardRef}>
                  <SocialShareCard result={result} />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              <div className="text-center mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  Pré-visualização do Relatório Oficial (Formato A4 com cabeçalho institucional e normas ABNT)
                </span>
              </div>
              <div className="transform origin-top scale-[0.7] sm:scale-[0.85] md:scale-95 transition-transform overflow-x-auto max-w-full">
                <div ref={pdfReportRef}>
                  <AcademicReportDocument result={result} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Action Toolbar */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D10000]" />
            <span className="font-medium">
              {activeTab === 'image' 
                ? 'Resolução 2x Retina para postagem nítida nas redes' 
                : 'Formato A4 estruturado para anexar à pesquisa ou portfólio'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {navigator.canShare && (
              <button
                onClick={handleMobileShare}
                disabled={isExporting}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md text-xs font-bold uppercase tracking-wider text-gray-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                title="Compartilhar direto no smartphone"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Compartilhar</span>
              </button>
            )}

            {activeTab === 'image' ? (
              <button
                onClick={handleDownloadImage}
                disabled={isExporting}
                className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#D10000] hover:bg-black text-white rounded-md text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                id="btn-download-image"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gerando PNG...</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4" />
                    <span>Baixar Imagem (PNG)</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleDownloadPdf}
                disabled={isExporting}
                className="flex-1 sm:flex-initial px-6 py-2.5 bg-[#D10000] hover:bg-black text-white rounded-md text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                id="btn-download-pdf"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gerando PDF...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Baixar Relatório (PDF)</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
