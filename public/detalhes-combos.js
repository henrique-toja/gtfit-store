// detalhes-combos.js
(function() {
    const comboDetailsData = {
        'o1-ans': { // Obesidade Grau I + Ansiedade (Detox + Roxo)
            titulo: "Estratégia Dupla: Detox + Controle da Ansiedade",
            perfilIdeal: "Para quem sente que a <strong>ansiedade e a compulsão alimentar</strong> são os maiores obstáculos, e ao mesmo tempo precisa de um 'reset' no organismo para começar a queimar gordura de forma eficiente.",
            logicaCombinacao: `
                <p>Esta combinação é poderosa por atacar o problema em duas frentes simultâneas:</p>
                <ul>
                    <li>1. <strong>Fase de Limpeza (Guria Shape Detox):</strong> Iniciamos o processo com uma desintoxicação completa. O Detox prepara seu corpo, eliminando toxinas e o excesso de líquido retido. Isso melhora a absorção dos próximos suplementos e dá uma sensação imediata de leveza e bem-estar.</li>
                    <li>2. <strong>Fase de Controle (Guria Shape Roxo):</strong> Com o corpo preparado, introduzimos o Roxo. Sua fórmula, com Valeriana, atua diretamente no sistema nervoso para <strong>acalmar a mente e reduzir a ansiedade</strong>. Ao mesmo tempo, suas fibras como Psyllium e Glucomanan se expandem no estômago, promovendo uma forte sensação de saciedade e diminuindo drasticamente a fome e a vontade de 'beliscar'.</li>
                </ul>
                <p>A junção destes dois cria um ciclo virtuoso: o detox otimiza seu metabolismo enquanto o Roxo te dá o controle mental e físico para seguir o plano sem sofrimento.</p>
            `,
            resultadoEsperado: [
                "Redução significativa da compulsão alimentar e do 'apetite emocional'.",
                "Sensação de saciedade prolongada ao longo do dia.",
                "Menos inchaço e retenção de líquidos.",
                "Melhora do humor e sono mais tranquilo.",
                "Prepara o corpo para uma queima de gordura mais acelerada."
            ]
        },
        'o2-eco': { // Obesidade Grau II - Econômico (Detox + Black + Slim)
            titulo: "Estratégia Trifásica: Limpeza, Ação de Choque e Manutenção",
            perfilIdeal: "Para quem precisa de um plano mais longo e estruturado para uma perda de peso mais significativa, mas sem um grande foco em ansiedade. Ideal para quem já tem um metabolismo mais lento e resistente.",
            logicaCombinacao: `
                <p>Este plano é um tratamento completo dividido em três etapas estratégicas:</p>
                <ul>
                    <li>1. <strong>Reset Metabólico (Guria Shape Detox):</strong> A primeira fase é essencial. O Detox faz uma varredura no seu organismo, eliminando toxinas que travam o metabolismo e causam inchaço. É o 'reset' necessário para que seu corpo volte a responder aos estímulos do emagrecimento.</li>
                    <li>2. <strong>Ação de Choque (Guria Shape Black):</strong> Após a limpeza, entramos com a artilharia pesada. O Black é nosso inibidor de apetite mais potente, com foco na <strong>redução da gordura abdominal (Morosil®)</strong>. Ele vai controlar a fome de forma intensa e acelerar a queima de gordura de forma agressiva.</li>
                    <li>3. <strong>Continuidade e Potencialização (Super Slim X):</strong> Na fase final, o Slim X entra para manter a saciedade em alta com seu mix de fibras e continuar o processo de queima de gordura de uma forma mais moderada, garantindo que você não sofra com o efeito sanfona e continue perdendo medidas.</li>
                </ul>
                <p>Essa sequência garante que seu corpo não se acostume com os estímulos, maximizando a perda de peso do início ao fim do tratamento.</p>
            `,
            resultadoEsperado: [
                "Perda de peso consistente e acelerada.",
                "Redução drástica do apetite e da ingestão calórica.",
                "Foco na queima de gordura localizada, especialmente na região abdominal.",
                "Metabolismo reeducado e mais ativo.",
                "Menor inchaço e melhora no funcionamento intestinal."
            ]
        },
        'sp-prem': { // Sobrepeso - Premium (Gold)
            titulo: "Solução Premium: Tecnologia e Cuidado Integrado",
            perfilIdeal: "Para quem busca a solução mais completa e avançada do mercado. Ideal para quem quer emagrecer, mas também se preocupa com a <strong>saúde da pele, imunidade e equilíbrio emocional</strong> durante o processo.",
            logicaCombinacao: `
                <p>O Guria Shape Gold não é apenas um emagrecedor, é um tratamento de bem-estar completo. A lógica aqui não é apenas inibir o apetite, mas nutrir o corpo para que ele emagreça de forma saudável e definitiva.</p>
                <ul>
                    <li><strong>Ativos Metabólicos e Antioxidantes (Extrato de Romã, Ácido Lipoico):</strong> Combatem a inflamação celular - uma das principais causas do ganho de peso - e otimizam a forma como seu corpo utiliza a energia, evitando o acúmulo de gordura.</li>
                    <li><strong>Equilíbrio Emocional (5-HTP):</strong> O 5-HTP é um precursor da serotonina, o 'hormônio da felicidade'. Ele melhora o humor, combate a ansiedade e reduz a compulsão por doces, tratando a causa emocional do ganho de peso.</li>
                    <li><strong>Fortalecimento Imunológico (Equinácea):</strong> Manter a imunidade alta durante o processo de emagrecimento é crucial. A Equinácea garante que seu corpo fique forte e protegido.</li>
                </ul>
                <p>É a escolha ideal para quem entende que emagrecer vai além da balança, envolvendo saúde, bem-estar e cuidado de dentro para fora.</p>
            `,
            resultadoEsperado: [
                "Emagrecimento acelerado com suporte nutricional completo.",
                "Melhora do humor e redução drástica da ansiedade.",
                "Fortalecimento do sistema imunológico.",
                "Pele mais firme e saudável durante a perda de peso.",
                "Mais energia e disposição no dia a dia."
            ]
        },
        // Adicione aqui as explicações para outros combos, como 'pn-eco', 'o3-ans', etc.
    };

    // Expor os dados para que outros scripts possam acessá-los
    window.gabiFitApp = window.gabiFitApp || {};
    window.gabiFitApp.comboDetails = comboDetailsData;

})();
