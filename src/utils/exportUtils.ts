import { toPng, toBlob } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { VerificationResult } from '../types';

export async function downloadResultAsImage(
  element: HTMLElement,
  filename = 'nutrinews-card.png'
): Promise<void> {
  try {
    // Ensure document fonts are loaded before snapshot
    if ('fonts' in document) {
      await document.fonts.ready;
    }

    const dataUrl = await toPng(element, {
      quality: 0.98,
      pixelRatio: 2,
      backgroundColor: '#FFFFFF',
      cacheBust: true,
      skipFonts: false,
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Erro ao gerar imagem:', error);
    throw error;
  }
}

export async function downloadResultAsPdf(
  element: HTMLElement,
  result: VerificationResult,
  filename = 'nutrinews-relatorio.pdf'
): Promise<void> {
  try {
    if ('fonts' in document) {
      await document.fonts.ready;
    }

    const imgData = await toPng(element, {
      quality: 0.98,
      pixelRatio: 2,
      backgroundColor: '#FFFFFF',
      cacheBust: true,
      skipFonts: false,
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const img = new Image();
    img.src = imgData;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pdfWidth - margin * 2;
    const contentHeight = (img.height * contentWidth) / img.width;

    if (contentHeight <= pdfHeight - margin * 2) {
      pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, contentHeight);
    } else {
      let position = margin;
      let heightLeft = contentHeight;
      let page = 0;

      while (heightLeft > 0) {
        if (page > 0) {
          pdf.addPage();
        }
        pdf.addImage(
          imgData,
          'PNG',
          margin,
          position - page * (pdfHeight - margin * 2),
          contentWidth,
          contentHeight
        );
        heightLeft -= pdfHeight - margin * 2;
        page++;
      }
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
}

export async function shareResultImage(
  element: HTMLElement,
  result: VerificationResult
): Promise<boolean> {
  try {
    if ('fonts' in document) {
      await document.fonts.ready;
    }

    const blob = await toBlob(element, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: '#FFFFFF',
    });

    if (!blob) return false;

    const file = new File([blob], `nutrinews-${result.classification.toLowerCase()}.png`, {
      type: 'image/png',
    });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: `NutriNews: ${result.classification.toUpperCase()} - "${result.claim}"`,
        text: `Confira a checagem científica do NutriNews para: "${result.claim}". Veredito: ${result.shortVerdict}`,
      });
      return true;
    }
    return false;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return true; // User cancelled share dialog
    }
    console.warn('Web Share failed, fallback to download:', err);
    return false;
  }
}
