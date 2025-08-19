document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("reportsTable")) {
    console.log("Página de relatórios carregada.");

    const reportsTableBody = document.querySelector("#reportsTable tbody");
    const searchInput = document.getElementById("searchInput");
    const gamesHistory = [
      { date: "2025-08-10", score: 2500, time: "2:30" },
      { date: "2025-08-10", score: 1200, time: "1:45" },
      { date: "2025-08-09", score: 3000, time: "3:15" },
      { date: "2025-08-08", score: 800, time: "1:05" },
      { date: "2025-08-08", score: 1500, time: "2:00" },
    ];

    function renderTable(data) {
      reportsTableBody.innerHTML = "";

      if (data.length === 0) {
        reportsTableBody.innerHTML =
          '<tr><td colspan="3">Nenhum registro encontrado.</td></tr>';
        return;
      }

      data.forEach((game) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${game.date}</td>
                    <td>${game.score}</td>
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
          game.time.includes(searchTerm)
        );
      });

      renderTable(filteredData);
    }

    renderTable(gamesHistory);
    searchInput.addEventListener("input", filterTable);
  }
});
