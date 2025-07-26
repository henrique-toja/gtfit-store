// vitrine.js - REVOLUÇÃO INTERATIVA by Gemini (v1.5 - Emojis e Ordem IMC Restaurados)
(function() {
    window.gabiFitApp = window.gabiFitApp || {};

    window.gabiFitApp.Vitrine = (function() {
        let appContainer;
        const domain = 'https://www.gtfit.store';
        const mainStoreLink = 'https://www.gabrielatorraca.com.br';

        // Mapeamento de categorias de combo para IMAGENS (AGORA Opcional, USAMOS EMOJIS)
        const categoryImages = {
            'obesidade-grau-iii': `${domain}/assets/images/grau3.jpg`,
            'obesidade-grau-ii': `${domain}/assets/images/grau2.jpg`,
            'obesidade-grau-i': `${domain}/assets/images/grau1.jpg`,
            'peso-saudavel-sobrepeso': `${domain}/assets/images/grau0.jpg` // Imagem para peso saudável/sobrepeso
        };

        // NOVO: Mapeamento de tipos de combo para emojis
        const comboEmojis = {
            'eco': '💸', // Econômico
            'anxiety': '🧘‍♀️', // Ansiedade
            'potencia': '💪🏼', // Potência - ATUALIZADO
            'premium': '💎' // Premium - ATUALIZADO
        };

        // NOVO: Mapeamento de categorias de IMC para emojis e info de display
        // ISSO VAI SUBSTITUIR combos.categoryDisplayInfo PARA A VITRINE PRINCIPAL
        const imcCategoryDisplay = {
            'obesidade-grau-iii': {
                emoji: '🚨', // Emoji para Grau III
                line1: 'Obesidade Grau III',
                line2: 'IMC ≥ 40 kg/m²'
            },
            'obesidade-grau-ii': {
                emoji: '⚠️', // Emoji para Grau II
                line1: 'Obesidade Grau II',
                line2: '35 a 39,9 kg/m²'
            },
            'obesidade-grau-i': {
                emoji: '❗️', // Emoji para Grau I
                line1: 'Obesidade Grau I',
                line2: '30 a 34,9 kg/m²'
            },
            'peso-saudavel-sobrepeso': {
                emoji: '⚖️', // Emoji para Peso Saudável/Sobrepeso
                line1: 'Peso Saudável / Sobrepeso',
                line2: '18,5 a 29,9 kg/m²'
            }
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

        // Gera um cartão para as linhas da vitrine principal (Produtos Individuais)
        const createProductCard = (product) => `
            <div class="product-card flex-shrink-0 w-96 group">
                <div class="relative overflow-hidden rounded-xl bg-slate-800/50 p-4 transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20 aspect-square flex flex-col justify-between">
                    <img src="${domain}${product.imagem}" alt="${product.nome}" class="h-3/5 w-full object-contain mx-auto mb-3">
                    <h3 class="min-h-12 text-base font-semibold text-center text-slate-200 flex items-center justify-center px-1" title="${product.nome}">${product.nome}</h3>
                    <button class="details-button w-full bg-purple-600 text-white text-sm font-bold py-2 rounded-b-lg mt-3 hover:bg-purple-700 transition-colors duration-300" data-product-id="${product.id}">
                        Detalhes
                    </button>
                </div>
            </div>
        `;

        // Gera uma linha de produtos com rolagem horizontal
        const createProductRow = (title, cards) => `
            <section class="mb-12">
                <h2 class="text-2xl font-bold text-white mb-6 text-center">${title}</h2>
                <div class="flex gap-4 overflow-x-auto pb-4 -mb-4 scrollbar-thin px-2">
                    ${cards}
                </div>
            </section>
        `;

        // Gera um cartão para a categoria de Combo (IMC) - ATUALIZADO PARA USAR EMOJIS POR PADRÃO
        const createComboCategoryCard = (categoryKey, categoryInfo) => {
            const imageUrl = categoryImages[categoryKey]; // Pega a imagem se existir
            const displayContent = imageUrl 
                ? `<img src="${imageUrl}" alt="${categoryInfo.line1}" class="h-32 w-32 object-contain mx-auto rounded-full shadow-lg shadow-purple-500/20">`
                : `<span class="text-5xl text-white text-center" role="img" aria-label="Emoji">${categoryInfo.emoji}</span>`; // Usa emoji se não houver imagem
            
            return `
                <div class="combo-category-card flex-shrink-0 w-96 group">
                    <div class="relative overflow-hidden rounded-xl bg-slate-800/50 p-4 transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20 aspect-square flex flex-col justify-between">
                        <div class="h-3/5 w-full flex items-center justify-center mb-1">
                            ${displayContent}
                        </div>
                        <h3 class="min-h-12 text-sm font-semibold text-center text-slate-200 flex flex-col items-center justify-center leading-tight px-1">
                            <span class="text-base font-bold text-white">${categoryInfo.line1}</span>
                            <span class="text-xs font-normal text-primary-green leading-tight">${categoryInfo.line2}</span>
                        </h3>
                        <button class="view-plans-button w-full bg-purple-600 text-white text-sm font-bold py-2 rounded-b-lg mt-3 hover:bg-purple-700 transition-colors duration-300" data-category-key="${categoryKey}">
                            Ver Planos Ideais
                        </button>
                    </div>
                </div>
            `;
        };

        // Gera um cartão para um combo específico (Econômico, Ansiedade, etc.)
        const createSpecificComboCard = (combo, originatingCategoryKey) => {
            const emoji = comboEmojis[combo.type] || '📦';
            const mainTitle = `Plano ${combo.tag.replace('PLANO ', '')}`;
            const subTitle = `Projeto Slim - ${combo.duration}`;

            return `
                <div class="specific-combo-card flex-shrink-0 w-80 group">
                    <div class="relative overflow-hidden rounded-xl bg-slate-800/50 p-4 transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20 aspect-square flex flex-col justify-between">
                        <div class="h-3/5 w-full flex items-center justify-center mb-3">
                            <span class="text-6xl text-white text-center" role="img" aria-label="Emoji">${emoji}</span>
                        </div>
                        <h3 class="min-h-12 text-sm font-semibold text-center text-slate-200 flex flex-col items-center justify-center leading-tight px-1">
                            <span class="text-base font-bold text-white">${mainTitle}</span>
                            <span class="text-xs font-normal text-primary-green leading-tight">${subTitle}</span>
                        </h3>
                        <button class="view-combo-button w-full bg-purple-600 text-white text-xs font-bold py-2 rounded-b-lg mt-3 hover:bg-purple-700 transition-colors duration-300" data-combo-id="${combo.id}" data-originating-category="${originatingCategoryKey}">
                            Ver Detalhes
                        </button>
                    </div>
                </div>
            `;
        };

        const renderMainShowcase = () => {
            const { products, combos } = window.gabiFitApp;
            const productCategories = products.categoriesInfo;

            // ORDEM DOS COMBOS POR IMC: Grau III, Grau II, Grau I, Peso Saudável/Sobrepeso
            const orderedImcCategories = [
                'obesidade-grau-iii',
                'obesidade-grau-ii',
                'obesidade-grau-i',
                'peso-saudavel-sobrepeso'
            ];
            
            // Mapeia e gera os cards dos combos IMC na ordem desejada
            const comboCategoryCards = orderedImcCategories.map(key => {
                const info = imcCategoryDisplay[key]; // Usar o novo imcCategoryDisplay
                return info ? createComboCategoryCard(key, info) : '';
            }).join('');


            const emagrecedoresCards = products.getProductsByCategory('emagrecedores').map(createProductCard).join('');
            const essenciaisCards = products.getProductsByCategory('essenciais').map(createProductCard).join('');
            const uteisCards = products.getProductsByCategory('uteis').map(createProductCard).join('');

            const showcaseHTML = `
                <div class="view-enter">
                    ${createProductRow("🔥 Projeto Slim ideal para seu IMC 🔥", comboCategoryCards)}
                    ${createProductRow(productCategories.emagrecedores.title, emagrecedoresCards)}
                    ${createProductRow(productCategories.essenciais.title, essenciaisCards)}
                    ${createProductRow(productCategories.uteis.title, uteisCards)}
                </div>
            `;
            appContainer.innerHTML = showcaseHTML;

            // Add listeners for product cards
            _addClickListeners('.product-card .details-button', el => _transitionView(renderProductDetailView, el.dataset.productId));
            _addClickListeners('.product-card:not(.details-button)', el => _transitionView(renderProductDetailView, el.querySelector('.details-button').dataset.productId));

            // Add listeners for combo category cards
            _addClickListeners('.combo-category-card .view-plans-button', el => _transitionView(renderComboSubcategories, el.dataset.categoryKey));
            _addClickListeners('.combo-category-card:not(.view-plans-button)', el => _transitionView(renderComboSubcategories, el.querySelector('.view-plans-button').dataset.categoryKey));
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
            const categoryInfo = imcCategoryDisplay[originatingCategoryKey]; // USANDO o novo imcCategoryDisplay aqui também

            const subcategoriesHTML = `
                <div class="w-full max-w-lg mx-auto view-enter">
                    <h2 class="text-2xl font-bold text-white text-center mb-5">Planos para: ${categoryInfo.line1}</h2>
                    <div class="flex flex-col gap-4 items-center pb-4 -mb-4 px-2">
                        ${combosInSelectedCategory.map(combo => createSpecificComboCard(combo, originatingCategoryKey)).join('')}
                    </div>
                    <button class="back-button link-button group mt-8" data-step="showcase">
                        <span class="font-semibold text-slate-400 group-hover:text-white">↩️ Voltar para Vitrine</span>
                    </button>
                </div>`;

            appContainer.innerHTML = subcategoriesHTML;

            // Adiciona listeners para os botões "Ver Combo" dos combos específicos
            _addClickListeners('.specific-combo-card .view-combo-button', el => _transitionView(renderComboDetail, el.dataset.comboId, el.dataset.originatingCategory));
            _addClickListeners('.specific-combo-card:not(.view-combo-button)', el => _transitionView(renderComboDetail, el.querySelector('.view-combo-button').dataset.comboId, el.querySelector('.view-combo-button').dataset.originatingCategory));
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

            const whatsappMessage = encodeURIComponent(`Olá! Gostaria de fazer o planejamento com o especialista para o combo: "${combo.title}" da categoria ${imcCategoryDisplay[originatingCategoryKey].line1}.`); // Usando imcCategoryDisplay
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
