// galleryLoader.js

// Function to determine which gallery page we're on
function getCurrentGallery() {
  const path = window.location.pathname;
  
  if (path.includes('inkDrawings')) return 'Ink Drawings';
  if (path.includes('linoPrints')) return 'Linocut Prints';
  if (path.includes('paintings')) return 'Paintings';
  if (path.includes('stainedGlass')) return 'Stained Glass';
  
  return null;
}

// Function to load and display gallery images
async function loadGalleryImages() {
  const currentGallery = getCurrentGallery();
  
  // If we're not on a gallery page, exit
  if (!currentGallery) return;
  
  try {
    // Fetch the images data
    const response = await fetch('/data/images.json');
    if (!response.ok) {
      throw new Error(`Failed to load images.json: ${response.statusText}`);
    }
    
    const allImages = await response.json();
    
    // Filter images for current gallery
    const galleryImages = allImages.filter(img => img.gallery === currentGallery);
    
    // Sort by date (newest first)
    galleryImages.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA; // Descending order
    });
    
    // Generate HTML for the gallery
    const galleryHTML = generateGalleryHTML(galleryImages);
    
    // Insert into the gallery container
    const galleryContainer = document.getElementById('gallery-images');
    if (galleryContainer) {
      galleryContainer.innerHTML = galleryHTML;
    } else {
      console.error('Gallery container with id "gallery-images" not found');
    }
    
  } catch (error) {
    console.error('Error loading gallery images:', error);
    const galleryContainer = document.getElementById('gallery-images');
    if (galleryContainer) {
      galleryContainer.innerHTML = '<p class="text-center">Error loading images.</p>';
    }
  }
}

// Function to generate Bootstrap grid HTML
function generateGalleryHTML(images) {
  if (images.length === 0) {
    return '<p class="text-center">No images found in this gallery.</p>';
  }
  
  let html = '<div class="container"><div class="row g-4">';
  
  images.forEach(image => {
    const imagePath = `/docs/assets/images/${image.filename}`;
    const mediumText = image.medium.join(', ');
    const tagsText = image.tags.join(', ');
    
    html += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="gallery-item">
          <div class="gallery-card">
            <a href="${imagePath}" target="_blank" rel="noopener noreferrer">
              <img src="${imagePath}" alt="${image.title}" loading="lazy">
            </a>
          </div>
          <div class="gallery-info">
            <h5>${image.title}</h5>
            <p>
              <small class="text-muted">
                ${image.date}<br>
                ${mediumText}
                ${image.size ? `<br>Size: ${image.size}` : ''}
              </small>
            </p>
          </div>
        </div>
      </div>
    `;
  });
  
  html += '</div></div>';
  
  return html;
}

// Load gallery images when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadGalleryImages();
});