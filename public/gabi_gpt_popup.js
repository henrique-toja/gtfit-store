(function() {
    // Expõe a função de inicialização para ser chamada pelo HTML principal
    window.startGabiGptPopup = (container, closePopupCallback) => {
        // Evita reinicializar o chat se ele já estiver lá
        if (container.querySelector('#gabi-chat-container')) {
            return;
        }
        injectChatStructure(container);
        main(container, closePopupCallback);
    };

    /**
     * Injeta a estrutura do chat e seus estilos dentro do container do pop-up.
     */
    function injectChatStructure(container) {
        const chatCss = `
            #gabi-chat-container { width: 100%; height:100%; display: flex; flex-direction: column; align-items: center; padding: 0; flex: 1; min-height: 0; font-family: 'Inter', sans-serif; }
            #gabi-chat-interface { width: 100%; max-width: 800px; flex: 1 1 0; min-height: 0; background-color: transparent; display: flex; flex-direction: column; overflow: hidden; }
            .gabi-chat-header { padding: 1rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); display:flex; align-items:center; gap: 1rem; flex-shrink: 0; }
            .gabi-chat-header img { width: 2.5rem; height: 2.5rem; border-radius: 50%; object-fit: cover; border: 2px solid #c084fc; }
            .gabi-chat-header h1 { font-size: 1rem; font-weight: 600; color: white; margin:0; }
            .gabi-chat-header p { font-size: 0.875rem; font-weight: 500; color: #4ade80; margin:0; }
            .gabi-chat-scroll-area { flex-grow: 1; overflow-y: auto; display: flex; flex-direction: column; padding: 0 0.5rem; }
            .gabi-chat-scroll-area::-webkit-scrollbar { width: 8px; }
            .gabi-chat-scroll-area::-webkit-scrollbar-track { background: transparent; }
            .gabi-chat-scroll-area::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 8px; }
            .gabi-chat-messages { padding: 1rem; display: flex; flex-direction: column; gap: 1.5rem; }
            .gabi-input-area { padding: 1.5rem 1rem; margin-top: auto; flex-shrink: 0; }
            .gabi-message { padding: 1rem 1.5rem; border-radius: 1rem; line-height: 1.6; animation: gabi-fadeIn 0.4s ease-out both; max-width: 85%; white-space: pre-wrap; font-size: 0.95rem; }
            .gabi-bot-message { background-color: #2c2c2e; color: #e5e7eb; align-self: flex-start; border-bottom-left-radius: 0.25rem; }
            .gabi-user-message { background: linear-gradient(135deg, #8b5cf6, #a855f7); color: white; font-weight: 500; border-top-right-radius: 0.25rem; }
            .gabi-action-button { width: 100%; padding: 0.8rem 1rem; border-radius: 0.75rem; border: 1px solid #c084fc; background: transparent; color: #c084fc; font-size: 0.9rem; font-weight: 600; cursor: pointer; text-align: center; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
            .gabi-action-button:hover { background: #c084fc; color: white; }
            .gabi-input-with-button { display: flex; gap: 1rem; align-items: center; padding: 0.5rem; background-color: #2c2c2e; border-radius: 1.5rem; }
            .gabi-input-area input { width: 100%; padding: 1rem; background-color: transparent; border: none; font-size: 1rem; color: #e5e7eb; }
            .gabi-input-area input:focus { outline: none; }
            .gabi-input-with-button button { height: 48px; width: 48px; flex-shrink: 0; border-radius: 50%; border: none; background: #8B5CF6; color: white; cursor: pointer; display: grid; place-items: center; transition: all 0.2s; }
            @keyframes gabi-fadeIn { from {opacity:0; transform:translateY(20px);} to {opacity:1; transform:translateY(0);} }
            .gabi-typing-indicator { align-self: flex-start; display: flex; gap: 0.5rem; padding: 1rem 1.5rem; background-color: #2c2c2e; border-radius: 1rem; border-bottom-left-radius: 0.25rem; }
            @keyframes gabi-bounce-typing { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }
            .gabi-typing-indicator span { width: 10px; height: 10px; background-color: #4b5563; border-radius: 50%; animation: gabi-bounce-typing 1.4s infinite ease-in-out both; }
            .gabi-typing-indicator .bounce-1 { animation-delay: -0.32s; }
            .gabi-typing-indicator .bounce-2 { animation-delay: -0.16s; }
            
            /* ESTILOS DA TELA DE RESULTADO */
            #gabi-final-result { padding: 1.5rem 1rem; height: 100%; animation: gabi-fadeIn 0.5s; overflow-y: auto; }
            #gabi-final-result::-webkit-scrollbar { width: 8px; }
            #gabi-final-result::-webkit-scrollbar-track { background: transparent; }
            #gabi-final-result::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 8px; }
            .gabi-result-header { text-align: center; margin-bottom: 2rem; }
            .gabi-result-header h2 { font-size: 1.8rem; font-weight: 800; color: white; }
            .gabi-result-header p { font-size: 1rem; color: #a1a1aa; max-width: 500px; margin: 0.5rem auto 0; }
            .gabi-card-grid { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; align-items: stretch; }
            .gabi-result-card { background: #2c2c2e; border-radius: 1rem; border: 1px solid #4b5563; display: flex; flex-direction: column; height: auto; }
            .gabi-result-card.combo-style { width: 300px; padding: 1.5rem; text-align: left; }
            .gabi-result-card .gabi-card-header .tag { font-size: 0.7rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 50px; color: white; display: inline-block; margin: 0 0 1rem 0; }
            .gabi-result-card .gabi-card-header .tag.main { background: #c084fc; }
            .gabi-result-card .gabi-card-header .tag.secondary { background: #f0abfc; color: #131314;}
            .gabi-result-card .gabi-card-header .tag.economic { background: #4ade80; color: #131314;}
            .gabi-result-card h3.combo-title { font-size: 1.4rem; font-weight: 700; color: white; height: auto; margin-bottom: 1rem; }
            .gabi-combo-details { display: flex; justify-content: space-around; text-align: center; padding: 1rem 0; margin: 1rem 0; border-top: 1px solid #4b5563; border-bottom: 1px solid #4b5563; }
            .gabi-combo-details .detail-item .value { font-size: 1.3rem; font-weight: 700; }
            .gabi-combo-details .detail-item .value.price { color: #4ade80; }
            .gabi-combo-details .detail-item .label { font-size: 0.7rem; text-transform: uppercase; color: #a1a1aa; }
            .gabi-result-card .product-list-title { font-size: 0.9rem; font-weight: 600; color: white; margin-bottom: 0.75rem; }
            .gabi-product-list { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem; flex-grow: 1; }
            .gabi-product-item { display: flex; align-items: center; gap: 1rem; background-color: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 0.5rem; }
            .gabi-product-item img { width: 40px; height: 40px; object-fit: contain; margin: 0; }
            .gabi-product-item span { color: #e5e7eb; font-size: 0.9rem; }
            .gabi-result-card .buy-btn { text-decoration: none; padding: 0.85rem; background: #c084fc; color: white; border-radius: 50px; font-weight: 600; font-size: 0.9rem; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: auto; }
            .gabi-result-card .buy-btn:hover { transform: scale(1.05); background: #a855f7; }
            .gabi-explanation-section { background: #2c2c2e; border-radius: 1rem; padding: 1rem 1.5rem; margin-top: 2rem; }
            .gabi-explanation-section button { background: none; border: none; color: white; width: 100%; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-size: 1rem; font-weight: 600; }
            #gabi-explanation-content { display: none; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #4b5563; color: #a1a1aa; white-space: pre-wrap; font-size: 0.9rem; line-height: 1.6; }
        `;

        const chatHtml = `
            <div id="gabi-chat-container">
                <div id="gabi-chat-interface">
                    <div class="gabi-chat-header">
                         <img src="https://gabi-gpt.web.app/gabi-profile.jpg" alt="Foto da Gabi">
                         <div><h1>Gabi GPT</h1><p>● Online</p></div>
                    </div>
                    <div class="gabi-chat-scroll-area"><div class="gabi-chat-messages"></div></div>
                    <div class="gabi-input-area"></div>
                </div>
            </div>
            <div id="gabi-final-result" style="display:none;"></div>
        `;

        const styleSheet = document.createElement("style");
        styleSheet.id = "gabi-chat-styles";
        styleSheet.innerText = chatCss;
        if (!document.getElementById('gabi-chat-styles')) document.head.appendChild(styleSheet);
        container.innerHTML = chatHtml;
    }

    function main(container, closePopupCallback) {
        const chatInterface = container.querySelector('#gabi-chat-interface');
        const finalResultScreen = container.querySelector('#gabi-final-result');
        const chatScrollArea = container.querySelector('.gabi-chat-scroll-area');
        const chatMessages = container.querySelector('.gabi-chat-messages');
        const inputArea = container.querySelector('.gabi-input-area');

        const combos = [
            { id: 'pn-eco', imcCategory: 'Peso Normal', type: 'Econômico', title: 'Projeto Slim 30 dias', duration: '30 Dias', price: 169.90, products: ['1 Super Slim X'], images: ['https://gabi-gpt.web.app/assets/produtos/slimx.png'], link: "https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo 'Projeto Slim 30 dias (Econômico)'." },
            { id: 'pn-prem', imcCategory: 'Peso Normal', type: 'Premium', title: 'Projeto Slim 40 dias', duration: '40 Dias', price: 499.99, products: ['1 Guria Shape Gold'], images: ['https://gabi-gpt.web.app/assets/produtos/gold.png'], link: "https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo 'Projeto Slim 40 dias (Premium)'." },
            { id: 'sp-eco', imcCategory: 'Sobrepeso', type: 'Econômico', title: 'Projeto Slim 60 dias', duration: '60 Dias', price: 339.80, products: ['2 Super Slim X'], images: ['https://gabi-gpt.web.app/assets/produtos/slimx.png'], link: "https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo 'Projeto Slim 60 dias (Econômico)'." },
            { id: 'sp-ans', imcCategory: 'Sobrepeso', type: 'Ansiedade', title: 'Projeto Slim 60 dias', duration: '60 Dias', price: 285.00, products: ['1 Guria Shape Roxo'], images: ['https://gabi-gpt.web.app/assets/produtos/roxo.png'], link: "https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo 'Projeto Slim 60 dias (Foco Ansiedade)'." },
            { id: 'sp-prem', imcCategory: 'Sobrepeso', type: 'Premium', title: 'Projeto Slim 40 dias', duration: '40 Dias', price: 499.99, products: ['1 Guria Shape Gold'], images: ['https://gabi-gpt.web.app/assets/produtos/gold.png'], link: "https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo 'Projeto Slim 40 dias (Premium)'." },
            { id: 'o1-eco', imcCategory: 'Obesidade Grau I', type: 'Econômico', title: 'Projeto Slim 90 dias', duration: '90 Dias', price: 500.00, products: ['1 Detox', '1 Black'], images: ['https://gabi-gpt.web.app/assets/produtos/detox.png', 'https://gabi-gpt.web.app/assets/produtos/black.png'], link: "https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo 'Projeto Slim 90 dias (Econômico)'." },
            { id: 'o1-ans', imcCategory: 'Obesidade Grau I', type: 'Ansiedade', title: 'Projeto Slim 90 dias', duration: '90 Dias', price: 455.00, products: ['1 Detox', '1 Roxo'], images: ['https://gabi-gpt.web.app/assets/produtos/detox.png', 'https://gabi-gpt.web.app/assets/produtos/roxo.png'], link: "https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo 'Projeto Slim 90 dias (Foco Ansiedade)'." },
            { id: 'o1-prem', imcCategory: 'Obesidade Grau I', type: 'Premium', title: 'Projeto Slim 70 dias', duration: '70 Dias', price: 669.99, products: ['1 Detox', '1 Gold'], images: ['https://gabi-gpt.web.app/assets/produtos/detox.png', 'https://gabi-gpt.web.app/assets/produtos/gold.png'], link: "https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo 'Projeto Slim 70 dias (Premium)'." },
            { id: 'o2-eco', imcCategory: 'Obesidade Grau II', type: 'Econômico', title: 'Projeto Slim 120 dias', duration: '120 Dias', price: 669.90, products: ['1 Detox', '1 Black', '1 Slim'], images: ['https://gabi-gpt.web.app/assets/produtos/detox.png', 'https://gabi-gpt.web.app/assets/produtos/black.png', 'https://gabi-gpt.web.app/assets/produtos/slimx.png'], link: "https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo 'Projeto Slim 120 dias (Econômico)'." },
            { id: 'o2-ans', imcCategory: 'Obesidade Grau II', type: 'Ansiedade', title: 'Projeto Slim 120 dias', duration: '120 Dias', price: 624.90, products: ['1 Detox', '1 Roxo', '1 Slim'], images: ['https://gabi-gpt.web.app/assets/produtos/detox.png', 'https://gabi-gpt.web.app/assets/produtos/roxo.png', 'https://gabi-gpt.web.app/assets/produtos/slimx.png'], link: "https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo 'Projeto Slim 120 dias (Foco Ansiedade)'." },
            { id: 'o2-prem', imcCategory: 'Obesidade Grau II', type: 'Premium', title: 'Projeto Slim 100 dias', duration: '100 Dias', price: 839.89, products: ['1 Detox', '1 Gold', '1 Slim'], images: ['https://gabi-gpt.web.app/assets/produtos/detox.png', 'https://gabi-gpt.web.app/assets/produtos/gold.png', 'https://gabi-gpt.web.app/assets/produtos/slimx.png'], link: "https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo 'Projeto Slim 100 dias (Premium)'." },
            { id: 'o3-eco', imcCategory: 'Obesidade Grau III', type: 'Econômico', title: 'Projeto Slim 160 dias', duration: '160 Dias', price: 1169.90, products: ['2 Detox', '2 Black', '1 Slim'], images: ['https://gabi-gpt.web.app/assets/produtos/detox.png', 'https://gabi-gpt.web.app/assets/produtos/black.png', 'https://gabi-gpt.web.app/assets/produtos/slimx.png'], link: "https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo 'Projeto Slim 160 dias (Econômico)'." },
            { id: 'o3-ans', imcCategory: 'Obesidade Grau III', type: 'Ansiedade', title: 'Projeto Slim 160 dias', duration: '160 Dias', price: 1079.90, products: ['2 Detox', '2 Roxo', '1 Slim'], images: ['https://gabi-gpt.web.app/assets/produtos/detox.png', 'https://gabi-gpt.web.app/assets/produtos/roxo.png', 'https://gabi-gpt.web.app/assets/produtos/slimx.png'], link: "https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo 'Projeto Slim 160 dias (Foco Ansiedade)'." },
            { id: 'o3-prem', imcCategory: 'Obesidade Grau III', type: 'Premium', title: 'Projeto Slim 140 dias', duration: '140 Dias', price: 1179.79, products: ['2 Detox', '2 Slim', '1 Gold'], images: ['https://gabi-gpt.web.app/assets/produtos/detox.png', 'https://gabi-gpt.web.app/assets/produtos/slimx.png', 'https://gabi-gpt.web.app/assets/produtos/gold.png'], link: "https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo 'Projeto Slim 140 dias (Premium)'." },
        ];

        const userData = { name: '', age: null, height: null, weight: null, imc: null, imcCategory: '', hasTakenSupplements: null, activityLevel: '', dietSweet: '', dietHealthy: '', anxiety: '', digestion: '', challengeText: '' };
        const sleep = ms => new Promise(res => setTimeout(res, ms));

        // --- Funções Auxiliares do Chat ---
        const scrollToBottom = () => { setTimeout(() => { chatScrollArea.scrollTop = chatScrollArea.scrollHeight; }, 100); };
        const showTyping = (show = true) => {
            let indicator = container.querySelector('#gabi-typing-indicator');
            if (show && !indicator) {
                indicator = document.createElement('div');
                indicator.id = 'gabi-typing-indicator';
                indicator.className = 'gabi-message gabi-typing-indicator';
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
            messageEl.className = 'gabi-message gabi-bot-message';
            messageEl.innerHTML = html;
            chatMessages.appendChild(messageEl);
            scrollToBottom();
        };
        const addUserMessage = (text) => {
            const messageEl = document.createElement('div');
            messageEl.className = 'gabi-message gabi-user-message';
            messageEl.textContent = text;
            chatMessages.appendChild(messageEl);
            scrollToBottom();
            inputArea.innerHTML = '';
        };
        const createButton = (id, text) => `<button id="${id}" class="gabi-action-button">${text}</button>`;
        const sendIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>`;
        const createInput = (id, placeholder, buttonId, type = 'text') => {
            inputArea.innerHTML = `<div class="gabi-input-with-button"><input type="${type}" id="${id}" placeholder="${placeholder}" /><button id="${buttonId}">${sendIconSVG}</button></div>`;
            scrollToBottom();
            const inputField = container.querySelector(`#${id}`);
            inputField.focus();
            return { input: inputField, button: container.querySelector(`#${buttonId}`) };
        };

        // --- Lógica de Recomendação e Resultado ---
        function getRecomendacao(userData) {
            const { imcCategory, anxiety } = userData;
            const combosForIMC = combos.filter(c => c.imcCategory === imcCategory);

            const comboAnsiedade = combosForIMC.find(c => c.type === 'Ansiedade');
            const comboPremium = combosForIMC.find(c => c.type === 'Premium');
            const comboEconomico = combosForIMC.find(c => c.type === 'Econômico');

            let recommendations = [];
            let reason = "";

            if (imcCategory === 'Abaixo do Peso') {
                reason = `Com um IMC indicando 'Abaixo do Peso', a estratégia de emagrecimento não é a mais indicada. O foco deve ser o ganho de massa muscular de forma saudável. Recomendo fortemente uma conversa com um especialista para traçar o plano ideal para você. O acompanhamento da Gabi será fundamental nesse processo!`;
                return { recommendations, reason };
            }

            if (anxiety === 'sim') {
                if (comboAnsiedade) recommendations.push({ combo: comboAnsiedade, tag: '🎯 Foco em Ansiedade', tagClass: 'main' });
                if (comboPremium) recommendations.push({ combo: comboPremium, tag: '⭐ Opção Premium', tagClass: 'secondary' });
                reason = `Sua principal barreira é a ansiedade, e vamos atacá-la de frente! O **combo focado em ansiedade** foi desenhado para te dar controle e serenidade, o que é a chave para o emagrecimento sustentável.`;
            } else if (anxiety === 'nao') {
                if (comboEconomico) recommendations.push({ combo: comboEconomico, tag: '💎 Principal', tagClass: 'main' });
                if (comboPremium) recommendations.push({ combo: comboPremium, tag: '⭐ Opção Premium', tagClass: 'secondary' });
                if (imcCategory === 'Sobrepeso' && comboAnsiedade) {
                    recommendations.push({ combo: comboAnsiedade, tag: '🎯 Controle de Apetite', tagClass: 'economic' });
                }
                reason = `Com a ansiedade sob controle, nosso foco é 100% na aceleração do seu metabolismo. O **plano principal** para sua categoria de IMC é a escolha mais direta para os seus objetivos.`;
            } else { // anxiety === 'media'
                if (comboPremium) recommendations.push({ combo: comboPremium, tag: '💎 Plano Premium', tagClass: 'main' });
                if (comboAnsiedade) recommendations.push({ combo: comboAnsiedade, tag: '🎯 Foco em Ansiedade', tagClass: 'secondary' });
                if (comboEconomico) recommendations.push({ combo: comboEconomico, tag: '💰 Opção de Início', tagClass: 'economic' });
                reason = `Como a ansiedade às vezes te visita, preparei um leque completo de estratégias. O **Plano Premium** é o mais potente, o **Foco em Ansiedade** te dá segurança, e a **Opção de Início** tem um ótimo custo-benefício. Avalie qual faz mais sentido para você começar!`;
            }

            if(imcCategory === 'Peso Normal') {
                recommendations = [];
                if (comboPremium) recommendations.push({ combo: comboPremium, tag: '💎 Plano Premium', tagClass: 'main' });
                if (comboEconomico) recommendations.push({ combo: comboEconomico, tag: '⭐ Opção de Início', tagClass: 'secondary' });
                reason = "Parabéns, seu IMC está ótimo! Para otimizar seus resultados e definir, o **Plano Premium** oferece a máxima performance. A **Opção de Início** é excelente para manutenção e um detox inicial.";
            }

            return { recommendations, reason };
        }

        // --- CORREÇÃO APLICADA AQUI ---
        const createComboCard = (rec) => {
            if (!rec || !rec.combo) return '';
            const { combo, tag, tagClass } = rec;

            // Mapeia cada nome de produto a sua respectiva imagem
            const productItemsHtml = combo.products.map((productName, index) => {
                // Usa a imagem na mesma posição do produto, ou a última imagem se não houver correspondência
                const imageUrl = combo.images[index] || combo.images[combo.images.length - 1];
                return `
                    <div class="gabi-product-item">
                        <img src="${imageUrl}" alt="${productName}">
                        <span>${productName}</span>
                    </div>`;
            }).join('');

            return `
                <div class="gabi-result-card combo-style">
                    <div class="gabi-card-header">
                        <span class="tag ${tagClass}">${tag}</span>
                        <h3 class="combo-title">${combo.title}</h3>
                    </div>
                    <div class="gabi-combo-details">
                        <div class="detail-item">
                            <div class="value duration">${combo.duration}</div>
                            <div class="label">Duração</div>
                        </div>
                        <div class="detail-item">
                            <div class="value price">R$ ${combo.price.toFixed(2).replace('.', ',')}</div>
                            <div class="label">Total</div>
                        </div>
                    </div>
                    <h4 class="product-list-title">Produtos Inclusos:</h4>
                    <div class="gabi-product-list">
                        ${productItemsHtml}
                    </div>
                    <a href="${combo.link}" target="_blank" class="buy-btn">
                        🛒 Comprar Combo
                    </a>
                </div>`;
        };

        const createExplanationSection = (reason) => {
            return `
                <div class="gabi-explanation-section">
                    <button id="gabi-toggle-explanation">
                        <span>Por que esta é a melhor estratégia?</span>
                        <span id="gabi-explanation-arrow">▼</span>
                    </button>
                    <div id="gabi-explanation-content">
                        <p>${reason}</p>
                    </div>
                </div>`;
        };

        const showFinalRecommendation = () => {
            chatInterface.style.display = 'none';
            finalResultScreen.style.display = 'block';

            const { recommendations, reason } = getRecomendacao(userData);
            const cardsHtml = recommendations.map(rec => createComboCard(rec)).join('');

            finalResultScreen.innerHTML = `
                <div class="gabi-result-header">
                    <h2>Sua estratégia está pronta, ${userData.name}!</h2>
                    <p>Com base em suas respostas, estruturei os melhores combos para acelerar seus resultados.</p>
                </div>
                <div class="gabi-card-grid">
                    ${cardsHtml}
                </div>
                ${(reason && recommendations.length > 0) ? createExplanationSection(reason) : ''}
                ${recommendations.length === 0 ? `<div class="gabi-explanation-section"><p style="text-align:center;">${reason}</p></div>` : ''}
            `;

            const toggleButton = container.querySelector('#gabi-toggle-explanation');
            if (toggleButton) {
                toggleButton.addEventListener('click', () => {
                    const content = container.querySelector('#gabi-explanation-content');
                    const arrow = container.querySelector('#gabi-explanation-arrow');
                    const isHidden = content.style.display === 'none' || content.style.display === '';
                    content.style.display = isHidden ? 'block' : 'none';
                    arrow.textContent = isHidden ? '▲' : '▼';
                });
            }
        };

        function calcularIMC(peso, altura) {
            const imc = peso / (altura * altura);
            let classificacao = '', conclusao = '';
            if (imc < 18.5) { classificacao = 'Abaixo do Peso'; conclusao = 'Seu IMC está abaixo do ideal. O foco deve ser um plano de ganho de massa saudável.'; } 
            else if (imc < 25) { classificacao = 'Peso Normal'; conclusao = 'Parabéns! Seu IMC está na faixa ideal. Nosso foco será otimizar e definir.'; } 
            else if (imc < 30) { classificacao = 'Sobrepeso'; conclusao = 'Seu IMC indica sobrepeso. Este é um sinal de alerta, mas com o plano certo, os resultados virão.'; } 
            else if (imc < 35) { classificacao = 'Obesidade Grau I'; conclusao = 'Seu IMC está na faixa de Obesidade Grau I. É um bom momento para buscar apoio e iniciar mudanças.'; } 
            else if (imc < 40) { classificacao = 'Obesidade Grau II'; conclusao = 'Seu IMC indica Obesidade Grau II (severa). É altamente recomendável procurar orientação para um plano de ação.'; } 
            else { classificacao = 'Obesidade Grau III'; conclusao = 'Seu IMC está na faixa de Obesidade Grau III. É crucial buscar ajuda especializada para uma mudança segura.'; }
            return { imc: imc.toFixed(1), classificacao, conclusao };
        }

        // --- Fluxo da Conversa ---
        async function preRecommendation() {
            await addBotMessage(`Obrigada por compartilhar, ${userData.name}. Sua resposta é muito importante.`, 2500);
            await addBotMessage(`Com todas as suas respostas, já consigo cruzar os dados e montar o plano de ataque ideal para o seu caso. Preparando sua estratégia personalizada... 🧠✨`, 3500);
            showFinalRecommendation();
        }

        async function askBiggestChallenge() {
            await addBotMessage("Obrigada! Estamos quase no fim.", 2000);
            await addBotMessage("Para a recomendação ser certeira, me conte com suas palavras: o que você sente que é o seu maior desafio para emagrecer hoje?", 3200);
            const { input, button } = createInput('challenge-input', 'Ex: falta de tempo, compulsão...', 'challenge-submit');
            const handle = () => { if (input.value.trim() === '') return; userData.challengeText = input.value.trim(); addUserMessage(userData.challengeText); preRecommendation(); };
            button.addEventListener('click', handle);
            input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handle(); });
        }

        async function askDietHealthy() {
            await addBotMessage("E para fecharmos essa etapa: como você descreveria sua alimentação em geral?", 2800);
            const div = document.createElement('div');
            div.style.cssText = 'display:flex; flex-direction:column; gap:0.75rem;';
            div.innerHTML = `${createButton('health-besteiras', 'Industrializados / Fast-food 🍕')}${createButton('health-misto', 'Tento equilibrar, com deslizes 🥗🍔')}${createButton('health-saudavel', 'Focada em comida de verdade 🥦')}`;
            inputArea.appendChild(div);
            const handle = (r, t) => { userData.dietHealthy = r; addUserMessage(t); askBiggestChallenge(); };
            container.querySelector('#health-besteiras').addEventListener('click', () => handle('besteiras', "Baseada em industrializados."));
            container.querySelector('#health-misto').addEventListener('click', () => handle('misto', "Tento equilibrar."));
            container.querySelector('#health-saudavel').addEventListener('click', () => handle('saudavel', "Focada em ser saudável."));
        }

        async function askDietSweet() {
            await addBotMessage("Certo! E sua relação com doces, como é? 🐜", 2500);
            const div = document.createElement('div');
            div.style.cssText = 'display:flex; flex-direction:column; gap:0.75rem;';
            div.innerHTML = `${createButton('sweet-sim', 'Tenho muita vontade')}${createButton('sweet-media', 'Como com moderação')}${createButton('sweet-nao', 'É raro, não sinto falta')}`;
            inputArea.appendChild(div);
            const handle = (r, t) => { userData.dietSweet = r; addUserMessage(t); askDietHealthy(); };
            container.querySelector('#sweet-sim').addEventListener('click', () => handle('sim', "Tenho muita vontade de doces."));
            container.querySelector('#sweet-media').addEventListener('click', () => handle('media', "Como com moderação."));
            container.querySelector('#sweet-nao').addEventListener('click', () => handle('nao', "Não sinto falta de doces."));
        }

        async function askDigestion() {
            await addBotMessage("Perfeito. E como anda sua digestão? Inchaço ou intestino lento são comuns para você?", 2800);
            const div = document.createElement('div');
            div.style.cssText = 'display:flex; flex-direction:column; gap:0.75rem;';
            div.innerHTML = `${createButton('dig-sim', 'Sim, com frequência')}${createButton('dig-media', 'Ocasionalmente')}${createButton('dig-nao', 'Não, funciona bem')}`;
            inputArea.appendChild(div);
            const handle = (r, t) => { userData.digestion = r; addUserMessage(t); askDietSweet(); };
            container.querySelector('#dig-sim').addEventListener('click', () => handle('sim', "Sim, sinto com frequência."));
            container.querySelector('#dig-media').addEventListener('click', () => handle('media', "Ocasionalmente."));
            container.querySelector('#dig-nao').addEventListener('click', () => handle('nao', "Funciona bem."));
        }

        async function askAnxiety() {
            await addBotMessage("Anotado! ✅ Agora, uma pergunta muito importante sobre a ansiedade... Você sente que ela atrapalha suas escolhas alimentares?", 2800);
            const div = document.createElement('div');
            div.style.cssText = 'display:flex; flex-direction:column; gap:0.75rem;';
            div.innerHTML = `${createButton('anxiety-sim', 'Sim, com certeza')}${createButton('anxiety-media', 'Às vezes, um pouco')}${createButton('anxiety-nao', 'Não, controlo bem')}`;
            inputArea.appendChild(div);
            const handle = (r, t) => { userData.anxiety = r; addUserMessage(t); askDigestion(); };
            container.querySelector('#anxiety-sim').addEventListener('click', () => handle('sim', "Sim, a ansiedade me afeta."));
            container.querySelector('#anxiety-media').addEventListener('click', () => handle('media', "Às vezes, um pouco."));
            container.querySelector('#anxiety-nao').addEventListener('click', () => handle('nao', "Não, controlo bem."));
        }

        async function askActivityLevel() {
            await addBotMessage("Ok. E no seu dia a dia, como você descreve sua rotina?", 2500);
            const div = document.createElement('div');
            div.style.cssText = 'display:flex; flex-direction:column; gap:0.75rem;';
            div.innerHTML = `${createButton('act-agitada', 'Ativa, me movimento bastante 🏃‍♀️')}${createButton('act-media', 'Moderada, um pouco de tudo 🤷‍♀️')}${createButton('act-parada', 'Mais parada / trabalho sentada 💻')}`;
            inputArea.appendChild(div);
            const handle = (r, t) => { userData.activityLevel = r; addUserMessage(t); askAnxiety(); };
            container.querySelector('#act-agitada').addEventListener('click', () => handle('agitada', "Minha rotina é ativa."));
            container.querySelector('#act-media').addEventListener('click', () => handle('media', "Minha rotina é moderada."));
            container.querySelector('#act-parada').addEventListener('click', () => handle('parada', "Sou mais parada."));
        }

        async function continueToQuestionnaire() {
            await addBotMessage("Agora vamos refinar a análise com mais alguns detalhes sobre você.", 2800);
            await addBotMessage("Você já utilizou algum tipo de suplemento para emagrecimento antes?");
            const div = document.createElement('div');
            div.style.cssText = 'display:flex; gap:1rem;';
            div.innerHTML = `${createButton('supp-sim', 'Sim, já usei')}${createButton('supp-nao', 'Não, primeira vez')}`;
            inputArea.appendChild(div);
            const handle = (r, t) => { userData.hasTakenSupplements = r; addUserMessage(t); askActivityLevel(); };
            container.querySelector('#supp-sim').addEventListener('click', () => handle(true, 'Sim, já usei.'));
            container.querySelector('#supp-nao').addEventListener('click', () => handle(false, 'Não, primeira vez.'));
        }

        async function processIMC() {
            inputArea.innerHTML = '';
            await addBotMessage("Obrigada pelas informações. Calculando e analisando seu perfil... 🧠", 3000);

            const imcResult = calcularIMC(userData.weight, userData.height);
            userData.imcCategory = imcResult.classificacao;

            const sumarioTexto = `📌 <b>Resultado do seu IMC</b>\n\n✅ Idade: ${userData.age} anos\n✅ Altura: ${userData.height.toFixed(2)} m\n✅ Peso: ${userData.weight.toFixed(1)} kg\n\n📐 <b>IMC: ${imcResult.imc} (${imcResult.classificacao})</b>\n\n<b>Conclusão:</b>\n${imcResult.conclusao}`;
            await addBotMessage(sumarioTexto, 4500);

            if (userData.imcCategory !== 'Abaixo do Peso') {
                await continueToQuestionnaire();
            } else { 
                await addBotMessage("Para o seu caso, o ideal é uma conversa com um especialista para montar um plano de ganho de massa. Vou te mostrar o contato.", 4000);
                showFinalRecommendation();
            }
        }

        async function askForWeight() {
            await addBotMessage("Ótimo! E para finalizar o cálculo, qual o seu peso atual? (ex: 70.5 kg)", 2200);
            const { input, button } = createInput('weight-input', 'Seu peso em kg...', 'weight-submit');
            const handle = () => { let v = input.value.replace(',', '.'); if (!v || isNaN(v) || v <= 0) return; userData.weight = parseFloat(v); addUserMessage(`${userData.weight.toFixed(1)} kg.`); processIMC(); };
            button.addEventListener('click', handle);
            input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handle(); });
        }

        async function askForHeight() {
            await addBotMessage("Perfeito. Agora, informe sua altura (ex: 1.65).", 2200);
            const { input, button } = createInput('height-input', 'Sua altura em metros...', 'height-submit');
            const handle = () => { let v = input.value.replace(',', '.'); if (!v || isNaN(v) || v <= 0) return; let h = parseFloat(v); if (h > 3) h /= 100; userData.height = h; addUserMessage(`${userData.height.toFixed(2).replace('.',',')}m.`); askForWeight(); };
            button.addEventListener('click', handle);
            input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handle(); });
        }

        async function askForAge() {
            await addBotMessage(`Que ótimo, ${userData.name}! Admiro sua decisão de focar no seu bem-estar. Esse já é o passo mais importante. ❤️`, 2800);
            await addBotMessage("Agora, preciso de alguns dados para que minha recomendação seja perfeita para você. É super rápido, prometo!", 3200);
            await addBotMessage("Primeiro, qual a sua idade?", 2200);
            const { input, button } = createInput('age-input', 'Digite sua idade...', 'age-submit', 'number');
            const handle = () => { if (!input.value || input.value <= 0) return; userData.age = parseInt(input.value); addUserMessage(`${userData.age} anos.`); askForHeight(); };
            button.addEventListener('click', handle);
            input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handle(); });
        }

        async function beginChat() {
            await addBotMessage("Olá! Sou a Gabi GPT, sua consultora de bem-estar. Que bom ter você aqui para iniciarmos seu Projeto Slim juntas! ✨", 2200);
            await addBotMessage("Meu objetivo é analisar suas respostas para encontrarmos a melhor estratégia para os seus objetivos. 💪", 3000);
            await addBotMessage("E o melhor: depois daqui, a Gabi (de carne e osso!) estará à disposição para te acompanhar e tirar qualquer dúvida. 😉", 3000);
            await addBotMessage("Para começarmos, me diga, como você prefere ser chamada?", 2200);
            const { input, button } = createInput('name-input', 'Digite seu nome...', 'name-submit');
            const handle = () => { if (input.value.trim() === '') return; userData.name = input.value.trim(); addUserMessage(userData.name); askForAge(); };
            button.addEventListener('click', handle);
            input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handle(); });
        }

        beginChat();
    }
})();
