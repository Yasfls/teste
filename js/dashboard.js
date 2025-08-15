// Arquivo: js/dashboard.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Lógica para o menu hambúrguer em telas pequenas
    const toggleButton = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');

    if (toggleButton && sidebar) {
        toggleButton.addEventListener('click', () => {
            // Alterna a classe 'active' para mostrar ou esconder a barra lateral
            sidebar.classList.toggle('active');
        });
    }

    // Você pode adicionar mais lógica do seu dashboard aqui, por exemplo:
    
    // Exemplo: Mostrar o nome do usuário logado
    const userName = localStorage.getItem('senacDash_userName');
    if (userName) {
        const userNameDisplay = document.getElementById('userNameDisplay');
        if (userNameDisplay) {
            userNameDisplay.textContent = userName;
        }
    }
});