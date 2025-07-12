// combos.js
document.addEventListener('DOMContentLoaded', () => {
    const showCombosBtn = document.getElementById('show-combos-btn');
    const combosSection = document.getElementById('combos-section');
    const mainNavigation = document.getElementById('main-navigation');
    const productsSection = document.getElementById('products-dynamic-section');

    const showMainNavigation = () => {
        mainNavigation.classList.remove('hidden');
        mainNavigation.classList.add('flex');
        productsSection.classList.add('hidden');
        combosSection.classList.add('hidden');
        combosSection.innerHTML = ''; // Clean up to save memory and avoid issues
    };

    const renderCombos = () => {
        // Hide other sections and show the combos section
        mainNavigation.classList.add('hidden');
        productsSection.classList.add('hidden');
        combosSection.classList.remove('hidden');

        // The entire HTML structure for combos
        combosSection.innerHTML = `
            <div class="tabs-container">
                <div class="tab-row" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 0.75rem;">
                    <button class="tab-btn active" data-target="#peso-normal">🟢 Peso Normal</button>
                    <button class="tab-btn" data-target="#sobrepeso">🟠 Sobrepeso</button>
                </div>
                <div class="tab-row" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 0.75rem;">
                    <button class="tab-btn" data-target="#obesidade-grau-i">🟡 Obesidade I</button>
                    <button class="tab-btn" data-target="#obesidade-grau-ii">🔴 Obesidade II</button>
                    <button class="tab-btn" data-target="#obesidade-grau-iii">🚨 Obesidade III</button>
                </div>
            </div>
            <div class="tab-content">
                <div id="peso-normal" class="tab-pane active">${generateSwiperHTML(combosData['peso-normal'])}</div>
                <div id="sobrepeso" class="tab-pane">${generateSwiperHTML(combosData['sobrepeso'])}</div>
                <div id="obesidade-grau-i" class="tab-pane">${generateSwiperHTML(combosData['obesidade-grau-i'])}</div>
                <div id="obesidade-grau-ii" class="tab-pane">${generateSwiperHTML(combosData['obesidade-grau-ii'])}</div>
                <div id="obesidade-grau-iii" class="tab-pane">${generateSwiperHTML(combosData['obesidade-grau-iii'])}</div>
            </div>
            <div class="w-full max-w-sm mx-auto">
                <button id="combos-back-btn" class="link-button group flex items-center gap-4 w-full p-3 mt-8 border-slate-500 hover:border-slate-300">
                    <span class="flex-grow font-semibold text-center text-slate-400 group-hover:text-white">↩️ Voltar</span>
                </button>
            </div>
        `;

        initializeComboScripts();
    };
    
    const generateSwiperHTML = (combos) => {
        const slides = combos.map(combo => `
            <div class="swiper-slide">
                <div class="combo-card">
                    <div class="card-header">
                        <span class="type-tag ${combo.tagClass}">${combo.tag}</span>
                        <h3 class="combo-title">${combo.title}</h3>
                        ${combo.anxiety ? `<p class="anxiety-tag">Com Foco em Ansiedade</p>` : ''}
                    </div>
                    <div class="combo-details">
                        <div class="detail-item">
                            <div class="value duration">${combo.duration}</div>
                            <div class="label">Duração</div>
                        </div>
                        <div class="detail-item">
                            <div class="value price">R$ ${combo.price}</div>
                            <div class="label">Total</div>
                        </div>
                    </div>
                    <h4 class="product-list-title">Produtos Inclusos:</h4>
                    <div class="product-list">
                        ${combo.products.map(p => `
                            <div class="product-item">
                                <img src="${p.img}" alt="${p.name}">
                                <span class="product-name">✅ ${p.name}</span>
                            </div>
                        `).join('')}
                    </div>
                    <a href="${combo.whatsappLink}" target="_blank" class="buy-button">
                        <i class="fab fa-whatsapp"></i> Comprar Combo
                    </a>
                </div>
            </div>
        `).join('');

        return `
            <div class="swiper-container">
                <div class="swiper-wrapper">${slides}</div>
                <div class="swiper-pagination"></div>
            </div>
        `;
    };

    const initializeComboScripts = () => {
        // Initialize Swiper
        document.querySelectorAll('#combos-section .swiper-container').forEach(container => {
            new Swiper(container, {
                loop: false,
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 16,
                grabCursor: true,
                pagination: {
                    el: container.querySelector('.swiper-pagination'),
                    clickable: true,
                },
            });
        });

        // Initialize Tabs
        const tabs = document.querySelectorAll('#combos-section .tab-btn');
        const panes = document.querySelectorAll('#combos-section .tab-pane');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = document.querySelector(tab.dataset.target);
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                panes.forEach(p => p.classList.remove('active'));
                target.classList.add('active');
            });
        });
        
        // Back button
        document.getElementById('combos-back-btn').addEventListener('click', showMainNavigation);
    };

    const injectComboStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .tabs-container { display: flex; flex-direction: column; align-items: center; margin-bottom: 2rem; gap: 1rem; width: 100%; box-sizing: border-box; }
            .tab-btn { padding: 0.75rem 1.5rem; font-size: 0.9rem; font-weight: 600; color: #a1a1aa; background-color: transparent; border: 2px solid var(--surface-dark); border-radius: 50px; cursor: pointer; transition: all 0.3s ease; flex-shrink: 0; }
            .tab-btn:hover { color: white; background-color: var(--surface-dark); }
            .tab-btn.active { color: white; background-color: var(--primary-green); border-color: var(--primary-green); box-shadow: 0 0 15px rgba(75, 222, 128, 0.4); }
            .tab-pane { display: none; animation: fadeIn 0.5s ease; width: 100%; box-sizing: border-box; }
            .tab-pane.active { display: block; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            .swiper-container { width: 100vw; max-width: 100%; margin-left: 50%; transform: translateX(-50%); padding: 1rem 0 3rem 0; }
            .swiper-slide { width: 320px !important; height: auto; display: flex; padding: 0.5rem; }
            .swiper-pagination-bullet-active { background: var(--primary-purple); }
            .combo-card { background-color: rgba(30, 31, 32, 0.7); border: 1px solid rgba(192, 132, 252, 0.2); backdrop-filter: blur(12px); border-radius: 1.5rem; padding: 2rem; display: flex; flex-direction: column; transition: all 0.3s ease; width: 100%; box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); height: 100%; }
            .combo-card:hover { transform: translateY(-5px); box-shadow: 0 0 25px 3px rgba(75, 222, 128, 0.2); border-color: rgba(75, 222, 128, 0.5); }
            .card-header .type-tag { font-size: 0.8rem; font-weight: 600; padding: 0.4rem 1rem; border-radius: 50px; text-transform: uppercase; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); display: inline-block; }
            .card-header .combo-title { font-size: 1.5rem; font-weight: 700; margin-top: 1rem; color: white; }
            .card-header .anxiety-tag { font-size: 0.9rem; color: var(--primary-purple); font-weight: 500; margin-top: 0.25rem; }
            .combo-details { display: flex; justify-content: space-around; text-align: center; padding: 1.5rem 0; margin: 1.5rem 0; border-top: 1px solid rgba(255, 255, 255, 0.1); border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
            .detail-item .value { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
            .detail-item .value.price { color: var(--primary-green); }
            .detail-item .value.duration { color: var(--primary-purple); }
            .detail-item .label { font-size: 0.75rem; text-transform: uppercase; color: #a1a1aa; }
            .product-list { display: flex; flex-direction: column; gap: 1rem; margin: 1rem 0 2rem; flex-grow: 1; }
            .product-item { display: flex; align-items: center; gap: 1rem; background-color: rgba(0, 0, 0, 0.2); padding: 0.75rem; border-radius: 0.75rem; }
            .product-item img { width: 45px; height: 45px; object-fit: contain; }
            .buy-button { display: block; width: 100%; text-align: center; padding: 1rem; border-radius: 50px; font-weight: 600; font-size: 1rem; text-decoration: none; transition: all 0.3s ease; background: var(--primary-green); color: var(--background-dark); cursor: pointer; border: none; margin-top: auto; }
            .buy-button:hover { transform: scale(1.03); }
        `;
        document.head.appendChild(style);
    };
    
    // Data for combos
    const combosData = {
        'peso-normal': [
            { tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 30 dias', duration: '30 Dias', price: '169,90', anxiety: false, products: [{ name: '1 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 30 dias (Econômico)".' },
            { tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 40 dias', duration: '40 Dias', price: '499,99', anxiety: false, products: [{ name: '1 Gold', img: 'https://gabi-gpt.web.app/assets/produtos/gold.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 40 dias (Premium)".' }
        ],
        'sobrepeso': [
            { tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 60 dias', duration: '60 Dias', price: '339,80', anxiety: false, products: [{ name: '2 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 60 dias (Econômico)".' },
            { tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 60 dias', duration: '60 Dias', price: '285,00', anxiety: true, products: [{ name: '1 Roxo', img: 'https://gabi-gpt.web.app/assets/produtos/roxo.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 60 dias (Econômico - Ansiedade)".' },
            { tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 40 dias', duration: '40 Dias', price: '499,99', anxiety: false, products: [{ name: '1 Gold', img: 'https://gabi-gpt.web.app/assets/produtos/gold.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 40 dias (Premium)".' }
        ],
        'obesidade-grau-i': [
            { tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 90 dias', duration: '90 Dias', price: '500,00', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Black', img: 'https://gabi-gpt.web.app/assets/produtos/black.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 90 dias (Econômico)".' },
            { tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 90 dias', duration: '90 Dias', price: '455,00', anxiety: true, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Roxo', img: 'https://gabi-gpt.web.app/assets/produtos/roxo.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 90 dias (Econômico - Ansiedade)".' },
            { tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 70 dias', duration: '70 Dias', price: '669,99', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Gold', img: 'https://gabi-gpt.web.app/assets/produtos/gold.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 70 dias (Premium)".' }
        ],
        'obesidade-grau-ii': [
            { tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 120 dias', duration: '120 Dias', price: '669,90', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Black', img: 'https://gabi-gpt.web.app/assets/produtos/black.png' }, { name: '1 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 120 dias (Econômico)".' },
            { tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 120 dias', duration: '120 Dias', price: '624,90', anxiety: true, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Roxo', img: 'https://gabi-gpt.web.app/assets/produtos/roxo.png' }, { name: '1 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 120 dias (Econômico - Ansiedade)".' },
            { tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 100 dias', duration: '100 Dias', price: '839,89', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Gold', img: 'https://gabi-gpt.web.app/assets/produtos/gold.png' }, { name: '1 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 100 dias (Premium)".' }
        ],
        'obesidade-grau-iii': [
            { tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 160 dias', duration: '160 Dias', price: '1.169,90', anxiety: false, products: [{ name: '2 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '2 Black', img: 'https://gabi-gpt.web.app/assets/produtos/black.png' }, { name: '1 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 160 dias (Econômico)".' },
            { tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 160 dias', duration: '160 Dias', price: '1.079,90', anxiety: true, products: [{ name: '2 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '2 Roxo', img: 'https://gabi-gpt.web.app/assets/produtos/roxo.png' }, { name: '1 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 160 dias (Econômico - Ansiedade)".' },
            { tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 140 dias', duration: '140 Dias', price: '1.179,79', anxiety: false, products: [{ name: '2 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '2 Slim', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }, { name: '1 Gold', img: 'https://gabi-gpt.web.app/assets/produtos/gold.png' }], whatsappLink: 'https://wa.me/556792552604?text=Oi! Gostaria de adquirir o combo "Projeto Slim 140 dias (Premium)".' }
        ]
    };

    // Initial setup
    showCombosBtn.addEventListener('click', renderCombos);
    injectComboStyles();
});
