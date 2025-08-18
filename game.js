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
        
        let score = 0;
        let level = 1;
        let hits = 0;
        let speed = 1500; // Tempo inicial para um novo item aparecer (em milissegundos)
        let removeTime = 1000; // Tempo para o item desaparecer (em milissegundos)
        let gameInterval;
        let removeInterval;
        
        // Tipos de itens que aparecerão no jogo (devem corresponder às classes CSS)
        const itemTypes = ['caneta', 'calculadora', 'notebook', 'livro', 'mochila', 'tablet'];
        const itemsToWin = 10; // Número de itens para passar de nível

        // Adiciona um evento para quando a página for fechada ou recarregada
        window.addEventListener('beforeunload', saveGameData);

        // --- Funções do Jogo ---

        // Função principal que inicia o jogo
        function startGame() {
            // Adicione esta linha aqui para incrementar o contador de jogos
            incrementTotalGames();
            
            gameArea.innerHTML = ''; // Limpa a área do jogo de qualquer item antigo
            loadGameData(); // Carrega dados salvos
            updateDisplay(); // Atualiza os indicadores na tela
            
            // Inicia o intervalo para criar novos itens
            gameInterval = setInterval(createGameItem, speed);
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
            });

            // Remove o item automaticamente após 'removeTime' segundos, se não for clicado
            removeInterval = setTimeout(() => {
                if (gameArea.contains(item)) {
                    item.remove();
                }
            }, removeTime);
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

        // Inicia o jogo quando a página é carregada
        startGame();
    }
});