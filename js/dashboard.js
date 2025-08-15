// Arquivo: js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('gameArea')) {
        
        console.log("Dashboard carregado. Inicializando o jogo...");

        // A lógica de inicialização do jogo está em game.js,
        // mas podemos adicionar aqui a lógica para carregar o estado
        // do jogo (se houvesse um sistema de salvamento).

        // Adiciona um listener para a área do jogo
        const gameArea = document.getElementById('gameArea');
        if (gameArea) {
            gameArea.addEventListener('click', (e) => {
                // Adicione feedback visual se o usuário clicar
                // em um lugar vazio, como uma mensagem de "Errou!".
            });
        }
        
        // Adicione um botão para reiniciar o jogo se necessário.
        // Por exemplo, um botão com id="resetGameBtn"
        const resetGameBtn = document.getElementById('resetGameBtn');
        if (resetGameBtn) {
             resetGameBtn.addEventListener('click', () => {
                // Lógica para reiniciar o jogo
                // localStorage.clear() ou algo similar para um novo jogo do zero
                alert("O jogo foi reiniciado!");
                window.location.reload(); // Recarrega a página para um novo jogo
            });
        }
    }
});