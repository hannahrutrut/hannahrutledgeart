function initNav() {
  // Handle desktop dropdown
  const dropdown = document.querySelector(".nav-left .dropdown");
  if (dropdown) {
    const button = dropdown.querySelector("[data-dropdown-button]");
    const content = dropdown.querySelector(".dropdown-content");
    const links = content.querySelectorAll("a");

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      content.classList.toggle("show");
    });

    document.addEventListener("click", () => {
      content.classList.remove("show");
    });

    // Keep dropdown open on active page
    const currentPath = window.location.pathname;
    links.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (currentPath === linkPath) {
        content.classList.add("show");
      }
    });
  }

  // Handle mobile menu
  const navLeft = document.querySelector(".nav-left");
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (navLeft && hamburger && mobileMenu) {
    // Clone nav links into mobile menu
    mobileMenu.innerHTML = navLeft.innerHTML;

    // Add dropdown toggle for mobile menu
    const mobileDropdown = mobileMenu.querySelector(".dropdown");
    if (mobileDropdown) {
      const mobileButton = mobileDropdown.querySelector("[data-dropdown-button]");
      const mobileContent = mobileDropdown.querySelector(".dropdown-content");

      mobileButton.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileContent.classList.toggle("show");
      });
    }

    // Toggle mobile menu visibility
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("show");
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
    });

    mobileMenu.addEventListener("click", (e) => e.stopPropagation());
  }
}

document.addEventListener("DOMContentLoaded", initNav);
