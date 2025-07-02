document.addEventListener('DOMContentLoaded', function() {
    var logo = document.getElementById('logo-link');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
            // Change the hash to open the "about" article (Dimension template)
            location.hash = '#mushroom';
        });
    }
});