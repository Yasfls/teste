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
        // --- Pool de sons de clique ---
        const clickSoundPool = Array.from({ length: 5 }, () => {
            const audio = new Audio('click.mp3');
            audio.preload = 'auto';
            return audio;
        });
 
        // Música de fundo
        const backgroundMusic = new Audio('background_music.mp3');
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.5;
 
        // --- Função para destravar os sons na primeira interação ---
        function unlockAudio() {
            clickSoundPool.forEach(sound => {
                sound.volume = 0; // mudo
                sound.play().then(() => {
                    sound.pause();
                    sound.currentTime = 0;
                    sound.volume = 1.5; // restaura
                }).catch(() => {});
            });
 
            backgroundMusic.volume = 0;
            backgroundMusic.play().then(() => {
                backgroundMusic.pause();
                backgroundMusic.currentTime = 0;
                backgroundMusic.volume = 0.5;
            }).catch(() => {});
 
            document.removeEventListener("click", unlockAudio);
        }
 
        // Garante desbloqueio no primeiro clique do usuário
        document.addEventListener("click", unlockAudio);
 
        // --- Função para tocar o som de clique ---
        function playClickSound() {
            const sound = clickSoundPool.find(s => s.paused);
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(e => console.error("Erro ao tocar o som do clique:", e));
            }
        }
        let score = 0;
        let level = 1;
        let hits = 0;
        let speed = 1500; 
        let removeTime = 1000;
        let gameInterval;
        let isPaused = true; 
        let activeItemTimeouts = [];
        const itemTypes = ['caneta', 'calculadora', 'notebook', 'livro', 'mochila', 'tablet'];
        const itemsToWin = 10;
 
        window.addEventListener('beforeunload', saveGameData);
 
        // --- Funções do Jogo ---
 
        function startGame() {
            if (!isPaused) return;
 
            isPaused = false;
            gameInstructions.style.display = 'none';
            toggleGameButton.textContent = 'Pausar Jogo';
            resetGameButton.style.display = 'inline-block';
            backgroundMusic.play().catch(e => console.error("Erro ao tocar a música de fundo:", e));
 
            incrementTotalGames();
            loadGameData();
            updateDisplay();
            gameInterval = setInterval(createGameItem, speed);
        }
 
        function pauseGame() {
            if (isPaused) return;
            isPaused = true;
            clearInterval(gameInterval);
            clearAllItems();
            toggleGameButton.textContent = 'Retomar Jogo';
            backgroundMusic.pause();
            saveGameData();
        }
 
        function resetGame() {
            pauseGame();
            clearAllItems();
            gameArea.innerHTML = '';
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
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            updateDisplay();
        }
        function clearAllItems() {
            gameArea.innerHTML = '';
            activeItemTimeouts.forEach(timeout => clearTimeout(timeout));
            activeItemTimeouts = [];
        }
 
        function loadGameData() {
            const savedScore = localStorage.getItem('senacDash_currentScore');
            const savedLevel = localStorage.getItem('senacDash_currentLevel');
            const savedHits = localStorage.getItem('senacDash_currentHits');
 
            if (savedScore) score = parseInt(savedScore);
            if (savedLevel) level = parseInt(savedLevel);
            if (savedHits) hits = parseInt(savedHits);
        }
 
        function saveGameData() {
            localStorage.setItem('senacDash_currentScore', score);
            localStorage.setItem('senacDash_currentLevel', level);
            localStorage.setItem('senacDash_currentHits', hits);
            const highScore = localStorage.getItem('senacDash_highScore') || 0;
            if (score > parseInt(highScore)) {
                localStorage.setItem('senacDash_highScore', score);
            }
        }
        function incrementTotalGames() {
            let totalGames = localStorage.getItem('senacDash_totalGames') || 0;
            totalGames = parseInt(totalGames) + 1;
            localStorage.setItem('senacDash_totalGames', totalGames);
        }
 
        function createGameItem() {
            const randomItemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
            const item = document.createElement('div');
            item.className = `game-item item-${randomItemType}`;
 
            const gameAreaRect = gameArea.getBoundingClientRect();
            const top = Math.random() * (gameAreaRect.height - 100);
            const left = Math.random() * (gameAreaRect.width - 100);
            item.style.top = `${top}px`;
            item.style.left = `${left}px`;
 
            gameArea.appendChild(item);
 
            item.addEventListener('click', () => {
                item.remove();
                updateScore(100);
                updateHits();
                playClickSound();
            });
 
            const itemTimeout = setTimeout(() => {
                if (gameArea.contains(item)) {
                    item.remove();
                }
            }, removeTime);
            activeItemTimeouts.push(itemTimeout);
        }
 
        function updateScore(points) {
            score += points;
            scoreValue.textContent = score;
        }
 
        function updateHits() {
            hits++;
            hitsValue.textContent = hits;
            if (hits % itemsToWin === 0 && hits > 0) {
                levelUp();
            }
        }
        function levelUp() {
            level++;
            levelValue.textContent = level;
            speed = Math.max(500, speed - 150);
            removeTime = Math.max(500, removeTime - 100);
            clearInterval(gameInterval);
            gameInterval = setInterval(createGameItem, speed);
 
            alert(`Parabéns! Você alcançou o Nível ${level}! A velocidade irá aumentar.`);
        }
 
        function updateDisplay() {
            scoreValue.textContent = score;
            levelValue.textContent = level;
            hitsValue.textContent = hits;
        }
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