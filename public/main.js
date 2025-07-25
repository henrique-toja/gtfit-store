// main.js
(function() {
    // Aguarda os dados globais serem carregados
    const { produtos, domain } = window.gabiFitData;

    // --- CATEGORY DEFINITIONS AND ORDER ---
    const productCategories = {
        emagrecedores: { title: '💊 Emagrecedores 💊', ids: [1, 2, 3, 4, 5, 7, 6] },
        essenciais: { title: '💪🏼 Suplementos Essenciais 💪🏼', ids: [8, 9, 10, 11, 12] },
        uteis: { title: '⚡ Suplementos Úteis ⚡', ids: [13, 14, 15, 16, 17] },
    };

    let appContainer; // Referência ao container principal

    // --- HTML TEMPLATE GENERATORS ---

    const createProductCard = (product) => `
        <div class="product-card flex-shrink-0 w-40 cursor-pointer group" data-product-id="${product.id}">
            <div class="relative overflow-hidden rounded-xl bg-slate-800/50 p-4 transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                <img src="${domain}${product.imagem}" alt="${product.nome}" class="h-24 w-full object-contain mb-3">
                <h3 class="h-12 text-sm font-semibold text-center text-slate-200 flex items-center justify-center">${product.nome}</h3>
            </div>
        </div>
    `;

    const createProductRow = (category) => {
        const productMap = new Map(produtos.map(p => [p.id, p]));
        const categoryProducts = category.ids.map(id => productMap.get(id)).filter(Boolean);
        return `
            <section class="mb-10">
                <h2 class="text-2xl font-bold text-white mb-5">${category.title}</h2>
                <div class="flex gap-4 overflow-x-auto pb-4 -mb-4 scrollbar-thin">
                    ${categoryProducts.map(createProductCard).join('')}
                </div>
            </section>
        `;
    };

    const createCombosSection = () => `
        <section class="mb-10">
            <h2 class="text-2xl font-bold text-white mb-5">🔥 Combos 🔥</h2>
            <button id="show-combos-flow" class="w-full p-6 rounded-2xl text-white font-bold text-xl bg-gradient-to-r from-purple-600 to-green-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 ease-in-out">
                Encontre o Combo Ideal para Você!
            </button>
        </section>
    `;

    const renderProductDetailView = (productId) => {
        const product = produtos.find(p => p.id === parseInt(productId));
        if (!product) return;

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
                        ${generateAccordionItem('💡 Dicas Importantes', product.dicas_importantes)}
                    </div>
                    <div class="product-detail-footer">
                        <a href="${product.link_loja}" target="_blank" class="store-cta-button">Ver na Loja Oficial ✅</a>
                    </div>
                </div>
                <button id="back-to-showcase" class="link-button group flex items-center justify-center gap-4 w-full max-w-sm p-3 mt-8 mx-auto">
                    <span class="font-semibold text-center text-slate-400 group-hover:text-white">↩️ Voltar para Vitrine</span>
                </button>
            </div>
        `;

        appContainer.innerHTML = detailHTML;

        // Accordions
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

        document.getElementById('back-to-showcase').addEventListener('click', renderMainShowcase);
    };

    const renderMainShowcase = () => {
        const showcaseHTML = `
            <div class="animate-fade-in">
                ${createProductRow(productCategories.emagrecedores)}
                ${createCombosSection()}
                ${createProductRow(productCategories.essenciais)}
                ${createProductRow(productCategories.uteis)}
            </div>
        `;
        appContainer.innerHTML = showcaseHTML;

        // Eventos dos cards
        appContainer.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => renderProductDetailView(card.dataset.productId));
        });

        // Dispara evento customizado para integração com outros módulos (combos, etc)
        appContainer.dispatchEvent(new CustomEvent('showcaseRendered'));
    };

    // Inicialização pública
    window.gabiFitApp = window.gabiFitApp || {};
    window.gabiFitApp.initializeProductShowcase = (containerElement) => {
        appContainer = containerElement;
        renderMainShowcase();
    };
    window.gabiFitApp.showMainShowcase = () => {
        if (appContainer) {
            renderMainShowcase();
        }
    };
})();