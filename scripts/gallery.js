fetch("../data/images.json")
  .then(response => response.json())
  .then(images => {
    const gallery = document.getElementById("gallery");
    const filter = window.GALLERY_FILTER;

    // filter by gallery or tag
    const filteredImages = images
      .filter(img => img.gallery === filter || img.tags?.includes(filter))
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first

    filteredImages.forEach(img => {
      const imageEl = document.createElement("img");
      imageEl.src = `../docs/assets/images/${img.filename}`;
      imageEl.alt = img.title || "";
      imageEl.loading = "lazy";

      gallery.appendChild(imageEl);
    });
  })
  .catch(err => {
    console.error("Error loading images.json", err);
  });
