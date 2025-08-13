// Arquivo: js/game.js

document.addEventListener('DOMContentLoaded', () => {
    // Apenas inicializa a lógica do jogo se estivermos na página do dashboard
    if (document.getElementById('gameArea')) {
        
        // --- Variáveis Globais do Jogo ---
        const gameArea = document.getElementById('gameArea');
        const scoreValue = document.getElementById('scoreValue');
        const levelValue = document.getElementById('levelValue');
        
        let score = 0;
        let level = 1;
        let speed = 1000; // Velocidade inicial dos itens (em milissegundos)
        let maxScore = 3000; // Pontuação máxima para a premiação
        let gameInterval;
        
        // Tipos de itens que aparecerão no jogo
        const itemTypes = ['caneta', 'copo']; 

        // --- Funções do Jogo ---

        // Função principal que inicia o jogo
        function startGame() {
            // Limpa a área do jogo de qualquer item antigo
            gameArea.innerHTML = ''; 
            
            // Inicia o intervalo de tempo para criar novos itens
            gameInterval = setInterval(createGameItem, speed);
        }

        // Cria um novo item na tela (RF09)
        function createGameItem() {
            // Escolhe um tipo de item aleatoriamente
            const randomItemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
            
            // Cria o elemento HTML do item
            const item = document.createElement('div');
            item.className = `game-item item-${randomItemType}`;

            // Define a posição inicial do item (aleatória na tela)
            const gameAreaRect = gameArea.getBoundingClientRect();
            const top = Math.random() * (gameAreaRect.height - 60); // 60px é a altura do item
            const left = Math.random() * (gameAreaRect.width - 60);  // 60px é a largura do item
            
            item.style.top = `${top}px`;
            item.style.left = `${left}px`;

            // Adiciona o item à área do jogo
            gameArea.appendChild(item);

            // Adiciona o evento de clique ao item
            item.addEventListener('click', () => {
                // Remove o item após o clique
                item.remove(); 
                // Aumenta a pontuação
                updateScore(100); 
            });

            // Remove o item automaticamente após 2 segundos, se não for clicado
            setTimeout(() => {
                if (gameArea.contains(item)) {
                    item.remove();
                }
            }, 2000); 
        }

        // Atualiza a pontuação do jogador (RF09)
        function updateScore(points) {
            score += points;
            scoreValue.textContent = score;

            // Verifica se a pontuação chegou ao máximo
            if (score >= maxScore) {
                // Para o jogo
                clearInterval(gameInterval); 
                alert('Parabéns! Você alcançou a pontuação máxima e ganhou um prêmio!');
                // Aqui você pode adicionar lógica para mostrar o prêmio
            }

            // Aumenta o nível e a velocidade a cada 500 pontos (RF10)
            if (score % 500 === 0 && score > 0) {
                levelUp();
            }
        }
        
        // Aumenta o nível e a dificuldade do jogo (RF10)
        function levelUp() {
            level++;
            levelValue.textContent = level;
            
            // Diminui o tempo do intervalo para criar itens mais rapidamente
            speed -= 100; 
            
            // Limpa o intervalo anterior para iniciar um novo com a nova velocidade
            clearInterval(gameInterval);
            gameInterval = setInterval(createGameItem, speed);

            alert(`Parabéns! Você alcançou o Nível ${level}! A velocidade irá aumentar.`);
        }

        // Inicia o jogo quando a página é carregada
        startGame();
    }
});