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

      // Add lightbox functionality
      setupLightbox();
    } else {
      console.error('Gallery container with id "gallery-images" not found');
    }

    if (galleryContainer) {
      galleryContainer.innerHTML = galleryHTML;

      // Add lightbox functionality
      setupLightbox();

      // Adjust layout for landscape images
      adjustLandscapeImages();
    }

    // Inside loadGalleryImages, after galleryContainer.innerHTML = galleryHTML:
    if (galleryContainer) {
      galleryContainer.innerHTML = galleryHTML;

      // Add lightbox functionality
      setupLightbox();

      // Adjust layout for landscape images
      adjustLandscapeImages();
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

    html += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 gallery-col" data-image-path="${imagePath}">
        <div class="gallery-item">
          <div class="gallery-card">
            <a href="#" class="lightbox-trigger" data-image="${imagePath}" data-title="${image.title}">
              <img src="${imagePath}" alt="${image.title}" loading="lazy">
            </a>
          </div>
          <div class="gallery-info">
            <h4>${image.title}</h4>
            <p>
              <small class="text-muted">
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

  // Add lightbox modal HTML
  html += `
    <div id="lightbox" class="lightbox">
      <span class="lightbox-close">&times;</span>
      <img class="lightbox-content" id="lightbox-img">
      <div class="lightbox-caption" id="lightbox-caption"></div>
    </div>
  `;

  return html;
}

// Function to setup lightbox functionality
function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');

  // Add click event to all lightbox triggers
  document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const imgSrc = this.getAttribute('data-image');
      const title = this.getAttribute('data-title');

      lightbox.style.display = 'block';
      lightboxImg.src = imgSrc;
      lightboxCaption.textContent = title;
    });
  });

  // Close lightbox when clicking the X
  closeBtn.addEventListener('click', function () {
    lightbox.style.display = 'none';
  });

  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  // Close lightbox with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
      lightbox.style.display = 'none';
    }
  });
}

// Function to adjust layout for landscape images
function adjustLandscapeImages() {
  const galleryItems = document.querySelectorAll('.gallery-col');

  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    if (img) {
      const checkOrientation = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        // If image is landscape (wider than tall)
        if (width > height) {
          // Change to span 2 columns
          item.classList.remove('col-lg-3', 'col-md-4');
          item.classList.add('col-lg-6', 'col-md-8', 'gallery-landscape');
        }
      };

      img.addEventListener('load', checkOrientation);

      // If image is already cached/loaded
      if (img.complete) {
        checkOrientation();
      }
    }
  });
}

// Load gallery images when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadGalleryImages();
});