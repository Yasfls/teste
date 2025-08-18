// Arquivo: js/game.js

document.addEventListener('DOMContentLoaded', () => {

    // Referências aos elementos da página
    const scoreElement = document.getElementById('scoreValue');
    const levelElement = document.getElementById('levelValue');
    const hitsElement = document.getElementById('hitsValue');
    const gameArea = document.getElementById('gameArea');
    const gameInstructions = document.querySelector('.game-instructions');
    const startGameButton = document.getElementById('startGameButton');

    // Variáveis do jogo
    let score = 0;
    let level = 1;
    let hits = 0;
    let gameInterval;
    let gameItemsInterval;
    let itemMoveInterval;
    let gameDuration = 30; // Duração do jogo em segundos
    let timeLeft = gameDuration;
    
    // Dados salvos no localStorage
    let highScore = localStorage.getItem('senacDash_highScore') || 0;
    let totalGames = localStorage.getItem('senacDash_totalGames') || 0;

    // --- FUNÇÕES DE LÓGICA DO JOGO ---

    // Função para iniciar o jogo
    function startGame() {
        // Oculta as instruções e o botão de iniciar
        gameInstructions.style.display = 'none';
        startGameButton.style.display = 'none';

        // Reseta as variáveis para um novo jogo
        score = 0;
        level = 1;
        hits = 0;
        timeLeft = gameDuration;
        updateDashboard();

        // Inicia os intervalos do jogo
        gameInterval = setInterval(updateGame, 1000); // Roda a cada 1 segundo
        gameItemsInterval = setInterval(createGameItem, 1000); // Cria um item a cada 1s
        itemMoveInterval = setInterval(moveGameItems, 50); // Move os itens a cada 50ms
    }

    // Função para criar um novo item no jogo
    function createGameItem() {
        const item = document.createElement('div');
        item.classList.add('game-item');
        item.textContent = '🎓'; // Exemplo de ícone
        item.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px'; // Posição X aleatória
        item.style.top = '0px'; // Inicia no topo
        item.dataset.points = 10;
        gameArea.appendChild(item);
    }

    // Função para mover os itens do jogo
    function moveGameItems() {
        const items = document.querySelectorAll('.game-item');
        items.forEach(item => {
            let top = parseInt(item.style.top) || 0;
            top += 5; // Velocidade de queda
            item.style.top = top + 'px';

            // Remove o item se ele sair da tela
            if (top > gameArea.offsetHeight) {
                item.remove();
            }
        });
    }

    // Função para atualizar o jogo (chamada a cada segundo)
    function updateGame() {
        timeLeft--;
        if (timeLeft <= 0) {
            endGame();
        }
    }

    // Função para atualizar os valores no dashboard
    function updateDashboard() {
        scoreElement.textContent = score;
        levelElement.textContent = level;
        hitsElement.textContent = hits;
    }

    // Função para salvar o score e o total de jogos
    function saveGameStats() {
        totalGames++;
        localStorage.setItem('senacDash_totalGames', totalGames);

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('senacDash_highScore', highScore);
        }
    }

    // Função para encerrar o jogo
    function endGame() {
        // Limpa todos os intervalos para parar o jogo
        clearInterval(gameInterval);
        clearInterval(gameItemsInterval);
        clearInterval(itemMoveInterval);

        // Remove todos os itens do jogo
        const items = document.querySelectorAll('.game-item');
        items.forEach(item => item.remove());

        // Salva as estatísticas do jogo
        saveGameStats();

        // Mostra o botão e as instruções para que o usuário possa jogar novamente
        gameInstructions.style.display = 'block';
        startGameButton.style.display = 'block';

        alert(`Fim de jogo!\nSua pontuação final foi: ${score}\nVocê acertou: ${hits} itens.`);
    }

    // --- EVENT LISTENERS ---

    // Evento de clique para os itens do jogo
    gameArea.addEventListener('click', (event) => {
        if (event.target.classList.contains('game-item')) {
            const item = event.target;
            const points = parseInt(item.dataset.points);
            score += points;
            hits++;
            item.remove(); // Remove o item após o clique
            updateDashboard();
        }
    });

    // Evento para iniciar o jogo ao clicar no botão
    startGameButton.addEventListener('click', startGame);

});