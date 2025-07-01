document.querySelectorAll('.about-dot').forEach(dot => {
    dot.addEventListener('click', function() {
        // Remove active from all dots
        document.querySelectorAll('.about-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        // // Scroll to the relevant section 

        // Scrolling done by the scroll_anchor.js script

        // const targetId = dot.getAttribute('data-target');
        // const target = document.getElementById(targetId);
        // if (target) {
        //     target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // }
    });
});