document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("reportsTable")) {
        console.log("Página de relatórios carregada.");

        const reportsTableBody = document.querySelector("#reportsTable tbody");
        const searchInput = document.getElementById("searchInput");
        
        // Carrega os dados reais do localStorage
        let gamesHistory = JSON.parse(localStorage.getItem("senacDash_gamesHistory")) || [];

        function renderTable(data) {
            reportsTableBody.innerHTML = "";

            if (data.length === 0) {
                reportsTableBody.innerHTML = '<tr><td colspan="4">Nenhum registro encontrado.</td></tr>';
                return;
            }

            data.forEach((game) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${game.date}</td>
                    <td>${game.score}</td>
                    <td>${game.level}</td>
                    <td>${game.time}</td>
                `;
                reportsTableBody.appendChild(row);
            });
        }

        function filterTable() {
            const searchTerm = searchInput.value.toLowerCase();

            const filteredData = gamesHistory.filter((game) => {
                return (
                    game.date.includes(searchTerm) ||
                    String(game.score).includes(searchTerm) ||
                    String(game.level).includes(searchTerm) ||
                    game.time.includes(searchTerm)
                );
            });

            renderTable(filteredData);
        }

        // Renderiza a tabela com os dados reais ao carregar a página
        renderTable(gamesHistory);
        searchInput.addEventListener("input", filterTable);
    }
});