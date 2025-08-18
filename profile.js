// Arquivo: js/profile.js

document.addEventListener('DOMContentLoaded', () => {

    // Carrega as informações do usuário logado
    const userName = localStorage.getItem('senacDash_userName');
    const userEmail = localStorage.getItem('senacDash_userEmail');
    const userPhone = localStorage.getItem('senacDash_userPhone');

    document.getElementById('profileName').textContent = userName || 'Não informado';
    document.getElementById('profileEmail').textContent = userEmail || 'Não informado';
    document.getElementById('profilePhone').textContent = userPhone || 'Não informado';

    // Carrega as estatísticas do jogo
    const highScore = localStorage.getItem('senacDash_highScore') || 0;
    const totalGames = localStorage.getItem('senacDash_totalGames') || 0;

    document.getElementById('highScore').textContent = highScore;
    document.getElementById('totalGames').textContent = totalGames;

});