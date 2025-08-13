// Arquivo: js/user.js

document.addEventListener('DOMContentLoaded', () => {
    // Lógica para a página de login
    // Verifica se estamos na página de login e se o formulário existe
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        // Adiciona um evento de 'submit' ao formulário de login
        loginForm.addEventListener('submit', (e) => {
            // Previne o recarregamento da página
            e.preventDefault(); 
            
            // Pega os valores dos campos do formulário
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;

            // Validação simples dos campos
            if (fullName && phone && email) {
                // Chama a função para fazer o login
                loginUser(fullName, email);
            } else {
                alert('Por favor, preencha todos os campos para continuar.');
            }
        });
    }

    // Função de login que armazena os dados do usuário (RF01)
    function loginUser(fullName, email) {
        // Armazena os dados do usuário no armazenamento local do navegador
        // Isso simula uma sessão de login simples
        localStorage.setItem('senacDash_userName', fullName);
        localStorage.setItem('senacDash_userEmail', email);

        // Redireciona o usuário para a página do dashboard após o login
        window.location.href = '../dashboard.html';
    }

    // A função de logout está no arquivo app.js, pois é usada em todo o site
    // Mas a lógica para ela poderia estar aqui também.

    // A função `loginUser` é a principal responsável por lidar com o RF01 (Login de Usuário).
    // Ela armazena os dados completos do usuário no `localStorage` do navegador
    // e depois o redireciona para a página principal do jogo.
});