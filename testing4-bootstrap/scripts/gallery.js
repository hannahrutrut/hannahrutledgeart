fetch("/data/images.json")
  .then(res => res.json())
  .then(images => {
    const gallery = document.getElementById("gallery");
    const filter = window.GALLERY_FILTER;

    const filteredImages = images
      .filter(img => img.gallery === filter || img.tags?.includes(filter))
      .sort((a,b) => new Date(b.date) - new Date(a.date));

    filteredImages.forEach(img => {
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

      const imageEl = document.createElement("img");
      imageEl.src = `/docs/assets/images/${img.filename}`;
      imageEl.alt = img.title || "";
      imageEl.className = "img-fluid";
      imageEl.loading = "lazy";

      col.appendChild(imageEl);
      gallery.appendChild(col);
    });
  })
  .catch(err => console.error("Error loading images:", err));
