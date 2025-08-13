// Arquivo: js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização da aplicação após o carregamento completo da página
    console.log("Aplicação Senac Dash iniciada!");
    
    // Configura a exibição do nome do usuário logado (RF02)
    // Chama a função para exibir o nome do usuário no cabeçalho
    displayUserName();

    // Adiciona o evento de clique para o botão de logout (RF08)
    const logoutButton = document.getElementById('logoutBtn');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Chama a função de logout do nosso arquivo user.js
            logoutUser(); 
        });
    }

    // Configuração dos links de navegação do menu lateral (RF03)
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Previne o comportamento padrão do link, para que possamos controlar a navegação
            e.preventDefault(); 
            
            // Simplesmente redireciona para a página correspondente ao href
            // Em uma aplicação real, você usaria roteamento para carregar o conteúdo dinamicamente
            window.location.href = e.target.href;
        });
    });

    // Função para exibir o nome do usuário no cabeçalho (RF02)
    function displayUserName() {
        // Pega o nome do usuário do armazenamento local (simulando um estado de login)
        const userName = localStorage.getItem('senacDash_userName');
        const userDisplayElement = document.getElementById('userName');

        if (userName && userDisplayElement) {
            userDisplayElement.textContent = userName;
        } else if (userDisplayElement) {
            // Caso não haja usuário logado, exibe uma mensagem padrão
            userDisplayElement.textContent = 'Visitante';
        }
    }

    // Função de Logout do Usuário (RF08)
    function logoutUser() {
        // Remove os dados do usuário do armazenamento local
        localStorage.removeItem('senacDash_userName');
        localStorage.removeItem('senacDash_userEmail');
        localStorage.removeItem('senacDash_userPhone');
        
        // Redireciona o usuário para a página de login
        window.location.href = 'pages/login.html';
    }
});

// A partir daqui, você pode ter outras funções globais que a aplicação precisa.