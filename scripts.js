// This file will now get imageGroups from the auto-generated image-data.js
// Make sure to include scripts/image-data.js before this script in index.html

let currentProjectIndex = 0;
let currentImageIndex = 0;

function openLightbox(projectIndex, imgIndex = 0) {
  currentProjectIndex = projectIndex;
  currentImageIndex = imgIndex;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (imageGroups[currentProjectIndex] && imageGroups[currentProjectIndex].length > 0) {
    lightboxImg.src = imageGroups[currentProjectIndex][currentImageIndex];
    lightbox.style.display = 'block';
  } else {
    console.warn(`No images found for project index ${projectIndex}.`);
  }
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function changeSlide(n) {
  if(event) event.stopPropagation();
  const currentProjectImages = imageGroups[currentProjectIndex];
  if (!currentProjectImages || currentProjectImages.length === 0) return;

  currentImageIndex = (currentImageIndex + n + currentProjectImages.length) % currentProjectImages.length;
  document.getElementById('lightbox-img').src = currentProjectImages[currentImageIndex];
}

document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target.id === 'lightbox') {
    closeLightbox();
  }
});