// vitrine.js
(function() {
    // Garante que o namespace principal da aplicação exista
    window.gabiFitApp = window.gabiFitApp || {};

    // Define o objeto Vitrine dentro do namespace gabiFitApp
    window.gabiFitApp.Vitrine = (function() {
        let appContainer; // Referência ao container principal da aplicação
        const domain = 'https://www.gtfit.store'; // Base domain para imagens

        // Mapeamento de categorias de combo para as novas imagens
        const categoryImages = {
            'obesidade-grau-iii': `${domain}/assets/images/grau3.jpg`,
            'obesidade-grau-ii': `${domain}/assets/images/grau2.jpg`,
            'obesidade-grau-i': `${domain}/assets/images/grau1.jpg`,
            'peso-saudavel-sobrepeso': `${domain}/assets/images/grau.jpg` // Mantenha o seu .jpg atual se for a imagem que representa o sobrepeso/peso saudável com gordura
        };

        // NOVO: Mapeamento de tipos de combo para emojis - MANTIDO, MAS NÃO USADO PARA IMAGEM PRINCIPAL DO CARD DO COMBO
        const comboEmojis = {
            'eco': '😅', // Econômico
            'anxiety': '🧘‍♀️', // Ansiedade
            'potencia': '💪🏼', // Potência - ATUALIZADO
            'premium': '🤑' // Premium - ATUALIZADO
        };

        // --- FUNÇÕES AUXILIARES GLOBAIS (AGORA LOCAIS À Vitrine) ---

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
                    const comboType = e.currentTarget.dataset.comboType;
                    const originatingCategory = e.currentTarget.dataset.originatingCategory;

                    if (step === 'showcase') {
                        renderMainShowcase();
                    } else if (step === 'categories') {
                        renderComboCategories();
                    } else if (step === 'subcategories') {
                        renderComboSubcategories(category);
                    }
                });
            }
        };

        // --- FUNÇÃO PARA PRELOAD DE IMAGENS ---
        const preloadProductImages = () => {
            if (window.gabiFitApp.products && window.gabiFitApp.products.allProducts) {
                window.gabiFitApp.products.allProducts.forEach(product => {
                    const img = new Image();
                    img.src = `${domain}${product.imagem}`;
                });
                console.log('Preload de imagens de produtos iniciado.');
            } else {
                console.warn('Não foi possível iniciar o preload de imagens: products.js ou allProducts não carregado.');
            }
            // Pré-carregamento das imagens de categoria de combo
            Object.values(categoryImages).forEach(imgPath => {
                const img = new Image();
                img.src = imgPath;
            });
            console.log('Preload de imagens de categorias de combo iniciado.');
        };


        // --- FUNÇÕES DE RENDERIZAÇÃO DA VITRINE DE PRODUTOS ---

        // Gera um cartão para as linhas da vitrine principal (Produtos Individuais)
        const createProductCard = (product) => `
            <div class="product-card flex-shrink-0 w-80 group">
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
        const createProductRow = (categoryInfo) => {
            if (!window.gabiFitApp.products) {
                console.error('products.js não foi carregado corretamente.');
                return '';
            }
            const categoryProducts = window.gabiFitApp.products.getProductsByCategory(categoryInfo.key);
            return `
                <section class="mb-10">
                    <h2 class="text-2xl font-bold text-white mb-5">${categoryInfo.title}</h2>
                    <div class="flex gap-4 overflow-x-auto pb-4 -mb-4 scrollbar-thin">
                        ${categoryProducts.map(createProductCard).join('')}
                    </div>
                </section>
            `;
        };

        // --- FUNÇÃO DE RENDERIZAÇÃO DA TELA DE DETALHES DO PRODUTO (INDIVIDUAL) ---
        const renderProductDetailView = (productId) => {
            if (!window.gabiFitApp.products) {
                console.error('products.js não foi carregado corretamente.');
                return;
            }
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
                        <button class="product-accordion-header">
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
                <div class="w-full max-w-lg mx-auto animate-fade-in">
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
                            ${generateAccordionItem('💡 Dicas Importantes', product.dicas_imporproductstantes)}
                        </div>
                        <div class="product-detail-footer flex flex-wrap justify-center gap-3 mt-8">
                            <a href="${product.link_loja}" target="_blank" class="store-cta-button-full flex-1 min-w-[150px] max-w-[calc(50%-0.75rem)] group flex items-center justify-center gap-2 p-3 rounded-xl text-white font-bold text-base bg-black relative overflow-hidden transition-all duration-300 ease-in-out border border-purple-500/30 hover:border-purple-500">
                                <img src="/gtfit.png" alt="Logo GTFit" class="h-6 w-auto">
                                Loja <span class="text-primary-green">✅</span>
                                <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out blur-lg"></div>
                            </a>

                            <a href="${whatsappUrl}" target="_blank" class="specialist-cta-button flex-1 min-w-[150px] max-w-[calc(50%-0.75rem)] group flex items-center justify-center gap-2 p-3 rounded-xl text-white font-bold text-base bg-slate-900 hover:bg-slate-800 transition-colors duration-300 ease-in-out shadow-lg shadow-purple-500/30">
                                <i class="fab fa-whatsapp text-xl"></i>
                                Especialista <span class="text-emerald-200">🧠</span>
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

        // --- NOVAS FUNÇÕES DE RENDERIZAÇÃO DE COMBOS ---

        // Gera um cartão para a categoria de Combo (IMC)
        const createComboCategoryCard = (categoryKey, categoryInfo) => {
            const imageUrl = categoryImages[categoryKey] || ''; // Obtém a URL da imagem
            return `
                <div class="combo-category-card flex-shrink-0 w-80 group">
                    <div class="relative overflow-hidden rounded-xl bg-slate-800/50 p-4 transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20 aspect-square flex flex-col justify-between">
                        <div class="h-3/5 w-full flex items-center justify-center mb-1">
                            ${imageUrl ? `<img src="${imageUrl}" alt="${categoryInfo.line1}" class="h-full w-full object-contain mx-auto rounded-md border border-purple-500/30">` : `<span class="text-4xl" role="img" aria-label="Emoji">${categoryInfo.emoji}</span>`}
                        </div>
                        <h3 class="min-h-12 text-sm font-semibold text-center text-slate-200 flex flex-col items-center justify-center leading-tight px-1">
                            <span class="text-base font-bold text-white">${categoryInfo.line1}</span>
                            <span class="text-xs font-normal text-primary-green leading-tight">${categoryInfo.line2}</span>
                        </h3>
                        <button class="view-plans-button w-full bg-purple-600 text-white text-sm font-bold py-2 rounded-b-lg mt-3 hover:bg-purple-700 transition-colors duration-300" data-category-key="${categoryKey}">
                            Ver Planos
                        </button>
                    </div>
                </div>
            `;
        };

        // Gera uma linha de categorias de combos com rolagem horizontal
        const createComboCategoryRow = () => {
            if (!window.gabiFitApp.combos) {
                console.error('combos.js não foi carregado corretamente.');
                return '';
            }
            const categories = window.gabiFitApp.combos.categoryDisplayInfo;
            const categoryKeys = Object.keys(categories); // Pega as chaves para iterar

            return `
                <section class="mb-10">
                    <h2 class="text-2xl font-bold text-white mb-5">🔥 Encontre seu Combo Ideal 🔥</h2>
                    <div class="flex gap-4 overflow-x-auto pb-4 -mb-4 scrollbar-thin">
                        ${categoryKeys.map(key => createComboCategoryCard(key, categories[key])).join('')}
                    </div>
                </section>
            `;
        };

        // Gera um cartão para um combo específico (Econômico, Ansiedade, etc.)
        const createSpecificComboCard = (combo, originatingCategoryKey) => {
            // Usa a imagem da categoria pai (IMC) para o card do combo
            const imageUrl = categoryImages[originatingCategoryKey] || '';
            const mainTitle = `Plano ${combo.tag.replace('PLANO ', '')}`;
            const subTitle = `Projeto Slim - ${combo.duration}`;

            return `
                <div class="specific-combo-card flex-shrink-0 w-72 group">
                    <div class="relative overflow-hidden rounded-xl bg-slate-800/50 p-4 transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20 aspect-square flex flex-col justify-between">
                        <div class="h-3/5 w-full flex items-center justify-center mb-3">
                            ${imageUrl ? `<img src="${imageUrl}" alt="${mainTitle}" class="w-full h-full object-contain mx-auto rounded-full border-4 border-purple-400/50 shadow-lg shadow-purple-500/20">` : `<span class="text-6xl text-white text-center">${comboEmojis[combo.type] || '📦'}</span>`}
                        </div>
                        <h3 class="min-h-12 text-sm font-semibold text-center text-slate-200 flex flex-col items-center justify-center leading-tight px-1">
                            <span class="text-base font-bold text-white">${mainTitle}</span>
                            <span class="text-xs font-normal text-primary-green leading-tight">${subTitle}</span>
                        </h3>
                        <button class="view-combo-button w-full bg-purple-600 text-white text-xs font-bold py-2 rounded-b-lg mt-3 hover:bg-purple-700 transition-colors duration-300" data-combo-id="${combo.id}" data-originating-category="${originatingCategoryKey}">
                            Ver Combo
                        </button>
                    </div>
                </div>
            `;
        };

        // Renderiza a vitrine principal com todas as linhas de produtos E a linha de combos
        const renderMainShowcase = () => {
            if (!window.gabiFitApp.products || !window.gabiFitApp.combos) {
                console.error('products.js ou combos.js não foi carregado corretamente.');
                return;
            }
            const productCategories = window.gabiFitApp.products.categoriesInfo;
            const showcaseHTML = `
                <div class="animate-fade-in">
                    ${createProductRow({ key: 'emagrecedores', title: productCategories.emagrecedores.title })}
                    ${createComboCategoryRow()}
                    ${createProductRow({ key: 'essenciais', title: productCategories.essenciais.title })}
                    ${createProductRow({ key: 'uteis', title: productCategories.uteis.title })}
                </div>
            `;
            appContainer.innerHTML = showcaseHTML;

            // Adiciona listeners para os botões "Detalhes" dos produtos
            appContainer.querySelectorAll('.product-card .details-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation(); // Previne o clique do card pai
                    renderProductDetailView(e.currentTarget.dataset.productId);
                });
            });

            // Adiciona listener para o clique no corpo do card do produto
            appContainer.querySelectorAll('.product-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.details-button')) { // Se não clicou no botão "Detalhes"
                        renderProductDetailView(card.dataset.productId);
                    }
                });
            });

            // Adiciona listeners para os botões "Ver Planos" das categorias de Combo (IMC)
            appContainer.querySelectorAll('.combo-category-card .view-plans-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation(); // Previne o clique do card pai
                    renderComboSubcategories(e.currentTarget.dataset.categoryKey);
                });
            });

            // Adiciona listener para o clique no corpo do card da categoria de Combo
            appContainer.querySelectorAll('.combo-category-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.view-plans-button')) { // Se não clicou no botão "Ver Planos"
                        renderComboSubcategories(card.dataset.categoryKey);
                    }
                });
            });
        };

        // --- FUNÇÕES DE RENDERIZAÇÃO DE COMBOS (AJUSTADAS) ---

        // Etapa 2: Exibe os COMBOS ESPECÍFICOS (Econômico, Ansiedade, etc.) dentro de uma CATEGORIA (IMC)
        const renderComboSubcategories = (originatingCategoryKey) => {
            if (!window.gabiFitApp.combos) {
                console.error('combos.js não foi carregado corretamente.');
                return;
            }
            const combosInSelectedCategory = window.gabiFitApp.combos.getCombosSubcategories(originatingCategoryKey);
            const categoryInfo = window.gabiFitApp.combos.categoryDisplayInfo[originatingCategoryKey];

            const subcategoriesHTML = `
                <div class="w-full max-w-lg mx-auto animate-fade-in">
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
            appContainer.querySelectorAll('.specific-combo-card .view-combo-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation(); // Previne o clique do card pai
                    const comboId = e.currentTarget.dataset.comboId;
                    const category = e.currentTarget.dataset.originatingCategory;
                    renderComboDetail(comboId, category);
                });
            });

             // Adiciona listener para o clique no corpo do card do combo específico
            appContainer.querySelectorAll('.specific-combo-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.view-combo-button')) { // Se não clicou no botão "Ver Combo"
                        const comboId = card.dataset.comboId;
                        const category = card.dataset.originatingCategory;
                        renderComboDetail(comboId, category);
                    }
                });
            });

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

            const message = encodeURIComponent(`Olá! Gostaria de fazer o planejamento com o especialista para o combo: "${combo.title}" da categoria ${window.gabiFitApp.combos.categoryDisplayInfo[originatingCategoryKey].line1}.`);
            const whatsappUrl = `https://wa.me/556792552604?text=${message}`;

            const detailHTML = `
                <div class="w-full max-w-lg mx-auto animate-fade-in">
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
                                <button class="product-accordion-header"><span>🤔 Por que este combo é ideal para você?</span><i class="fas fa-chevron-down text-purple-400"></i></button>
                                <div class="product-accordion-content"><div class="product-accordion-body">${combo.explanation}</div></div>
                            </div>
                             <div class="product-accordion-item">
                                <button class="product-accordion-header"><span>📦 Produtos Inclusos</span><i class="fas fa-chevron-down text-purple-400"></i></button>
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
                        <div class="product-detail-footer">
                            <a href="${whatsappUrl}" target="_blank" class="whatsapp-cta-button">🧠 Fazer planejamento com Especialista 🧠</a>
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

        // Renderiza as categorias principais de combos (IMC)
        const renderComboCategories = () => {
            console.warn('renderComboCategories foi chamada, mas agora as categorias de combo são renderizadas diretamente na vitrine principal.');
            renderMainShowcase();
        };

        // --- FUNÇÃO DE INICIALIZAÇÃO PÚBLICA PARA A VITRINE ---
        const initialize = (containerElement) => {
            appContainer = containerElement;
            preloadProductImages();
            renderMainShowcase();
        };

        // Expor funções públicas da Vitrine
        return {
            initialize: initialize,
            renderMainShowcase: renderMainShowcase
        };

    })();
})();
