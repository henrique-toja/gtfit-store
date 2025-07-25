// main.js
(function() {
    // Garante que o namespace principal da aplicação exista
    window.gabiFitApp = window.gabiFitApp || {};

    // Este arquivo será responsável apenas por carregar e iniciar a Vitrine.
    // Toda a lógica de UI e renderização foi movida para vitrine.js

    // A função de inicialização da Vitrine será chamada após o DOM carregar
    // e após vitrine.js ter sido carregado.
    document.addEventListener('DOMContentLoaded', () => {
        const appContainer = document.getElementById('app-container');

        // Verifica se a função de inicialização da vitrine existe
        // e a chama, passando o container principal da aplicação.
        if (window.gabiFitApp.Vitrine && window.gabiFitApp.Vitrine.initialize) {
            window.gabiFitApp.Vitrine.initialize(appContainer);
        } else {
            // Caso algo dê errado e a vitrine não seja inicializada
            console.error('Erro: gabiFitApp.Vitrine.initialize não encontrada. Verifique o carregamento de vitrine.js.');
            if (appContainer) {
                appContainer.innerHTML = '<p class="text-center text-red-500">Erro ao carregar os módulos da aplicação. Por favor, tente novamente.</p>';
            }
        }

        // Lógica do chat bubble (se desejar manter aqui, é um elemento de UI independente)
        const chatBubble = document.querySelector('.chat-bubble');
        if (chatBubble) {
            chatBubble.style.display = 'block';
        }
    });

    // Se houver alguma função que precise ser globalmente acessível
    // para outros scripts externos (ex: um botão no HTML chama renderMainShowcase),
    // você pode expô-la aqui. No entanto, o ideal é que a maioria das interações
    // seja gerenciada dentro do vitrine.js.
    // Por exemplo, se o botão de recarregar a página na header for para a vitrine principal:
    // window.gabiFitApp.showMainShowcase = () => {
    //     if (window.gabiFitApp.Vitrine && window.gabiFitApp.Vitrine.renderMainShowcase) {
    //         window.gabiFitApp.Vitrine.renderMainShowcase();
    //     }
    // };

})();
