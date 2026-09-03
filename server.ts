import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { CURATED_MYTHS } from './src/data/curatedMyths.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client per environment security instructions
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Verification API endpoint
app.post('/api/verify', async (req, res) => {
  const { query } = req.body;

  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({ error: 'A pergunta ou afirmação para verificação é obrigatória.' });
  }

  const cleanQuery = query.trim();
  const lowerQuery = cleanQuery.toLowerCase();

  // Fast-check against curated database for direct high-fidelity matches
  const directMatch = CURATED_MYTHS.find(m => {
    const titleLower = m.title.toLowerCase();
    const claimLower = m.result.claim.toLowerCase();
    return lowerQuery.includes('limão') && (titleLower.includes('limão') || claimLower.includes('limão')) ||
           lowerQuery.includes('creatina') && (titleLower.includes('creatina') || claimLower.includes('creatina')) ||
           (lowerQuery.includes('18h') || lowerQuery.includes('noite')) && lowerQuery.includes('carboidrato') ||
           (lowerQuery.includes('zero carbo') || lowerQuery.includes('cortar carboidrato') || lowerQuery.includes('cortar carbo')) ||
           lowerQuery.includes('whey') && (lowerQuery.includes('masculin') || lowerQuery.includes('engorda')) ||
           lowerQuery.includes('treinar em jejum') || lowerQuery.includes('treino em jejum') ||
           (lowerQuery.includes('suco detox') || lowerQuery.includes('sucos detox'));
  });

  const ai = getGenAI();

  if (!ai) {
    // If no API key is set yet, return matching curated myth or informative educational response
    if (directMatch) {
      return res.json({
        ...directMatch.result,
        claim: cleanQuery,
        sourceType: 'curated_database',
      });
    }

    return res.json({
      id: `analysis-${Date.now()}`,
      claim: cleanQuery,
      classification: 'Parcialmente verdadeiro',
      shortVerdict: 'Análise preliminar em modo acadêmico (Chave de IA em configuração)',
      explanation: 'Para afirmações sobre "' + cleanQuery + '", a literatura em nutrição esportiva e saúde feminina ressalta que mudanças corporais e rendimento dependem do balanço energético, adesão alimentar e individualidade metabólica. Alimentos ou compostos isolados raramente produzem efeitos milagrosos sem contexto.',
      womenFitnessContext: 'Em mulheres praticantes de atividade física, dietas e estratégias encontradas em redes sociais devem ser avaliadas com cautela redobrada para evitar baixa disponibilidade de energia (REDs), fadiga precoce e irregularidades no ciclo hormonal.',
      practicalTip: 'Procure sempre a orientação individualizada de um(a) nutricionista habilitado(a) antes de iniciar qualquer intervenção nutricional ou suplementação.',
      references: [
        {
          abnt: 'BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Guia alimentar para a população brasileira. 2. ed. Brasília: Ministério da Saúde, 2014. 156 p.',
          title: 'Guia alimentar para a população brasileira',
          authorsOrEntity: 'BRASIL. Ministério da Saúde',
          year: '2014',
          source: 'Ministério da Saúde'
        },
        {
          abnt: 'SOCIEDADE BRASILEIRA DE MEDICINA DO EXERCÍCIO E DO ESPORTE (SBME). Modificações dietéticas, reposição hídrica, suplementos alimentares e drogas. Revista Brasileira de Medicina do Esporte, v. 15, n. 3, 2009.',
          title: 'Modificações dietéticas e reposição hídrica no esporte',
          authorsOrEntity: 'SBME',
          year: '2009',
          source: 'Revista Brasileira de Medicina do Esporte'
        }
      ],
      disclaimer: 'O NutriNews é uma ferramenta educativa desenvolvida para fins acadêmicos (TCC ETEC Professor Camargo Aranha). Não substitui consulta com nutricionista.',
      timestamp: new Date().toISOString(),
      sourceType: 'academic_fallback',
    });
  }

  try {
    const prompt = `Você é o motor de verificação científica do NutriNews, projeto acadêmico de TCC do curso Técnico em Nutrição e Dietética (ETEC Professor Camargo Aranha / Centro Paula Souza - CEETEPS), cujo tema é:
"INFLUÊNCIA DAS MÍDIAS SOCIAIS NAS ATITUDES ALIMENTARES DE MULHERES PRATICANTES DE ATIVIDADE FÍSICA".

Analise com rigor científico e imparcialidade a seguinte afirmação ou dúvida colhida de redes sociais (TikTok, Instagram, reels, vídeos curtos):
"${cleanQuery}"

INSTRUÇÕES DE CLASSIFICAÇÃO:
- "Verdadeiro": possui sólido respaldo científico e comprovação clínica.
- "Falso": é um mito, desinformação, fake news, promessa milagrosa ou não tem comprovação fisiológica.
- "Parcialmente verdadeiro": contém meias-verdades, depende fortemente de contexto/dose/indivíduo, ou a premissa é real mas a conclusão difundida na internet é exagerada/distorcida.
- "Sem Evidências Científicas": não há estudos suficientes em humanos para validar ou refutar.

INSTRUÇÕES DE CONTEÚDO:
1. Explicação em linguagem simples e acolhedora, traduzindo conceitos bioquímicos e fisiológicos para que mulheres leigas compreendam perfeitamente, sem termos arrogantes ou rebuscados.
2. Contexto específico para mulheres praticantes de atividades físicas (musculação, corrida, crossfit, etc.), abordando aspectos como rendimento, recuperação muscular, preservação de massa magra, ciclo menstrual ou densidade óssea.
3. Dica prática segura e aplicável no dia a dia.
4. REFERÊNCIAS CIENTÍFICAS EM ABNT (MANDATÓRIO):
   - Cada referência DEVE seguir rigorosamente a norma da ABNT (NBR 6023). Exemplo:
     SOBRENOME, Inicial. Título do artigo ou livro. Nome da Revista ou Editora, v. X, n. Y, p. XX-YY, ano.
     ou: BRASIL. Ministério da Saúde. Guia alimentar para a população brasileira. 2. ed. Brasília: Ministério da Saúde, 2014.
   - RIGOR ACADÊMICO: NUNCA invente referências, autores ou títulos falsos. Utilize artigos reais indexados (SciELO, PubMed) e diretrizes de entidades de autoridade:
     * Conselho Federal de Nutricionistas (CFN)
     * Ministério da Saúde do Brasil
     * Sociedade Brasileira de Medicina do Exercício e do Esporte (SBME)
     * Sociedade Brasileira de Alimentação e Nutrição (SBAN)
     * International Society of Sports Nutrition (ISSN)
     * American College of Sports Medicine (ACSM)
     * World Health Organization (WHO)
     * International Olympic Committee (IOC) consensus statements`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Você é uma inteligência artificial especialista em nutrição esportiva e clínica brasileira, integrada ao projeto acadêmico NutriNews de combate a fake news nutricionais em redes sociais voltado para mulheres ativas. Suas respostas devem ser precisas, acolhedoras e fundamentadas em fontes científicas reais e citadas em ABNT.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            classification: {
              type: Type.STRING,
              description: 'Classificação estrita: Verdadeiro, Falso, Parcialmente verdadeiro ou Sem Evidências Científicas',
            },
            shortVerdict: {
              type: Type.STRING,
              description: 'Uma frase curta, objetiva e impactante resumindo o veredito científico da afirmação.',
            },
            explanation: {
              type: Type.STRING,
              description: 'Explicação detalhada em linguagem acessível desmistificando a afirmação e explicando o funcionamento real do organismo.',
            },
            womenFitnessContext: {
              type: Type.STRING,
              description: 'Considerações específicas para o público feminino praticante de exercícios físicos (energia, hormônios, rendimento, etc.).',
            },
            practicalTip: {
              type: Type.STRING,
              description: 'Orientação prática, saudável e segura recomendada por nutricionistas.',
            },
            references: {
              type: Type.ARRAY,
              description: 'Lista de referências científicas reais formatadas rigorosamente no padrão ABNT (NBR 6023).',
              items: {
                type: Type.OBJECT,
                properties: {
                  abnt: {
                    type: Type.STRING,
                    description: 'Referência completa no padrão ABNT NBR 6023',
                  },
                  title: {
                    type: Type.STRING,
                    description: 'Título da publicação, artigo ou documento',
                  },
                  authorsOrEntity: {
                    type: Type.STRING,
                    description: 'Autores ou entidade responsável (ex: Ministério da Saúde, ISSN, SBME)',
                  },
                  year: {
                    type: Type.STRING,
                    description: 'Ano de publicação',
                  },
                  source: {
                    type: Type.STRING,
                    description: 'Periódico, revista científica ou instituição',
                  },
                },
                required: ['abnt', 'title', 'authorsOrEntity'],
              },
            },
          },
          required: [
            'classification',
            'shortVerdict',
            'explanation',
            'womenFitnessContext',
            'practicalTip',
            'references',
          ],
        },
      },
    });

    const text = response.text?.trim();
    if (!text) {
      throw new Error('Resposta vazia recebida do modelo.');
    }

    const parsedData = JSON.parse(text);

    // Normalize classification
    let validClassification: 'Verdadeiro' | 'Falso' | 'Parcialmente verdadeiro' | 'Sem Evidências Científicas' = 'Parcialmente verdadeiro';
    if (/falso/i.test(parsedData.classification)) {
      validClassification = 'Falso';
    } else if (/verdadeiro/i.test(parsedData.classification) && !/parcial/i.test(parsedData.classification)) {
      validClassification = 'Verdadeiro';
    } else if (/parcial/i.test(parsedData.classification)) {
      validClassification = 'Parcialmente verdadeiro';
    } else if (/sem evid/i.test(parsedData.classification)) {
      validClassification = 'Sem Evidências Científicas';
    }

    const result = {
      id: `analysis-${Date.now()}`,
      claim: cleanQuery,
      classification: validClassification,
      shortVerdict: parsedData.shortVerdict || 'Análise científica da informação.',
      explanation: parsedData.explanation || '',
      womenFitnessContext: parsedData.womenFitnessContext || '',
      practicalTip: parsedData.practicalTip || '',
      references: Array.isArray(parsedData.references) && parsedData.references.length > 0
        ? parsedData.references
        : [
            {
              abnt: 'BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Guia alimentar para a população brasileira. 2. ed. Brasília: Ministério da Saúde, 2014.',
              title: 'Guia alimentar para a população brasileira',
              authorsOrEntity: 'BRASIL. Ministério da Saúde',
              year: '2014',
              source: 'Ministério da Saúde'
            }
          ],
      disclaimer: '⚠️ Atenção: O NutriNews é uma ferramenta educativa desenvolvida para fins acadêmicos. As informações apresentadas não substituem uma avaliação individualizada. Antes de realizar mudanças na alimentação, utilizar suplementos ou seguir recomendações relacionadas à saúde, procure orientação de um nutricionista ou outro profissional de saúde habilitado.',
      timestamp: new Date().toISOString(),
      sourceType: 'ai_generated',
    };

    return res.json(result);
  } catch (error) {
    console.error('Error generating verification from model:', error);

    // If direct match exists, return immediately
    if (directMatch) {
      return res.json({
        ...directMatch.result,
        claim: cleanQuery,
        sourceType: 'curated_database',
      });
    }

    // Determine likely classification from common patterns
    const isLikelyMyth = /emagrece|queima gordura|seca|secar|milagre|cura|detox|elimina toxina|veneno|inflama|engorda|proibido|corta/i.test(lowerQuery);
    const classification = isLikelyMyth ? 'Falso' : 'Parcialmente verdadeiro';

    return res.json({
      id: `analysis-${Date.now()}`,
      claim: cleanQuery,
      classification,
      shortVerdict: isLikelyMyth
        ? 'Afirmação sem comprovação científica sólida na literatura de nutrição esportiva.'
        : 'Informação requer avaliação de contexto individual, dose e rotina de treino.',
      explanation: `Em relação a "${cleanQuery}", a ciência da nutrição enfatiza que nenhum alimento, tempero, infusão ou prática isolada possui a capacidade de alterar radicalmente a composição corporal ou a queima de gordura sem um déficit calórico planejado e consistente. Promessas exageradas em redes sociais frequentemente simplificam processos bioquímicos complexos para atrair visualizações.`,
      womenFitnessContext: 'Em mulheres praticantes de atividade física, dietas restritivas e modismos difundidos na internet apresentam riscos elevados de déficit energético relativo (REDs), perda de massa muscular, fadiga precoce e alterações menstruais. Priorize o consumo balanceado de macronutrientes e a recuperação pós-exercício.',
      practicalTip: 'Desconfie de promessas de resultados rápidos sem esforço nas redes sociais. Consulte sempre um profissional nutricionista para um plano individualizado.',
      references: [
        {
          abnt: 'BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Departamento de Atenção Básica. Guia alimentar para a população brasileira. 2. ed. Brasília: Ministério da Saúde, 2014. 156 p.',
          title: 'Guia alimentar para a população brasileira',
          authorsOrEntity: 'BRASIL. Ministério da Saúde',
          year: '2014',
          source: 'Ministério da Saúde do Brasil'
        },
        {
          abnt: 'SOCIEDADE BRASILEIRA DE MEDICINA DO EXERCÍCIO E DO ESPORTE (SBME). Modificações dietéticas, reposição hídrica, suplementos alimentares e drogas: comprovação de ação ergogênica e potenciais riscos para a saúde. Revista Brasileira de Medicina do Esporte, v. 15, n. 3, supl., p. 3-12, 2009.',
          title: 'Modificações dietéticas e reposição hídrica no esporte',
          authorsOrEntity: 'SBME',
          year: '2009',
          source: 'Revista Brasileira de Medicina do Esporte'
        },
        {
          abnt: 'CONSELHO FEDERAL DE NUTRICIONISTAS (CFN). Código de Ética e de Conduta do Nutricionista. Resolução CFN nº 599/2018. Brasília: CFN, 2018.',
          title: 'Código de Ética e de Conduta do Nutricionista',
          authorsOrEntity: 'Conselho Federal de Nutricionistas',
          year: '2018',
          source: 'CFN Legislação'
        }
      ],
      disclaimer: '⚠️ Atenção: O NutriNews é uma ferramenta educativa desenvolvida para fins acadêmicos (TCC ETEC Professor Camargo Aranha). As informações apresentadas não substituem uma avaliação individualizada. Antes de realizar mudanças na alimentação, utilizar suplementos ou seguir recomendações relacionadas à saúde, procure orientação de um nutricionista ou outro profissional de saúde habilitado.',
      timestamp: new Date().toISOString(),
      sourceType: 'academic_literature_fallback',
    });
  }
});

// Vite middleware & static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NutriNews server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
