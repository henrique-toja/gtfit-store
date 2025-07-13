// products.js (Updated with the new design system)
(function() {
    const productsDynamicSection = document.getElementById('products-dynamic-section');
    const head = document.head;

    const domain = 'https://www.gtfit.store';

    const produtos = [
      { "id": 1, "nome": "🟢 SLIM SUPER X 🟢", "categoria": "Emagrecedores", "imagem": "/assets/produtos/slimx.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/slim-super-x", "composicao": ["Psyllium: Fibra solúvel que forma um gel no estômago, promovendo saciedade, reduzindo a fome e regulando o intestino.","Quitosana: Fibra derivada da casca de crustáceos que se liga à gordura no intestino, reduzindo sua absorção e auxiliando na eliminação de lipídios.","Agar-agar: Fibra vegetal extraída de algas, que aumenta de volume no estômago, prolongando a saciedade e ajudando no controle da ingestão calórica.","Spirulina: Alga rica em proteínas e antioxidantes que acelera o metabolismo, reduz a fadiga e apoia o controle de peso com efeito energizante.","Colágeno: Proteína estrutural que auxilia na preservação da massa magra, melhora a firmeza da pele e é útil durante o processo de emagrecimento e definição corporal.","Berinjela: Fonte natural de fibras e antioxidantes, com ação diurética, que auxilia na eliminação de líquidos retidos e melhora o perfil lipídico."], "resultado_combinacao": "A combinação de Psyllium, Quitosana e Agar-agar atua como um combo de fibras que promove saciedade e reduz a absorção de gordura. O Colágeno dá suporte à recuperação muscular e firmeza da pele, enquanto a Berinjela contribui com efeito diurético e melhora do metabolismo.", "modo_uso": "Cada frasco contém: 60 cápsulas para 30 dias – tomar 1 cápsula duas vezes ao dia, 30 minutos antes do almoço e do jantar.", "efeitos_possiveis": ["Leve distensão abdominal ou gases (devido à alta concentração de fibras)","Aumento da saciedade e redução do apetite","Regulação do trânsito intestinal (pode aumentar a frequência de evacuação)"], "seguranca": "O Super Slim X, assim como todo fitoterápico, não causa efeitos colaterais, mas pode gerar leves efeitos de adaptação nos primeiros dias." },
      { "id": 2, "nome": "🟢 GURIA SHAPE DETOX 🟢", "categoria": "Emagrecedores", "imagem": "/assets/produtos/detox.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/guria-shape-detox", "composicao": ["Amora Schizandra: Ricas em antioxidantes, auxiliam na desintoxicação do organismo, combate aos radicais livres e regulação hormonal.","Semente de Lótus: Contribui para o controle do apetite, melhora a digestão e ajuda na eliminação de toxinas.","Cúrcuma: Potente anti-inflamatório natural que estimula o metabolismo, auxilia na digestão e combate processos inflamatórios.","Picolinato de Cromo: Ajuda a regular o açúcar no sangue, reduz a vontade por doces e melhora o metabolismo de carboidratos."], "resultado_combinacao": "A combinação de Amora Schizandra, Semente de Lótus e Cúrcuma promove desintoxicação, controle do apetite e redução da inflamação. Já o Picolinato de Cromo contribui para equilibrar os níveis de glicose e diminuir a vontade por doces.", "modo_uso": "Cada frasco contém: 30 Cápsulas para 60 dias: tomar após a primeira refeição alternando 1 dia sim 1 dia não.", "efeitos_possiveis": ["Leve desconforto gastrointestinal, como gases ou inchaço (primeiros dias)","Aumento da saciedade mais rapidamente","Alterações leves no hábito intestinal (inicialmente)"], "seguranca": "O Guria Shape Detox, assim como todo fitoterápico, não causa efeitos colaterais, mas pode gerar leves efeitos de adaptação nos primeiros dias." },
      { "id": 3, "nome": "🟣 GURIA SHAPE ROXO 🟣", "categoria": "Emagrecedores", "imagem": "/assets/produtos/roxo.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/guria-shape", "composicao": ["Valeriana: Planta com efeito calmante que ajuda a reduzir ansiedade e compulsão alimentar.","Psyllium: Fibra solúvel que melhora o trânsito intestinal e promove saciedade.","Glucomanan: Fibra solúvel que promove saciedade ao absorver água no estômago.","Spirulina: Alga rica em proteínas e antioxidantes que aumenta a energia e fortalece o metabolismo."], "resultado_combinacao": "A combinação de Valeriana, Psyllium e Glucomanan promovem saciedade e efeito calmante, e a Spirulina gera estímulo energético e aceleração metabólica.", "modo_uso": "Cada frasco contém: 30 Cápsulas para 60 dias: tomar após a primeira refeição alternando 1 dia sim 1 dia não.", "efeitos_possiveis": ["Leve inchaço ou gases no início (devido às fibras)","Sensação de saciedade mais rápida","Relaxamento ou sonolência leve (por causa da Valeriana)"], "seguranca": "O Guria Shape Roxo, assim como todo fitoterápico, não causa efeitos colaterais, mas pode gerar leves efeitos de adaptação nos primeiros dias." },
      { "id": 4, "nome": "⚫ GURIA SHAPE BLACK ⚫", "categoria": "Emagrecedores", "imagem": "/assets/produtos/black.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/guria-shape-black", "composicao": ["Glucomanan: Fibra solúvel que se expande no estômago, promovendo saciedade.","Psyllium: Fibra solúvel que melhora o funcionamento intestinal e prolonga a saciedade.","Picolinato de Cromo: Mineral que regula os níveis de glicose e reduz a compulsão por doces.","Morosil®: Extrato de laranja vermelha que auxilia na redução da gordura corporal, especialmente abdominal.","Spirulina: Alga que ajuda a acelerar o metabolismo e aumentar a energia."], "resultado_combinacao": "A combinação de Glucomanan, Psyllium e Picolinato de Cromo promove saciedade, controle da fome e redução da vontade por doces. O Morosil® atua na queima de gordura abdominal, enquanto a Spirulina estimula o metabolismo e aumenta a energia.", "modo_uso": "Cada frasco contém: 30 Cápsulas para 60 dias: tomar após a primeira refeição alternando 1 dia sim 1 dia não.", "efeitos_possiveis": ["Redução intensa do apetite","Leve desconforto digestivo inicial","Pequena dor de cabeça nos primeiros dias (ajuste metabólico)"], "seguranca": "O Guria Shape Black, assim como todo fitoterápico, não causa efeitos colaterais, mas pode gerar leves efeitos de adaptação nos primeiros dias." },
      { "id": 5, "nome": "🟡 GURIA SHAPE GOLD 🟡", "categoria": "Emagrecedores", "imagem": "/assets/produtos/gold.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/shape-xtreme", "composicao": ["Extrato de Romã + Ácido Lipoico: Ação antioxidante, anti-inflamatória e melhora do metabolismo de açúcares.","Equinácea (Extrato Seco): Fortalece o sistema imunológico e modula inflamações.","5-HTP (5-Hidroxitriptófano): Aminoácido que melhora o humor, reduz a ansiedade e compulsões alimentares."], "resultado_combinacao": "A combinação de antioxidantes, ativos metabólicos e neuroquímicos promove mais energia, melhora na imunidade, equilíbrio emocional e suporte completo para acelerar o emagrecimento de forma segura e natural.", "modo_uso": "Cada frasco contém: 40 cápsulas para 40 dias – tomar 1 cápsula ao dia após o almoço.", "efeitos_possiveis": [], "seguranca": "O Guria Shape Gold é um suplemento natural avançado, com ação termogênica e metabólica, indicado para quem já tem certa adaptação com produtos da linha.", "contraindicacoes": ["Gestantes e lactantes", "Menores de 18 anos", "Alérgicos a algum componente da fórmula", "Pessoas com problemas cardíacos, salvo sob orientação médica"] },
      { "id": 6, "nome": "💪🏼 SHAPE XTREME BLACK MASCULINO 💪🏼", "categoria": "Emagrecedores", "imagem": "/assets/produtos/xtreme.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/shape-xtreme-black", "composicao": ["Cáscara Sagrada + Sene: Ação laxativa natural para limpeza intestinal e redução de inchaço.","Pholia Magra + Psyllium: Reduzem a fome e aumentam a saciedade sem perda de energia.","Quitosana + Faseolamina: Bloqueadores naturais de gorduras e carboidratos.","Spirulina: Preserva a massa magra e melhora os níveis de energia.","Cúrcuma: Anti-inflamatório que acelera o metabolismo.","Amora: Ação antioxidante complementar para a saúde geral."], "resultado_combinacao": "Uma fórmula estratégica para resetar o metabolismo, reduzir inchaço, aumentar a evacuação, bloquear gorduras e açúcares, e estimular a queima de gordura rapidamente. Ideal para homens que querem se sentir mais leves, desinchados e com o corpo funcionando no máximo desempenho.", "modo_uso": "Frasco com 30 cápsulas (30 dias). Tomar 1 cápsula ao dia, após o café da manhã. Nos primeiros 5 dias, usar dia sim, dia não, para adaptação. Beber bastante água. Não ingerir álcool durante o uso (corta o efeito).", "efeitos_possiveis": ["Aumento da evacuação", "Sensação de alívio e esvaziamento abdominal", "Menor retenção de líquido", "Fome mais controlada"], "seguranca": "Produto forte, indicado para homens que já estão em processo de emagrecimento. Não recomendado para iniciantes ou pessoas com intestino muito sensível." },
      { "id": 7, "nome": "💧 GURIA SHAPE DETOX GOTAS – FÓRMULA NATURAL 4 EM 1 💧", "categoria": "Emagrecedores", "imagem": "/assets/produtos/gotas.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/guria-shape-em-gotas", "composicao": ["Chá Verde + Laranja Amarga + Gengibre + Guaraná: Ação termogênica e estimulante natural.","Carqueja + Alcachofra + Cavalinha + Alecrim + Guaçatonga: Efeito detox e diurético para eliminar toxinas e líquidos.","Sene + Cáscara Sagrada: Leve ação laxativa natural para limpeza intestinal.","Maracujá + Melissa + Camomila + Espinheira-santa: Efeito calmante para reduzir a ansiedade e apetite emocional.","Picolinato de Cromo: Auxilia no controle da compulsão por doces."], "resultado_combinacao": "A junção de ativos vegetais promove um efeito 4 em 1: Desinchaço + Regulação hormonal + Menos fome + Mente calma. Perfeito para mulheres que precisam de reajuste no organismo.", "modo_uso": "Frasco com 30 ml. Rende em média 20 dias. Tomar 20 a 30 gotas diluídas em água, 1x ao dia, preferencialmente antes do almoço ou jantar. Nos primeiros 5 dias, iniciar com 15 gotas para adaptação.", "efeitos_possiveis": ["Aumento leve da frequência intestinal", "Redução do inchaço corporal", "Menos compulsão por doces", "Mais leveza digestiva e sensação de bem-estar"], "seguranca": "Este fitoterápico é ideal para mulheres que buscam desinchar, desintoxicar e controlar o apetite com efeito calmante leve." },
      { "id": 8, "nome": "🍓 WHEY PROTEIN GURIA SHAPE – SABOR MORANGO 🍓", "categoria": "Complementos", "imagem": "/assets/produtos/whey.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/whey-proteina", "composicao": ["Proteína concentrada e isolada do soro do leite: Fonte completa de aminoácidos essenciais.","Rico em BCAAs: Auxilia na construção e proteção da massa muscular.","Baixo teor de carboidratos e gordura.","Sabor natural de morango com adoçante (sucralose)."], "resultado_combinacao": "Ajuda no ganho e manutenção muscular, reduz a fadiga pós-treino, promove saciedade e complementa a ingestão proteica diária com sabor suave e fácil digestão.", "modo_uso": "Misturar 1 scoop (30g) em 200 a 300 ml de água, leite desnatado ou vegetal. Pode ser consumido no pós-treino, ao acordar ou entre refeições. Uso diário conforme sua necessidade nutricional.", "indicacoes": ["Quem pratica exercícios físicos com foco em definição ou aumento de massa magra.","Quem deseja emagrecer preservando os músculos.","Quem tem dificuldade em consumir proteína suficiente na alimentação."], "beneficios": ["25g de proteína por porção.","Rico em aminoácidos e BCAAs.","Favorece a saciedade e evita o catabolismo.","Acelera a recuperação muscular.","Sabor morango leve e agradável.","Pode ser usado em receitas: panquecas, bolos, smoothies."], "embalagem": "Pote com 900g – Rende cerca de 30 porções." },
      { "id": 9, "nome": "💥 CREATINA GURIA SHAPE 💥", "categoria": "Complementos", "imagem": "/assets/produtos/creatina.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/creatina", "composicao": ["Creatina Monohidratada 100% pura: Aumenta força, potência e volume muscular.","Aditivos e Conservantes: Sem aditivos, conservantes ou corantes.","Produto Vegano e Sem Glúten: Adequado para dietas veganas e sem glúten."], "resultado_combinacao": "Favorece o desempenho físico em treinos de alta intensidade, auxilia na construção de músculos definidos, aumenta a energia e retarda a fadiga. Também promove maior hidratação muscular e melhora a recuperação entre os treinos.", "modo_uso": "Tomar 1 scoop (5g) por dia. Diluir em água ou suco. Preferencialmente no pós-treino. Nos dias sem treino, tomar em qualquer horário para manter a saturação muscular. Uso contínuo sem necessidade de ciclos.", "indicacoes": ["Quem busca aumento de força e resistência","Quem pratica musculação ou treinos de alta intensidade","Quem deseja otimizar o ganho de massa muscular e acelerar a recuperação"], "beneficios": ["Aumenta a força e o desempenho físico","Favorece o volume e a hidratação muscular","Reduz a fadiga e melhora a recuperação","Auxilia na construção de massa magra","Produto puro, seguro e eficaz"], "embalagem": "Pote com 300g – Rende aproximadamente 60 porções. Acompanha dosador." },
      { "id": 10, "nome": "⚡ GURIA SHAPE ENERGIA COFFE ⚡", "categoria": "Complementos", "imagem": "/assets/produtos/coffe.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/estimulantes/guria-shape-coffee", "composicao": ["Cafeína: Potente estimulante e acelerador metabólico.","Creatina: Aumenta a força e preserva a massa magra.","TCM (Triglicerídeos de Cadeia Média): Fornece energia rápida e favorece a queima de gordura.","L-Carnitina: Facilita o transporte da gordura para ser usada como energia.","Colágeno: Cuida da pele e das articulações.","Taurina: Melhora o desempenho físico e aumenta o foco.","Inositol: Auxilia no controle da ansiedade e no equilíbrio hormonal.","Coenzima Q10: Potente antioxidante que melhora a energia.","Cromo: Regula o açúcar no sangue e ajuda a reduzir a compulsão por doces."], "resultado_combinacao": "Fórmula completa que combina energia, foco, e recuperação, acelerando o metabolismo e promovendo a queima de gordura enquanto cuida das articulações e pele.", "modo_uso": "Dissolver 1 scoop (5g) em 100ml a 200ml de água quente ou bebida vegetal. Consumir pela manhã ao acordar ou 30 minutos antes do treino.", "beneficios": ["Acelera o metabolismo e queima gordura.","Melhora o desempenho e foco durante os treinos.","Preserva a massa magra e cuida da pele e articulações.","Controla a ansiedade e reduz a compulsão por doces."], "embalagem": "Pote com 100g. Rende até 20 doses, com dosador incluído." },
      { "id": 11, "nome": "🍦 SHAKE SUBSTITUTO DE REFEIÇÃO – SABOR BAUNILHA 🍦", "categoria": "Complementos", "imagem": "/assets/produtos/shakebaunilia.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/estimulantes/shake-guria-shape-baunilha", "composicao": ["Proteína isolada da soja e/ou do leite: Preserva a massa magra.","Fibras (inulina, psyllium ou aveia): Aumentam a saciedade e regulam o intestino.","Vitaminas A, C, D, E e Complexo B: Fundamentais para o metabolismo energético.","Minerais (cálcio, magnésio, ferro e zinco): Apoiam a saúde óssea e imunidade.","Adoçado com sucralose e aromatizado com extrato natural de baunilha."], "resultado_combinacao": "Um shake funcional e saboroso que substitui uma refeição com equilíbrio nutricional, promovendo saciedade, melhora do trânsito intestinal e apoio ao emagrecimento saudável.", "modo_uso": "Misturar 2 colheres (sopa) cheias em 300 ml de água, leite vegetal ou leite desnatado. Bater no liquidificador ou coqueteleira. Consumir no lugar do café da manhã ou do jantar. Rende de 10 a 15 porções.", "indicacoes": ["Quem deseja emagrecer com uma refeição leve e completa.","Quem busca praticidade com nutrição balanceada.","Quem tem dificuldade em consumir proteína suficiente na alimentação."], "beneficios": ["Substitui uma refeição com baixas calorias.","Rico em fibras: melhora o intestino e dá saciedade.","Fonte de proteína: preserva a massa magra.","Contém vitaminas e minerais essenciais.","Reduz a compulsão por doces.","Leve, saboroso e fácil de preparar.","Sabor baunilha suave e cremoso."] },
      { "id": 12, "nome": "🍌 SHAKE SUBSTITUTO DE REFEIÇÃO – SABOR BANANA 🍌", "categoria": "Complementos", "imagem": "/assets/produtos/shakebanana.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/estimulantes/shake-guria-shape-banana", "composicao": ["Proteína isolada da soja e/ou do leite: Ajuda a preservar a massa magra.","Fibras (inulina, psyllium ou aveia): Promovem saciedade e regulam o intestino.","Vitaminas A, C, E, D e Complexo B: Suporte essencial ao metabolismo e à imunidade.","Minerais (zinco, cálcio, ferro e magnésio): Nutrientes fundamentais para o equilíbrio do organismo.","Adoçado com sucralose e com aroma natural de banana."], "resultado_combinacao": "Um shake nutritivo, com baixo teor calórico e rico em fibras e proteínas, ideal para substituir uma refeição completa com praticidade. Auxilia no controle da fome, da glicose e do colesterol.", "modo_uso": "Misturar 2 colheres (sopa) cheias em 300 ml de água ou leite vegetal/desnatado. Bater no liquidificador ou coqueteleira. Consumir no lugar de 1 refeição principal (café da manhã ou jantar). Rende de 10 a 15 porções. Dica: adicione gelo ou canela.", "indicacoes": ["Quem deseja emagrecer com uma refeição prática e equilibrada.","Quem tem rotina corrida e precisa de nutrição rápida.","Quem busca controle da compulsão alimentar ou tem dificuldade com refeições noturnas."], "beneficios": ["Substitui uma refeição completa com baixo teor calórico.","Rico em fibras: prolonga a saciedade e melhora o intestino.","Fonte de proteínas: preserva a massa magra.","Contém vitaminas e minerais essenciais.","Reduz picos de fome e compulsão alimentar.","Ajuda no controle glicêmico e do colesterol.","Delicioso, prático e fácil de preparar."] },
      { "id": 13, "nome": "🌙 GURIA SHAPE MELATONINA – FILME SUBLINGUAL 🌙", "categoria": "Complementos", "imagem": "/assets/produtos/melatonina.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/estimulantes/melatonina-fio", "composicao": ["Melatonina: Hormônio natural que regula o ritmo biológico e induz o sono profundo.","Triptofano: Precursor da serotonina, relaxa o corpo e melhora o humor.","Inositol: Ajuda no controle da ansiedade e promove equilíbrio emocional.","Picolinato de Cromo: Auxilia no controle da compulsão por doces e apetite noturno.","Aroma artificial de maracujá, sucralose, emulsificantes e conservantes naturais."], "resultado_combinacao": "Promove sono reparador, regula o apetite noturno, reduz ansiedade e melhora o humor. Ação rápida, sem causar dependência ou sonolência no dia seguinte.", "modo_uso": "Contém 30 filmes sublinguais – 30 dias de uso. Colocar 1 filme sob a língua, 30 minutos antes de dormir. Evitar luz branca (celular, TV) após o uso para melhor efeito.", "indicacoes": ["Ideal para quem sofre com insônia ou sono leve","Quem sente ansiedade noturna ou compulsão alimentar","Quem quer melhorar o sono e apoiar o emagrecimento"], "efeitos_possiveis": ["Sono mais profundo e sem interrupções","Menos vontade de comer à noite","Redução do estresse e mais disposição no dia seguinte"] },
      { "id": 14, "nome": "🌙 GURIA SHAPE SLEEP – GOTAS 🌙", "categoria": "Complementos", "imagem": "/assets/produtos/sleep.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/sleep-gotas", "composicao": ["Melatonina: Hormônio natural do sono que regula o ciclo circadiano.","Triptofano: Aminoácido precursor da serotonina, acalma a mente e melhora o humor.","Inositol: Nutriente que reduz ansiedade e favorece o relaxamento do sistema nervoso.","Picolinato de Cromo: Mineral que auxilia no controle da compulsão por doces.","Aroma artificial de maracujá: Sabor leve e relaxante."], "resultado_combinacao": "Relaxa o corpo, acalma a mente e induz o sono natural, favorecendo a regulação hormonal, controle de apetite e equilíbrio do metabolismo. Suporte para emagrecimento feminino com foco em bem-estar.", "modo_uso": "Frasco conta-gotas com 30 ml (rende de 30 a 60 doses). Tomar 10 a 15 gotas sublinguais, 30 minutos antes de dormir. Após ingerir, evitar o uso de telas para melhor efeito. Não precisa diluir em água.", "indicacoes": ["Mulheres com sono leve, insônia ou ansiedade noturna","Quem está em processo de emagrecimento e quer controlar a fome no período noturno","Quem deseja dormir bem sem risco de vício ou sedação prolongada","Quem sente dificuldade em relaxar à noite"], "efeitos_possiveis": ["Sono mais rápido e profundo","Acordar mais descansada","Redução de episódios de fome noturna ou compulsão emocional","Melhora gradual no humor e disposição diária"] },
      { "id": 15, "nome": "🤍 GURIA SHAPE MELASM – CLAREADOR DE MANCHAS 🤍", "categoria": "Complementos", "imagem": "/assets/produtos/melasm.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/guria-shape-melasm", "composicao": ["Ácido Hialurônico: Hidrata profundamente e melhora a elasticidade da pele.","Vitamina C: Potente antioxidante com ação clareadora.","Polypodium leucotomos: Planta com ação fotoprotetora oral.","Zinco + Selênio: Minerais antioxidantes que combatem radicais livres.","Licopeno: Protege a pele da radiação UV e contribui para o viço.","Vitamina E: Ação regeneradora e antioxidante.","Inositol + Vitamina B6: Ajudam a equilibrar o sistema hormonal feminino."], "resultado_combinacao": "Clareamento gradual, seguro e eficaz das manchas de melasma, acne e sol. Atua no controle da melanina, melhora firmeza e viço da pele, combate inflamações e regula hormônios, sem ácidos agressivos.", "modo_uso": "Frasco com 60 cápsulas para 30 dias. Tomar 2 cápsulas ao dia, preferencialmente após o café da manhã. Uso contínuo é essencial para resultados visíveis.", "indicacoes": ["Mulheres com melasma, manchas hormonais, pós-acne ou causadas pelo sol","Quem busca solução natural, segura e sem ácidos agressivos","Quem deseja uniformizar o tom da pele e prevenir novas manchas","Quem quer cuidar da pele de dentro pra fora"], "dicas_importantes": ["Associe ao uso diário de protetor solar","Evite exposição solar intensa sem proteção","A paciência é aliada: os resultados são graduais, mas consistentes"] },
      { "id": 16, "nome": "🟠 GURIA SHAPE CELUX 🟠", "categoria": "Complementos", "imagem": "/assets/produtos/cellux.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/celux", "composicao": ["Laranja Mora: Rica em antioxidantes, auxilia na quebra da gordura localizada e melhora a circulação.","Extrato de Cacau: Estimula a circulação e ajuda na firmeza da pele.","Extrato seco de Semente de Uva: Potente antioxidante que melhora a drenagem linfática e fortalece os vasos."], "resultado_combinacao": "A fórmula avançada atua diretamente nas camadas da pele, promovendo redução visível da celulite, melhora na textura, firmeza e circulação. Pele mais lisa, tonificada e uniforme.", "modo_uso": "Cada frasco contém: 30 cápsulas para 60 dias. Tomar 1 cápsula após o café da manhã, dia sim, dia não. Ingerir bastante água durante o dia. Não ingerir bebida alcoólica (corta o efeito).", "indicacoes": ["Mulheres que desejam reduzir o aspecto da celulite naturalmente.","Quem busca firmeza, tonicidade e uniformidade da pele.","Quem sofre com má circulação e retenção de líquidos."], "efeitos_possiveis": ["Pele menos inchada e mais firme.","Melhora na textura e no viço da pele.","Efeito contínuo e progressivo com uso regular."] },
      { "id": 17, "nome": "⚪ COLÁGENO HIDROLISADO – LINHA GABRIELA TORRACA ⚪", "categoria": "Complementos", "imagem": "/assets/produtos/colageno.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/colageno-hidrolisado", "composicao": ["Colágeno Hidrolisado: Proteína essencial para elasticidade da pele e suporte estrutural.","Vitamina C: Potencializa os efeitos do colágeno e melhora sua absorção.","Gelatina: Fonte natural de aminoácidos que nutrem unhas, cabelos e articulações."], "resultado_combinacao": "Fortalece a estrutura da pele e tecidos conectivos, reduz flacidez, melhora firmeza e apoia a saúde articular durante o emagrecimento e transformação corporal.", "modo_uso": "2 cápsulas ao dia (manhã e noite). Para casos de excesso de pele, 3 cápsulas ao dia. Rende 20 a 30 dias conforme dosagem.", "indicacoes": ["Quem está emagrecendo e quer evitar ou reduzir flacidez","Quem passou por grandes mudanças corporais","Pessoas que desejam cuidar da pele, cabelos, unhas e articulações","Quem busca prevenção contra envelhecimento precoce"], "beneficios": ["Redução da flacidez e melhora da firmeza da pele","Fortalecimento de unhas e cabelos","Melhora da saúde das articulações, tendões e cartilagens","Prevenção do envelhecimento precoce","Apoio completo durante o processo de emagrecimento"] }
    ];

    function preloadImage(url) {
        if (!document.querySelector(`link[href="${url}"]`)) {
            const link = document.createElement('link');
            link.rel = 'preload'; link.href = url; link.as = 'image';
            head.appendChild(link);
        }
    }

    // --- FUNÇÃO ATUALIZADA PARA USAR O NOVO ESTILO ---
    function generateAccordionItem(title, content, isOpen = false) {
        if (!content || (Array.isArray(content) && content.length === 0)) return '';
        const contentHTML = Array.isArray(content)
            ? `<ul class="space-y-3">${content.map(item => `<li class="flex items-start gap-3"><span class="text-primary-green mt-1.5 flex-shrink-0">✓</span><span>${item}</span></li>`).join('')}</ul>`
            : `<p>${content}</p>`;
        return `
            <div class="product-accordion-item ${isOpen ? 'open' : ''}">
                <button class="product-accordion-header">
                    <span>${title}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="product-accordion-content">
                    <div class="product-accordion-body">${contentHTML}</div>
                </div>
            </div>
        `;
    }

    function createBackButtonHTML(backCallback) {
        const button = document.createElement('button');
        button.className = 'link-button group flex items-center justify-center gap-4 w-full max-w-sm p-3 mt-8 border-slate-700 hover:border-slate-500';
        button.innerHTML = `<span class="font-semibold text-center text-slate-400 group-hover:text-white">↩️ Voltar</span>`;
        button.onclick = backCallback;
        return button;
    }

    // --- FUNÇÃO ATUALIZADA PARA USAR O NOVO LAYOUT ---
    function showProductDetail(productId, backCallback) {
        const produto = produtos.find(p => p.id === parseInt(productId));
        if (!produto) return;

        const imageUrl = `${domain}${produto.imagem}`;

        const detailHTML = `
            <div class="w-full max-w-md mx-auto">
                <div class="product-card-detail">
                    <div class="product-detail-header">
                        <img src="${imageUrl}" alt="${produto.nome}" 
                             class="w-32 h-32 object-contain rounded-full mx-auto mb-5 border-4 border-primary-purple/50 shadow-lg shadow-primary-purple/20">
                        <h2 class="text-3xl font-extrabold text-white tracking-tight">${produto.nome}</h2>
                    </div>
                    <div class="product-accordion-container">
                        ${generateAccordionItem('✨ Para que serve?', produto.resultado_combinacao, true)}
                        ${generateAccordionItem('💊 Composição', produto.composicao)}
                        ${generateAccordionItem('📋 Modo de Uso', produto.modo_uso)}
                        ${generateAccordionItem('⚠️ Efeitos de Adaptação', produto.efeitos_possiveis)}
                        ${generateAccordionItem('🛡️ Segurança', produto.seguranca)}
                        ${generateAccordionItem('🎯 Indicações', produto.indicacoes)}
                        ${generateAccordionItem('🏆 Benefícios', produto.beneficios)}
                        ${generateAccordionItem('📦 Embalagem', produto.embalagem)}
                        ${generateAccordionItem('🚫 Contraindicações', produto.contraindicacoes)}
                        ${generateAccordionItem('💡 Dicas Importantes', produto.dicas_importantes)}
                    </div>
                    <div class="product-detail-footer">
                         <a href="${produto.link_loja}" target="_blank" class="store-cta-button">
                            Ver na Loja Oficial ✅
                        </a>
                    </div>
                </div>
            </div>
        `;

        productsDynamicSection.innerHTML = detailHTML;
        productsDynamicSection.appendChild(createBackButtonHTML(() => renderProductList(produto.categoria, backCallback)));
        addEventListenersForDetail();
    }

    function addEventListenersForDetail() {
        document.querySelectorAll('.product-accordion-item').forEach(item => {
            const header = item.querySelector('.product-accordion-header');
            const content = item.querySelector('.product-accordion-content');
            const toggleItem = () => {
                const isOpen = item.classList.contains('open');
                if (isOpen) {
                    content.style.maxHeight = '0px';
                    item.classList.remove('open');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    item.classList.add('open');
                }
            };
            header.addEventListener('click', toggleItem);
            if (item.classList.contains('open')) {
                setTimeout(() => { content.style.maxHeight = content.scrollHeight + 'px'; }, 10);
            }
        });
    }

    window.renderProductList = (category, backCallback) => {
        const filteredProducts = produtos.filter(p => p.categoria === category);
        filteredProducts.forEach(produto => preloadImage(`${domain}${produto.imagem}`));

        let productsHTML = filteredProducts.map(produto => {
            const imageUrl = `${domain}${produto.imagem}`;
            return `
                <button data-product-id="${produto.id}" class="link-button product-item-btn group flex items-center gap-4 w-full max-w-sm p-3 h-16">
                    <img src="${imageUrl}" alt="${produto.nome}" class="w-12 h-12 object-contain rounded-full flex-shrink-0">
                    <span class="flex-grow font-semibold text-center text-slate-200 group-hover:text-white">${produto.nome}</span>
                    <div class="w-12"></div>
                </button>
            `;
        }).join('');

        productsDynamicSection.innerHTML = productsHTML;
        productsDynamicSection.appendChild(createBackButtonHTML(backCallback));

        document.querySelectorAll('.product-item-btn').forEach(button => {
            button.onclick = () => {
                injectDetailStyles(); // Injeta os estilos ao clicar
                showProductDetail(button.dataset.productId, backCallback);
            };
        });
    };

    // --- NOVA FUNÇÃO PARA INJETAR OS ESTILOS ---
    function injectDetailStyles() {
        const styleId = 'product-detail-styles';
        if (document.getElementById(styleId)) return;
        const style = document.createElement('style');
        style.id = styleId;
        // Estilos unificados com os de combos.js
        style.textContent = `
            .product-card-detail {
                background: linear-gradient(145deg, #18181b, #111);
                border: 1px solid #333;
                border-radius: 1.5rem;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                box-shadow: 0 0 50px -15px rgba(192, 132, 252, 0.5), 0 0 15px -5px rgba(75, 222, 128, 0.4);
            }
            .product-detail-header { padding: 1.5rem; text-align: center; background: rgba(0,0,0,0.2); border-bottom: 1px solid #333; }
            .product-accordion-container { padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
            .product-accordion-item { border-bottom: 1px solid #333; }
            .product-accordion-item:last-child { border-bottom: none; }
            .product-accordion-header {
                width: 100%; display: flex; justify-content: space-between; align-items: center;
                padding: 1rem 0.5rem; text-align: left; background: transparent; border: none;
                color: white; cursor: pointer; font-size: 1rem; font-weight: 600;
            }
            .product-accordion-header i { transition: transform 0.3s ease; color: var(--primary-purple); }
            .product-accordion-item.open .product-accordion-header i { transform: rotate(180deg); }
            .product-accordion-content { max-height: 0px; overflow: hidden; transition: max-height 0.4s ease-out; }
            .product-accordion-body { padding: 0 0.5rem 1rem 0.5rem; color: #d1d5db; line-height: 1.7; }
            .product-accordion-body p { text-align: justify; }
            .product-detail-footer { padding: 1.5rem; background: #111; margin-top: auto; border-top: 1px solid #333; }
            .store-cta-button {
                display: block; text-align: center; padding: 1rem; border-radius: 9999px;
                font-weight: bold; font-size: 1.125rem; text-decoration: none;
                background: linear-gradient(90deg, var(--primary-purple), var(--primary-green));
                color: #111;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .store-cta-button:hover {
                transform: scale(1.03);
                box-shadow: 0 0 25px -5px var(--primary-purple);
            }
        `;
        document.head.appendChild(style);
    }
})();
