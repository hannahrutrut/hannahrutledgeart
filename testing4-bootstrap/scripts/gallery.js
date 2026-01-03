fetch("../../data/images.json")
  .then(response => response.json())
  .then(images => {
    const gallery = document.getElementById("gallery");
    const filter = window.GALLERY_FILTER;

    // filter by gallery or tag
    const filteredImages = images
      .filter(img => img.gallery === filter || img.tags?.includes(filter))
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first

    filteredImages.forEach(img => {
      // Bootstrap column
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

      // Image element
      const imageEl = document.createElement("img");
      imageEl.src = `../../docs/assets/images/${img.filename}`; // <-- match your folder
      imageEl.alt = img.title || "";
      imageEl.className = "img-fluid"; // responsive in Bootstrap
      imageEl.loading = "lazy";

      col.appendChild(imageEl);
      gallery.appendChild(col);
    });
  })
  .catch(err => console.error("Error loading images.json", err));
