// vitrine.js - REVOLUÇÃO INTERATIVA by Gemini (v1.2 - Chat Removido)
(function() {
    window.gabiFitApp = window.gabiFitApp || {};

    window.gabiFitApp.Vitrine = (function() {
        let appContainer;
        const domain = 'https://www.gtfit.store';
        const mainStoreLink = 'https://www.gabrielatorraca.com.br';

        // Mapeamento de categorias de combo para as novas imagens
        const categoryImages = {
            'obesidade-grau-iii': `${domain}/assets/images/grau3.png`,
            'obesidade-grau-ii': `${domain}/assets/images/grau2.png`,
            'obesidade-grau-i': `${domain}/assets/images/grau1.png`,
            'peso-saudavel-sobrepeso': `${domain}/assets/images/grau0.png`
        };

        // NOVO: Mapeamento de tipos de combo para emojis - MANTIDO, MAS NÃO USADO PARA IMAGEM PRINCIPAL DO CARD DO COMBO
        const comboEmojis = {
            'eco': '💸', // Econômico
            'anxiety': '🧘‍♀️', // Ansiedade
            'potencia': '💪🏼', // Potência - ATUALIZADO
            'premium': '💎' // Premium - ATUALIZADO
        };

        // --- FUNÇÕES DE TRANSIÇÃO E HELPERS ---

        const _transitionView = (renderFn, ...args) => {
            const currentView = appContainer.firstElementChild; 

            if (currentView) {
                currentView.classList.add('view-exit');
                currentView.addEventListener('animationend', () => {
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

        // Adiciona funcionalidade de abrir/fechar ao acordeão
        const addAccordionListeners = () => {
            document.querySelectorAll('.product-accordion-item').forEach(item => {
                const header = item.querySelector('.product-accordion-header');
                const content = item.querySelector('.product-accordion-content');
                const toggle = () => {
                    item.classList.toggle('open');
                    content.style.maxHeight = item.classList.contains('open') ? `${content.scrollHeight}px` : '0px';
                };
                header.addEventListener('click', toggle);
                if (item.classList.contains('open')) {
                    setTimeout(() => { content.style.maxHeight = `${content.scrollHeight}px`; }, 10);
                }
            });
        };

        // Adiciona funcionalidade aos botões de "voltar"
        const addBackButtonListener = () => {
            const backButton = appContainer.querySelector('.back-button');
            if (backButton) {
                backButton.addEventListener('click', (e) => {
                    const step = e.currentTarget.dataset.step;
                    const category = e.currentTarget.dataset.category;

                    if (step === 'showcase') {
                        _transitionView(renderMainShowcase);
                    } else if (step === 'subcategories') {
                        _transitionView(renderComboSubcategories, category);
                    }
                });
            }
        };

        // --- FUNÇÃO PARA PRELOAD DE IMAGENS ---
        const preloadProductImages = () => {
            if (window.gabiFitApp.products && window.gabiFitApp.products.data) {
                window.gabiFitApp.products.data.forEach(product => {
                    const img = new Image();
                    img.src = `${domain}${product.imagem}`;
                });
                console.log('Preload de imagens de produtos iniciado.');
            } else {
                console.warn('Não foi possível iniciar o preload de imagens: products.js ou products.data não carregado.');
            }
            // Pré-carregamento das imagens de categoria de combo
            Object.values(categoryImages).forEach(imgPath => {
                const img = new Image();
                img.src = imgPath;
            });
            console.log('Preload de imagens de categorias de combo iniciado.');
        };

        // --- FUNÇÕES DE RENDERIZAÇÃO DA VITRINE PRINCIPAL ---

        const createProductCard = (product) => `
            <div class="showcase-card product-card-main flex flex-col justify-between flex-shrink-0 w-64 md:w-72 rounded-2xl p-4 cursor-pointer" data-product-id="${product.id}">
                <div class="flex-grow">
                    <img src="${domain}${product.imagem}" alt="${product.nome}" class="h-40 w-full object-contain mx-auto mb-4">
                    <h3 class="font-semibold text-center text-slate-100">${product.nome}</h3>
                </div>
                <button class="showcase-card-button w-full text-white text-sm font-bold py-2.5 rounded-lg mt-4">
                    Ver Detalhes
                </button>
            </div>
        `;

        const createComboCategoryCard = (categoryKey, categoryInfo) => {
            const imageUrl = categoryImages[categoryKey] || ''; // Obtém a URL da imagem
            return `
                <div class="showcase-card combo-category-card flex flex-col justify-between flex-shrink-0 w-64 md:w-72 rounded-2xl p-4 cursor-pointer" data-category-key="${categoryKey}">
                    <div class="flex-grow">
                        ${imageUrl ? `<img src="${imageUrl}" alt="${categoryInfo.line1}" class="h-32 w-32 object-contain mx-auto rounded-full shadow-lg mb-4">` : `<span class="text-6xl text-center block mb-4">${categoryInfo.emoji}</span>`}
                        <h3 class="text-base font-bold text-center text-white">${categoryInfo.line1}</h3>
                        <p class="text-xs font-normal text-center text-primary-green leading-tight mt-1">${categoryInfo.line2}</p>
                    </div>
                    <button class="showcase-card-button w-full text-white text-sm font-bold py-2.5 rounded-lg mt-4">
                        Ver Planos Ideais
                    </button>
                </div>
            `;
        };

        const createSpecificComboCard = (combo, categoryKey) => {
             const emoji = comboEmojis[combo.type] || '📦';
             return `
                <div class="showcase-card specific-combo-card flex flex-col justify-between flex-shrink-0 w-64 md:w-72 rounded-2xl p-6 cursor-pointer" data-combo-id="${combo.id}" data-originating-category="${categoryKey}">
                    <div class="flex-grow text-center">
                        <span class="text-6xl">${emoji}</span>
                        <h3 class="text-lg font-bold text-white mt-4">Plano ${combo.tag.replace('PLANO ', '')}</h3>
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

            const comboCategoryCards = Object.entries(combos.categoryDisplayInfo).map(([key, info]) => createComboCategoryCard(key, info)).join('');
            const emagrecedoresCards = products.getProductsByCategory('emagrecedores').map(createProductCard).join('');
            const essenciaisCards = products.getProductsByCategory('essenciais').map(createProductCard).join('');
            const uteisCards = products.getProductsByCategory('uteis').map(createProductCard).join('');

            const showcaseHTML = `
                <div class="view-enter">
                    ${createRow("Encontre seu Combo Ideal", comboCategoryCards)}
                    ${createRow(productCategories.emagrecedores.title, emagrecedoresCards)}
                    ${createRow(productCategories.essenciais.title, essenciaisCards)}
                    ${createRow(productCategories.uteis.title, uteisCards)}
                </div>
            `;
            appContainer.innerHTML = showcaseHTML;

            // Add listeners for product cards
            _addClickListeners('.product-card-main', el => _transitionView(renderProductDetailView, el.dataset.productId));
            // Add listeners for combo category cards
            _addClickListeners('.combo-category-card', el => _transitionView(renderComboSubcategories, el.dataset.categoryKey));
        };

        // --- FUNÇÕES DE RENDERIZAÇÃO DA TELA DE DETALHES DO PRODUTO (INDIVIDUAL) ---
        const renderProductDetailView = (productId) => {
            const product = window.gabiFitApp.products.getProductById(productId);
            if (!product) return;

            // Helper para gerar itens de acordeão para a visualização detalhada
            const generateAccordionItem = (title, content, isOpen = false) => {
                if (!content || (Array.isArray(content) && content.length === 0)) return '';
                const contentHTML = Array.isArray(content)
                    ? `<ul class="space-y-3">${content.map(item => `<li class="flex items-start gap-3"><span class="text-primary-green mt-1.5 flex-shrink-0">✓</span><span>${item}</span></li>`).join('')}</ul>`
                    : `<p>${content}</p>`;
                return `
                    <div class="product-accordion-item ${isOpen ? 'open' : ''}">
                        <button class="product-accordion-header text-center">
                            <span>${title}</span>
                            <i class="fas fa-chevron-down text-purple-400"></i>
                        </button>
                        <div class="product-accordion-content"><div class="product-accordion-body">${contentHTML}</div></div>
                    </div>
                `;
            };

            // Mensagem do WhatsApp personalizada
            const whatsappMessage = encodeURIComponent(`Olá, vi o produto "${product.nome}" na Vitrine da loja virtual e gostaria de saber mais! Podemos conversar?`);
            const whatsappUrl = `https://wa.me/556792552604?text=${whatsappMessage}`;

            const detailHTML = `
                <div class="w-full max-w-lg mx-auto view-enter">
                    <div class="product-card-detail">
                        <div class="product-detail-header">
                            <img src="${domain}${product.imagem}" alt="${product.nome}" class="w-32 h-32 object-contain rounded-full mx-auto mb-5 border-4 border-purple-400/50 shadow-lg shadow-purple-500/20">
                            <h2 class="text-3xl font-extrabold text-white tracking-tight">${product.nome}</h2>
                        </div>
                        <div class="product-accordion-container">
                            ${generateAccordionItem('✨ Para que serve?', product.resultado_combinacao, true)}
                            ${generateAccordionItem('💊 Composição', product.composicao)}
                            ${generateAccordionItem('📋 Modo de Uso', product.modo_uso)}
                            ${generateAccordionItem('⚠️ Efeitos de Adaptação', product.efeitos_possiveis)}
                            ${generateAccordionItem('🛡️ Segurança', product.seguranca)}
                            ${generateAccordionItem('🎯 Indicações', product.indicacoes)}
                            ${generateAccordionItem('🏆 Benefícios', product.beneficios)}
                            ${generateAccordionItem('📦 Embalagem', product.embalagem)}
                            ${generateAccordionItem('🚫 Contraindicações', product.contraindicacoes)}
                            ${generateAccordionItem('💡 Dicas Importantes', product.dicas_importantes)}
                        </div>
                        <div class="product-detail-footer flex flex-wrap justify-center gap-3 mt-8">
                            <a href="${product.link_loja}" target="_blank" class="store-cta-button-full flex-1 min-w-[150px] max-w-[calc(50%-0.75rem)] group flex items-center justify-center gap-2 p-3 rounded-xl text-white font-bold text-base bg-black relative overflow-hidden transition-all duration-300 ease-in-out border border-purple-500/30 hover:border-purple-500">
                                <img src="/gtfit.png" alt="Logo GTFit" class="h-6 w-auto">
                                Loja <span class="text-primary-green">✅</span>
                                <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out blur-lg shadow-purple-500/50"></div>
                            </a>

                            <a href="${whatsappUrl}" target="_blank" class="specialist-cta-button-full flex-1 min-w-[150px] max-w-[calc(50%-0.75rem)] group flex items-center justify-center gap-2 p-3 rounded-xl text-white font-bold text-base bg-black relative overflow-hidden transition-all duration-300 ease-in-out border border-emerald-500/30 hover:border-emerald-500">
                                <i class="fab fa-whatsapp text-xl"></i>
                                Especialista <span class="text-emerald-200">🧠</span>
                                <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out blur-lg shadow-emerald-500/50"></div>
                            </a>
                        </div>
                    </div>
                    <button class="back-button link-button group" data-step="showcase">
                        <span class="font-semibold text-slate-400 group-hover:text-white">↩️ Voltar para Vitrine</span>
                    </button>
                </div>
            `;

            appContainer.innerHTML = detailHTML;
            addAccordionListeners();
            addBackButtonListener();
        };

        // Etapa 2: Exibe os COMBOS ESPECÍFICOS (Econômico, Ansiedade, etc.) dentro de uma CATEGORIA (IMC)
        const renderComboSubcategories = (originatingCategoryKey) => {
            if (!window.gabiFitApp.combos) {
                console.error('combos.js não foi carregado corretamente.');
                return;
            }
            const combosInSelectedCategory = window.gabiFitApp.combos.getCombosSubcategories(originatingCategoryKey);
            const categoryInfo = window.gabiFitApp.combos.categoryDisplayInfo[originatingCategoryKey];

            const subcategoriesHTML = `
                <div class="w-full max-w-lg mx-auto view-enter">
                    <h2 class="text-2xl font-bold text-white text-center mb-5">Planos para: ${categoryInfo.line1}</h2>
                    <div class="flex gap-4 overflow-x-auto pb-4 -mb-4 scrollbar-thin">
                        ${combosInSelectedCategory.map(combo => createSpecificComboCard(combo, originatingCategoryKey)).join('')}
                    </div>
                    <button class="back-button link-button group mt-8" data-step="showcase">
                        <span class="font-semibold text-slate-400 group-hover:text-white">↩️ Voltar para Vitrine</span>
                    </button>
                </div>`;

            appContainer.innerHTML = subcategoriesHTML;

            // Adiciona listeners para os botões "Ver Combo" dos combos específicos
            _addClickListeners('.specific-combo-card', el => _transitionView(renderComboDetail, el.dataset.comboId, el.dataset.originatingCategory));
            addBackButtonListener(); // Re-adiciona listener para o botão de voltar
        };

        // Etapa 3: Exibe os detalhes finais de um combo específico
        const renderComboDetail = (comboId, originatingCategoryKey) => {
            if (!window.gabiFitApp.combos) {
                console.error('combos.js não foi carregado corretamente.');
                return;
            }
            const combo = window.gabiFitApp.combos.getComboById(comboId, originatingCategoryKey);
            if (!combo) return;

            const whatsappMessage = encodeURIComponent(`Olá! Gostaria de fazer o planejamento com o especialista para o combo: "${combo.title}" da categoria ${window.gabiFitApp.combos.categoryDisplayInfo[originatingCategoryKey].line1}.`);
            const whatsappUrl = `https://wa.me/556792552604?text=${whatsappMessage}`;

            const detailHTML = `
                <div class="w-full max-w-lg mx-auto view-enter">
                    <div class="product-card-detail">
                        <div class="product-detail-header">
                            <div class="flex justify-center items-center flex-wrap gap-x-3 gap-y-3 mb-5">
                                ${combo.products.map(p => `<img src="${p.img}" alt="${p.name}" class="w-20 h-20 object-contain rounded-full border-2 border-purple-400/50">`).join('')}
                            </div>
                            <h2 class="text-3xl font-extrabold text-white tracking-tight">${combo.title}</h2>
                            <p class="text-primary-green font-semibold mt-2 flex items-center justify-center gap-2">
                                <i class="far fa-clock"></i>
                                <span>${combo.duration} de Tratamento</span>
                            </p>
                        </div>
                        <div class="product-accordion-container">
                            <div class="product-accordion-item open">
                                <button class="product-accordion-header text-center"><span>🤔 Por que este combo é ideal para você?</span><i class="fas fa-chevron-down text-purple-400"></i></button>
                                <div class="product-accordion-content"><div class="product-accordion-body">${combo.explanation}</div></div>
                            </div>
                             <div class="product-accordion-item">
                                <button class="product-accordion-header text-center"><span>📦 Produtos Inclusos</span><i class="fas fa-chevron-down text-purple-400"></i></button>
                                <div class="product-accordion-content">
                                    <div class="product-accordion-body">
                                        <ul class="space-y-3">
                                            ${combo.products.map(p => `
                                                <li class="flex items-center gap-4 bg-slate-800/50 p-3 rounded-xl">
                                                    <img src="${p.img}" class="w-10 h-10 rounded-full border-2 border-purple-400/40 flex-shrink-0" alt="${p.name}">
                                                    <span class="font-semibold text-slate-200">${p.name}</span>
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="product-detail-footer flex flex-wrap justify-center gap-3 mt-8">
                            <a href="${whatsappUrl}" target="_blank" class="specialist-cta-button-full flex-1 min-w-[150px] max-w-[calc(50%-0.75rem)] group flex items-center justify-center gap-2 p-3 rounded-xl text-white font-bold text-base bg-black relative overflow-hidden transition-all duration-300 ease-in-out border border-emerald-500/30 hover:border-emerald-500">
                                <i class="fab fa-whatsapp text-xl"></i>
                                Especialista <span class="text-emerald-200">🧠</span>
                                <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out blur-lg shadow-emerald-500/50"></div>
                            </a>

                            <a href="${mainStoreLink}" target="_blank" class="store-cta-button-full flex-1 min-w-[150px] max-w-[calc(50%-0.75rem)] group flex items-center justify-center gap-2 p-3 rounded-xl text-white font-bold text-base bg-black relative overflow-hidden transition-all duration-300 ease-in-out border border-purple-500/30 hover:border-purple-500">
                                <img src="/gtfit.png" alt="Logo GTFit" class="h-6 w-auto">
                                Loja <span class="text-primary-green">✅</span>
                                <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out blur-lg shadow-purple-500/50"></div>
                            </a>
                        </div>
                    </div>
                    <button class="back-button link-button group" data-step="subcategories" data-category="${originatingCategoryKey}">
                        <span class="font-semibold text-slate-400 group-hover:text-white">↩️ Voltar</span>
                    </button>
                </div>`;

            appContainer.innerHTML = detailHTML;
            addAccordionListeners();
            addBackButtonListener();
        };

        // --- FUNÇÃO DE INICIALIZAÇÃO PÚBLICA ---
        const initialize = (containerElement) => {
            appContainer = containerElement;
            preloadProductImages();
            renderMainShowcase();
        };

        return { initialize, renderMainShowcase };

    })();
})();
