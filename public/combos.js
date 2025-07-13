// combos.js (Completely Overhauled)
(function() {
    const combosSection = document.getElementById('combos-section');

    // --- DATA TRANSFORMATION ---
    // Preços removidos e explicações adicionadas a cada combo.
    const originalCombosData = {
        'peso-normal': [
            { id: 'pn-eco', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 30 dias', duration: '30 Dias', anxiety: false, products: [{ name: '1 Super Slim X', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], explanation: "Ideal para quem busca uma manutenção do peso, um detox inicial ou quer dar o primeiro passo para definir o corpo. O Super Slim X age diretamente na saciedade e otimiza a queima de gordura leve." },
            { id: 'pn-prem', tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 40 dias', duration: '40 Dias', anxiety: false, products: [{ name: '1 Guria Shape Gold', img: 'https://gabi-gpt.web.app/assets/produtos/gold.png' }], explanation: "A solução definitiva para quem está no peso ideal mas quer a máxima performance na definição. O Gold atua no bem-estar geral, melhora o humor, a imunidade e acelera o metabolismo para uma queima de gordura avançada, esculpindo o corpo." }
        ],
        'sobrepeso': [
            { id: 'sp-eco', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 60 dias', duration: '60 Dias', anxiety: false, products: [{ name: '2 Super Slim X', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], explanation: "Um plano de 60 dias focado em alta saciedade e queima de gordura contínua. É a estratégia com melhor custo-benefício para quem precisa eliminar o sobrepeso de forma consistente e segura, reeducando o apetite." },
            { id: 'sp-ans', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 60 dias', duration: '60 Dias', anxiety: true, products: [{ name: '1 Guria Shape Roxo', img: 'https://gabi-gpt.web.app/assets/produtos/roxo.png' }], explanation: "Se a ansiedade e a compulsão alimentar são seus maiores desafios, este é o combo certo. O Guria Shape Roxo acalma a mente e o apetite, permitindo que você retome o controle e emagreça sem sofrimento." },
            { id: 'sp-prem', tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 40 dias', duration: '40 Dias', anxiety: false, products: [{ name: '1 Guria Shape Gold', img: 'https://gabi-gpt.web.app/assets/produtos/gold.png' }], explanation: "Para quem está com sobrepeso e busca a solução mais rápida e completa. O Gold não só acelera a queima de gordura, mas também equilibra o humor e fortalece o corpo, tratando as causas do ganho de peso de dentro para fora." }
        ],
        'obesidade-grau-i': [
            { id: 'o1-eco', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 60 dias', duration: '60 Dias', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Super Slim X', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], explanation: "A estratégia inicial perfeita: o Detox prepara seu corpo, eliminando toxinas. Em seguida, o Slim X promove alta saciedade e queima de gordura, garantindo um início de emagrecimento eficaz e com resultados visíveis." },
            { id: 'o1-ans', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 90 dias', duration: '90 Dias', anxiety: true, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Guria Shape Roxo', img: 'https://gabi-gpt.web.app/assets/produtos/roxo.png' }], explanation: "Combinação poderosa que primeiro limpa seu organismo com o Detox e depois ataca a raiz do problema com o Roxo, controlando a ansiedade e a compulsão. É o plano ideal para quem precisa de paz mental para emagrecer." },
            { id: 'o1-prem', tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 70 dias', duration: '70 Dias', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Guria Shape Gold', img: 'https://gabi-gpt.web.app/assets/produtos/gold.png' }], explanation: "O plano de elite para resultados rápidos. O Detox faz o 'reset' metabólico e o Gold entra com tecnologia avançada para acelerar a queima de gordura, cuidar da pele, do humor e da imunidade. É o tratamento mais completo." }
        ],
        'obesidade-grau-ii': [
            { id: 'o2-eco', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 90 dias', duration: '90 Dias', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Guria Shape Black', img: 'https://gabi-gpt.web.app/assets/produtos/black.png' }], explanation: "Plano de ação de choque para destravar a perda de peso. O Detox limpa o terreno e o Black, nosso inibidor mais forte, entra para reduzir drasticamente o apetite e focar na queima de gordura resistente, especialmente abdominal." },
            { id: 'o2-ans', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 120 dias', duration: '120 Dias', anxiety: true, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Guria Shape Roxo', img: 'https://gabi-gpt.web.app/assets/produtos/roxo.png' }, { name: '1 Super Slim X', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], explanation: "Tratamento completo e gentil para quem tem ansiedade. Começa com o Detox, avança para o Roxo para controle mental e da fome, e finaliza com o Slim X para manter os resultados. Emagrecimento progressivo e sem sofrimento." },
            { id: 'o2-prem', tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 100 dias', duration: '100 Dias', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Guria Shape Gold', img: 'https://gabi-gpt.web.app/assets/produtos/gold.png' }, { name: '1 Super Slim X', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], explanation: "A rota mais segura e eficaz para uma grande transformação. A sequência Detox, Gold e Slim garante um emagrecimento saudável, tratando o corpo de forma integral, cuidando da pele, humor e mantendo o metabolismo sempre ativo." }
        ],
        'obesidade-grau-iii': [
            { id: 'o3-eco', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 120 dias', duration: '120 Dias', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '2 Guria Shape Black', img: 'https://gabi-gpt.web.app/assets/produtos/black.png' }], explanation: "Plano de intervenção máxima para resultados expressivos. O Detox prepara o corpo para receber a dose dupla do Black, nosso inibidor mais potente. O foco é na redução máxima de apetite e na queima de gordura acelerada." },
            { id: 'o3-ans', tag: 'PLANO ECONÔMICO', tagClass: 'tag-economico', title: 'Projeto Slim 160 dias', duration: '160 Dias', anxiety: true, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '2 Guria Shape Roxo', img: 'https://gabi-gpt.web.app/assets/produtos/roxo.png' }, { name: '1 Super Slim X', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], explanation: "O plano mais completo para quem precisa vencer a obesidade e a ansiedade. A sequência Detox, Roxo e Slim oferece um tratamento de longo prazo, focado em acalmar, controlar o apetite e queimar gordura de forma progressiva e sustentável." },
            { id: 'o3-prem', tag: 'PLANO PREMIUM', tagClass: 'tag-premium', title: 'Projeto Slim 140 dias', duration: '140 Dias', anxiety: false, products: [{ name: '1 Detox', img: 'https://gabi-gpt.web.app/assets/produtos/detox.png' }, { name: '1 Guria Shape Gold', img: 'https://gabi-gpt.web.app/assets/produtos/gold.png' }, { name: '2 Super Slim X', img: 'https://gabi-gpt.web.app/assets/produtos/slimx.png' }], explanation: "A abordagem premium para a transformação mais importante. Esta sequência poderosa usa o Detox, a tecnologia do Gold e a consistência do Slim X para promover um emagrecimento saudável, seguro, cuidando da sua saúde como um todo e garantindo resultados duradouros." }
        ]
    };
    
    // Mapeamento dos novos títulos das categorias
    const categoryDisplayInfo = {
        'peso-normal': '🟢 Peso Normal • Projeto Slim: Mínimo 30 Dias 🟢',
        'sobrepeso': '🟡 Sobrepeso • Projeto Slim: Mínimo 60 Dias 🟡',
        'obesidade-grau-i': '🟠 Obesidade Grau 1 • Projeto Slim: Mínimo 60 dias 🟠',
        'obesidade-grau-ii': '🔴 Obesidade Grau 2 • Projeto Slim: Mínimo 90 dias 🔴',
        'obesidade-grau-iii': '⚫ Obesidade Grau 3 • Projeto Slim: Mínimo 120 dias ⚫'
    };

    const combosList = Object.entries(originalCombosData).flatMap(([categoryKey, combos]) => 
        combos.map(combo => ({
            id: combo.id,
            categoryKey: categoryKey,
            details: combo,
            isAnxiety: combo.anxiety,
            type: combo.tag === 'PLANO PREMIUM' ? 'premium' : (combo.anxiety ? 'anxiety' : 'eco')
        }))
    );

    function createBackButton(backCallback) {
        const button = document.createElement('button');
        button.className = 'link-button group flex items-center justify-center gap-4 w-full max-w-sm p-3 mt-8 border-slate-500 hover:border-slate-300';
        button.innerHTML = `<span class="font-semibold text-center text-slate-400 group-hover:text-white">↩️ Voltar</span>`;
        button.onclick = backCallback;
        return button;
    }

    // --- FUNÇÃO DE DETALHES ATUALIZADA ---
    function showComboDetail(comboId, backCallback) {
        const combo = combosList.find(c => c.id === comboId);
        if (!combo) return;

        // Monta a URL do WhatsApp dinamicamente
        const comboName = combo.details.title;
        const message = encodeURIComponent(`Oii, gostaria de saber mais sobre o combo "${comboName}"`);
        const whatsappUrl = `https://wa.me/556792552604?text=${message}`;

        const detailHTML = `
            <div class="w-full max-w-md mx-auto">
                <div class="product-card-detail bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                    <div class="p-6 text-center bg-black/20 backdrop-blur-sm border-b border-slate-700/50">
                        <div class="flex justify-center items-center gap-x-2 mb-5">
                            ${combo.details.products.map(p => `<img src="${p.img}" alt="${p.name}" class="w-20 h-20 object-contain rounded-full border-2 border-primary-purple/50">`).join('')}
                        </div>
                        <h2 class="text-3xl font-extrabold text-white tracking-tight">${combo.details.title}</h2>
                        <p class="text-primary-purple font-semibold mt-1">${combo.details.duration} de Tratamento</p>
                    </div>

                    <div class="accordion-container text-sm">
                        <div class="accordion-item border-b border-slate-800 open">
                            <button class="accordion-header w-full flex justify-between items-center p-4 text-left transition-colors duration-300 hover:bg-slate-700/40">
                                <span class="font-semibold text-slate-100">🤔 Por que este combo é ideal para você?</span>
                                <i class="fas fa-chevron-down transition-transform duration-300 text-slate-400"></i>
                            </button>
                            <div class="accordion-content overflow-hidden">
                                <div class="p-4 pt-0 text-slate-300/90 space-y-2">
                                    <p>${combo.details.explanation}</p>
                                </div>
                            </div>
                        </div>
                         <div class="accordion-item border-b border-slate-800">
                            <button class="accordion-header w-full flex justify-between items-center p-4 text-left transition-colors duration-300 hover:bg-slate-700/40">
                                <span class="font-semibold text-slate-100">📦 Produtos Inclusos</span>
                                <i class="fas fa-chevron-down transition-transform duration-300 text-slate-400"></i>
                            </button>
                            <div class="accordion-content overflow-hidden">
                                <div class="p-4 pt-0 text-slate-300/90 space-y-2">
                                    <ul class="space-y-3">
                                        ${combo.details.products.map(p => `<li class="flex items-center gap-3"><img src="${p.img}" class="w-8 h-8 rounded-full bg-slate-700 p-1"><span class="font-medium">${p.name}</span></li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 bg-slate-900/50 mt-auto">
                         <a href="${whatsappUrl}" target="_blank" 
                            class="w-full block text-center p-4 rounded-full font-bold text-lg transition-all duration-300 
                                   hover:scale-105 hover:shadow-lg hover:shadow-green-500/30
                                   bg-gradient-to-r from-primary-green to-emerald-400 text-slate-900">
                            Conversar com Especialista 🧠
                        </a>
                    </div>
                </div>
            </div>
        `;

        combosSection.innerHTML = detailHTML;
        combosSection.appendChild(createBackButton(() => renderComboList(combo.categoryKey, backCallback)));
        
        // Adiciona a lógica do acordeão após renderizar
        document.querySelectorAll('.accordion-item').forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('i');

            const toggleItem = () => {
                const isOpen = item.classList.contains('open');
                if (isOpen) {
                    content.style.maxHeight = '0px';
                    icon.classList.remove('rotate-180');
                    item.classList.remove('open');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.classList.add('rotate-180');
                    item.classList.add('open');
                }
            };
            
            header.addEventListener('click', toggleItem);
            
            if (item.classList.contains('open')) {
                setTimeout(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.classList.add('rotate-180');
                }, 10);
            }
        });
    }

    // --- FUNÇÃO DE LISTAGEM DE COMBOS ATUALIZADA ---
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

    // --- FUNÇÃO DE CATEGORIAS ATUALIZADA ---
    function showComboCategories(backCallback) {
        const categoriesHTML = Object.entries(categoryDisplayInfo).map(([key, text]) => 
            `<button data-category-key="${key}" class="link-button combo-category-btn group flex justify-center items-center gap-3 w-full max-w-sm p-4 h-auto text-center">
                <span class="font-semibold text-slate-200 group-hover:text-white">${text}</span>
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
        // Estilos alinhados com o products.js, mas com o nome da classe .product-card-detail para reutilização
        style.textContent = `
            .product-card-detail { background-color: var(--surface-dark); border: 1px solid #333; border-radius: 1.5rem; overflow: hidden; display: flex; flex-direction: column; }
            .accordion-content { transition: max-height 0.5s ease-in-out; }
        `;
        document.head.appendChild(style);
    }

    // --- Main Exposed Function ---
    window.renderCombosContent = (backCallback) => {
        injectDetailStyles();
        showComboCategories(backCallback);
    };

    // --- Expor os dados para o Gabi GPT ---
    window.gabiFitApp = window.gabiFitApp || {};
    window.gabiFitApp.combosData = originalCombosData;

})();
