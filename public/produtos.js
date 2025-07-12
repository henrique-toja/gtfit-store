document.addEventListener('DOMContentLoaded', () => {
    const produtos = [
        { "id": 1, "nome": "🟢 SUPER SLIM X 🟢", "preco": 169.90, "categoria": "Emagrecedores", "imagem": "/assets/produtos/slimx.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/slim-super-x" },
        { "id": 2, "nome": "🟢 GURIA SHAPE DETOX 🟢", "preco": 175.00, "categoria": "Emagrecedores", "imagem": "/assets/produtos/detox.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/guria-shape-detox" },
        { "id": 3, "nome": "🟣 GURIA SHAPE ROXO 🟣", "preco": 285.00, "categoria": "Emagrecedores", "imagem": "/assets/produtos/roxo.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/guria-shape" },
        { "id": 4, "nome": "⚫ GURIA SHAPE BLACK ⚫", "preco": 330.00, "categoria": "Emagrecedores", "imagem": "/assets/produtos/black.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/guria-shape-black" },
        { "id": 5, "nome": "🟡 GURIA SHAPE GOLD 🟡", "preco": 499.99, "categoria": "Emagrecedores", "imagem": "/assets/produtos/gold.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/shape-xtreme" },
        { "id": 6, "nome": "💪🏼 SHAPE XTREME BLACK MASCULINO 💪🏼", "preco": 330.00, "categoria": "Emagrecedores", "imagem": "/assets/produtos/xtreme.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/shape-xtreme-black" },
        { "id": 7, "nome": "💧 GURIA SHAPE DETOX GOTAS – FÓRMULA NATURAL 4 EM 1 💧", "preco": 135.00, "categoria": "Emagrecedores", "imagem": "/assets/produtos/gotas.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/guria-shape-em-gotas" },
        { "id": 8, "nome": "🍓 WHEY PROTEIN GURIA SHAPE – SABOR MORANGO 🍓", "preco": 210.00, "categoria": "Complementos", "imagem": "/assets/produtos/whey.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/whey-proteina" },
        { "id": 9, "nome": "💥 CREATINA GURIA SHAPE 💥", "preco": 150.00, "categoria": "Complementos", "imagem": "/assets/produtos/creatina.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/creatina" },
        { "id": 10, "nome": "⚡ GURIA SHAPE ENERGIA COFFE ⚡", "preco": 220.00, "categoria": "Complementos", "imagem": "/assets/produtos/coffe.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/estimulantes/guria-shape-coffee" },
        { "id": 11, "nome": "🍦 SHAKE SUBSTITUTO DE REFEIÇÃO – SABOR BAUNILHA 🍦", "preco": 220.00, "categoria": "Complementos", "imagem": "/assets/produtos/shakebaunilia.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/estimulantes/shake-guria-shape-baunilha" },
        { "id": 12, "nome": "🍌 SHAKE SUBSTITUTO DE REFEIÇÃO – SABOR BANANA 🍌", "preco": 220.00, "categoria": "Complementos", "imagem": "/assets/produtos/shakebanana.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/estimulantes/shake-guria-shape-banana" },
        { "id": 13, "nome": "🌙 GURIA SHAPE MELATONINA – FILME SUBLINGUAL 🌙", "preco": 140.00, "categoria": "Complementos", "imagem": "/assets/produtos/melatonina.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/estimulantes/melatonina-fio" },
        { "id": 14, "nome": "🌙 GURIA SHAPE SLEEP – GOTAS 🌙", "preco": 135.00, "categoria": "Complementos", "imagem": "/assets/produtos/sleep.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/sleep-gotas" },
        { "id": 15, "nome": "🤍 GURIA SHAPE MELASM – CLAREADOR DE MANCHAS 🤍", "preco": 135.00, "categoria": "Complementos", "imagem": "/assets/produtos/melasm.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/guria-shape-melasm" },
        { "id": 16, "nome": "🟠 GURIA SHAPE CELUX 🟠", "preco": 150.00, "categoria": "Complementos", "imagem": "/assets/produtos/cellux.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/celux" },
        { "id": 17, "nome": "⚪ COLÁGENO HIDROLISADO – LINHA GABRIELA TORRACA ⚪", "preco": 150.00, "categoria": "Complementos", "imagem": "/assets/produtos/colageno.png", "link_loja": "https://www.gabrielatorraca.com.br/suplementos-naturais/emagrecedores/colageno-hidrolisado" }
    ];

    function generateProductPitch(produto) {
        switch (produto.id) {
            case 1: return "Controle o apetite com fibras e mantenha a pele firme. A solução natural para um emagrecimento eficaz.";
            case 2: return "Sente o corpo inchado? Este detox é o reset que seu organismo precisa para regular hormônios e reduzir a inflamação.";
            case 3: return "Ideal para rotinas agitadas. Controle a ansiedade e a fome emocional para emagrecer de forma tranquila.";
            case 4: return "O aliado poderoso para quem já tentou de tudo. Atua na gordura abdominal e controla a compulsão por doces.";
            case 5: return "A fórmula mais avançada para resultados de elite. Potencialize seu metabolismo, blinde sua imunidade e equilibre o humor.";
            case 6: return "Performance máxima para o corpo masculino. Definição, menos inchaço e um metabolismo resetado para queimar gordura.";
            case 7: return "A solução 4 em 1 para o bem-estar feminino. Desinche, regule hormônios, controle a fome e acalme a mente com gotas práticas.";
            case 8: return "Conquiste um corpo definido sem abrir mão da massa magra. A proteína ideal para sua recuperação pós-treino.";
            case 9: return "Eleve sua força e performance. A creatina pura que garante mais energia nos treinos e músculos definidos.";
            case 10: return "Seu maior aliado pré-treino. Energia explosiva, foco mental e uma fórmula que queima gordura enquanto protege seus músculos.";
            case 11: case 12: return "Uma refeição completa, nutritiva e com poucas calorias para a rotina corrida. Emagreça de forma prática e deliciosa.";
            case 13: case 14: return "Durma bem e emagreça. A fórmula que regula seu sono, controla o apetite noturno e diminui a ansiedade.";
            case 15: return "Sua pele uniforme e livre de manchas. Uma solução de dentro para fora que trata o melasma sem agressão.";
            case 16: return "Dê adeus ao aspecto de 'casca de laranja'. Esta fórmula atua na celulite, melhorando a firmeza e a circulação.";
            case 17: return "Pele firme e sem flacidez durante e após o emagrecimento. O suporte para unhas, cabelos e articulações.";
            default: return "Descubra a melhor versão de si mesma com o suporte ideal para sua jornada.";
        }
    }

    // --- CATEGORIZAÇÃO ATUALIZADA ---
    const categorias = {
        emagrecedores: produtos.filter(p => [1, 2, 3, 4, 5, 7].includes(p.id)),
        essenciais: produtos.filter(p => [8, 9, 10, 11, 12].includes(p.id)),
        uteis: produtos.filter(p => [13, 14, 15, 16, 17].includes(p.id)), // Celux (16) movido para cá
        masculino: produtos.filter(p => p.id === 6),
    };

    // Função para gerar o HTML de um único card
    const createProductCardHTML = (produto) => {
        const imageUrl = `https://www.projetoslim.fitness${produto.imagem}`;
        const precoFormatado = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;
        const pitch = generateProductPitch(produto);
        return `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${imageUrl}" alt="${produto.nome}" class="product-image" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${produto.nome}</h3>
                    <p class="product-pitch">${pitch}</p>
                    <div class="product-price">${precoFormatado}</div>
                    <a href="${produto.link_loja}" target="_blank" class="product-link">
                        Ver na Loja
                    </a>
                </div>
            </div>`;
    };

    // Função para renderizar produtos em um carrossel
    function renderCarouselProducts(category, wrapperId) {
        const wrapper = document.getElementById(wrapperId);
        if (!wrapper) return;
        wrapper.innerHTML = categorias[category].map(produto =>
            `<div class="swiper-slide">${createProductCardHTML(produto)}</div>`
        ).join('');
    }

    // Função para renderizar um produto único
    function renderSingleProduct(category, containerId) {
        const container = document.getElementById(containerId);
        if (!container || categorias[category].length === 0) return;
        const produto = categorias[category][0];
        container.innerHTML = createProductCardHTML(produto);
    }

    // Renderiza todas as categorias
    renderCarouselProducts('emagrecedores', 'emagrecedores-wrapper');
    renderCarouselProducts('essenciais', 'essenciais-wrapper');
    renderCarouselProducts('uteis', 'uteis-wrapper');
    renderSingleProduct('masculino', 'masculino-container');

    // --- INICIALIZAÇÃO DO SWIPER ---
    document.querySelectorAll('.swiper-container').forEach(swiperEl => {
        new Swiper(swiperEl, {
            loop: false,
            spaceBetween: 16,
            slidesPerView: 'auto',
            navigation: {
                nextEl: swiperEl.querySelector('.swiper-button-next'),
                prevEl: swiperEl.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
                768: { spaceBetween: 24 }
            }
        });
    });
});
