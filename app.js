document.addEventListener("DOMContentLoaded", () => {
  console.log("Aplicação Senac Dash iniciada!");

  displayUserName();

  const logoutButton = document.getElementById("logoutBtn");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logoutUser();
    });
  }

  const navLinks = document.querySelectorAll(".sidebar-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = e.target.href;
    });
  });

  function displayUserName() {
    const userName = localStorage.getItem("senacDash_userName");
    const userDisplayElement = document.getElementById("userName");

    if (userName && userDisplayElement) {
      userDisplayElement.textContent = userName;
    } else if (userDisplayElement) {
      userDisplayElement.textContent = "Visitante";
    }
  }

  function logoutUser() {
    localStorage.removeItem("senacDash_userName");
    localStorage.removeItem("senacDash_userEmail");
    localStorage.removeItem("senacDash_userPhone");
    window.location.href = "login.html";
  }
});
