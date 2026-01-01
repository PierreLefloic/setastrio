// Gallery Image Sorting
(function() {
    function sortGallery() {
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
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', sortGallery);
    } else {
        sortGallery();
    }
})();
