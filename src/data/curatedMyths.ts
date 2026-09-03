import { CuratedMyth } from '../types';

export const CURATED_MYTHS: CuratedMyth[] = [
  {
    id: 'agua-com-limao',
    title: 'Beber água com limão em jejum emagrece?',
    summary: 'Mito clássico das redes sociais que atribui propriedades "queimadoras de gordura" e "alcalinizantes" à água morna com limão.',
    classification: 'Falso',
    category: 'Emagrecimento',
    result: {
      id: 'agua-com-limao-result',
      claim: 'Beber água com limão em jejum emagrece e queima gordura corporal.',
      classification: 'Falso',
      shortVerdict: 'A água com limão não possui nenhuma substância capaz de quebrar ou queimar gordura corporal.',
      explanation: 'Nenhum alimento ou bebida isolada tem o poder termogênico de queimar gordura sem um déficit calórico global. O limão é uma excelente fonte de vitamina C e antioxidantes, além de a água contribuir para a hidratação diária, mas o consumo em jejum ou morno não acelera o metabolismo de forma clinicamente relevante, tampouco "alcaliniza o sangue", visto que o pH sanguíneo é rigidamente controlado pelos pulmões e rins (sistema tampão). A perda de peso ocorre exclusivamente quando o gasto energético total supera a ingestão calórica ao longo do tempo.',
      womenFitnessContext: 'Para mulheres praticantes de atividade física, a hidratação matinal é fundamental para o rendimento muscular e transporte de nutrientes. A água com limão pode ser consumida por quem gosta do sabor, mas substituir um desjejum nutritivo por água com limão antes do treino pode gerar hipoglicemia, fraqueza e catabolismo muscular precoce.',
      practicalTip: 'Hidrate-se logo ao acordar com água pura ou aromatizada com frutas se preferir o sabor. Não espere milagres metabólicos e, caso sinta azia ou desconforto gástrico, evite líquidos ácidos em jejum.',
      references: [
        {
          abnt: 'BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Departamento de Atenção Básica. Guia alimentar para a população brasileira. 2. ed. Brasília: Ministério da Saúde, 2014. 156 p.',
          title: 'Guia alimentar para a população brasileira',
          authorsOrEntity: 'BRASIL. Ministério da Saúde',
          year: '2014',
          source: 'Ministério da Saúde do Brasil'
        },
        {
          abnt: 'CONSELHO REGIONAL DE NUTRICIONISTAS (CRN-3). Água com limão emagrece? Esclarecimentos sobre mitos alimentares. São Paulo: CRN-3, 2021.',
          title: 'Esclarecimentos sobre mitos alimentares: água com limão',
          authorsOrEntity: 'Conselho Regional de Nutricionistas 3ª Região',
          year: '2021',
          source: 'CRN-3 Comunicação Científica'
        }
      ],
      disclaimer: 'O NutriNews é uma ferramenta educativa. Esta resposta não substitui uma consulta com nutricionista.',
      timestamp: new Date().toISOString(),
    }
  },
  {
    id: 'creatina-mulheres',
    title: 'Creatina engorda ou deixa a mulher retida e inchada?',
    summary: 'Mito muito difundido no público feminino que afasta praticantes de musculação de um dos suplementos mais estudados da ciência.',
    classification: 'Falso',
    category: 'Suplementação',
    result: {
      id: 'creatina-mulheres-result',
      claim: 'A creatina engorda e causa retenção líquida subcutânea (inchaço) em mulheres.',
      classification: 'Falso',
      shortVerdict: 'A creatina não engorda (não tem calorias) e sua retenção hídrica é estritamente intramuscular, melhorando tônus e força.',
      explanation: 'A creatina é um composto de aminoácidos armazenado principalmente no músculo esquelético. Ela não contém calorias e não promove acúmulo de tecido adiposo (gordura corporal). O ligeiro aumento de peso inicial (quando ocorre) decorre do aumento de água intracelular (dentro da fibra muscular), e não de retenção subcutânea (que causa o aspecto de celulite ou inchaço). Pelo contrário: a hidratação dentro da célula muscular estimula a síntese de proteínas e melhora a densidade do tecido.',
      womenFitnessContext: 'Em mulheres ativas, pesquisas recentes mostram que a creatina é particularmente benéfica não apenas para força e hipertrofia, mas também para a saúde óssea, função cognitiva e regulação energética durante as diferentes fases do ciclo menstrual e na menopausa. É segura e altamente recomendada.',
      practicalTip: 'A dosagem padrão diária é de 3g a 5g de creatina monohidratada tomada de forma contínua (inclusive nos dias sem treino), preferencialmente associada a uma fonte de carboidrato ou proteína para melhor absorção.',
      references: [
        {
          abnt: 'ANTONIO, J. et al. Common questions and misconceptions about creatine supplementation: what does the scientific evidence really show? Journal of the International Society of Sports Nutrition, v. 18, n. 1, p. 13, 2021.',
          title: 'Common questions and misconceptions about creatine supplementation: what does the scientific evidence really show?',
          authorsOrEntity: 'ANTONIO, J. et al.',
          year: '2021',
          source: 'Journal of the International Society of Sports Nutrition (JISSN)'
        },
        {
          abnt: 'SMITH-RYAN, A. E. et al. Creatine Supplementation in Women’s Health: A Lifespan Perspective. Nutrients, v. 13, n. 3, p. 877, 2021.',
          title: 'Creatine Supplementation in Women’s Health: A Lifespan Perspective',
          authorsOrEntity: 'SMITH-RYAN, A. E. et al.',
          year: '2021',
          source: 'Nutrients'
        }
      ],
      disclaimer: 'O NutriNews é uma ferramenta educativa. Esta resposta não substitui uma consulta com nutricionista.',
      timestamp: new Date().toISOString(),
    }
  },
  {
    id: 'carboidrato-noite',
    title: 'Comer carboidrato após as 18h vira gordura?',
    summary: 'Terrorismo nutricional comum no Instagram e TikTok que prega corte de pão, arroz e frutas no período noturno.',
    classification: 'Falso',
    category: 'Mitos Populares',
    result: {
      id: 'carboidrato-noite-result',
      claim: 'Comer carboidratos à noite ou após as 18h vira gordura corporal instantaneamente porque o metabolismo desacelera.',
      classification: 'Falso',
      shortVerdict: 'O horário da refeição não anula as leis da termodinâmica; o saldo calórico de 24 horas determina ganho ou perda de peso.',
      explanation: 'O organismo não possui um relógio que desvia o carboidrato diretamente para o tecido adiposo após determinado horário. O ganho de gordura é consequência do superávit calórico sustentado (ingerir mais calorias do que o corpo gasta ao longo dos dias). O metabolismo durante o sono continua ativo, reparando tecidos, sintetizando hormônios e mantendo funções vitais.',
      womenFitnessContext: 'Para mulheres que treinam à noite ou logo cedo pela manhã, o consumo adequado de carboidrato no jantar é vital para restaurar os estoques de glicogênio hepático e muscular, melhorar a qualidade do sono e evitar a produção excessiva de cortisol (hormônio do estresse), que prejudica a recuperação.',
      practicalTip: 'Priorize fontes de carboidratos complexos (como raízes, aveia, arroz integral, legumes e frutas), ajustando as porções ao seu plano diário, independentemente de ser no almoço ou no jantar.',
      references: [
        {
          abnt: 'SOCIEDADE BRASILEIRA DE MEDICINA DO EXERCÍCIO E DO ESPORTE (SBME). Modificações dietéticas, reposição hídrica, suplementos alimentares e drogas: comprovação de ação ergogênica e potenciais riscos para a saúde. Revista Brasileira de Medicina do Esporte, v. 15, n. 3, supl., p. 3-12, 2009.',
          title: 'Modificações dietéticas, reposição hídrica e suplementos',
          authorsOrEntity: 'SBME',
          year: '2009',
          source: 'Revista Brasileira de Medicina do Esporte'
        },
        {
          abnt: 'THOMAS, D. T.; ERDMAN, K. A.; BURKE, L. M. Position of the Academy of Nutrition and Dietetics, Dietitians of Canada, and the American College of Sports Medicine: Nutrition and Athletic Performance. Journal of the Academy of Nutrition and Dietetics, v. 116, n. 3, p. 501-528, 2016.',
          title: 'Position of the Academy of Nutrition and Dietetics, Dietitians of Canada, and the ACSM: Nutrition and Athletic Performance',
          authorsOrEntity: 'THOMAS, D. T.; ERDMAN, K. A.; BURKE, L. M.',
          year: '2016',
          source: 'J Acad Nutr Diet'
        }
      ],
      disclaimer: 'O NutriNews é uma ferramenta educativa. Esta resposta não substitui uma consulta com nutricionista.',
      timestamp: new Date().toISOString(),
    }
  },
  {
    id: 'dieta-zero-carbo',
    title: 'Cortar carboidratos totalmente é necessário para secar?',
    summary: 'Falsa crença de que zerar carboidratos é o único caminho para mulheres reduzirem o percentual de gordura.',
    classification: 'Falso',
    category: 'Emagrecimento',
    result: {
      id: 'dieta-zero-carbo-result',
      claim: 'É obrigatório cortar totalmente os carboidratos da dieta para conseguir emagrecer e definir o corpo.',
      classification: 'Falso',
      shortVerdict: 'O emagrecimento depende de déficit calórico controlado; zerar carboidratos prejudica a massa magra e o equilíbrio hormonal feminino.',
      explanation: 'Dietas muito restritivas causam rápida perda de peso inicial principalmente devido à perda de água e glicogênio, não gordura. Em longo prazo, estudos randomizados comparando dietas com restrição de carboidratos com dietas equilibradas de calorias iguais mostram perda de gordura idêntica.',
      womenFitnessContext: 'O corte drástico de carboidratos em mulheres ativas frequentemente desencadeia a Síndrome da Baixa Disponibilidade Energética (LEA/RED-S), acarretando alterações no ciclo menstrual (amenorreia), queda nos hormônios tireoidianos (T3), queda no rendimento do treino, perda de massa muscular e enfraquecimento ósseo.',
      practicalTip: 'Mantenha carboidratos de boa qualidade na dieta para sustentar a intensidade dos treinos. Um déficit calórico moderado e sustentável prescrito por nutricionista é a estratégia mais segura e duradoura.',
      references: [
        {
          abnt: 'MOUNTJOY, M. et al. 2023 International Olympic Committee’s (IOC) consensus statement on Relative Energy Deficiency in Sport (REDs). British Journal of Sports Medicine, v. 57, n. 17, p. 1073-1097, 2023.',
          title: 'IOC consensus statement on Relative Energy Deficiency in Sport (REDs)',
          authorsOrEntity: 'MOUNTJOY, M. et al.',
          year: '2023',
          source: 'British Journal of Sports Medicine'
        },
        {
          abnt: 'HALL, K. D. et al. Calorie for Calorie, Dietary Fat Restriction Results in More Body Fat Loss than Carbohydrate Restriction in People with Obesity. Cell Metabolism, v. 22, n. 3, p. 427-436, 2015.',
          title: 'Calorie for Calorie, Dietary Fat Restriction Results in More Body Fat Loss than Carbohydrate Restriction in People with Obesity',
          authorsOrEntity: 'HALL, K. D. et al.',
          year: '2015',
          source: 'Cell Metabolism'
        }
      ],
      disclaimer: 'O NutriNews é uma ferramenta educativa. Esta resposta não substitui uma consulta com nutricionista.',
      timestamp: new Date().toISOString(),
    }
  },
  {
    id: 'whey-protein-mulheres',
    title: 'Whey protein engorda ou deixa a mulher masculinizada?',
    summary: 'Receio infundado de mulheres que acreditam que proteína em pó age como esteroide anabolizante ou engorda.',
    classification: 'Falso',
    category: 'Suplementação',
    result: {
      id: 'whey-protein-result',
      claim: 'Whey protein engorda e causa masculinização e hipertrofia desproporcional em mulheres.',
      classification: 'Falso',
      shortVerdict: 'Whey protein é apenas a proteína do soro do leite concentrada; não contém hormônios nem engorda isoladamente.',
      explanation: 'O whey protein é um alimento com alto valor biológico extraído do leite durante a fabricação de queijos. Ele fornece aminoácidos essenciais, especialmente leucina. Ele não contém testosterona nem esteroides anabolizantes, portanto é fisiologicamente impossível que cause efeitos masculinizantes. Ele engorda apenas se consumido além do limite calórico do dia, assim como qualquer alimento (frango, ovos, arroz).',
      womenFitnessContext: 'Muitas mulheres têm dificuldade em atingir a meta diária de proteínas (1,4g a 2,0g/kg para praticantes de atividade física). O whey protein é uma opção prática que auxilia na saciedade, preserva a massa magra durante fases de emagrecimento e acelera a regeneração muscular pós-treino.',
      practicalTip: 'Pode ser usado em shakes com frutas ou receitas práticas (panquecas, mingaus). Lembre-se que o suplemento é um facilitador alimentar, podendo ser substituído por alimentos sólidos como ovos, queijos magros e carnes.',
      references: [
        {
          abnt: 'JÄGER, R. et al. International Society of Sports Nutrition Position Stand: protein and exercise. Journal of the International Society of Sports Nutrition, v. 14, n. 1, p. 20, 2017.',
          title: 'International Society of Sports Nutrition Position Stand: protein and exercise',
          authorsOrEntity: 'JÄGER, R. et al.',
          year: '2017',
          source: 'Journal of the International Society of Sports Nutrition'
        },
        {
          abnt: 'CONSELHO FEDERAL DE NUTRICIONISTAS (CFN). Resolução CFN nº 390/2006: Regulamenta a prescrição dietética de suplementos nutricionais pelo nutricionista. Brasília: CFN, 2006.',
          title: 'Regulamenta a prescrição dietética de suplementos nutricionais',
          authorsOrEntity: 'Conselho Federal de Nutricionistas',
          year: '2006',
          source: 'CFN Legislação'
        }
      ],
      disclaimer: 'O NutriNews é uma ferramenta educativa. Esta resposta não substitui uma consulta com nutricionista.',
      timestamp: new Date().toISOString(),
    }
  },
  {
    id: 'jejum-treino',
    title: 'Treinar em jejum queima mais gordura e é melhor para todas?',
    summary: 'Afirmação muito popular nas redes que desconsidera a intensidade do treino e individualidade biológica feminina.',
    classification: 'Parcialmente verdadeiro',
    category: 'Desempenho',
    result: {
      id: 'jejum-treino-result',
      claim: 'Treinar em jejum obrigatoriamente queima mais gordura e é a melhor estratégia para mulheres emagrecerem.',
      classification: 'Parcialmente verdadeiro',
      shortVerdict: 'Aumenta ligeiramente a oxidação de lipídios durante o exercício, mas não garante maior perda de gordura ao longo do dia e pode derrubar o rendimento.',
      explanation: 'Durante exercícios em jejum de baixa/moderada intensidade, a oxidação pontual de gordura pode ser discretamente maior. No entanto, o que determina o emagrecimento é o déficit calórico ao fim de 24h a 48h. Além disso, se o treino for de alta intensidade (musculação pesada, HIIT, crossfit), a falta de glicose sanguínea reduz o volume e a carga que a mulher consegue levantar, gerando menor gasto calórico total e risco de queda no rendimento.',
      womenFitnessContext: 'Mulheres são mais sensíveis à restrição energética aguda. O treino em jejum prolongado pode aumentar os níveis de cortisol e precipitar tonturas, náuseas ou hipoglicemia, além de comprometer a síntese protéica muscular se a alimentação pós-treino não for adequada.',
      practicalTip: 'Se você se sente bem treinando em jejum e seu treino é leve, não há problema. Mas se busca força, hipertrofia ou treina em alta intensidade, uma pequena refeição com carboidrato de fácil digestão (ex: banana ou torrada) 30 a 45 minutos antes faz enorme diferença.',
      references: [
        {
          abnt: 'SCHOENFELD, B. J. et al. Body composition changes associated with fasted versus non-fasted aerobic exercise. Journal of the International Society of Sports Nutrition, v. 11, n. 1, p. 54, 2014.',
          title: 'Body composition changes associated with fasted versus non-fasted aerobic exercise',
          authorsOrEntity: 'SCHOENFELD, B. J. et al.',
          year: '2014',
          source: 'Journal of the International Society of Sports Nutrition'
        },
        {
          abnt: 'SOCIEDADE BRASILEIRA DE NUTRIÇÃO ESPORTIVA (SBNE). Diretriz sobre Alimentação e Exercício Físico. São Paulo: SBNE, 2020.',
          title: 'Diretriz sobre Alimentação e Exercício Físico',
          authorsOrEntity: 'Sociedade Brasileira de Nutrição Esportiva',
          year: '2020',
          source: 'SBNE Publicações'
        }
      ],
      disclaimer: 'O NutriNews é uma ferramenta educativa. Esta resposta não substitui uma consulta com nutricionista.',
      timestamp: new Date().toISOString(),
    }
  },
  {
    id: 'sucos-detox',
    title: 'Sucos detox eliminam as toxinas acumuladas no corpo?',
    summary: 'Mercado de bebidas detox que promete desintoxicar o organismo após finais de semana ou excessos alimentares.',
    classification: 'Falso',
    category: 'Mitos Populares',
    result: {
      id: 'sucos-detox-result',
      claim: 'Sucos detox limpam o fígado e eliminam as toxinas acumuladas pelo organismo.',
      classification: 'Falso',
      shortVerdict: 'Nosso corpo já possui um sistema de desintoxicação natural extremamente sofisticado: o fígado, rins, pulmões e pele.',
      explanation: 'Nenhum suco "desintoxica" órgãos internos. A biotransformação de substâncias é feita continuamente por enzimas hepáticas e a excreção ocorre pelos rins e fezes. Suco verde pode ser saudável por conter vitaminas, minerais e água, mas não tem propriedade desintoxicante milagrosa.',
      womenFitnessContext: 'Substituir refeições completas por sucos verdes visando compensar excessos do fim de semana gera déficits severos de proteína e energia, favorecendo a perda de tônus muscular e aumentando a compulsão alimentar nos dias seguintes.',
      practicalTip: 'Consuma vegetais e frutas preferencialmente inteiros para aproveitar as fibras solúveis e insolúveis, beba água adequadamente e mantenha uma rotina alimentar constante sem ciclos de punição e restrição.',
      references: [
        {
          abnt: 'KLEIN, A. V.; KIAT, H. Detox diets for toxin elimination and weight management: a critical review of the evidence. Journal of Human Nutrition and Dietetics, v. 28, n. 6, p. 675-686, 2015.',
          title: 'Detox diets for toxin elimination and weight management: a critical review of the evidence',
          authorsOrEntity: 'KLEIN, A. V.; KIAT, H.',
          year: '2015',
          source: 'Journal of Human Nutrition and Dietetics'
        },
        {
          abnt: 'BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Guia alimentar para a população brasileira. 2. ed. Brasília: Ministério da Saúde, 2014.',
          title: 'Guia alimentar para a população brasileira',
          authorsOrEntity: 'BRASIL. Ministério da Saúde',
          year: '2014',
          source: 'Ministério da Saúde'
        }
      ],
      disclaimer: 'O NutriNews é uma ferramenta educativa. Esta resposta não substitui uma consulta com nutricionista.',
      timestamp: new Date().toISOString(),
    }
  }
];
