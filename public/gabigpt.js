// A função principal do chat agora é envolvida para ser chamada pelo HTML
function initializeGabiGpt() {

    // --- ELEMENTOS DO DOM ---
    const chatScrollArea = document.getElementById('chat-scroll-area');
    const chatMessages = document.getElementById('chat-messages');
    const inputArea = document.getElementById('chat-input-area');

    // --- DADOS DOS COMBOS (INTEGRADOS DO combos.js) ---
    const domain = 'https://www.gtfit.store';
    const combosData = {
        'peso-normal': [
            { id: 'pn-eco', tag: 'PLANO ECONÔMICO', title: 'Projeto Slim 30 dias', duration: '30 Dias', anxiety: false, products: [{ name: '1 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], explanation: "<strong>Para quem é este plano?</strong> Para você que já está no peso ideal, mas busca aquela definição final, secar gordurinhas teimosas e manter o corpo modelado. É o toque de mestre para quem não quer relaxar nos resultados.<br><br><strong>A Estratégia:</strong> O <strong>Slim Super X</strong> atua como um otimizador metabólico. Ele age diretamente na saciedade com seu poderoso mix de fibras, fazendo você se sentir satisfeita com menos. Ao mesmo tempo, seus componentes diuréticos ajudam a eliminar a retenção de líquidos, revelando a definição muscular. <br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Nas primeiras semanas, você sentirá a fome mais controlada e menos inchaço. Ao final dos 30 dias, seu corpo estará mais 'seco', com contornos mais aparentes e um metabolismo afinado para manter os resultados." },
            { id: 'pn-ans', tag: 'PLANO ECONÔMICO', title: 'Projeto Slim Equilíbrio', duration: '60 Dias', anxiety: true, products: [{ name: '1 Guria Shape Roxo', img: `${domain}/assets/produtos/roxo.png` }], explanation: "<strong>Para quem é este plano?</strong> Para você que está no peso certo, mas sente que a ansiedade e o 'comer emocional' sabotam sua busca pela definição. É para quem precisa de paz mental para dar o último passo na transformação do corpo.<br><br><strong>A Estratégia:</strong> O <strong>Guria Shape Roxo</strong> é seu aliado para o equilíbrio. Ele atua diretamente na causa da compulsão, usando a Valeriana para acalmar a mente e diminuir a vontade de 'beliscar'. Isso te dá o controle necessário para manter uma dieta limpa e focada na definição, sem a interferência da ansiedade.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Você notará uma serenidade maior no seu dia a dia e um controle sobre o apetite que parecia perdido. Isso permitirá que seus esforços na dieta e no treino finalmente apareçam, resultando em um corpo mais definido e uma mente em paz." },
            { id: 'pn-prem', tag: 'PLANO PREMIUM', title: 'Projeto Slim 40 dias', duration: '40 Dias', anxiety: false, products: [{ name: '1 Guria Shape Gold', img: `${domain}/assets/produtos/gold.png` }], explanation: "<strong>Para quem é este plano?</strong> Para a mulher que busca a excelência. Você não quer apenas definir, quer brilhar. Este plano é para quem deseja a máxima performance na queima de gordura enquanto cuida da pele, humor e imunidade.<br><br><strong>A Estratégia:</strong> O <strong>Guria Shape Gold</strong> é a nossa fórmula mais avançada. Ele trabalha em 3 pilares: queima de gordura acelerada com ativos nobres, equilíbrio do humor com 5-HTP para eliminar a compulsão por doces, e fortalecimento da imunidade e da pele. É um tratamento de beleza e bem-estar de dentro para fora.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Desde o início, você sentirá mais energia e disposição. A vontade por doces diminuirá drasticamente. Com 40 dias, seu corpo não só estará mais definido, mas você se sentirá mais equilibrada, radiante e com a saúde em dia." }
        ],
        'sobrepeso': [
            { id: 'sp-eco', tag: 'PLANO ECONÔMICO', title: 'Projeto Slim 60 dias', duration: '60 Dias', anxiety: false, products: [{ name: '2 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], explanation: "<strong>Para quem é este plano?</strong> Para quem decidiu dar um basta no sobrepeso e busca um caminho seguro, consistente e com ótimo custo-benefício para reeducar o corpo e a mente.<br><br><strong>A Estratégia:</strong> Com dois potes de <strong>Slim Super X</strong>, criamos um tratamento contínuo de 60 dias. O primeiro mês reeduca seu apetite e regula seu intestino. No segundo mês, com o corpo já adaptado, a queima de gordura se intensifica. A consistência é a chave aqui: mantemos o estímulo de saciedade e queima de gordura por tempo suficiente para criar novos hábitos duradouros.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> O primeiro mês trará controle. O segundo trará a transformação. Ao final dos 60 dias, você terá perdido peso de forma visível e, mais importante, terá criado uma nova relação com a comida, sentindo-se no controle." },
            { id: 'sp-ans', tag: 'PLANO ECONÔMICO', title: 'Projeto Slim 60 dias', duration: '60 Dias', anxiety: true, products: [{ name: '1 Guria Shape Roxo', img: `${domain}/assets/produtos/roxo.png` }], explanation: "<strong>Para quem é este plano?</strong> Para você, que sabe que a sua maior batalha é contra a mente. Se a ansiedade e a compulsão ditam suas escolhas, este combo foi desenhado para te devolver o poder.<br><br><strong>A Estratégia:</strong> O <strong>Guria Shape Roxo</strong> é um especialista. Ele não foca apenas no corpo, mas principalmente na causa emocional do ganho de peso. A Valeriana acalma seus pensamentos, diminuindo o gatilho da ansiedade, enquanto as fibras de alta performance te dão uma sensação de plenitude que te liberta da fome nervosa.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Nos primeiros dias, você sentirá uma calma mental que não sentia há tempos. A necessidade de 'beliscar' desaparecerá. Ao longo dos 60 dias, essa serenidade se torna seu novo normal, e o emagrecimento vira uma consequência natural e pacífica." },
            { id: 'sp-prem', tag: 'PLANO PREMIUM', title: 'Projeto Slim 40 dias', duration: '40 Dias', anxiety: false, products: [{ name: '1 Guria Shape Gold', img: `${domain}/assets/produtos/gold.png` }], explanation: "<strong>Para quem é este plano?</strong> Para quem está com sobrepeso, mas não aceita nada menos que a solução mais rápida, completa e luxuosa para resolver o problema de uma vez por todas.<br><br><strong>A Estratégia:</strong> O <strong>Guria Shape Gold</strong> é um tratamento 360°. Ele ataca o sobrepeso por todos os ângulos: acelera o metabolismo como nenhum outro, equilibra os hormônios do bem-estar para aniquilar a compulsão e ainda nutre sua pele para evitar a flacidez durante a perda de peso. É a tecnologia da beleza a favor do seu emagrecimento.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> A adaptação é rápida e prazerosa. Você sentirá mais energia, menos fome e uma melhora visível na qualidade da pele já nas primeiras semanas. Ao final dos 40 dias, a mudança no espelho e na sua disposição será impactante." }
        ],
        'obesidade-grau-i': [
            { id: 'o1-eco', title: 'Projeto Slim 60 dias', duration: '60 Dias', anxiety: false, products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], explanation: "<strong>Para quem é este plano?</strong> Para quem está no primeiro estágio da obesidade e precisa de um plano de partida inteligente e eficaz para virar o jogo.<br><br><strong>A Estratégia:</strong> É um ataque em duas fases. Primeiro, o <strong>Guria Shape Detox</strong> faz uma 'faxina' no seu organismo, eliminando toxinas que travam seu metabolismo. Com o corpo 'limpo', o <strong>Slim Super X</strong> entra com força total, promovendo uma saciedade intensa e acelerando a queima de gordura. Um prepara o campo, o outro marca o gol.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> A primeira fase com Detox te trará leveza e desinchaço. Ao entrar com o Slim X, a perda de peso se torna notável, pois seu corpo estará 100% preparado para responder ao estímulo emagrecedor." },
            { id: 'o1-ans', title: 'Projeto Slim 90 dias', duration: '90 Dias', anxiety: true, products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Roxo', img: `${domain}/assets/produtos/roxo.png` }], explanation: "<strong>Para quem é este plano?</strong> Para quem lida com o peso extra e uma mente que não para. Se a ansiedade é sua sombra, este combo é a luz.<br><br><strong>A Estratégia:</strong> Começamos com o <strong>Guria Shape Detox</strong> para purificar seu corpo e otimizar seu metabolismo. Em seguida, o <strong>Guria Shape Roxo</strong> assume o controle, acalmando sua ansiedade e silenciando a fome emocional. É a combinação da paz de espírito com a eficiência metabólica.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Você primeiro sentirá seu corpo desinchar. Depois, sua mente se acalmar. A combinação desses fatores tornará a jornada de 90 dias surpreendentemente leve. A perda de peso acontecerá sem a luta interna constante, tornando o processo prazeroso." },
            { id: 'o1-prem', tag: 'PLANO PREMIUM', title: 'Projeto Slim 70 dias', duration: '70 Dias', anxiety: false, products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Gold', img: `${domain}/assets/produtos/gold.png` }], explanation: "<strong>Para quem é este plano?</strong> Para quem busca a rota expressa e mais sofisticada para sair da obesidade grau I, com um tratamento que cuida do corpo como um todo.<br><br><strong>A Estratégia:</strong> A dupla de elite. O <strong>Guria Shape Detox</strong> faz o 'reset' metabólico, preparando seu corpo para a estrela do show: o <strong>Guria Shape Gold</strong>. Ele entra com sua tecnologia de ponta, acelerando a queima de gordura, melhorando o humor e a pele, e garantindo que você emagreça de forma saudável e radiante.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> A adaptação é uma experiência de bem-estar. Você sentirá mais energia, menos inchaço e uma melhora geral na sua saúde. A perda de peso será rápida, mas acompanhada de uma sensação de vitalidade e cuidado." }
        ],
        'obesidade-grau-ii': [
            { id: 'o2-eco', title: 'Projeto Slim 90 dias', duration: '90 Dias', anxiety: false, products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Black', img: `${domain}/assets/produtos/black.png` }], explanation: "<strong>Para quem é este plano?</strong> Para quem precisa de uma ação de choque para destravar um metabolismo resistente e vencer a obesidade grau II.<br><br><strong>A Estratégia:</strong> É um plano de intervenção. O <strong>Guria Shape Detox</strong> primeiro prepara seu corpo. Depois, o <strong>Guria Shape Black</strong>, nosso inibidor mais forte, entra para calar a fome e forçar o corpo a usar a gordura (especialmente a abdominal) como fonte de energia. É a força máxima para resultados máximos.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Você sentirá uma redução drástica do apetite. Seu corpo será obrigado a se adaptar a um novo estado metabólico, de queima intensa. É um plano forte, para quem está determinada a mudar." },
            { id: 'o2-ans', title: 'Projeto Slim 120 dias', duration: '120 Dias', anxiety: true, products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Roxo', img: `${domain}/assets/produtos/roxo.png` }, { name: '1 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], explanation: "<strong>Para quem é este plano?</strong> Para quem enfrenta a dupla jornada de lutar contra a obesidade e a ansiedade, e precisa de um plano de longo prazo que seja gentil, mas implacável com a gordura.<br><br><strong>A Estratégia:</strong> É uma jornada em 3 atos. Ato 1: <strong>Detox</strong> para limpar. Ato 2: <strong>Roxo</strong> para acalmar a mente e o apetite. Ato 3: <strong>Slim Super X</strong> para consolidar os resultados e manter a queima de gordura. É a maratona completa para a vitória.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Seu corpo e mente se adaptarão em fases. Primeiro a leveza, depois a calma, e por fim, a perda de peso consistente. Ao final, você terá as ferramentas para manter seu novo estilo de vida." },
            { id: 'o2-prem', tag: 'PLANO PREMIUM', title: 'Projeto Slim 100 dias', duration: '100 Dias', anxiety: false, products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Gold', img: `${domain}/assets/produtos/gold.png` }, { name: '1 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], explanation: "<strong>Para quem é este plano?</strong> Para quem busca uma transformação corporal completa e definitiva, com o melhor que a tecnologia pode oferecer, cuidando da saúde de forma integral.<br><br><strong>A Estratégia:</strong> A Tríade de Ouro. <strong>Detox</strong> reseta, <strong>Gold</strong> trata e acelera, e <strong>Slim Super X</strong> mantém e define. Essa sequência garante que seu corpo receba os estímulos certos na hora certa, evitando platôs e garantindo um emagrecimento saudável, com cuidado para a pele e o bem-estar.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Será uma jornada de redescoberta. Seu corpo se sentirá mais leve, sua mente mais equilibrada e sua energia renovada. A perda de peso será uma consequência visível de um corpo que está sendo nutrido e cuidado da forma correta." }
        ],
        'obesidade-grau-iii': [
            { id: 'o3-eco', title: 'Projeto Slim 120 dias', duration: '120 Dias', anxiety: false, products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '2 Guria Shape Black', img: `${domain}/assets/produtos/black.png` }], explanation: "<strong>Para quem é este plano?</strong> Para quem está no campo de batalha final contra a obesidade e precisa da artilharia mais pesada para garantir a vitória.<br><br><strong>A Estratégia:</strong> Intervenção máxima. O <strong>Detox</strong> prepara seu corpo para a ofensiva dupla do <strong>Guria Shape Black</strong>. O foco aqui é absoluto: aniquilar a fome e forçar o metabolismo a uma queima de gordura extrema e contínua. É o plano para quem não tem mais tempo a perder.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> A adaptação será intensa. A fome praticamente desaparecerá, e seu corpo entrará em modo de queima acelerada. É um plano que exige determinação, mas que entrega resultados expressivos e rápidos." },
            { id: 'o3-ans', title: 'Projeto Slim 160 dias', duration: '160 Dias', anxiety: true, products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '2 Guria Shape Roxo', img: `${domain}/assets/produtos/roxo.png` }, { name: '1 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], explanation: "<strong>Para quem é este plano?</strong> Para a guerreira que enfrenta a obesidade severa e a ansiedade, e busca um caminho de longo prazo que respeite seu tempo e sua saúde mental.<br><br><strong>A Estratégia:</strong> É a jornada mais completa que oferecemos. Um <strong>Detox</strong> inicial, seguido por um longo período com o <strong>Guria Shape Roxo</strong> para criar uma base sólida de controle mental e de apetite, e finalizado com o <strong>Slim Super X</strong> para garantir a continuidade da queima de gordura. É a estratégia da paciência, consistência e vitória definitiva.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Será uma transformação gradual e profunda. Você reaprenderá a lidar com a comida e com suas emoções. A perda de peso será constante, e ao final, você não terá apenas um novo corpo, mas uma nova mentalidade." },
            { id: 'o3-prem', tag: 'PLANO PREMIUM', title: 'Projeto Slim 140 dias', duration: '140 Dias', anxiety: false, products: [{ name: '1 Guria Shape Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Gold', img: `${domain}/assets/produtos/gold.png` }, { name: '2 Slim Super X', img: `${domain}/assets/produtos/slimx.png` }], explanation: "<strong>Para quem é este plano?</strong> Para quem busca a rota mais segura, saudável e tecnologicamente avançada para reverter um quadro de obesidade severa.<br><br><strong>A Estratégia:</strong> O Cuidado Definitivo. A jornada começa com o <strong>Detox</strong>, evolui para o tratamento integral do <strong>Guria Shape Gold</strong>, que cuida de todo o seu bem-estar, e se consolida com a força contínua do <strong>Slim Super X</strong>. Este plano não apenas emagrece, ele restaura a saúde do seu corpo em todos os níveis.<br><br><strong>Sua Adaptação ao Longo do Projeto:</strong> Você verá seu corpo se transformar e sua saúde florescer. A energia aumentará, a pele ganhará viço, e o emagrecimento será uma consequência de um organismo que está sendo nutrido e cuidado da forma correta. É a sua jornada de renascimento." }
        ]
    };
    const userData = { name: '', age: null, height: null, weight: null, imc: null, imcCategory: '', hasTakenSupplements: null, activityLevel: '', dietSweet: '', dietHealthy: '', anxiety: '', digestion: '', challengeText: '' };
    let recommendationData = {};

    // --- FUNÇÕES AUXILIARES ---
    const sleep = ms => new Promise(res => setTimeout(res, ms));
    const scrollToBottom = () => { setTimeout(() => { chatScrollArea.scrollTop = chatScrollArea.scrollHeight; }, 100); };
    const showTyping = (show = true) => {
        let indicator = document.getElementById('typing-indicator');
        if (show && !indicator) {
            indicator = document.createElement('div');
            indicator.id = 'typing-indicator';
            indicator.className = 'message typing-indicator';
            indicator.innerHTML = `<span></span><span class="bounce-1"></span><span class="bounce-2"></span>`;
            chatMessages.appendChild(indicator);
            scrollToBottom();
        } else if (!show && indicator) { indicator.remove(); }
    };
    const addBotMessage = async (html, delay = 2500) => {
        showTyping();
        await sleep(delay);
        showTyping(false);
        const messageEl = document.createElement('div');
        messageEl.className = 'message bot-message';
        messageEl.innerHTML = html;
        chatMessages.appendChild(messageEl);
        scrollToBottom();
    };
    const addUserMessage = (text) => {
        const messageEl = document.createElement('div');
        messageEl.className = 'message user-message';
        messageEl.textContent = text;
        chatMessages.appendChild(messageEl);
        scrollToBottom();
        clearInputArea();
    };
    const clearInputArea = () => inputArea.innerHTML = '';
    const createButton = (id, text) => `<button id="${id}" class="action-button">${text}</button>`;
    const sendIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>`;
    const createInput = (id, placeholder, buttonId, type = 'text') => {
        inputArea.innerHTML = `<div class="input-with-button"><input type="${type}" id="${id}" placeholder="${placeholder}" /><button id="${buttonId}">${sendIconSVG}</button></div>`;
        scrollToBottom();
        const inputField = document.getElementById(id);
        inputField.focus();
        return { input: inputField, button: document.getElementById(buttonId) };
    };

    // --- LÓGICA DE CÁLCULO E RECOMENDAÇÃO ---
    function calcularIMC(peso, altura) {
        if (!peso || !altura) return null;
        const imc = peso / (altura * altura);
        let classificacao = '', faixa = '', conclusao = '';
        if (imc < 18.5) { classificacao = 'Abaixo do Peso'; faixa = 'Abaixo de 18.5'; conclusao = 'Seu IMC está abaixo da faixa de peso ideal. É importante buscar orientação para garantir que você está recebendo todos os nutrientes necessários para sua saúde.';} 
        else if (imc < 25) { classificacao = 'Peso Normal'; faixa = 'entre 18.5 e 24.9'; conclusao = 'Parabéns! Seu IMC está na faixa considerada ideal pela OMS. Manter hábitos saudáveis de alimentação e exercícios é a chave para continuar assim.';} 
        else if (imc < 30) { classificacao = 'Sobrepeso'; faixa = 'entre 25.0 e 29.9'; conclusao = 'Seu IMC indica sobrepeso. Este é um sinal de alerta para um maior risco de desenvolver problemas de saúde. Pequenas mudanças no estilo de vida podem fazer uma grande diferença.';} 
        else if (imc < 35) { classificacao = 'Obesidade Grau I'; faixa = 'entre 30.0 e 34.9'; conclusao = 'Seu IMC está na faixa de Obesidade Grau I. Isso aumenta o risco de doenças como diabetes e hipertensão. É um bom momento para buscar apoio e iniciar mudanças.';} 
        else if (imc < 40) { classificacao = 'Obesidade Grau II'; faixa = 'entre 35.0 e 39.9'; conclusao = 'Seu IMC indica Obesidade Grau II (severa). O risco para a saúde é considerado alto. É altamente recomendável procurar orientação médica e nutricional para um plano de ação.';} 
        else { classificacao = 'Obesidade Grau III'; faixa = 'Acima de 40.0'; conclusao = 'Seu IMC está na faixa de Obesidade Grau III (mórbida). Esta condição apresenta um risco muito elevado para a saúde. É crucial e urgente buscar ajuda médica especializada.';}
        return { imc: imc.toFixed(1), classificacao, faixa, conclusao };
    }

    function getCategoryKey(imcClassification) {
        const c = imcClassification.toLowerCase();
        if (c.includes('iii')) return 'obesidade-grau-iii';
        if (c.includes('ii')) return 'obesidade-grau-ii';
        if (c.includes('i')) return 'obesidade-grau-i';
        if (c.includes('sobrepeso')) return 'sobrepeso';
        if (c.includes('normal')) return 'peso-normal';
        return 'peso-normal'; // Fallback para abaixo do peso
    }
    
    function getRecomendacao() {
        const { imcCategory, anxiety } = userData;
        const categoryKey = getCategoryKey(imcCategory);
        const availableCombos = combosData[categoryKey] || [];
        
        let economicCombo = availableCombos.find(c => c.anxiety === (anxiety === 'sim')) || availableCombos.find(c => !c.anxiety);
        let principalCombo = availableCombos.find(c => c.tag === 'PLANO PREMIUM') || economicCombo;

        return { economicCombo, principalCombo };
    }

    // --- FLUXO DA CONVERSA ---
    async function beginChat() {
        await addBotMessage("Olá! Sou a Gabi GPT, sua consultora de bem-estar. Que bom ter você aqui para iniciarmos seu Projeto Slim juntas! ✨", 1500);
        await addBotMessage("Para começarmos, me diga, como você prefere ser chamada?", 2000);
        const { input, button } = createInput('name-input', 'Digite seu nome...', 'name-submit');
        const handle = () => { if (input.value.trim() === '') return; userData.name = input.value.trim(); addUserMessage(userData.name); continueToQuestionnaire(); };
        button.addEventListener('click', handle);
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handle(); });
    }
    async function continueToQuestionnaire() {
        await addBotMessage(`Que ótimo, ${userData.name}! Admiro sua decisão de focar no seu bem-estar. ❤️`, 2800);
        await addBotMessage("Agora vamos refinar a análise com alguns detalhes. Suas respostas são a chave para uma recomendação certeira!", 3000);
        await addBotMessage("Você já utilizou algum tipo de suplemento para emagrecimento antes?");
        inputArea.innerHTML = `<div class="flex gap-4">${createButton('supp-sim', 'Sim, já usei')}${createButton('supp-nao', 'Não, primeira vez')}</div>`;
        document.getElementById('supp-sim').addEventListener('click', () => { userData.hasTakenSupplements = true; addUserMessage("Sim, já usei."); askActivityLevel(); });
        document.getElementById('supp-nao').addEventListener('click', () => { userData.hasTakenSupplements = false; addUserMessage("Não, primeira vez."); askActivityLevel(); });
    }
    async function askActivityLevel() {
        await addBotMessage("Ok. E no seu dia a dia, como você descreve sua rotina?", 2500);
        inputArea.innerHTML = `<div class="flex flex-col gap-3">${createButton('act-agitada', 'Ativa, me movimento bastante 🏃‍♀️')}${createButton('act-media', 'Moderada, um pouco de tudo 🤷‍♀️')}${createButton('act-parada', 'Mais parada / trabalho sentada 💻')}</div>`;
        const handle = (level, text) => { userData.activityLevel = level; addUserMessage(text); askDigestion(); };
        document.getElementById('act-agitada').addEventListener('click', () => handle('agitada', "Minha rotina é ativa."));
        document.getElementById('act-media').addEventListener('click', () => handle('media', "Minha rotina é moderada."));
        document.getElementById('act-parada').addEventListener('click', () => handle('parada', "Sou mais parada."));
    }
    async function askDigestion() {
        await addBotMessage("Perfeito. E como anda sua digestão? Inchaço, gases ou intestino mais lento são comuns para você?", 2800);
        inputArea.innerHTML = `<div class="flex flex-col gap-3">${createButton('dig-sim', 'Sim, com frequência')}${createButton('dig-media', 'Ocasionalmente')}${createButton('dig-nao', 'Não, funciona bem')}</div>`;
        const handle = (level, text) => { userData.digestion = level; addUserMessage(text); askDietSweet(); };
        document.getElementById('dig-sim').addEventListener('click', () => handle('sim', "Sim, sinto inchaço/intestino preso."));
        document.getElementById('dig-media').addEventListener('click', () => handle('media', "Ocasionalmente."));
        document.getElementById('dig-nao').addEventListener('click', () => handle('nao', "Funciona bem."));
    }
    async function askDietSweet() {
        await addBotMessage("Certo! E sua relação com doces, como é? 🐜", 2500);
        inputArea.innerHTML = `<div class="flex flex-col gap-3">${createButton('sweet-sim', 'Tenho muita vontade de comer')}${createButton('sweet-media', 'Como com moderação')}${createButton('sweet-nao', 'É raro, não sinto falta')}</div>`;
        const handle = (level, text) => { userData.dietSweet = level; addUserMessage(text); askDietHealthy(); };
        document.getElementById('sweet-sim').addEventListener('click', () => handle('sim', "Tenho muita vontade de comer doces."));
        document.getElementById('sweet-media').addEventListener('click', () => handle('media', "Como com moderação."));
        document.getElementById('sweet-nao').addEventListener('click', () => handle('nao', "Não sinto falta de doces."));
    }
    async function askDietHealthy() {
        await addBotMessage("E para fecharmos essa etapa: como você descreveria sua alimentação em geral?", 2800);
        inputArea.innerHTML = `<div class="flex flex-col gap-3">${createButton('health-besteiras', 'Baseada em industrializados / fast-food 🍕')}${createButton('health-misto', 'Tento equilibrar, mas com deslizes 🥗🍔')}${createButton('health-saudavel', 'Focada em comida de verdade 🥦')}</div>`;
        const handle = (level, text) => { userData.dietHealthy = level; addUserMessage(text); askBiggestChallenge(); };
        document.getElementById('health-besteiras').addEventListener('click', () => handle('besteiras', "Mais para industrializados."));
        document.getElementById('health-misto').addEventListener('click', () => handle('misto', "Tento equilibrar."));
        document.getElementById('health-saudavel').addEventListener('click', () => handle('saudavel', "Foco em ser saudável."));
    }
    async function askBiggestChallenge() {
        await addBotMessage("Obrigada! Estamos quase lá.", 2000);
        await addBotMessage("Para a recomendação ser certeira, me conte com suas palavras: o que você sente que é o seu maior desafio para emagrecer hoje?", 3200);
        const { input, button } = createInput('challenge-input', 'Ex: falta de tempo, compulsão, etc...', 'challenge-submit');
        const handle = () => { if (input.value.trim() === '') return; userData.challengeText = input.value.trim(); addUserMessage(userData.challengeText); askAnxiety(); };
        button.addEventListener('click', handle);
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handle(); });
    }
    async function askAnxiety() {
        await addBotMessage("Anotado! ✅ Agora, a pergunta-chave... Você sente que a ansiedade atrapalha suas escolhas alimentares?", 2800);
        inputArea.innerHTML = `<div class="flex flex-col gap-3">${createButton('anxiety-sim', 'Sim, com certeza')}${createButton('anxiety-media', 'Às vezes, um pouco')}${createButton('anxiety-nao', 'Não, controlo bem')}</div>`;
        const handle = (level, text) => { userData.anxiety = level; addUserMessage(text); preIMC(); };
        document.getElementById('anxiety-sim').addEventListener('click', () => handle('sim', "Sim, a ansiedade me afeta."));
        document.getElementById('anxiety-media').addEventListener('click', () => handle('media', "Às vezes, um pouco."));
        document.getElementById('anxiety-nao').addEventListener('click', () => handle('nao', "Não, controlo bem."));
    }
    async function preIMC() {
        await addBotMessage("Excelente! Você finalizou o questionário. 🥳", 2500);
        await addBotMessage("Como prêmio, vou te dar um Raio-X completo da sua composição corporal atual. Para isso, preciso dos seus últimos 3 dados.", 3200);
        askForAge();
    }
    async function askForAge() {
        await addBotMessage("Primeiro, qual a sua idade?", 2200);
        const { input, button } = createInput('age-input', 'Digite sua idade...', 'age-submit', 'number');
        const handle = () => { if (!input.value || input.value <= 0) return; userData.age = parseInt(input.value); addUserMessage(`${userData.age} anos.`); askForHeight(); };
        button.addEventListener('click', handle); input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handle(); });
    }
    async function askForHeight() {
        await addBotMessage("Perfeito. Agora, informe sua altura (ex: 1.65).", 2200);
        const { input, button } = createInput('height-input', 'Sua altura em metros...', 'height-submit');
        const handle = () => { let v = input.value.replace(',', '.'); if (!v || isNaN(v) || v <= 0) return; let h = parseFloat(v); if (h > 3) h /= 100; userData.height = h; addUserMessage(`${userData.height.toFixed(2).replace('.',',')}m.`); askForWeight(); };
        button.addEventListener('click', handle); input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handle(); });
    }
    async function askForWeight() {
        await addBotMessage("Ótimo! E para finalizar o cálculo, qual o seu peso atual? (ex: 70.5 kg)", 2200);
        const { input, button } = createInput('weight-input', 'Seu peso em kg...', 'weight-submit');
        const handle = () => { let v = input.value.replace(',', '.'); if (!v || isNaN(v) || v <= 0) return; userData.weight = parseFloat(v); addUserMessage(`${userData.weight.toFixed(1)} kg.`); processIMC(); };
        button.addEventListener('click', handle); input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handle(); });
    }

    async function processIMC() {
        clearInputArea();
        await addBotMessage("Obrigada. Cruzando todos os dados e preparando seu Raio-X... 🧠", 3000);
        const imcResult = calcularIMC(userData.weight, userData.height);
        if(!imcResult) {
            await addBotMessage("Houve um erro ao calcular seu IMC. Por favor, tente novamente ou fale com a Gabi.", 3000);
            return;
        }
        userData.imc = imcResult.imc;
        userData.imcCategory = imcResult.classificacao;
        recommendationData = getRecomendacao();
        
        const sumarioTexto = `📌 <b>Resultado do seu IMC (Índice de Massa Corporal)</b>\n\n✅ Idade: ${userData.age} anos\n✅ Altura: ${userData.height.toFixed(2)} m\n✅ Peso: ${userData.weight.toFixed(1)} kg\n\n📐 <b>Cálculo:</b>\nIMC = ${userData.weight.toFixed(1)} ÷ (${userData.height.toFixed(2)} × ${userData.height.toFixed(2)}) ≈ ${imcResult.imc}\n\n🔍 <b>Classificação segundo a OMS:</b>\n"${imcResult.classificacao}" (IMC ${imcResult.faixa})\n\n<b>Conclusão:</b>\n${imcResult.conclusao}`.replace(/\n/g, '<br>');

        const imcCardHTML = `<div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700 text-sm">${sumarioTexto}</div>`;
        await addBotMessage(imcCardHTML, 4000);
        askInvestmentLevel();
    }
    
    async function askInvestmentLevel() {
        let anxietyText = "";
        if(userData.anxiety === 'sim') { anxietyText = "vi que a ansiedade é um ponto-chave que precisamos tratar com força total."; } 
        else if (userData.anxiety === 'media') { anxietyText = "percebi que a ansiedade às vezes te sabota, e podemos blindar isso."; } 
        else { anxietyText = "vi que você tem um bom controle da ansiedade, então vamos focar 100% na queima de gordura."; }
        await addBotMessage(`Com seu Raio-X em mãos, ${anxietyText}`, 3500);
        await addBotMessage("Preparei 2 estratégias para você. Agora a pergunta de ouro: qual seu foco inicial?", 3000);
        inputArea.innerHTML = `<div class="flex flex-col gap-3">${createButton('invest-economico', 'Começar com economia, mas com resultado! 💰')}${createButton('invest-principal', 'Estou decidida a investir no meu melhor! 🚀')}</div>`;
        document.getElementById('invest-economico').addEventListener('click', () => { addUserMessage("Quero começar com economia."); showRecommendation('economico'); });
        document.getElementById('invest-principal').addEventListener('click', () => { addUserMessage("Quero investir no meu melhor resultado!"); showRecommendation('principal'); });
    }

    async function showRecommendation(level) {
        clearInputArea();
        await addBotMessage("Escolha perfeita! Com base nisso, sua estratégia ideal é...", 2500);

        const combo = (level === 'economico') ? recommendationData.economicCombo : recommendationData.principalCombo;
        if (!combo) { await addBotMessage("Ops, não encontrei um combo ideal com essa opção. Por favor, fale com a Gabi no WhatsApp para montar um plano personalizado para você!", 3000); return; }

        const { title, duration, products, explanation, tag } = combo;
        const comboName = title;
        const message = encodeURIComponent(`Oii, gostaria de saber mais sobre o combo "${comboName}" que a Gabi GPT me recomendou.`);
        const whatsappUrl = `https://wa.me/556792552604?text=${message}`;

        const recommendationCardHTML = `
            <div class="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg w-full ring-2 ring-purple-500">
                <button id="toggle-card-btn-${combo.id}" class="flex justify-between items-center w-full text-left p-4">
                    <div class="flex items-center gap-3">
                        <img src="${products[0].img}" alt="${comboName}" class="w-12 h-12 rounded-full object-contain border-2 border-purple-400">
                        <div>
                            <span class="block bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full inline-block">${tag || (level === 'economico' ? 'PLANO ECONÔMICO' : 'PLANO PRINCIPAL')}</span>
                            <span class="font-bold text-md text-white mt-1 block">${comboName}</span>
                        </div>
                    </div>
                    <svg id="card-arrow-${combo.id}" class="w-6 h-6 text-fuchsia-400 transition-transform duration-300 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div id="card-content-${combo.id}" class="px-4 pb-4 border-t border-slate-700">
                    <div class="text-center my-4">
                        <p class="text-green-400 font-semibold flex items-center justify-center gap-2"><i class="far fa-clock"></i><span>${duration} de Tratamento</span></p>
                    </div>
                    <div class="text-sm text-slate-300 text-left my-4">${explanation}</div>
                    <h4 class="font-bold text-white mt-4 mb-2">Produtos Inclusos:</h4>
                    <ul class="space-y-2 mb-4">
                        ${products.map(p => `<li class="flex items-center gap-3 bg-slate-900/50 p-2 rounded-lg"><img src="${p.img}" class="w-10 h-10 rounded-full border border-purple-400/50" alt="${p.name}"><span class="font-medium">${p.name}</span></li>`).join('')}
                    </ul>
                    <div class="flex flex-col gap-3 mt-4">
                        <a href="${whatsappUrl}" target="_blank" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-transform duration-200 hover:scale-105 shadow-lg shadow-green-600/20 text-center flex items-center justify-center gap-2">
                            <i class="fab fa-whatsapp"></i> Comprar Combo no WhatsApp
                        </a>
                    </div>
                </div>
            </div>`;
        const messageEl = document.createElement('div');
        messageEl.className = 'message bot-message !p-0 !bg-transparent';
        messageEl.innerHTML = recommendationCardHTML;
        chatMessages.appendChild(messageEl);
        document.getElementById(`toggle-card-btn-${combo.id}`).addEventListener('click', () => {
            document.getElementById(`card-content-${combo.id}`).classList.toggle('hidden');
            document.getElementById(`card-arrow-${combo.id}`).classList.toggle('rotate-180');
            scrollToBottom();
        });
        scrollToBottom();
        await addBotMessage("Qualquer dúvida, é só clicar no botão acima para falar com a Gabi (a de verdade!) no WhatsApp. Estamos juntas nessa! 💪", 3000);
    }
    
    // Expõe a função de inicialização para o escopo global, para ser chamada pelo HTML
    window.initializeGabiGpt = beginChat;
}

// Isso garante que o código dentro da função principal só rode quando for chamado pelo HTML
// e evita a execução automática que estava causando o erro.
if (typeof window.initializeGabiGpt !== 'function') {
    // A função é definida no escopo global para ser acessível pelo HTML
    window.initializeGabiGpt = initializeGabiGpt;
}
