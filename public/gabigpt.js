// Aguarda o carregamento completo do DOM para garantir que todos os elementos existam
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona os elementos da interface do chat
    const chatWidget = document.getElementById('chat-widget');
    const chatModal = document.getElementById('chat-modal');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatBody = document.getElementById('chat-body'); // Onde as mensagens aparecerão

    // Verifica se todos os elementos necessários foram encontrados
    if (chatWidget && chatModal && closeChatBtn) {
        
        // Função para abrir a modal do chat
        const openChat = () => {
            chatModal.classList.remove('hidden');
            chatModal.classList.add('flex');
        };

        // Função para fechar a modal do chat
        const closeChat = () => {
            chatModal.classList.add('hidden');
            chatModal.classList.remove('flex');
        };

        // Adiciona um evento de clique ao widget flutuante para abrir o chat
        chatWidget.addEventListener('click', openChat);

        // Adiciona um evento de clique ao botão 'X' para fechar o chat
        closeChatBtn.addEventListener('click', closeChat);

        // Adiciona um evento de clique na área do backdrop (fora da janela do chat) para fechar
        chatModal.addEventListener('click', (event) => {
            // Se o clique foi no elemento de fundo (o próprio modal) e não em seus filhos
            if (event.target === chatModal) {
                closeChat();
            }
        });

        // O fluxo de conversa do chat (cálculo de IMC, etc.) será adicionado aqui.
        // Exemplo:
        // const userInput = document.querySelector('#chat-modal input');
        // const sendButton = document.querySelector('#chat-modal button');
        // sendButton.addEventListener('click', () => { /* lógica da conversa */ });

    } else {
        // Log de erro caso algum elemento não seja encontrado
        console.error("Elementos do chat não foram encontrados no DOM.");
    }
});
