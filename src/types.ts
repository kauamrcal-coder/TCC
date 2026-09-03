export type ClassificationType = 'Verdadeiro' | 'Falso' | 'Parcialmente verdadeiro' | 'Sem Evidências Científicas';

export interface ScientificReference {
  abnt: string;
  title: string;
  authorsOrEntity: string;
  year?: string;
  source?: string;
  url?: string;
}

export interface VerificationResult {
  id: string;
  claim: string;
  classification: ClassificationType;
  shortVerdict: string;
  explanation: string;
  womenFitnessContext: string;
  practicalTip: string;
  references: ScientificReference[];
  disclaimer: string;
  timestamp: string;
}

export interface CuratedMyth {
  id: string;
  title: string;
  summary: string;
  classification: ClassificationType;
  category: 'Emagrecimento' | 'Suplementação' | 'Desempenho' | 'Mitos Populares' | 'Saúde Feminina';
  result: VerificationResult;
}
