// main.js
(function() {
    // Garante que o namespace principal da aplicação exista
    window.gabiFitApp = window.gabiFitApp || {};

    // A função de inicialização da Vitrine será chamada após o DOM carregar
    // e após vitrine.js ter sido carregado.
    document.addEventListener('DOMContentLoaded', () => {
        const appContainer = document.getElementById('app-container');

        // Um pequeno atraso para garantir que todos os scripts 'defer' sejam processados.
        // Em um ambiente de produção, com bundling, isso seria menos crítico.
        // Para depuração, ajuda a isolar problemas de carregamento/timing.
        setTimeout(() => {
            if (window.gabiFitApp.Vitrine && window.gabiFitApp.Vitrine.initialize) {
                window.gabiFitApp.Vitrine.initialize(appContainer);
            } else {
                console.error('Erro: gabiFitApp.Vitrine.initialize não encontrada. Verifique o carregamento de vitrine.js ou problemas de script.');
                if (appContainer) {
                    appContainer.innerHTML = '<p class="text-center text-red-500">Erro ao carregar os módulos da aplicação. Por favor, tente novamente.</p>';
                }
            }

            // Lógica do chat bubble (se desejar manter aqui, é um elemento de UI independente)
            const chatBubble = document.querySelector('.chat-bubble');
            if (chatBubble) {
                chatBubble.style.display = 'block';
            }

            // Adiciona o event listener para o logo na header
            const headerLogoLink = document.getElementById('header-logo-link');
            if (headerLogoLink && window.gabiFitApp.Vitrine && window.gabiFitApp.Vitrine.renderMainShowcase) {
                headerLogoLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.gabiFitApp.Vitrine.renderMainShowcase();
                });
            }
        }, 0); // Atraso mínimo para garantir que o navegador processou todos os 'defer'
    });
})();