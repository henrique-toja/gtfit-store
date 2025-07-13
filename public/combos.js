// combos.js (Redesigned with an impactful, textured style)
(function() {
    const combosSection = document.getElementById('combos-section');

    const domain = 'https://www.gtfit.store';
    const originalCombosData = {
        'peso-normal': [
            { id: 'pn-eco', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 30 dias', duration: '30 Dias', anxiety: false, products: [{ name: '1 Super Slim X', img: `${domain}/assets/produtos/slimx.png` }], explanation: "Ideal para quem busca uma manutenção do peso, um detox inicial ou quer dar o primeiro passo para definir o corpo. O Super Slim X age diretamente na saciedade e otimiza a queima de gordura leve." },
            { id: 'pn-prem', tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 40 dias', duration: '40 Dias', anxiety: false, products: [{ name: '1 Guria Shape Gold', img: `${domain}/assets/produtos/gold.png` }], explanation: "A solução definitiva para quem está no peso ideal mas quer a máxima performance na definição. O Gold atua no bem-estar geral, melhora o humor, a imunidade e acelera o metabolismo para uma queima de gordura avançada, esculpindo o corpo." }
        ],
        'sobrepeso': [
            { id: 'sp-eco', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 60 dias', duration: '60 Dias', anxiety: false, products: [{ name: '2 Super Slim X', img: `${domain}/assets/produtos/slimx.png` }], explanation: "Um plano de 60 dias focado em alta saciedade e queima de gordura contínua. É a estratégia com melhor custo-benefício para quem precisa eliminar o sobrepeso de forma consistente e segura, reeducando o apetite." },
            { id: 'sp-ans', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 60 dias', duration: '60 Dias', anxiety: true, products: [{ name: '1 Guria Shape Roxo', img: `${domain}/assets/produtos/roxo.png` }], explanation: "Se a ansiedade e a compulsão alimentar são seus maiores desafios, este é o combo certo. O Guria Shape Roxo acalma a mente e o apetite, permitindo que você retome o controle e emagreça sem sofrimento." },
            { id: 'sp-prem', tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 40 dias', duration: '40 Dias', anxiety: false, products: [{ name: '1 Guria Shape Gold', img: `${domain}/assets/produtos/gold.png` }], explanation: "Para quem está com sobrepeso e busca a solução mais rápida e completa. O Gold não só acelera a queima de gordura, mas também equilibra o humor e fortalece o corpo, tratando as causas do ganho de peso de dentro para fora." }
        ],
        'obesidade-grau-i': [
            { id: 'o1-eco', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 60 dias', duration: '60 Dias', anxiety: false, products: [{ name: '1 Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Super Slim X', img: `${domain}/assets/produtos/slimx.png` }], explanation: "A estratégia inicial perfeita: o Detox prepara seu corpo, eliminando toxinas. Em seguida, o Slim X promove alta saciedade e queima de gordura, garantindo um início de emagrecimento eficaz e com resultados visíveis." },
            { id: 'o1-ans', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 90 dias', duration: '90 Dias', anxiety: true, products: [{ name: '1 Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Roxo', img: `${domain}/assets/produtos/roxo.png` }], explanation: "Combinação poderosa que primeiro limpa seu organismo com o Detox e depois ataca a raiz do problema com o Roxo, controlando a ansiedade e a compulsão. É o plano ideal para quem precisa de paz mental para emagrecer." },
            { id: 'o1-prem', tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 70 dias', duration: '70 Dias', anxiety: false, products: [{ name: '1 Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Gold', img: `${domain}/assets/produtos/gold.png` }], explanation: "O plano de elite para resultados rápidos. O Detox faz o 'reset' metabólico e o Gold entra com tecnologia avançada para acelerar a queima de gordura, cuidar da pele, do humor e da imunidade. É o tratamento mais completo." }
        ],
        'obesidade-grau-ii': [
            { id: 'o2-eco', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 90 dias', duration: '90 Dias', anxiety: false, products: [{ name: '1 Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Black', img: `${domain}/assets/produtos/black.png` }], explanation: "Plano de ação de choque para destravar a perda de peso. O Detox limpa o terreno e o Black, nosso inibidor mais forte, entra para reduzir drasticamente o apetite e focar na queima de gordura resistente, especialmente abdominal." },
            { id: 'o2-ans', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 120 dias', duration: '120 Dias', anxiety: true, products: [{ name: '1 Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Roxo', img: `${domain}/assets/produtos/roxo.png` }, { name: '1 Super Slim X', img: `${domain}/assets/produtos/slimx.png` }], explanation: "Tratamento completo e gentil para quem tem ansiedade. Começa com o Detox, avança para o Roxo para controle mental e da fome, e finaliza com o Slim X para manter os resultados. Emagrecimento progressivo e sem sofrimento." },
            { id: 'o2-prem', tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 100 dias', duration: '100 Dias', anxiety: false, products: [{ name: '1 Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Gold', img: `${domain}/assets/produtos/gold.png` }, { name: '1 Super Slim X', img: `${domain}/assets/produtos/slimx.png` }], explanation: "A rota mais segura e eficaz para uma grande transformação. A sequência Detox, Gold e Slim garante um emagrecimento saudável, tratando o corpo de forma integral, cuidando da pele, humor e mantendo o metabolismo sempre ativo." }
        ],
        'obesidade-grau-iii': [
            { id: 'o3-eco', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 120 dias', duration: '120 Dias', anxiety: false, products: [{ name: '1 Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '2 Guria Shape Black', img: `${domain}/assets/produtos/black.png` }], explanation: "Plano de intervenção máxima para resultados expressivos. O Detox prepara o corpo para receber a dose dupla do Black, nosso inibidor mais potente. O foco é na redução máxima de apetite e na queima de gordura acelerada." },
            { id: 'o3-ans', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 160 dias', duration: '160 Dias', anxiety: true, products: [{ name: '1 Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '2 Guria Shape Roxo', img: `${domain}/assets/produtos/roxo.png` }, { name: '1 Super Slim X', img: `${domain}/assets/produtos/slimx.png` }], explanation: "O plano mais completo para quem precisa vencer a obesidade e a ansiedade. A sequência Detox, Roxo e Slim oferece um tratamento de longo prazo, focado em acalmar, controlar o apetite e queimar gordura de forma progressiva e sustentável." },
            { id: 'o3-prem', tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 140 dias', duration: '140 Dias', anxiety: false, products: [{ name: '1 Detox', img: `${domain}/assets/produtos/detox.png` }, { name: '1 Guria Shape Gold', img: `${domain}/assets/produtos/gold.png` }, { name: '2 Super Slim X', img: `${domain}/assets/produtos/slimx.png` }], explanation: "A abordagem premium para a transformação mais importante. Esta sequência poderosa usa o Detox, a tecnologia do Gold e a consistência do Slim X para promover um emagrecimento saudável, seguro, cuidando da sua saúde como um todo e garantindo resultados duradouros." }
        ]
    };

    const categoryDisplayInfo = {
        'peso-normal': { line1: '🟢 Peso normal 🟢', line2: '🔥 Mínimo 30 dias de Projeto Slim 🔥' },
        'sobrepeso': { line1: '🟡 Sobrepeso 🟡', line2: '🔥 Mínimo 60 dias de Projeto Slim 🔥' },
        'obesidade-grau-i': { line1: '🟠 Obesidade Grau 1 🟠', line2: '🔥 Mínimo 60 dias de Projeto Slim 🔥' },
        'obesidade-grau-ii': { line1: '🔴 Obesidade Grau 2 🔴', line2: '🔥 Mínimo 90 dias de Projeto Slim 🔥' },
        'obesidade-grau-iii': { line1: '⚫ Obesidade Grau 3 ⚫', line2: '🔥 Mínimo 120 dias de Projeto Slim 🔥' }
    };

    const combosList = Object.entries(originalCombosData).flatMap(([categoryKey, combos]) => 
        combos.map(combo => ({
            id: combo.id,
            categoryKey: categoryKey,
            details: combo,
            type: combo.tag === 'PLANO PREMIUM' ? 'premium' : (combo.anxiety ? 'anxiety' : 'eco')
        }))
    );

    function createBackButton(backCallback) {
        const button = document.createElement('button');
        button.className = 'link-button group flex items-center justify-center gap-4 w-full max-w-sm p-3 mt-8 border-slate-700 hover:border-slate-500';
        button.innerHTML = `<span class="font-semibold text-center text-slate-400 group-hover:text-white">↩️ Voltar</span>`;
        button.onclick = backCallback;
        return button;
    }

    function showComboDetail(comboId, backCallback) {
        const combo = combosList.find(c => c.id === comboId);
        if (!combo) return;
        const comboName = combo.details.title;
        const message = encodeURIComponent(`Oii, gostaria de saber mais sobre o combo "${comboName}"`);
        const whatsappUrl = `https://wa.me/556792552604?text=${message}`;
        const detailHTML = `
            <div class="w-full max-w-md mx-auto">
                <div class="combo-detail-card">
                    <div class="combo-detail-header">
                        <div class="flex justify-center items-center gap-x-3 mb-5">
                            ${combo.details.products.map(p => `<img src="${p.img}" alt="${p.name}" class="w-20 h-20 object-contain rounded-full border-2 border-primary-purple/30">`).join('')}
                        </div>
                        <h2 class="text-3xl font-extrabold text-white tracking-tight">${combo.details.title}</h2>
                        <p class="text-primary-green font-semibold mt-2 flex items-center justify-center gap-2">
                            <i class="far fa-clock"></i>
                            <span>${combo.details.duration} de Tratamento</span>
                        </p>
                    </div>
                    <div class="combo-accordion-container">
                        <div class="combo-accordion-item open">
                            <button class="combo-accordion-header">
                                <span>🤔 Por que este combo é ideal para você?</span>
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="combo-accordion-content">
                                <div class="combo-accordion-body"><p>${combo.details.explanation}</p></div>
                            </div>
                        </div>
                         <div class="combo-accordion-item">
                            <button class="combo-accordion-header">
                                <span>📦 Produtos Inclusos</span>
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="combo-accordion-content">
                                <div class="combo-accordion-body">
                                    <ul class="space-y-3">
                                        ${combo.details.products.map(p => `
                                            <li class="flex items-center gap-4 bg-black/20 p-3 rounded-xl border border-slate-700">
                                                <img src="${p.img}" class="w-10 h-10 rounded-full border-2 border-primary-purple/40 flex-shrink-0" alt="${p.name}">
                                                <span class="font-semibold text-slate-200">${p.name}</span>
                                            </li>
                                        `).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="combo-detail-footer">
                         <a href="${whatsappUrl}" target="_blank" class="interactive-cta-button">
                            <span>Conversar com Especialista 🧠</span>
                        </a>
                    </div>
                </div>
            </div>`;
        combosSection.innerHTML = detailHTML;
        combosSection.appendChild(createBackButton(() => renderComboList(combo.categoryKey, backCallback)));
        document.querySelectorAll('.combo-accordion-item').forEach(item => {
            const header = item.querySelector('.combo-accordion-header');
            const content = item.querySelector('.combo-accordion-content');
            const toggleItem = () => {
                const isOpen = item.classList.contains('open');
                if (isOpen) {
                    content.style.maxHeight = '0px';
                    item.classList.remove('open');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    item.classList.add('open');
                }
            };
            header.addEventListener('click', toggleItem);
            if (item.classList.contains('open')) {
                setTimeout(() => { content.style.maxHeight = content.scrollHeight + 'px'; }, 10);
            }
        });
    }

    function renderComboList(categoryKey, backCallback) {
        const filteredCombos = combosList.filter(c => c.categoryKey === categoryKey);
        const comboButtons = [
            { type: 'eco', text: '😅 Combo Econômico 😅' },
            { type: 'anxiety', text: '🥵 Combo Ansiedade 🥵' },
            { type: 'premium', text: '🤑 Combo Premium 🤑' }
        ];
        let combosHTML = '';
        comboButtons.forEach(btn => {
            const combo = filteredCombos.find(c => c.type === btn.type);
            if (combo) {
                combosHTML += `<button data-combo-id="${combo.id}" class="link-button combo-item-btn group flex justify-center items-center gap-3 w-full max-w-sm p-3 h-16"><span class="font-semibold text-center text-slate-200 group-hover:text-white">${btn.text}</span></button>`;
            }
        });
        combosSection.innerHTML = combosHTML;
        combosSection.appendChild(createBackButton(() => showComboCategories(backCallback)));
        document.querySelectorAll('.combo-item-btn').forEach(button => {
            button.onclick = () => showComboDetail(button.dataset.comboId, backCallback);
        });
    }

    function showComboCategories(backCallback) {
        const categoriesHTML = Object.entries(categoryDisplayInfo).map(([key, info]) => 
            `<button data-category-key="${key}" class="link-button combo-category-btn group flex justify-center items-center gap-3 w-full max-w-sm p-4 h-auto">
                <div class="text-center">
                    <p class="font-semibold text-slate-100 group-hover:text-white text-lg">${info.line1}</p>
                    <p class="text-sm font-medium text-primary-green group-hover:text-emerald-300">${info.line2}</p>
                </div>
            </button>`
        ).join('');
        combosSection.innerHTML = categoriesHTML;
        combosSection.appendChild(createBackButton(backCallback));
        document.querySelectorAll('.combo-category-btn').forEach(button => {
            button.onclick = () => renderComboList(button.dataset.categoryKey, backCallback);
        });
    }

    function injectDetailStyles() {
        const styleId = 'combo-detail-styles';
        if (document.getElementById(styleId)) return;
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .combo-detail-card {
                background: radial-gradient(ellipse at center, #1a1a1d, #111);
                border: 1px solid #333;
                border-radius: 1.5rem;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                box-shadow: 0 0 80px -25px var(--primary-purple);
                background-image: url('data:image/svg+xml,%3Csvg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
                background-size: cover;
                position: relative;
            }
            .combo-detail-card::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: radial-gradient(ellipse at center, #1a1a1d, #111);
                opacity: 0.9;
                z-index: -1;
            }
            .combo-detail-header { padding: 1.5rem; text-align: center; border-bottom: 1px solid #333; }
            .combo-accordion-container { padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
            .combo-accordion-item {
                background: rgba(192, 132, 252, 0.05);
                border-radius: 1rem;
                border: 1px solid #333;
                backdrop-filter: blur(2px);
            }
            .combo-accordion-header {
                width: 100%; display: flex; justify-content: space-between; align-items: center;
                padding: 1rem; text-align: left; background: transparent; border: none;
                color: white; cursor: pointer; font-size: 1rem; font-weight: 600;
            }
            .combo-accordion-header i { transition: transform 0.3s ease; color: var(--primary-purple); }
            .combo-accordion-item.open .combo-accordion-header i { transform: rotate(180deg); }
            .combo-accordion-content { max-height: 0px; overflow: hidden; transition: max-height 0.5s cubic-bezier(0.25, 1, 0.5, 1); }
            .combo-accordion-body { padding: 0 1rem 1rem 1rem; color: #d1d5db; line-height: 1.6; }
            .combo-detail-footer { padding: 1.5rem; background: #111; margin-top: auto; border-top: 1px solid #333; }
            
            .interactive-cta-button {
                display: block; text-align: center; padding: 1rem; border-radius: 9999px;
                font-weight: bold; font-size: 1.125rem; text-decoration: none;
                background: linear-gradient(90deg, var(--primary-green), var(--primary-purple));
                color: black;
                position: relative;
                overflow: hidden;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .interactive-cta-button:hover {
                transform: scale(1.05);
                box-shadow: 0 0 20px var(--primary-green);
            }
            .interactive-cta-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 75%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                transition: left 0.6s ease;
            }
            .interactive-cta-button:hover::before {
                left: 125%;
            }
        `;
        document.head.appendChild(style);
    }

    window.renderCombosContent = (backCallback) => {
        injectDetailStyles();
        showComboCategories(backCallback);
    };

    window.gabiFitApp = window.gabiFitApp || {};
    window.gabiFitApp.combosData = originalCombosData;
})();
