document.addEventListener('DOMContentLoaded', function() {
    function scrollToAnchor(articleId, anchorId) {
        setTimeout(function() {
            var anchor = document.getElementById(anchorId);
            if (anchor) {
                anchor.scrollIntoView({behavior: "smooth", block: "start"});
                // Revert the hash to just the article after scrolling
                history.replaceState(null, '', '#' + articleId);
            }
        }, 200); // Adjust delay if needed
    }

    // Listen for hash changes (for normal navigation)
    window.addEventListener('hashchange', function() {
        var hash = window.location.hash;
        var match = hash.match(/^#([^\/]+)\/(.+)$/);
        if (match) {
            scrollToAnchor(match[1], match[2]);
        }
    });

    // Listen for clicks on anchor links (even if hash doesn't change)
    document.body.addEventListener('click', function(e) {
        // Find the closest anchor in case of nested elements
        var a = e.target.closest('a[href^="#"]');
        if (a) {
            var href = a.getAttribute('href');
            var match = href.match(/^#([^\/]+)\/(.+)$/);
            if (match) {
                // Always scroll, even if hash doesn't change
                setTimeout(function() {
                    scrollToAnchor(match[1], match[2]);
                }, 200);
            }
        }
    });
});
