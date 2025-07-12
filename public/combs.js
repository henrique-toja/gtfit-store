// combos.js (Rebuilt with new title format and symmetrical buttons)
(function() {
    const combosSection = document.getElementById('combos-section');
    const head = document.head;

    // --- Data Transformation ---
    const originalCombosData = {
        'peso-normal': [
            { id: 'pn-eco', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 30 dias', duration: '30 Dias', price: '169,90', anxiety: false, products: [{ name: '1 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 30 dias (Econômico)".' },
            { id: 'pn-prem', tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 40 dias', duration: '40 Dias', price: '499,99', anxiety: false, products: [{ name: '1 Gold', img: 'https://gabi-gpt.web.app/assets/produtos/gold.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 40 dias (Premium)".' }
        ],
        'sobrepeso': [
            { id: 'sp-eco', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 60 dias', duration: '60 Dias', price: '339,80', anxiety: false, products: [{ name: '2 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 60 dias (Econômico)".' },
            { id: 'sp-ans', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 60 dias', duration: '60 Dias', price: '285,00', anxiety: true, products: [{ name: '1 Roxo', img: 'https://gabi-gpt.web.app/assets/produtos/roxo.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 60 dias (Econômico - Ansiedade)".' },
            { id: 'sp-prem', tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 40 dias', duration: '40 Dias', price: '499,99', anxiety: false, products: [{ name: '1 Gold', img: 'https://gabi-gpt.web.app/assets/produtos/gold.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 40 dias (Premium)".' }
        ],
        'obesidade-grau-i': [
            { id: 'o1-eco', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 90 dias', duration: '90 Dias', price: '339,90', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 90 dias (Econômico)".' },
            { id: 'o1-ans', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 90 dias', duration: '90 Dias', price: '455,00', anxiety: true, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Roxo', img: 'https://gabi-gpt.web.app/assets/produtos/roxo.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 90 dias (Econômico - Ansiedade)".' },
            { id: 'o1-prem', tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 70 dias', duration: '70 Dias', price: '669,99', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Gold', img: 'https://gabi-gpt.web.app/assets/produtos/gold.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 70 dias (Premium)".' }
        ],
        'obesidade-grau-ii': [
            { id: 'o2-eco', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 120 dias', duration: '120 Dias', price: '669,90', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Black', img: 'https://gabi-gpt.web.app/assets/produtos/black.png' }, { name: '1 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 120 dias (Econômico)".' },
            { id: 'o2-ans', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 120 dias', duration: '120 Dias', price: '624,90', anxiety: true, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Roxo', img: 'https://gabi-gpt.web.app/assets/produtos/roxo.png' }, { name: '1 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 120 dias (Econômico - Ansiedade)".' },
            { id: 'o2-prem', tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 100 dias', duration: '100 Dias', price: '839,89', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Gold', img: 'https://gabi-gpt.web.app/assets/produtos/gold.png' }, { name: '1 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 100 dias (Premium)".' }
        ],
        'obesidade-grau-iii': [
            { id: 'o3-eco', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 160 dias', duration: '160 Dias', price: '909,90', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '2 Black', img: 'https://gabi-gpt.web.app/assets/produtos/black.png' }, { name: '1 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 160 dias (Econômico)".' },
            { id: 'o3-ans', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 160 dias', duration: '160 Dias', price: '999,90', anxiety: true, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '2 Roxo', img: 'https://gabi-gpt.web.app/assets/produtos/roxo.png' }, { name: '1 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 160 dias (Econômico - Ansiedade)".' },
            { id: 'o3-prem', tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 140 dias', duration: '140 Dias', price: '1.009,79', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '2 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }, { name: '1 Gold', img: 'https://gabi-gpt.web.app/assets/produtos/gold.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 140 dias (Premium)".' }
        ]
    };

    const combosList = Object.entries(originalCombosData).flatMap(([categoryKey, combos]) => {
        const categoryMap = {
            'peso-normal': '🟢 Peso Normal 🟢',
            'sobrepeso': '🟠 Sobrepeso 🟠 ',
            'obesidade-grau-i': '🟡 Obesidade Grau I 🟡',
            'obesidade-grau-ii': '🔴 Obesidade Grau II 🔴',
            'obesidade-grau-iii': '🚨 Obesidade Grau III 🚨',
        };
        return combos.map(combo => ({
            id: combo.id,
            nome: `${combo.title}`,
            preco: parseFloat(combo.price.replace(',', '.')),
            categoria: categoryMap[categoryKey],
            details: combo
        }));
    });

    function createBackButton(backCallback) {
        const button = document.createElement('button');
        button.className = 'link-button group flex items-center gap-4 w-full max-w-sm p-3 mt-8 border-slate-500 hover:border-slate-300';
        button.innerHTML = `<span class="flex-grow font-semibold text-center text-slate-400 group-hover:text-white">↩️ Voltar</span>`;
        button.onclick = backCallback;
        return button;
    }

    function showComboDetail(comboId, backCallback) {
        const combo = combosList.find(c => c.id === comboId);
        if (!combo) return;

        const detailHTML = `
            <div class="w-full max-w-md mx-auto">
                <div class="combo-card-detail">
                    <div class="card-header">
                        <span class="type-tag ${combo.details.tagClass}">${combo.details.tag}</span>
                        <h3 class="combo-title">${combo.details.title}</h3>
                        ${combo.details.anxiety ? `<p class="anxiety-tag">Com Foco em Ansiedade</p>` : ''}
                    </div>
                    <div class="combo-details">
                        <div class="detail-item">
                            <div class="value duration">${combo.details.duration}</div>
                            <div class="label">Duração</div>
                        </div>
                        <div class="detail-item">
                            <div class="value price">R$ ${combo.details.price}</div>
                            <div class="label">Total</div>
                        </div>
                    </div>
                    <h4 class="product-list-title">Produtos Inclusos:</h4>
                    <div class="product-list">
                        ${combo.details.products.map(p => `
                            <div class="product-item">
                                <img src="${p.img}" alt="${p.name}">
                                <span class="product-name">✅ ${p.name}</span>
                            </div>
                        `).join('')}
                    </div>
                    <a href="${combo.details.whatsappLink}" target="_blank" class="buy-button">
                        <i class="fab fa-whatsapp"></i> Comprar Combo
                    </a>
                </div>
            </div>
        `;

        combosSection.innerHTML = detailHTML;
        combosSection.appendChild(createBackButton(() => renderComboList(combo.categoria, backCallback)));
    }

    function renderComboList(category, backCallback) {
        // Helper function to generate the new title format
        const generateComboTitle = (combo) => {
            let emoji = '🔥';
            let title = 'Projeto Slim';

            if (combo.details.anxiety) {
                emoji = '🥵';
                title = 'Projeto Slim Ansiosa';
            } else if (combo.details.tag === 'PLANO ECONÔMICO') {
                emoji = '😅';
                title = 'Projeto Slim Econômico';
            } else if (combo.details.tag === 'PLANO PREMIUM') {
                emoji = '🤑';
                title = 'Projeto Slim Premium';
            }
            return `${emoji} ${title} - ${combo.details.duration} 🔥`;
        };

        const filteredCombos = combosList.filter(c => c.categoria === category);

        // UPDATED: Symmetrical button structure and new title format
        const combosHTML = filteredCombos.map(combo => {
            const buttonText = generateComboTitle(combo);
            return `
            <button data-combo-id="${combo.id}" class="link-button combo-item-btn group flex justify-center items-center gap-3 w-full max-w-sm p-3 h-16">
                <span class="font-semibold text-center text-slate-200 group-hover:text-white">${buttonText}</span>
            </button>
        `;
        }).join('');

        combosSection.innerHTML = combosHTML;
        combosSection.appendChild(createBackButton(() => showComboCategories(backCallback)));

        document.querySelectorAll('.combo-item-btn').forEach(button => {
            button.onclick = () => showComboDetail(button.dataset.comboId, backCallback);
        });
    }

    function showComboCategories(backCallback) {
        const categories = [
            '🟢 Peso Normal 🟢',
            '🟠 Sobrepeso 🟠 ',
            '🟡 Obesidade Grau I 🟡',
            '🔴 Obesidade Grau II 🔴',
            '🚨 Obesidade Grau III 🚨',
        ];

        const categoriesHTML = categories.map(category => `
            <button data-category="${category}" class="link-button combo-category-btn group flex justify-center items-center gap-3 w-full max-w-sm p-3 h-16">
                <span class="font-semibold text-slate-200 group-hover:text-white">${category}</span>
            </button>
        `).join('');

        combosSection.innerHTML = categoriesHTML;
        combosSection.appendChild(createBackButton(backCallback));

        document.querySelectorAll('.combo-category-btn').forEach(button => {
            button.onclick = () => renderComboList(button.dataset.category, backCallback);
        });
    }

    function injectDetailStyles() {
        const styleId = 'combo-detail-styles';
        if (document.getElementById(styleId)) return;
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .combo-card-detail { background-color: rgba(30, 31, 32, 0.7); border: 1px solid rgba(192, 132, 252, 0.2); backdrop-filter: blur(12px); border-radius: 1.5rem; padding: 2rem; display: flex; flex-direction: column; width: 100%; box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); }
            .combo-card-detail .card-header .type-tag { font-size: 0.8rem; font-weight: 600; padding: 0.4rem 1rem; border-radius: 50px; text-transform: uppercase; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); display: inline-block; }
            .combo-card-detail .card-header .combo-title { font-size: 1.5rem; font-weight: 700; margin-top: 1rem; color: white; }
            .combo-card-detail .card-header .anxiety-tag { font-size: 0.9rem; color: var(--primary-purple); font-weight: 500; margin-top: 0.25rem; }
            .combo-card-detail .combo-details { display: flex; justify-content: space-around; text-align: center; padding: 1.5rem 0; margin: 1.5rem 0; border-top: 1px solid rgba(255, 255, 255, 0.1); border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
            .combo-card-detail .detail-item .value { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
            .combo-card-detail .detail-item .value.price { color: var(--primary-green); }
            .combo-card-detail .detail-item .value.duration { color: var(--primary-purple); }
            .combo-card-detail .detail-item .label { font-size: 0.75rem; text-transform: uppercase; color: #a1a1aa; }
            .combo-card-detail .product-list-title { font-size: 1rem; font-weight: 600; color: white; margin: 1rem 0; }
            .combo-card-detail .product-list { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; flex-grow: 1; }
            .combo-card-detail .product-item { display: flex; align-items: center; gap: 1rem; background-color: rgba(0, 0, 0, 0.2); padding: 0.75rem; border-radius: 0.75rem; }
            .combo-card-detail .product-item img { width: 45px; height: 45px; object-fit: contain; }
            .combo-card-detail .buy-button { display: block; width: 100%; text-align: center; padding: 1rem; border-radius: 50px; font-weight: 600; font-size: 1rem; text-decoration: none; transition: all 0.3s ease; background: var(--primary-green); color: var(--background-dark); cursor: pointer; border: none; margin-top: auto; }
            .combo-card-detail .buy-button:hover { transform: scale(1.03); }
        `;
        document.head.appendChild(style);
    }

    // --- Main Exposed Function ---
    window.renderCombosContent = (backCallback) => {
        injectDetailStyles();
        showComboCategories(backCallback);
    };

})();