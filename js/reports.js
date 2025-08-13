// Arquivo: js/reports.js

document.addEventListener('DOMContentLoaded', () => {
    // Apenas executa a lógica se estiver na página de relatórios
    if (document.getElementById('reportsTable')) {
        
        console.log("Página de relatórios carregada.");
        
        // --- Variáveis de Interface ---
        const reportsTableBody = document.querySelector('#reportsTable tbody');
        const searchInput = document.getElementById('searchInput');

        // --- Dados de Exemplo ---
        // Aqui, simulamos um histórico de jogos. Em uma aplicação real,
        // esses dados viriam de um banco de dados ou de uma API.
        const gamesHistory = [
            { date: '2025-08-10', score: 2500, time: '2:30' },
            { date: '2025-08-10', score: 1200, time: '1:45' },
            { date: '2025-08-09', score: 3000, time: '3:15' },
            { date: '2025-08-08', score: 800, time: '1:05' },
            { date: '2025-08-08', score: 1500, time: '2:00' },
        ];

        // --- Funções de Relatórios ---

        // Função para renderizar a tabela com os dados (RF06)
        function renderTable(data) {
            // Limpa o corpo da tabela antes de adicionar novos dados
            reportsTableBody.innerHTML = '';
            
            // Se não houver dados, mostra uma mensagem
            if (data.length === 0) {
                reportsTableBody.innerHTML = '<tr><td colspan="3">Nenhum registro encontrado.</td></tr>';
                return;
            }

            // Itera sobre cada item do array de dados e cria uma linha na tabela
            data.forEach(game => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${game.date}</td>
                    <td>${game.score}</td>
                    <td>${game.time}</td>
                `;
                reportsTableBody.appendChild(row);
            });
        }
        
        // Função para filtrar os dados da tabela (RF07)
        function filterTable() {
            const searchTerm = searchInput.value.toLowerCase();
            
            // Filtra o array `gamesHistory` com base no termo de busca
            const filteredData = gamesHistory.filter(game => {
                // Converte todos os valores para string e minúsculo para comparar
                return (
                    game.date.includes(searchTerm) ||
                    String(game.score).includes(searchTerm) ||
                    game.time.includes(searchTerm)
                );
            });
            
            // Renderiza a tabela com os dados filtrados
            renderTable(filteredData);
        }

        // --- Inicialização ---

        // Renderiza a tabela pela primeira vez com todos os dados
        renderTable(gamesHistory);

        // Adiciona um evento de 'input' ao campo de busca (RF07)
        // Isso faz com que a tabela seja filtrada em tempo real, a cada caractere digitado
        searchInput.addEventListener('input', filterTable);
    }
});