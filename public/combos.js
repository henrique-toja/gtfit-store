// combos.js (Final version with ALL combos restored and complete)
(function() {
    const combosSection = document.getElementById('combos-section');

    const domain = 'https://www.gtfit.store';

    // Data object completely rebuilt based on the new structure, including the 'Potência' category.
    const originalCombosData = {
        'peso-normal': [
            { 
                id: 'pn-eco', 
                type: 'eco',
                tag: 'PLANO ECONÔMICO', 
                title: 'Projeto Slim 30 dias', 
                duration: 'Mínimo 30 Dias', 
                products: [{ name: '1 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para você que já está no peso ideal, mas busca aquela definição final, secar gordurinhas teimosas e manter o corpo modelado. É o toque de mestre para quem não quer relaxar nos resultados.<br><br><strong>A Estratégia:</strong> O <strong>Slim Super X</strong> atua como um otimizador metabólico. Ele age diretamente na saciedade com seu poderoso mix de fibras, fazendo você se sentir satisfeita com menos. Ao mesmo tempo, seus componentes diuréticos ajudam a eliminar a retenção de líquidos, revelando a definição muscular. <br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Nas primeiras semanas, você sentirá a fome mais controlada e menos inchaço. Ao final dos 30 dias, seu corpo estará mais 'seco', com contornos mais aparentes e um metabolismo afinado para manter os resultados." 
            },
            { 
                id: 'pn-ans', 
                type: 'anxiety',
                tag: 'PLANO ANSIEDADE', 
                title: 'Projeto Slim Equilíbrio', 
                duration: 'Mínimo 30 Dias', 
                products: [{ name: '1 Guria Shape Roxo', img: `${domain}/assets/produtos/roxo.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para você que está no peso certo, mas sente que a ansiedade e o 'comer emocional' sabotam sua busca pela definição. É para quem precisa de paz mental para dar o último passo na transformação do corpo.<br><br><strong>A Estratégia:</strong> O <strong>Guria Shape Roxo</strong> é seu aliado para o equilíbrio. Ele atua diretamente na causa da compulsão, usando a Valeriana para acalmar a mente e diminuir a vontade de 'beliscar'. Isso te dá o controle necessário para manter uma dieta limpa e focada na definição, sem a interferência da ansiedade.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Você notará uma serenidade maior no seu dia a dia e um controle sobre o apetite que parecia perdido. Isso permitirá que seus esforços na dieta e no treino finalmente apareçam, resultando em um corpo mais definido e uma mente em paz." 
            },
            { 
                id: 'pn-pot', 
                type: 'potencia',
                tag: 'PLANO POTÊNCIA', 
                title: 'Projeto Slim Potência', 
                duration: 'Mínimo 30 Dias', 
                products: [{ name: '1 Guria Shape Black', img: `${domain}/assets/produtos/black.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para quem busca resultados rápidos e intensos. Se você sente que seu metabolismo está 'travado' e precisa de um choque de potência para acelerar a queima de gordura e obter a máxima definição.<br><br><strong>A Estratégia:</strong> O <strong>Guria Shape Black</strong> é a nossa fórmula de impacto. Ele age como um inibidor de apetite extremamente eficaz e um termogênico potente, forçando seu corpo a queimar gordura localizada como fonte primária de energia. É a força máxima para quem tem pressa de ver resultados.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Prepare-se para uma redução drástica do apetite e um aumento notável de energia. Nos primeiros 30 dias, seu corpo passará por uma recalibração metabólica, resultando em uma definição muscular mais rápida e visível."
            },
            { 
                id: 'pn-prem', 
                type: 'premium',
                tag: 'PLANO PREMIUM', 
                title: 'Projeto Slim Premium', 
                duration: 'Mínimo 30 Dias', 
                products: [{ name: '1 Guria Shape Gold', img: `${domain}/assets/produtos/gold.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para a mulher que busca a excelência. Você não quer apenas definir, quer brilhar. Este plano é para quem deseja a máxima performance na queima de gordura enquanto cuida da pele, humor e imunidade.<br><br><strong>A Estratégia:</strong> O <strong>Guria Shape Gold</strong> é a nossa fórmula mais avançada. Ele trabalha em 3 pilares: queima de gordura acelerada com ativos nobres, equilíbrio do humor com 5-HTP para eliminar a compulsão por doces, e fortalecimento da imunidade e da pele. É um tratamento de beleza e bem-estar de dentro para fora.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Desde o início, você sentirá mais energia e disposição. A vontade por doces diminuirá drasticamente. Com 30 dias, seu corpo não só estará mais definido, mas você se sentirá mais equilibrada, radiante e com a saúde em dia." 
            }
        ],
        'sobrepeso': [
            { 
                id: 'sp-eco', 
                type: 'eco',
                tag: 'PLANO ECONÔMICO', 
                title: 'Projeto Slim 60 dias', 
                duration: 'Mínimo 60 Dias', 
                products: [{ name: '1 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para quem decidiu dar um basta no sobrepeso e busca um caminho seguro, consistente e com ótimo custo-benefício para reeducar o corpo e a mente.<br><br><strong>A Estratégia:</strong> Um tratamento contínuo de 60 dias com <strong>Slim Super X</strong>. Ele reeduca seu apetite, regula seu intestino e mantém seu metabolismo ativo na queima de gordura. A consistência de 60 dias é a chave para criar novos hábitos e garantir que o peso perdido não volte.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> O primeiro mês trará controle. O segundo trará a transformação. Ao final dos 60 dias, você terá perdido peso de forma visível e, mais importante, terá criado uma nova relação com a comida, sentindo-se no controle." 
            },
            { 
                id: 'sp-ans', 
                type: 'anxiety',
                tag: 'PLANO ANSIEDADE', 
                title: 'Projeto Slim Equilíbrio', 
                duration: 'Mínimo 60 Dias', 
                products: [{ name: '1 Guria Shape Roxo', img: `${domain}/assets/produtos/roxo.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para você, que sabe que a sua maior batalha contra o sobrepeso é a mente. Se a ansiedade e a compulsão ditam suas escolhas, este combo foi desenhado para te devolver o poder.<br><br><strong>A Estratégia:</strong> O <strong>Guria Shape Roxo</strong> é um especialista. Ele não foca apenas no corpo, mas principalmente na causa emocional do ganho de peso. A Valeriana acalma seus pensamentos, diminuindo o gatilho da ansiedade, enquanto as fibras de alta performance te dão uma sensação de plenitude que te liberta da fome nervosa.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Nos primeiros dias, você sentirá uma calma mental que não sentia há tempos. A necessidade de 'beliscar' desaparecerá. Ao longo dos 60 dias, essa serenidade se torna seu novo normal, e o emagrecimento vira uma consequência natural e pacífica." 
            },
            { 
                id: 'sp-pot', 
                type: 'potencia',
                tag: 'PLANO POTÊNCIA', 
                title: 'Projeto Slim Potência', 
                duration: 'Mínimo 60 Dias', 
                products: [{ name: '1 Guria Shape Black', img: `${domain}/assets/produtos/black.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para quem está com sobrepeso e quer uma solução de força-tarefa para reverter o quadro com velocidade e eficiência. Ideal para quem já tentou outras abordagens sem o sucesso desejado.<br><br><strong>A Estratégia:</strong> O <strong>Guria Shape Black</strong> atua com força total por 60 dias. Sua ação inibidora de apetite é tão intensa que reeduca seu paladar e suas porções à força. Combinado com seu poder termogênico, ele ataca as reservas de gordura de forma contínua, promovendo uma perda de peso acelerada.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> A adaptação é marcada por uma sensação de controle total sobre a fome. Seu corpo se tornará uma máquina de queimar gordura. Ao final dos 60 dias, a mudança na balança e no espelho será expressiva."
            },
            { 
                id: 'sp-prem', 
                type: 'premium',
                tag: 'PLANO PREMIUM', 
                title: 'Projeto Slim Premium', 
                duration: 'Mínimo 60 Dias', 
                products: [{ name: '1 Guria Shape Gold', img: `${domain}/assets/produtos/gold.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para quem está com sobrepeso, mas não aceita nada menos que a solução mais rápida, completa e luxuosa para resolver o problema, cuidando da pele para evitar flacidez.<br><br><strong>A Estratégia:</strong> O <strong>Guria Shape Gold</strong> é um tratamento 360°. Ele ataca o sobrepeso por todos os ângulos: acelera o metabolismo, equilibra os hormônios do bem-estar para aniquilar a compulsão e ainda nutre sua pele com colágeno para garantir firmeza durante a perda de peso. É a tecnologia da beleza a favor do seu emagrecimento.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> A adaptação é rápida e prazerosa. Você sentirá mais energia, menos fome e uma melhora visível na qualidade da pele já nas primeiras semanas. Ao final dos 60 dias, a mudança no espelho e na sua disposição será impactante." 
            }
        ],
        'obesidade-grau-i': [
            { 
                id: 'o1-eco', 
                type: 'eco',
                tag: 'PLANO ECONÔMICO', 
                title: 'Projeto Slim 60 dias', 
                duration: 'Mínimo 60 Dias', 
                products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para quem está no primeiro estágio da obesidade e precisa de um plano de partida inteligente e eficaz para virar o jogo.<br><br><strong>A Estratégia:</strong> É um ataque em duas fases. Primeiro, o <strong>Guria Shape Detox</strong> faz uma 'faxina' no seu organismo, eliminando toxinas que travam seu metabolismo. Com o corpo 'limpo', o <strong>Slim Super X</strong> entra com força total, promovendo uma saciedade intensa e acelerando a queima de gordura. Um prepara o campo, o outro marca o gol.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> A primeira fase com Detox te trará leveza e desinchaço. Ao entrar com o Slim X, a perda de peso se torna notável, pois seu corpo estará 100% preparado para responder ao estímulo emagrecedor." 
            },
            { 
                id: 'o1-ans', 
                type: 'anxiety',
                tag: 'PLANO ANSIEDADE', 
                title: 'Projeto Slim Equilíbrio', 
                duration: 'Mínimo 60 Dias', 
                products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Roxo', img: `${domain}/assets/produtos/roxo.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para quem lida com o peso extra e uma mente que não para. Se a ansiedade é sua sombra na luta contra a obesidade, este combo é a luz.<br><br><strong>A Estratégia:</strong> Começamos com o <strong>Guria Shape Detox</strong> para purificar seu corpo e otimizar seu metabolismo. Em seguida, o <strong>Guria Shape Roxo</strong> assume o controle, acalmando sua ansiedade e silenciando a fome emocional. É a combinação da paz de espírito com a eficiência metabólica para um resultado sustentável.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Você primeiro sentirá seu corpo desinchar. Depois, sua mente se acalmar. A combinação desses fatores tornará a jornada de 60 dias surpreendentemente leve. A perda de peso acontecerá sem a luta interna constante." 
            },
            { 
                id: 'o1-pot', 
                type: 'potencia',
                tag: 'PLANO POTÊNCIA', 
                title: 'Projeto Slim Potência', 
                duration: 'Mínimo 60 Dias', 
                products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Black', img: `${domain}/assets/produtos/black.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para quem precisa de uma ação de choque para destravar um metabolismo resistente e vencer a obesidade grau I com máxima velocidade.<br><br><strong>A Estratégia:</strong> É um plano de intervenção direta. O <strong>Guria Shape Detox</strong> primeiro prepara seu corpo, eliminando as toxinas que te impedem de emagrecer. Depois, o <strong>Guria Shape Black</strong>, nosso inibidor mais forte, entra para calar a fome e forçar o corpo a usar a gordura como fonte de energia. É a força máxima para resultados máximos.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Na primeira fase, você sentirá leveza. Na segunda, sentirá uma redução drástica do apetite. Seu corpo será obrigado a se adaptar a um novo estado metabólico, de queima intensa. É um plano forte, para quem está determinada a mudar o jogo."
            },
            { 
                id: 'o1-prem', 
                type: 'premium',
                tag: 'PLANO PREMIUM', 
                title: 'Projeto Slim Premium', 
                duration: 'Mínimo 60 Dias', 
                products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Gold', img: `${domain}/assets/produtos/gold.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para quem busca a rota expressa e mais sofisticada para sair da obesidade grau I, com um tratamento que cuida do corpo como um todo.<br><br><strong>A Estratégia:</strong> A dupla de elite. O <strong>Guria Shape Detox</strong> faz o 'reset' metabólico, preparando seu corpo para a estrela do show: o <strong>Guria Shape Gold</strong>. Ele entra com sua tecnologia de ponta, acelerando a queima de gordura, melhorando o humor para combater a compulsão, e nutrindo a pele para um emagrecimento saudável e radiante.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> A adaptação é uma experiência de bem-estar. Você sentirá mais energia, menos inchaço e uma melhora geral na sua saúde. A perda de peso será rápida, mas acompanhada de uma sensação de vitalidade e cuidado." 
            }
        ],
        'obesidade-grau-ii': [
            { 
                id: 'o2-eco', 
                type: 'eco',
                tag: 'PLANO ECONÔMICO', 
                title: 'Projeto Slim 90 dias', 
                duration: 'Mínimo 90 Dias', 
                products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }, { name: '1 Guria Shape Gotas', img: `${domain}/assets/produtos/gotas.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para quem enfrenta a obesidade grau II e precisa de um plano de longo prazo, econômico e multifacetado para garantir resultados sólidos e consistentes.<br><br><strong>A Estratégia:</strong> Uma abordagem tripla. O <strong>Detox</strong> limpa o terreno. O <strong>Slim Super X</strong> promove saciedade e queima de gordura contínua. As <strong>Gotas</strong> entram como um reforço, atuando em vias metabólicas complementares para quebrar platôs e potencializar a perda de peso ao longo dos 90 dias.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Será uma jornada de redescoberta. A cada 30 dias, uma nova fase do tratamento se inicia, mantendo seu corpo sempre respondendo. Ao final, você terá uma perda de peso significativa e sustentável." 
            },
            { 
                id: 'o2-ans', 
                type: 'anxiety',
                tag: 'PLANO ANSIEDADE', 
                title: 'Projeto Slim Equilíbrio', 
                duration: 'Mínimo 90 Dias', 
                products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Roxo', img: `${domain}/assets/produtos/roxo.png` }, { name: '1 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para quem enfrenta a dupla jornada de lutar contra a obesidade grau II e a ansiedade, e precisa de um plano de longo prazo que seja gentil com a mente, mas implacável com a gordura.<br><br><strong>A Estratégia:</strong> É uma jornada em 3 atos. Ato 1: <strong>Detox</strong> para limpar. Ato 2: <strong>Roxo</strong> para acalmar a mente e o apetite. Ato 3: <strong>Slim Super X</strong> para consolidar os resultados e manter a queima de gordura. É a maratona completa para a vitória.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Seu corpo e mente se adaptarão em fases. Primeiro a leveza, depois a calma, e por fim, a perda de peso consistente. Ao final, você terá as ferramentas para manter seu novo estilo de vida." 
            },
            { 
                id: 'o2-pot', 
                type: 'potencia',
                tag: 'PLANO POTÊNCIA', 
                title: 'Projeto Slim Potência', 
                duration: 'Mínimo 90 Dias', 
                products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Black', img: `${domain}/assets/produtos/black.png` }, { name: '1 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para quem precisa de um ataque massivo e contínuo contra a obesidade grau II, usando as ferramentas mais fortes de forma estratégica para maximizar a perda de peso.<br><br><strong>A Estratégia:</strong> Um plano de batalha. O <strong>Detox</strong> faz o reconhecimento e limpa o campo. O <strong>Guria Shape Black</strong> entra como a força de choque, inibindo o apetite de forma avassaladora e acelerando o metabolismo. O <strong>Slim Super X</strong> segue na retaguarda, mantendo a queima de gordura e a saciedade em alta para garantir que não haja platôs.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> A adaptação é intensa. A fome será mínima, e a energia, alta. É um tratamento para quem está 100% focado e determinado a alcançar uma transformação corporal radical em 90 dias."
            },
            { 
                id: 'o2-prem', 
                type: 'premium',
                tag: 'PLANO PREMIUM', 
                title: 'Projeto Slim Premium', 
                duration: 'Mínimo 90 Dias', 
                products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Gold', img: `${domain}/assets/produtos/gold.png` }, { name: '1 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para quem busca uma transformação corporal completa e definitiva para sair da obesidade grau II, com o melhor que a tecnologia pode oferecer, cuidando da saúde de forma integral.<br><br><strong>A Estratégia:</strong> A Tríade de Ouro. <strong>Detox</strong> reseta, <strong>Gold</strong> trata e acelera, e <strong>Slim Super X</strong> mantém e define. Essa sequência garante que seu corpo receba os estímulos certos na hora certa, evitando platôs e garantindo um emagrecimento saudável, com cuidado para a pele e o bem-estar.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Será uma jornada de redescoberta. Seu corpo se sentirá mais leve, sua mente mais equilibrada e sua energia renovada. A perda de peso será uma consequência visível de um corpo que voltou a funcionar em harmonia." 
            }
        ],
        'obesidade-grau-iii': [
            { 
                id: 'o3-eco', 
                type: 'eco',
                tag: 'PLANO ECONÔMICO', 
                title: 'Projeto Slim 120 dias', 
                duration: 'Mínimo 120 Dias', 
                products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '2 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para quem enfrenta a obesidade severa e precisa de um plano de longo prazo, focado na consistência e na reeducação alimentar para uma mudança de vida definitiva.<br><br><strong>A Estratégia:</strong> Uma fundação sólida para a mudança. O <strong>Detox</strong> inicia o processo, limpando o organismo. Em seguida, um tratamento estendido com <strong>2 potes de Slim Super X</strong> garante a reeducação do apetite e a queima de gordura contínua por um período longo o suficiente para transformar hábitos e o corpo de forma segura e eficaz.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> É uma maratona, não um tiro. A adaptação será gradual, ensinando seu corpo e mente a trabalharem juntos. A perda de peso será constante e, ao final de 120 dias, você terá construído a base para uma vida nova e mais leve." 
            },
            { 
                id: 'o3-ans', 
                type: 'anxiety',
                tag: 'PLANO ANSIEDADE', 
                title: 'Projeto Slim Equilíbrio', 
                duration: 'Mínimo 120 Dias', 
                products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Roxo', img: `${domain}/assets/produtos/roxo.png` }, { name: '1 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para a guerreira que enfrenta a obesidade severa e a ansiedade, e busca um caminho de longo prazo que respeite seu tempo e sua saúde mental para uma vitória definitiva.<br><br><strong>A Estratégia:</strong> É a jornada mais completa que oferecemos para o controle da ansiedade. Um <strong>Detox</strong> inicial, seguido por um período com o <strong>Guria Shape Roxo</strong> para criar uma base sólida de controle mental, e finalizado com o <strong>Slim Super X</strong> para garantir a continuidade da queima de gordura. É a estratégia da paciência e consistência.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Será uma transformação gradual e profunda. Você reaprenderá a lidar com a comida e com suas emoções. A perda de peso será constante, e ao final, você não terá apenas um novo corpo, mas uma nova mentalidade." 
            },
            { 
                id: 'o3-pot', 
                type: 'potencia',
                tag: 'PLANO POTÊNCIA', 
                title: 'Projeto Slim Potência', 
                duration: 'Mínimo 120 Dias', 
                products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Black', img: `${domain}/assets/produtos/black.png` }, { name: '1 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para quem está no campo de batalha final contra a obesidade e precisa da artilharia mais pesada, combinada de forma inteligente para garantir a vitória sem tréguas.<br><br><strong>A Estratégia:</strong> Artilharia pesada e contínua. O <strong>Detox</strong> prepara seu corpo para a ofensiva. O <strong>Guria Shape Black</strong> entra para aniquilar a fome e forçar o metabolismo a uma queima de gordura extrema. O <strong>Slim Super X</strong> completa o ciclo, garantindo que o processo de emagrecimento continue forte e sem interrupções. É o plano para quem não tem mais tempo a perder.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> A adaptação será intensa. A fome praticamente desaparecerá, e seu corpo entrará em modo de queima acelerada. É um plano que exige determinação, mas que entrega os resultados mais expressivos e rápidos possíveis para este quadro."
            },
            { 
                id: 'o3-prem', 
                type: 'premium',
                tag: 'PLANO PREMIUM', 
                title: 'Projeto Slim Premium', 
                duration: 'Mínimo 120 Dias', 
                products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Gold', img: `${domain}/assets/produtos/gold.png` }, { name: '1 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], 
                explanation: "<strong>Para quem é este plano?</strong> Para quem busca a rota mais segura, saudável e tecnologicamente avançada para reverter um quadro de obesidade severa, restaurando a saúde por completo.<br><br><strong>A Estratégia:</strong> O Cuidado Definitivo. A jornada começa com o <strong>Detox</strong>, evolui para o tratamento integral do <strong>Guria Shape Gold</strong>, que cuida do seu bem-estar geral, e se consolida com a força contínua do <strong>Slim Super X</strong>. Este plano não apenas emagrece, ele restaura a saúde do seu corpo em todos os níveis, da pele ao humor.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Você verá seu corpo se transformar e sua saúde florescer. A energia aumentará, a pele ganhará viço, e o emagrecimento será uma consequência de um organismo que está sendo nutrido e cuidado da forma correta. É a sua jornada de renascimento." 
            }
        ]
    };

    const categoryDisplayInfo = {
        'peso-normal': { line1: '🟢 Peso normal 🟢', line2: '🔥 Mínimo 30 dias de Projeto Slim 🔥' },
        'sobrepeso': { line1: '🟡 Sobrepeso 🟡', line2: '🔥 Mínimo 60 dias de Projeto Slim 🔥' },
        'obesidade-grau-i': { line1: '🟠 Obesidade Grau 1 🟠', line2: '🔥 Mínimo 60 dias de Projeto Slim 🔥' },
        'obesidade-grau-ii': { line1: '🔴 Obesidade Grau 2 🔴', line2: '🔥 Mínimo 90 dias de Projeto Slim 🔥' },
        'obesidade-grau-iii': { line1: '⚫ Obesidade Grau 3 ⚫', line2: '🔥 Mínimo 120 dias de Projeto Slim 🔥' }
    };

    // Simplified combo list creation using the new 'type' property
    const combosList = Object.entries(originalCombosData).flatMap(([categoryKey, combos]) => 
        combos.map(combo => ({
            id: combo.id,
            categoryKey: categoryKey,
            details: combo,
            type: combo.type // Directly use the 'type' from the data
        }))
    );

    function createBackButton(backCallback) {
        const button = document.createElement('button');
        button.className = 'link-button group flex items-center justify-center gap-4 w-full max-w-sm p-3 mt-8 border-slate-700 hover:border-slate-500';
        button.innerHTML = `<span class="font-semibold text-center text-slate-400 group-hover:text-white">↩️ Voltar</span>`;
        button.onclick = backCallback;
        return button;
    }

    function showComboDetail(comboId, backCallback) {
        const combo = combosList.find(c => c.id === comboId);
        if (!combo) return;

        const comboName = combo.details.title;
        const message = encodeURIComponent(`Oii, gostaria de saber mais sobre o combo "${comboName}"`);
        const whatsappUrl = `https://wa.me/556792552604?text=${message}`;

        const detailHTML = `
            <div class="w-full max-w-md mx-auto">
                <div class="product-card-detail">
                    <div class="product-detail-header">
                        <div class="flex justify-center items-center gap-x-3 mb-5">
                            ${combo.details.products.map(p => `<img src="${p.img}" alt="${p.name}" class="w-20 h-20 object-contain rounded-full border-2 border-primary-purple/50">`).join('')}
                        </div>
                        <h2 class="text-3xl font-extrabold text-white tracking-tight">${combo.details.title}</h2>
                        <p class="text-primary-green font-semibold mt-2 flex items-center justify-center gap-2">
                            <i class="far fa-clock"></i>
                            <span>${combo.details.duration} de Tratamento</span>
                        </p>
                    </div>
                    <div class="product-accordion-container">
                        <div class="product-accordion-item open">
                            <button class="product-accordion-header">
                                <span>🤔 Por que este combo é ideal para você?</span>
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="product-accordion-content">
                                <div class="product-accordion-body"><p>${combo.details.explanation}</p></div>
                            </div>
                        </div>
                         <div class="product-accordion-item">
                            <button class="product-accordion-header">
                                <span>📦 Produtos Inclusos</span>
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="product-accordion-content">
                                <div class="product-accordion-body">
                                    <ul class="space-y-3">
                                        ${combo.details.products.map(p => `
                                            <li class="flex items-center gap-4 bg-slate-800/50 p-3 rounded-xl">
                                                <img src="${p.img}" class="w-10 h-10 rounded-full border-2 border-primary-purple/40 flex-shrink-0" alt="${p.name}">
                                                <span class="font-semibold text-slate-200">${p.name}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-detail-footer">
                         <a href="${whatsappUrl}" target="_blank" class="whatsapp-cta-button">
                            Conversar com Especialista 🧠
                        </a>
                    </div>
                </div>
            </div>`;

        combosSection.innerHTML = detailHTML;
        combosSection.appendChild(createBackButton(() => renderComboList(combo.categoryKey, backCallback)));

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

    // Updated to include the new 'Potência' button
    function renderComboList(categoryKey, backCallback) {
        const filteredCombos = combosList.filter(c => c.categoryKey === categoryKey);
        const comboButtons = [
            { type: 'eco', text: '😅 Combo Econômico 😅' },
            { type: 'anxiety', text: '🥵 Combo Ansiedade 🥵' },
            { type: 'potencia', text: '💪 Combo Potência 💪' },
            { type: 'premium', text: '🤑 Combo Premium 🤑' }
        ];

        let combosHTML = '';
        comboButtons.forEach(btn => {
            const combo = filteredCombos.find(c => c.type === btn.type);
            if (combo) {
                combosHTML += `<button data-combo-id="${combo.id}" class="link-button combo-item-btn group flex justify-center items-center gap-3 w-full max-w-sm p-3 h-16"><span class="font-semibold text-center text-slate-200 group-hover:text-white">${btn.text}</span></button>`;
            } else {
                // This part remains as a fallback, in case a combo type is missing for a category
                const categoryName = categoryDisplayInfo[categoryKey].line1;
                const message = encodeURIComponent(`Olá! Tenho interesse em uma opção de combo do tipo '${btn.text}' para meu perfil de '${categoryName}', mas não vi uma opção pré-definida. Poderiam me ajudar?`);
                const whatsappUrl = `https://wa.me/556792552604?text=${message}`;
                combosHTML += `
                    <a href="${whatsappUrl}" target="_blank" class="link-button combo-item-btn-contact group flex flex-col justify-center items-center w-full max-w-sm p-3 h-auto">
                        <span class="font-semibold text-center text-slate-200 group-hover:text-white">${btn.text}</span>
                        <span class="text-xs text-primary-green group-hover:text-emerald-300">Consultar opção</span>
                    </a>`;
            }
        });

        combosSection.innerHTML = combosHTML;
        combosSection.appendChild(createBackButton(() => showComboCategories(backCallback)));

        document.querySelectorAll('.combo-item-btn').forEach(button => {
            button.onclick = () => showComboDetail(button.dataset.comboId, backCallback);
        });
    }

    function showComboCategories(backCallback) {
        const categoriesHTML = Object.entries(categoryDisplayInfo).map(([key, info]) => 
            `<button data-category-key="${key}" class="link-button combo-category-btn group flex justify-center items-center gap-3 w-full max-w-sm p-4 h-auto">
                <div class="text-center">
                    <p class="font-semibold text-slate-100 group-hover:text-white text-lg">${info.line1}</p>
                    <p class="text-sm font-medium text-primary-green group-hover:text-emerald-300">${info.line2}</p>
                </div>
            </button>`
        ).join('');
        combosSection.innerHTML = categoriesHTML;
        combosSection.appendChild(createBackButton(backCallback));
        document.querySelectorAll('.combo-category-btn').forEach(button => {
            button.onclick = () => renderComboList(button.dataset.categoryKey, backCallback);
        });
    }

    function injectDetailStyles() {
        const styleId = 'combo-detail-styles';
        if (document.getElementById(styleId)) return;
        const style = document.createElement('style');
        style.id = styleId;
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
            .whatsapp-cta-button {
                display: block; text-align: center; padding: 1rem; border-radius: 9999px;
                font-weight: bold; font-size: 1.125rem; text-decoration: none;
                background-color: #25D366; color: white;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .whatsapp-cta-button:hover {
                transform: scale(1.03);
                box-shadow: 0 0 25px -5px #25D366;
            }
            .combo-item-btn-contact {
                border-style: dashed;
                border-color: rgba(75, 222, 128, 0.5);
                padding-top: 0.75rem;
                padding-bottom: 0.75rem;
            }
        `;
        document.head.appendChild(style);
    }

    window.renderCombosContent = (backCallback) => {
        injectDetailStyles();
        showComboCategories(backCallback);
    };

    window.gabiFitApp = window.gabiFitApp || {};
    window.gabiFitApp.combosData = originalCombosData;
})();
