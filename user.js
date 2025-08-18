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
            const phone = document.getElementById('phone').value;

            // Validação simples dos campos
            if (fullName && email && phone) {
                // Chama a função para fazer o login
                loginUser(fullName, email, phone);
            } else {
                alert('Por favor, preencha todos os campos para continuar.');
            }
        });
    }

    // Função de login que armazena os dados do usuário (RF01)
    function loginUser(fullName, email, phone) {
        // Armazena os dados do usuário no armazenamento local do navegador
        // Isso simula uma sessão de login simples
        localStorage.setItem('senacDash_userName', fullName);
        localStorage.setItem('senacDash_userEmail', email);
        localStorage.setItem('senacDash_userPhone', phone);

        // Redireciona o usuário para a página do dashboard após o login
        window.location.href = 'dashboard.html';
    }
});