// Arquivo: js/game.js
document.addEventListener('DOMContentLoaded', () => {
    // Apenas inicializa a lógica do jogo se estivermos na página do dashboard
    if (document.getElementById('gameArea')) {
        console.log("Dashboard carregado. Inicializando o jogo...");
        // --- Variáveis Globais do Jogo ---
        const gameArea = document.getElementById('gameArea');
        const scoreValue = document.getElementById('scoreValue');
        const levelValue = document.getElementById('levelValue');
        const hitsValue = document.getElementById('hitsValue');
        const toggleGameButton = document.getElementById('toggleGameButton');
        const resetGameButton = document.getElementById('resetGameButton');
        const gameInstructions = document.querySelector('.game-instructions');
        // Adicione as novas variáveis de áudio
        const clickSound = new Audio('click.mp3'); 
        const backgroundMusic = new Audio('background_music.mp3');
        backgroundMusic.loop = true; // Faz a música tocar em loop
        backgroundMusic.volume = 0.5; // Ajusta o volume (opcional)
        let score = 0;
        let level = 1;
        let hits = 0;
        let speed = 1500; // Tempo inicial para um novo item aparecer (em milissegundos)
        let removeTime = 1000; // Tempo para o item desaparecer (em milissegundos)
        let gameInterval;
        let isPaused = true; // Começa como pausado, esperando o clique do usuário
        // Armazena todos os timeouts para que possam ser cancelados
        let activeItemTimeouts = [];
        // Tipos de itens que aparecerão no jogo (devem corresponder às classes CSS)
        const itemTypes = ['caneta', 'calculadora', 'notebook', 'livro', 'mochila', 'tablet'];
        const itemsToWin = 10; // Número de itens para passar de nível
        // Adiciona um evento para quando a página for fechada ou recarregada
        window.addEventListener('beforeunload', saveGameData);
        // --- Funções do Jogo ---
        // Função principal que inicia ou retoma o jogo
        function startGame() {
            if (!isPaused) return; // Não faz nada se já estiver rodando
            isPaused = false;
            gameInstructions.style.display = 'none'; // Esconde a instrução
            toggleGameButton.textContent = 'Pausar Jogo';
            resetGameButton.style.display = 'inline-block';
            // Inicia a música de fundo
            backgroundMusic.play();
            // Incrementa o contador de jogos apenas na primeira vez que o jogo é iniciado
            incrementTotalGames();
            loadGameData();
            updateDisplay();
            // Inicia o intervalo para criar novos itens
            gameInterval = setInterval(createGameItem, speed);
        }
        // Função para pausar o jogo
        function pauseGame() {
            if (isPaused) return; // Não faz nada se já estiver pausado
            isPaused = true;
            clearInterval(gameInterval);
            // Pausa a remoção dos itens que estão na tela
            clearAllItems();
            toggleGameButton.textContent = 'Retomar Jogo';
            // Pausa a música de fundo
            backgroundMusic.pause();
            saveGameData(); // Salva o estado atual ao pausar
        }
        // Função para reiniciar o jogo
        function resetGame() {
            pauseGame();
            clearAllItems();
            gameArea.innerHTML = ''; // Limpa a área do jogo de qualquer item
            score = 0;
            level = 1;
            hits = 0;
            speed = 1500;
            removeTime = 1000;
            localStorage.removeItem('senacDash_currentScore');
            localStorage.removeItem('senacDash_currentLevel');
            localStorage.removeItem('senacDash_currentHits');
            gameInstructions.style.display = 'block';
            toggleGameButton.textContent = 'Iniciar Jogo';
            resetGameButton.style.display = 'none';
            // Para a música e a reinicia para o começo
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            updateDisplay();
        }
        // Limpa todos os itens da tela e seus timeouts
        function clearAllItems() {
            gameArea.innerHTML = '';
            activeItemTimeouts.forEach(timeout => clearTimeout(timeout));
            activeItemTimeouts = [];
        }
        // Carrega os dados salvos no localStorage
        function loadGameData() {
            const savedScore = localStorage.getItem('senacDash_currentScore');
            const savedLevel = localStorage.getItem('senacDash_currentLevel');
            const savedHits = localStorage.getItem('senacDash_currentHits');
            if (savedScore) {
                score = parseInt(savedScore);
            }
            if (savedLevel) {
                level = parseInt(savedLevel);
            }
            if (savedHits) {
                hits = parseInt(savedHits);
            }
        }
        // Salva a pontuação, o nível e a quantidade de acertos
        function saveGameData() {
            localStorage.setItem('senacDash_currentScore', score);
            localStorage.setItem('senacDash_currentLevel', level);
            localStorage.setItem('senacDash_currentHits', hits);
            // Salva a maior pontuação (High Score)
            const highScore = localStorage.getItem('senacDash_highScore') || 0;
            if (score > parseInt(highScore)) {
                localStorage.setItem('senacDash_highScore', score);
            }
        }
        // Função para incrementar o total de jogos jogados
        function incrementTotalGames() {
            let totalGames = localStorage.getItem('senacDash_totalGames') || 0;
            totalGames = parseInt(totalGames) + 1;
            localStorage.setItem('senacDash_totalGames', totalGames);
        }
        // Cria um novo item na tela
        function createGameItem() {
            const randomItemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
            const item = document.createElement('div');
            item.className = `game-item item-${randomItemType}`;
            // Define a posição aleatória do item
            const gameAreaRect = gameArea.getBoundingClientRect();
            const top = Math.random() * (gameAreaRect.height - 100); // 100px é a altura do item
            const left = Math.random() * (gameAreaRect.width - 100);  // 100px é a largura do item
            item.style.top = `${top}px`;
            item.style.left = `${left}px`;
            // Adiciona o item à área do jogo
            gameArea.appendChild(item);
            // Adiciona o evento de clique ao item
            item.addEventListener('click', () => {
                item.remove(); // Remove o item após o clique
                updateScore(100); // Aumenta a pontuação
                updateHits(); // Aumenta o contador de acertos
                // Toca o som do clique
                clickSound.currentTime = 0; // Reinicia o som para que possa ser tocado rapidamente
                clickSound.play();
            });
            // Remove o item automaticamente após 'removeTime' segundos, se não for clicado
            const itemTimeout = setTimeout(() => {
                if (gameArea.contains(item)) {
                    item.remove();
                }
            }, removeTime);
            // Armazena o ID do timeout para poder cancelá-lo depois
            activeItemTimeouts.push(itemTimeout);
        }
        // Atualiza a pontuação do jogador
        function updateScore(points) {
            score += points;
            scoreValue.textContent = score;
        }
        // Atualiza o contador de acertos
        function updateHits() {
            hits++;
            hitsValue.textContent = hits;
            // Verifica se o jogador atingiu o número de acertos para subir de nível
            if (hits % itemsToWin === 0 && hits > 0) {
                levelUp();
            }
        }
        // Aumenta o nível e a dificuldade do jogo
        function levelUp() {
            level++;
            levelValue.textContent = level;
            // Aumenta a dificuldade diminuindo o tempo de aparecimento e remoção dos itens
            speed = Math.max(500, speed - 150); // Mínimo de 500ms
            removeTime = Math.max(500, removeTime - 100); // Mínimo de 500ms
            // Reinicia o intervalo com a nova velocidade
            clearInterval(gameInterval);
            gameInterval = setInterval(createGameItem, speed);
            alert(`Parabéns! Você alcançou o Nível ${level}! A velocidade irá aumentar.`);
        }
        // Atualiza os indicadores na tela
        function updateDisplay() {
            scoreValue.textContent = score;
            levelValue.textContent = level;
            hitsValue.textContent = hits;
        }
        // Adiciona os event listeners para os botões
        toggleGameButton.addEventListener('click', () => {
            if (isPaused) {
                startGame();
            } else {
                pauseGame();
            }
        });
        resetGameButton.addEventListener('click', resetGame);
    }
});