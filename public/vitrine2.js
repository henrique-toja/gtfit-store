// vitrine.js
(function() {
    // Garante que o namespace principal da aplicação exista
    window.gabiFitApp = window.gabiFitApp || {};

    // Define o objeto Vitrine dentro do namespace gabiFitApp
    window.gabiFitApp.Vitrine = (function() {
        let appContainer; // Referência ao container principal da aplicação
        const domain = 'https://www.gtfit.store'; // Base domain para imagens

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

        // --- FUNÇÕES DE RENDERIZAÇÃO DA VITRINE DE PRODUTOS ---

        // Generates a card for the main showcase rows
        // ALTERAÇÃO AQUI: Removido o botão "Ver na Loja" e "Detalhes" do card principal
        const createProductCard = (product) => `
            <div class="product-card flex-shrink-0 w-40 cursor-pointer group" data-product-id="${product.id}">
                <div class="relative overflow-hidden rounded-xl bg-slate-800/50 p-4 transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                    <img src="${domain}${product.imagem}" alt="${product.nome}" class="h-24 w-full object-contain mb-3">
                    <h3 class="h-12 text-sm font-semibold text-center text-slate-200 flex items-center justify-center">${product.nome}</h3>
                </div>
            </div>
        `;

        // Generates a full horizontally scrolling row
        const createProductRow = (categoryInfo) => {
            // Certifique-se que gabiFitApp.products está disponível
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

        // Generates the special "Combos" button section
        const createCombosSection = () => `
            <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-5">🔥 Combos 🔥</h2>
                <button id="show-combos-flow" class="w-full p-6 rounded-2xl text-white font-bold text-xl bg-gradient-to-r from-purple-600 to-green-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 ease-in-out">
                    Encontre o Combo Ideal para Você!
                </button>
            </section>
        `;

        // Generates the detailed product view
        // Confirmação: Botão "Ver na Loja Oficial" permanece aqui
        const renderProductDetailView = (productId) => {
            if (!window.gabiFitApp.products) {
                console.error('products.js não foi carregado corretamente.');
                return;
            }
            const product = window.gabiFitApp.products.getProductById(productId);
            if (!product) return;

            // Helper to generate accordion items for the detail view
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
                        <div class="product-detail-footer">
                            <a href="${product.link_loja}" target="_blank" class="store-cta-button">Ver na Loja Oficial ✅</a>
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

        // Renders the main showcase with all product rows
        // ALTERAÇÃO AQUI: O card inteiro agora leva para a tela de detalhes
        const renderMainShowcase = () => {
            if (!window.gabiFitApp.products) {
                console.error('products.js não foi carregado corretamente.');
                return;
            }
            const categories = window.gabiFitApp.products.categoriesInfo;
            const showcaseHTML = `
                <div class="animate-fade-in">
                    ${createProductRow({ key: 'emagrecedores', title: categories.emagrecedores.title })}
                    ${createCombosSection()}
                    ${createProductRow({ key: 'essenciais', title: categories.essenciais.title })}
                    ${createProductRow({ key: 'uteis', title: categories.uteis.title })}
                </div>
            `;
            appContainer.innerHTML = showcaseHTML;

            // Add event listeners for product cards (to view details)
            appContainer.querySelectorAll('.product-card').forEach(card => {
                card.addEventListener('click', () => renderProductDetailView(card.dataset.productId));
            });

            // Add event listener for the "Combos" button
            document.getElementById('show-combos-flow').addEventListener('click', renderComboCategories);
        };

        // --- FUNÇÕES DE RENDERIZAÇÃO DE COMBOS ---

        // Etapa 3: Exibe os detalhes finais de um combo específico
        const renderComboDetail = (comboId, originatingCategoryKey) => {
            if (!window.gabiFitApp.combos) {
                console.error('combos.js não foi carregado corretamente.');
                return;
            }
            const combo = window.gabiFitApp.combos.getComboById(comboId, originatingCategoryKey);
            if (!combo) return;

            const message = encodeURIComponent(`Olá! Gostaria de fazer o planejamento com o especialista para o combo: "${combo.title}".`);
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

        // Etapa 2: Exibe as subcategorias de um combo (Econômico, Ansiedade, etc.)
        const renderComboSubcategories = (categoryKey) => {
            if (!window.gabiFitApp.combos) {
                console.error('combos.js não foi carregado corretamente.');
                return;
            }
            const subcategories = window.gabiFitApp.combos.getCombosSubcategories(categoryKey);
            const subcategoryButtons = [
                { type: 'eco', text: '😅 Combo Econômico 😅' },
                { type: 'anxiety', text: '🥵 Combo Ansiedade 🥵' },
                { type: 'potencia', text: '💪 Combo Potência 💪' },
                { type: 'premium', text: '🤑 Combo Premium 🤑' }
            ];

            const subcategoriesHTML = `
                <div class="w-full max-w-md mx-auto flex flex-col items-center gap-5 animate-fade-in">
                    <h2 class="text-2xl font-bold text-white text-center mb-3">Escolha o tipo de plano:</h2>
                    ${subcategoryButtons.map(btn => {
                        const combo = subcategories.find(c => c.type === btn.type);
                        return combo ? `<button class="link-button group w-full p-4 h-16 flex justify-center items-center combo-subcategory-btn" data-combo-id="${combo.id}" data-category="${categoryKey}"><span class="font-semibold text-slate-200 group-hover:text-white">${btn.text}</span></button>` : '';
                    }).join('')}
                    <button class="back-button link-button group mt-3" data-step="categories">
                        <span class="font-semibold text-slate-400 group-hover:text-white">↩️ Voltar</span>
                    </button>
                </div>`;

            appContainer.innerHTML = subcategoriesHTML;

            appContainer.querySelectorAll('.combo-subcategory-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const comboId = e.currentTarget.dataset.comboId;
                    const category = e.currentTarget.dataset.category;
                    renderComboDetail(comboId, category);
                });
            });
            addBackButtonListener();
        };

        // Etapa 1: Exibe as categorias principais de combos (níveis de obesidade)
        const renderComboCategories = () => {
            if (!window.gabiFitApp.combos) {
                console.error('combos.js não foi carregado corretamente.');
                return;
            }
            const categoryDisplayInfo = window.gabiFitApp.combos.categoryDisplayInfo;
            const categoriesHTML = `
                <div class="w-full max-w-md mx-auto flex flex-col items-center gap-5 animate-fade-in">
                    <h2 class="text-2xl font-bold text-white text-center mb-3">Primeiro, selecione seu perfil atual:</h2>
                    ${Object.entries(categoryDisplayInfo).map(([key, info]) => `
                        <button data-category-key="${key}" class="combo-category-btn link-button group w-full p-4 h-auto">
                            <div class="text-center">
                                <p class="font-semibold text-slate-100 group-hover:text-white text-lg">${info.line1}</p>
                                <p class="text-sm font-medium text-primary-green group-hover:text-emerald-300">${info.line2}</p>
                            </div>
                        </button>
                    `).join('')}
                    <button class="back-button link-button group mt-3" data-step="showcase">
                        <span class="font-semibold text-slate-400 group-hover:text-white">↩️ Voltar para Vitrine</span>
                    </button>
                </div>
            `;
            appContainer.innerHTML = categoriesHTML;

            appContainer.querySelectorAll('.combo-category-btn').forEach(button => {
                button.addEventListener('click', (e) => renderComboSubcategories(e.currentTarget.dataset.categoryKey));
            });
            addBackButtonListener();
        };

        // --- FUNÇÃO DE INICIALIZAÇÃO PÚBLICA PARA A VITRINE ---
        // Esta função será chamada pelo main.js para iniciar a aplicação.
        const initialize = (containerElement) => {
            appContainer = containerElement;
            renderMainShowcase(); // Inicia mostrando a vitrine principal
        };

        // Expor funções públicas da Vitrine
        return {
            initialize: initialize,
            renderMainShowcase: renderMainShowcase // Se você quiser recarregar a vitrine de fora
        };

    })(); // Fim do IIFE para window.gabiFitApp.Vitrine

})();
