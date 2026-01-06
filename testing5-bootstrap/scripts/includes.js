//includes.js
// Function to load HTML content into a target element
async function loadHTML(elementId, filePath) {
  try {
    // Fetch the external HTML file
    const response = await fetch(filePath);
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
    }
    
    // Extract HTML text from the response
    const html = await response.text();
    
    // Insert the HTML into the target element
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
    } else {
      throw new Error(`Element with ID "${elementId}" not found`);
    }
  } catch (error) {
    console.error('Error loading content:', error);
    // Optional: Display a fallback message in the UI
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `<p>Error loading content.</p>`;
    }
  }
}

// Function to set active nav link
function setActiveNavLink() {
  // Get the current page path
  const currentPath = window.location.pathname;
  
  // Get all nav links in the navbar
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  // Define gallery paths
  const galleryPaths = [
    '/gallery/inkDrawings/inkDrawings.html',
    '/gallery/linoPrints/linoPrints.html',
    '/gallery/stainedGlass/stainedGlass.html',
    '/gallery/paintings/paintings.html'
  ];
  
  // Check if current page is a gallery page
  const isGalleryPage = galleryPaths.some(path => currentPath.includes(path) || currentPath.endsWith(path));
  
  // Loop through each link
  navLinks.forEach(link => {
    // Get the href attribute
    const linkPath = link.getAttribute('href');
    
    // Check if the current path matches the link path
    if (currentPath === linkPath || currentPath.endsWith(linkPath)) {
      link.classList.add('active');
    }
    
    // If this is the Gallery dropdown toggle and we're on a gallery page
    if (link.classList.contains('dropdown-toggle') && isGalleryPage) {
      link.classList.add('active');
    }
  });
}

// Load header and footer when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  await loadHTML('header', '/partials/header.html');
  await loadHTML('footer', '/partials/footer.html');
  await loadHTML('navbar', '/partials/navbar.html');
  
  // Set active nav link AFTER navbar is loaded
  setActiveNavLink();
});