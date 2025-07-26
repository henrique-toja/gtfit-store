// vitrine.js - REVOLUÇÃO INTERATIVA by Gemini
(function() {
    window.gabiFitApp = window.gabiFitApp || {};

    window.gabiFitApp.Vitrine = (function() {
        let appContainer;
        const domain = 'https://www.gtfit.store';
        const mainStoreLink = 'https://www.gabrielatorraca.com.br';
        const gabiAvatar = 'https://www.gtfit.store/gabi-profile.jpg';

        // --- FUNÇÕES DE TRANSIÇÃO E HELPERS ---

        const _transitionView = (renderFn, ...args) => {
            const currentView = appContainer.firstChild;
            if (currentView) {
                currentView.classList.add('view-exit');
                currentView.addEventListener('animationend', () => {
                    appContainer.innerHTML = '';
                    renderFn(...args);
                }, { once: true });
            } else {
                renderFn(...args);
            }
        };

        const _addClickListeners = (selector, handler) => {
            appContainer.querySelectorAll(selector).forEach(element => {
                element.addEventListener('click', (e) => {
                    e.stopPropagation();
                    handler(e.currentTarget);
                });
            });
        };

        // --- FUNÇÕES DE RENDERIZAÇÃO DA VITRINE PRINCIPAL ---

        const createProductCard = (product) => `
            <div class="showcase-card product-card-main flex flex-col justify-between flex-shrink-0 w-64 md:w-72 rounded-2xl p-4 cursor-pointer" data-product-id="${product.id}">
                <div class="flex-grow">
                    <img src="${domain}${product.imagem}" alt="${product.nome}" class="h-40 w-full object-contain mx-auto mb-4">
                    <h3 class="font-semibold text-center text-slate-100">${product.nome}</h3>
                </div>
                <button class="showcase-card-button w-full text-white text-sm font-bold py-2.5 rounded-lg mt-4">
                    Conversar com Gabi
                </button>
            </div>
        `;

        const createComboCategoryCard = (key, info) => `
            <div class="showcase-card combo-category-card flex flex-col justify-between flex-shrink-0 w-64 md:w-72 rounded-2xl p-4 cursor-pointer" data-category-key="${key}">
                <div class="flex-grow">
                    <img src="${domain}/assets/images/${key.replace('obesidade-grau-','grau').replace('peso-saudavel-sobrepeso', 'grau0')}.png" alt="${info.line1}" class="h-32 w-32 object-contain mx-auto rounded-full shadow-lg mb-4">
                    <h3 class="text-base font-bold text-center text-white">${info.line1}</h3>
                    <p class="text-xs font-normal text-center text-primary-green leading-tight mt-1">${info.line2}</p>
                </div>
                <button class="showcase-card-button w-full text-white text-sm font-bold py-2.5 rounded-lg mt-4">
                    Ver Planos Ideais
                </button>
            </div>
        `;
        
        const createSpecificComboCard = (combo, categoryKey) => {
             const emojiMap = { 'eco': '💸', 'anxiety': '🧘‍♀️', 'potencia': '💪🏼', 'premium': '💎' };
             const emoji = emojiMap[combo.type] || '📦';
             return `
                <div class="showcase-card specific-combo-card flex flex-col justify-between flex-shrink-0 w-64 md:w-72 rounded-2xl p-6 cursor-pointer" data-combo-id="${combo.id}" data-originating-category="${categoryKey}">
                    <div class="flex-grow text-center">
                        <span class="text-6xl">${emoji}</span>
                        <h3 class="text-lg font-bold text-white mt-4">${combo.tag.replace('PLANO ', '')}</h3>
                        <p class="text-sm text-slate-300">${combo.duration}</p>
                    </div>
                    <button class="showcase-card-button w-full text-white text-sm font-bold py-2.5 rounded-lg mt-4">
                        Ver Detalhes
                    </button>
                </div>
             `;
        };

        const createRow = (title, cards) => `
            <section class="mb-12">
                <h2 class="text-2xl font-bold text-white mb-6 text-center">${title}</h2>
                <div class="flex gap-4 overflow-x-auto pb-4 -mb-4 scrollbar-thin px-2">
                    ${cards}
                </div>
            </section>
        `;

        const renderMainShowcase = () => {
            const { products, combos } = window.gabiFitApp;
            const productCategories = products.categoriesInfo;
            
            const comboCards = Object.entries(combos.categoryDisplayInfo).map(([key, info]) => createComboCategoryCard(key, info)).join('');
            const emagrecedoresCards = products.getProductsByCategory('emagrecedores').map(createProductCard).join('');
            const essenciaisCards = products.getProductsByCategory('essenciais').map(createProductCard).join('');
            const uteisCards = products.getProductsByCategory('uteis').map(createProductCard).join('');

            const showcaseHTML = `
                <div class="view-enter">
                    ${createRow("Encontre seu Combo Ideal", comboCards)}
                    ${createRow(productCategories.emagrecedores.title, emagrecedoresCards)}
                    ${createRow(productCategories.essenciais.title, essenciaisCards)}
                    ${createRow(productCategories.uteis.title, uteisCards)}
                </div>
            `;
            appContainer.innerHTML = showcaseHTML;

            _addClickListeners('.product-card-main', el => _transitionView(renderProductChat, el.dataset.productId));
            _addClickListeners('.combo-category-card', el => _transitionView(renderComboSubcategories, el.dataset.categoryKey));
        };
        
        // --- FUNÇÕES DA INTERFACE DE CHAT "GABI GPT" ---

        const renderGabiChatUI = (options) => {
            const { title, backFunction, backLabel, backDataStep, backDataCategory } = options;
            const backDataAttrs = `data-step="${backDataStep || ''}" data-category="${backDataCategory || ''}"`;

            appContainer.innerHTML = `
                <div class="w-full max-w-2xl mx-auto view-enter">
                    <header class="gabi-chat-header flex items-center gap-4 p-4 rounded-2xl mb-6">
                        <img src="${gabiAvatar}" alt="Gabi, sua especialista" class="gabi-chat-avatar w-16 h-16 rounded-full object-cover">
                        <div>
                            <p class="font-bold text-lg text-white">${title}</p>
                            <p class="gabi-chat-status text-sm font-medium text-primary-green flex items-center gap-2">
                                <span class="block w-2 h-2 bg-green-400 rounded-full"></span>
                                Online
                            </p>
                        </div>
                    </header>
                    <div id="chat-messages" class="flex flex-col gap-4"></div>
                    <div id="chat-ctas" class="flex flex-wrap gap-3 mt-6 opacity-0"></div>
                    <button id="chat-back-button" class="flex items-center gap-2 mx-auto mt-8 text-slate-400 hover:text-white transition-colors duration-300" ${backDataAttrs}>
                        <i class="fas fa-arrow-left"></i>
                        <span>${backLabel}</span>
                    </button>
                </div>
            `;
            document.getElementById('chat-back-button').addEventListener('click', backFunction);
        };
        
        const startChatSequence = (messages, ctas) => {
            const container = document.getElementById('chat-messages');
            const ctasContainer = document.getElementById('chat-ctas');
            let delay = 200;

            const addMessage = (html) => {
                const msgEl = document.createElement('div');
                msgEl.innerHTML = html;
                container.appendChild(msgEl.firstChild);
                msgEl.firstChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
            };

            messages.forEach(msg => {
                setTimeout(() => {
                    const typingElId = `typing-${Date.now()}`;
                    addMessage(`<div id="${typingElId}" class="chat-message message-gabi self-start max-w-xs md:max-w-md p-4 rounded-2xl"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`);

                    setTimeout(() => {
                        const typingEl = document.getElementById(typingElId);
                        if (typingEl) {
                           typingEl.innerHTML = Array.isArray(msg.content)
                            ? `<strong>${msg.title}</strong><ul class="list-disc list-inside mt-2 space-y-1">${msg.content.map(item => `<li>${item}</li>`).join('')}</ul>`
                            : `<strong>${msg.title}</strong><p class="mt-1 opacity-90">${msg.content}</p>`;
                        }
                    }, 1200 + Math.random() * 500);
                }, delay);
                delay += 1800;
            });

            setTimeout(() => {
                ctasContainer.innerHTML = ctas;
                ctasContainer.style.transition = 'opacity 0.5s';
                ctasContainer.style.opacity = '1';
            }, delay);
        };

        const renderProductChat = (productId) => {
            const product = window.gabiFitApp.products.getProductById(productId);
            if (!product) return;
            
            renderGabiChatUI({
                title: `Conversando sobre ${product.nome}`,
                backLabel: 'Voltar para Vitrine',
                backFunction: () => _transitionView(renderMainShowcase)
            });

            const messages = [
                { title: '✨ Para que serve?', content: product.resultado_combinacao },
                { title: '💊 Composição', content: product.composicao },
                { title: '📋 Modo de Uso', content: product.modo_uso },
                product.beneficios && { title: '🏆 Benefícios', content: product.beneficios },
                product.contraindicacoes && { title: '🚫 Contraindicações', content: product.contraindicacoes },
            ].filter(Boolean);

            const whatsappMessage = encodeURIComponent(`Olá, vi o produto "${product.nome}" na Vitrine e gostaria de saber mais!`);
            const ctas = `
                <a href="https://wa.me/556792552604?text=${whatsappMessage}" target="_blank" class="chat-cta-button chat-cta-whatsapp flex-1 text-center text-white font-bold p-3 rounded-xl">
                    <i class="fab fa-whatsapp"></i> Tirar Dúvidas
                </a>
                <a href="${product.link_loja}" target="_blank" class="chat-cta-button chat-cta-store flex-1 text-center text-white font-bold p-3 rounded-xl">
                    <i class="fas fa-store"></i> Ver na Loja
                </a>
            `;
            
            startChatSequence(messages, ctas);
        };
        
        const renderComboSubcategories = (categoryKey) => {
            const combos = window.gabiFitApp.combos.getCombosSubcategories(categoryKey);
            const categoryInfo = window.gabiFitApp.combos.categoryDisplayInfo[categoryKey];
            
            const cards = combos.map(combo => createSpecificComboCard(combo, categoryKey)).join('');
            
            const html = `
                <div class="w-full max-w-4xl mx-auto view-enter">
                    <h2 class="text-2xl font-bold text-white text-center mb-6">Planos para ${categoryInfo.line1}</h2>
                    <div class="flex gap-4 overflow-x-auto pb-4 -mb-4 scrollbar-thin px-2 justify-center flex-wrap">
                        ${cards}
                    </div>
                    <button id="subcategory-back-button" class="flex items-center gap-2 mx-auto mt-12 text-slate-400 hover:text-white transition-colors duration-300">
                         <i class="fas fa-arrow-left"></i>
                        <span>Voltar para Vitrine</span>
                    </button>
                </div>
            `;
            appContainer.innerHTML = html;
            
            _addClickListeners('.specific-combo-card', el => _transitionView(renderComboChat, el.dataset.comboId, el.dataset.originatingCategory));
            document.getElementById('subcategory-back-button').addEventListener('click', () => _transitionView(renderMainShowcase));
        };

        const renderComboChat = (comboId, categoryKey) => {
            const combo = window.gabiFitApp.combos.getComboById(comboId, categoryKey);
            const categoryInfo = window.gabiFitApp.combos.categoryDisplayInfo[categoryKey];
            if (!combo) return;

            renderGabiChatUI({
                title: `Plano ${combo.tag.replace('PLANO ', '')}`,
                backLabel: 'Voltar para Planos',
                backFunction: () => _transitionView(renderComboSubcategories, categoryKey)
            });

            const productsList = combo.products.map(p => `
                <li class="flex items-center gap-3">
                    <img src="${p.img}" class="w-10 h-10 rounded-full border-2 border-purple-500/50" alt="${p.name}">
                    <span>${p.name}</span>
                </li>
            `).join('');

            const messages = [
                { title: `🤔 Este combo é ideal para você?`, content: combo.explanation },
                { title: `📦 O que vem no seu Kit?`, content: `<ul class="space-y-3 mt-2">${productsList}</ul>` }
            ];

            const whatsappMessage = encodeURIComponent(`Olá! Gostaria de fazer o planejamento para o ${combo.title} (categoria: ${categoryInfo.line1}). Podemos conversar?`);
            const ctas = `
                <a href="https://wa.me/556792552604?text=${whatsappMessage}" target="_blank" class="chat-cta-button chat-cta-whatsapp flex-grow text-center text-white font-bold p-3 rounded-xl">
                    <i class="fab fa-whatsapp"></i> Montar meu Plano com Especialista
                </a>
            `;

            startChatSequence(messages, ctas);
        };
        
        // --- FUNÇÃO DE INICIALIZAÇÃO PÚBLICA ---
        const initialize = (containerElement) => {
            appContainer = containerElement;
            renderMainShowcase();
        };

        return { initialize, renderMainShowcase };

    })();
})();
