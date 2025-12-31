// Gallery Lightbox Functionality
(function() {
    let currentImageIndex = 0;
    let allImages = [];
    
    // Initialize gallery
    function initGallery() {
        // Sort images within each gallery group by data-order attribute
        document.querySelectorAll('.photo-grid').forEach(grid => {
            const items = Array.from(grid.querySelectorAll('.photo-item'));
            
            // Sort by data-order attribute
            items.sort((a, b) => {
                const orderA = parseInt(a.getAttribute('data-order')) || 999;
                const orderB = parseInt(b.getAttribute('data-order')) || 999;
                return orderA - orderB;
            });
            
            // Re-append in sorted order
            items.forEach(item => grid.appendChild(item));
        });
        
        const photoItems = document.querySelectorAll('.photo-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');
        const caption = document.querySelector('.lightbox-caption');
        
        // Collect all images
        allImages = Array.from(photoItems).map(item => ({
            full: item.getAttribute('data-full'),
            thumb: item.querySelector('img').src,
            alt: item.querySelector('img').alt
        }));
        
        // Open lightbox when clicking on an image
        photoItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentImageIndex = index;
                openLightbox();
            });
            
            // Add keyboard accessibility
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    currentImageIndex = index;
                    openLightbox();
                }
            });
        });
        
        // Close lightbox
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Navigation
        lightboxPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            navigateImage(-1);
        });
        
        lightboxNext.addEventListener('click', function(e) {
            e.stopPropagation();
            navigateImage(1);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (e.key === 'ArrowLeft') {
                    navigateImage(-1);
                } else if (e.key === 'ArrowRight') {
                    navigateImage(1);
                }
            }
        });
        
        function openLightbox() {
            lightbox.classList.add('active');
            showImage(currentImageIndex);
        }
        
        function closeLightbox() {
            lightbox.classList.remove('active');
        }
        
        function showImage(index) {
            const image = allImages[index];
            lightboxImg.src = image.full;
            caption.textContent = image.alt;
            
            // Update navigation button visibility
            lightboxPrev.style.display = index > 0 ? 'block' : 'none';
            lightboxNext.style.display = index < allImages.length - 1 ? 'block' : 'none';
        }
        
        function navigateImage(direction) {
            currentImageIndex += direction;
            if (currentImageIndex < 0) currentImageIndex = 0;
            if (currentImageIndex >= allImages.length) currentImageIndex = allImages.length - 1;
            showImage(currentImageIndex);
        }
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGallery);
    } else {
        initGallery();
    }
})();
