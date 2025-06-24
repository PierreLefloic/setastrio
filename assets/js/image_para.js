document.addEventListener('scroll', function() {
    document.querySelectorAll('.bio-banner').forEach(function(img) {
        // Get the image's position relative to the viewport
        const rect = img.getBoundingClientRect();
        // Calculate scroll percentage (0 = top of viewport, 1 = bottom)
        const percent = Math.min(Math.max((rect.top + rect.height/2) / window.innerHeight, 0), 1);
        // Map percent to object-position Y (e.g., 30% to 70%)
        const posY = 30 + percent * 40; // from 30% to 70%
        img.style.objectPosition = `center ${posY}%`;
    });
});