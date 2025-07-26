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
                    const comboType = e.currentTarget.dataset.comboType; // Novo para voltar de detalhes de combo
                    const originatingCategory = e.currentTarget.dataset.originatingCategory; // Novo para voltar de subcategorias de combo

                    if (step === 'showcase') {
                        renderMainShowcase();
                    } else if (step === 'categories') {
                        // Esta rota não é mais usada diretamente, mas mantida para segurança
                        renderComboCategories();
                    } else if (step === 'subcategories') {
                        renderComboSubcategories(category); // category aqui seria o IMC
                    }
                });
            }
        };

        // --- FUNÇÕES DE RENDERIZAÇÃO DA VITRINE DE PRODUTOS ---

        // Gera um cartão para as linhas da vitrine principal (Produtos Individuais)
        const createProductCard = (product) => `
            <div class="product-card flex-shrink-0 w-40 group">
                <div class="relative overflow-hidden rounded-xl bg-slate-800/50 p-4 transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                    <img src="${domain}${product.imagem}" alt="${product.nome}" class="h-24 w-full object-contain mb-3">
                    <h3 class="min-h-12 text-sm font-semibold text-center text-slate-200 flex items-center justify-center overflow-hidden text-ellipsis line-clamp-2">${product.nome}</h3>
                    <button class="details-button w-full bg-purple-600 text-white text-xs font-bold py-2 rounded-b-lg mt-3 hover:bg-purple-700 transition-colors duration-300" data-product-id="${product.id}">
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
        const createComboCategoryCard = (categoryKey, categoryInfo) => `
            <div class="combo-category-card flex-shrink-0 w-40 group" data-category-
