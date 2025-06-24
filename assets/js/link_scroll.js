document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', function(e) {
        var a = e.target.closest('a[href="#about"][data-anchor]');
        if (a) {
            var anchorId = a.getAttribute('data-anchor');
            setTimeout(function() {
                var anchor = document.getElementById(anchorId);
                if (anchor) {
                    anchor.scrollIntoView({behavior: "smooth", block: "start"});
                }
            }, 600); // Adjust delay if needed
        }
    });
});