// products.js
(function() {
    const domain = 'https://www.gtfit.store';
    const produtos = [
        // ---- COLE AQUI TODO O SEU ARRAY DE PRODUTOS IGUAL AO SEU EXEMPLO ----
        // ...
    ];

    // Exporte os dados para uso global
    window.gabiFitData = window.gabiFitData || {};
    window.gabiFitData.domain = domain;
    window.gabiFitData.produtos = produtos;
})();