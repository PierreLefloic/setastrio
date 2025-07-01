document.addEventListener('DOMContentLoaded', function() {
    const article = document.getElementById('about');
    const dots = article.querySelector('.about-dots');
    if (!dots) return;

    article.addEventListener('scroll', function() {
        // Adjust the top position of the dots to counteract scrolling
        dots.style.top = `${article.scrollTop}px`;
    });
});