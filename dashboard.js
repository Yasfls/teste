document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleSidebar");
  const sidebar = document.querySelector(".sidebar");

  if (toggleButton && sidebar) {
    toggleButton.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }

  const userName = localStorage.getItem("senacDash_userName");
  if (userName) {
    const userNameDisplay = document.getElementById("userNameDisplay");
    if (userNameDisplay) {
      userNameDisplay.textContent = userName;
    }
  }
});
