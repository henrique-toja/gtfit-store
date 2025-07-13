document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DO DOM ---
    const chatWidget = document.getElementById('chat-widget');
    const chatModal = document.getElementById('chat-modal');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatScrollArea = document.getElementById('chat-scroll-area');
    const chatMessages = document.getElementById('chat-messages');
    const inputArea = document.getElementById('chat-input-area');

    // --- LÓGICA PARA ABRIR E FECHAR O CHAT ---
    if (chatWidget && chatModal && closeChatBtn) {
        const openChat = () => {
            chatModal.classList.remove('hidden');
            chatModal.classList.add('flex');
            // Inicia a conversa apenas na primeira vez que o chat é aberto
            if (!chatModal.dataset.initialized) {
                beginChat();
                chatModal.dataset.initialized = 'true';
            }
        };

        const closeChat = () => {
            chatModal.classList.add('hidden');
            chatModal.classList.remove('flex');
        };

        chatWidget.addEventListener('click', openChat);
        closeChatBtn.addEventListener('click', closeChat);
        chatModal.addEventListener('click', (event) => {
            if (event.target === chatModal) {
                closeChat();
            }
        });
    }

    // --- DADOS E PRODUTOS ---
    const userData = { name: '', age: null, height: null, weight: null, imc: null, imcCategory: '', hasTakenSupplements: null, activityLevel: '', dietSweet: '', dietHealthy: '', anxiety: '', digestion: '', challengeText: '' };
    const produtos = [
      { "id": 1, "nome": "🟢 SUPER SLIM X 🟢", "preco": 169.90, "imagem": "assets/produtos/slimx.png", "descricao_curta": "Redução do apetite, diminuição da absorção de gordura, melhora da composição corporal e redução do inchaço.", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/slim-super-x" },
      { "id": 2, "nome": "🟣 GURIA SHAPE ROXO 🟣", "preco": 285.00, "imagem": "assets/produtos/roxo.png", "descricao_curta": "Redução do apetite, controle da ansiedade alimentar e melhora do metabolismo para facilitar a perda de peso.", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/guria-shape" },
      { "id": 3, "nome": "⚫ GURIA SHAPE BLACK ⚫", "preco": 330.00, "imagem": "assets/produtos/black.png", "descricao_curta": "Aceleração da queima de gordura, redução da fome, controle do açúcar no sangue e melhora geral do metabolismo.", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/guria-shape-black" },
      { "id": 4, "nome": "🟢 GURIA SHAPE DETOX 🟢", "preco": 175.00, "imagem": "assets/produtos/detox.png", "descricao_curta": "Desintoxicação orgânica, redução da inflamação, controle da fome e melhor regulação do metabolismo.", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/guria-shape-detox" },
      { "id": 5, "nome": "🟡 GURIA SHAPE GOLD 🟡", "preco": 499.99, "imagem": "assets/produtos/gold.png", "descricao_curta": "Ação termogênica avançada, melhora do metabolismo, equilíbrio do apetite e suporte para romper o platô.", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/shape-xtreme" }
    ];
    let recommendationData = {};

    // --- FUNÇÕES AUXILIARES DO CHAT ---
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
    const createButton = (id, text, isPrimary = false) => `<button id="${id}" class="action-button ${isPrimary ? 'primary' : ''}">${text}</button>`;
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
        const imc = peso / (altura * altura);
        let classificacao = '', faixa = '', conclusao = '';
        if (imc < 18.5) { classificacao = 'Abaixo do Peso'; faixa = 'Abaixo de 18.5'; conclusao = 'Seu IMC está abaixo da faixa de peso ideal.'; } 
        else if (imc < 25) { classificacao = 'Peso Normal'; faixa = 'entre 18.5 e 24.9'; conclusao = 'Parabéns! Seu IMC está na faixa considerada ideal pela OMS.'; } 
        else if (imc < 30) { classificacao = 'Sobrepeso'; faixa = 'entre 25.0 e 29.9'; conclusao = 'Seu IMC indica sobrepeso. Este é um sinal de alerta.'; } 
        else if (imc < 35) { classificacao = 'Obesidade Grau I'; faixa = 'entre 30.0 e 34.9'; conclusao = 'Seu IMC está na faixa de Obesidade Grau I.'; } 
        else if (imc < 40) { classificacao = 'Obesidade Grau II'; faixa = 'entre 35.0 e 39.9'; conclusao = 'Seu IMC indica Obesidade Grau II (severa).'; } 
        else { classificacao = 'Obesidade Grau III'; faixa = 'Acima de 40.0'; conclusao = 'Seu IMC está na faixa de Obesidade Grau III (mórbida).'; }
        return { imc: imc.toFixed(1), classificacao, faixa, conclusao };
    }

    function getRecomendacao() {
        const { imcCategory, anxiety, digestion } = userData;
        let rec = { main: null, economic: null };

        if (imcCategory.includes('Obesidade Grau II') || imcCategory.includes('Obesidade Grau III')) { rec.main = 5; } // Gold
        else if (imcCategory.includes('Obesidade')) { rec.main = 3; } // Black
        else if (imcCategory === 'Sobrepeso') { rec.main = 2; } // Roxo
        else { rec.main = 4; } // Detox

        if (anxiety === 'sim' && rec.main !== 2 && rec.main !== 5) { rec.main = 2; }
        if (digestion === 'sim') { rec.economic = 4; } 
        else { rec.economic = 1; }
        if (rec.main === rec.economic) { rec.economic = (rec.main === 1) ? 4 : 1; }

        return rec;
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
        const handle = () => { 
            if (input.value.trim() === '') return; 
            userData.challengeText = input.value.trim(); 
            addUserMessage(userData.challengeText); 
            askAnxiety();
        };
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
        userData.imc = imcResult.imc;
        userData.imcCategory = imcResult.classificacao;
        
        recommendationData = getRecomendacao();

        const imcCardHTML = `<div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h3 class="text-lg font-bold text-center text-purple-400 mb-2">🏆 Seu Raio-X Corporal 🏆</h3>
            <p class="text-sm text-center text-slate-300 mb-4">Classificação da Organização Mundial da Saúde (OMS)</p>
            <div class="text-center bg-slate-900 p-4 rounded-lg mb-3">
                <p class="text-sm text-slate-400">Seu IMC é</p>
                <p class="text-5xl font-bold text-white my-1">${imcResult.imc}</p>
                <p class="font-semibold text-purple-400 text-lg">${imcResult.classificacao}</p>
            </div>
            <p class="text-xs text-slate-400 text-center">${imcResult.conclusao}</p>
        </div>`;
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
        
        inputArea.innerHTML = `<div class="flex flex-col gap-3">
            ${createButton('invest-economico', 'Começar com economia, mas com resultado! 💰')}
            ${createButton('invest-principal', 'Estou decidida a investir no meu melhor! 🚀')}
        </div>`;
        
        document.getElementById('invest-economico').addEventListener('click', () => { addUserMessage("Quero começar com economia."); showRecommendation('economico'); });
        document.getElementById('invest-principal').addEventListener('click', () => { addUserMessage("Quero investir no meu melhor resultado!"); showRecommendation('principal'); });
    }

    async function showRecommendation(level) {
        clearInputArea();
        await addBotMessage("Escolha perfeita! Com base nisso, sua estratégia ideal é...", 2500);

        const productId = (level === 'economico') ? recommendationData.economic : recommendationData.main;
        const product = produtos.find(p => p.id === productId);

        if (!product) {
            await addBotMessage("Ops, tive um problema ao encontrar o produto ideal. Por favor, fale com a Gabi no WhatsApp para te ajudar pessoalmente!", 2000);
            return;
        }
        
        const tag = level === 'economico' ? '💰 Estratégia de Início' : '💎 Estratégia Principal';
        
        const recommendationCardHTML = `
            <div class="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg w-full ring-2 ring-purple-500">
                <button id="toggle-card-btn" class="flex justify-between items-center w-full text-left p-4">
                    <div class="flex items-center gap-3">
                        <img src="${product.imagem}" alt="${product.nome}" class="w-12 h-12 object-contain">
                        <div>
                            <span class="block bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full inline-block">${tag}</span>
                            <span class="font-bold text-md text-white mt-1 block">${product.nome}</span>
                        </div>
                    </div>
                    <svg id="card-arrow" class="w-6 h-6 text-fuchsia-400 transition-transform duration-300 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div id="card-content" class="px-4 pb-4 border-t border-slate-700">
                    <p class="text-sm text-slate-300 text-center my-4">${product.descricao_curta}</p>
                    <div class="text-3xl font-bold text-center text-purple-400 mb-4">R$ ${product.preco.toFixed(2).replace('.', ',')}</div>
                    <div class="flex flex-col gap-3">
                        <a href="${product.link_loja}" target="_blank" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-transform duration-200 hover:scale-105 shadow-lg shadow-purple-600/20 text-center flex items-center justify-center gap-2">
                            <i class="fas fa-shopping-cart"></i> Comprar na Loja
                        </a>
                        <a href="https://wa.me/556792552604?text=Oi%20Gabi!%20A%20Gabi%20GPT%20me%20ajudou%20e%20quero%20comprar%20o%20${encodeURIComponent(product.nome)}.%20Pode%20me%20ajudar%3F%20%F0%9F%92%AA" target="_blank" class="action-button">
                            <i class="fab fa-whatsapp text-xl mr-2"></i> Falar com a Gabi
                        </a>
                    </div>
                </div>
            </div>`;
        
        const messageEl = document.createElement('div');
        messageEl.className = 'message bot-message !p-0 !bg-transparent';
        messageEl.innerHTML = recommendationCardHTML;
        chatMessages.appendChild(messageEl);
        
        document.getElementById('toggle-card-btn').addEventListener('click', () => {
            document.getElementById('card-content').classList.toggle('hidden');
            document.getElementById('card-arrow').classList.toggle('rotate-180');
            scrollToBottom();
        });

        scrollToBottom();
        await addBotMessage("Qualquer dúvida, é só me chamar ou clicar para falar com a Gabi (a de verdade!) no WhatsApp. Estamos juntas nessa! 💪", 3000);
    }
});
