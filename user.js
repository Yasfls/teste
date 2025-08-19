document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;

      if (fullName && email && phone) {
        loginUser(fullName, email, phone);
      } else {
        alert("Por favor, preencha todos os campos para continuar.");
      }
    });
  }

  function loginUser(fullName, email, phone) {
    localStorage.setItem("senacDash_userName", fullName);
    localStorage.setItem("senacDash_userEmail", email);
    localStorage.setItem("senacDash_userPhone", phone);
    window.location.href = "dashboard.html";
  }
});
