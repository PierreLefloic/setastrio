document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.musician-card');
    const bios = document.querySelectorAll('.musician-bio');
    const membersArticle = document.getElementById('members');

    function resetMembers() {
        cards.forEach(c => c.classList.remove('dimmed'));
        bios.forEach(bio => bio.classList.remove('active'));
    }

    function showMember(member) {
        cards.forEach(c => c.classList.toggle('dimmed', c.dataset.musician !== member));
        bios.forEach(bio => bio.classList.toggle('active', bio.id === 'bio-' + member));
    }

    // Handle clicks on musician cards (always works)
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            showMember(card.dataset.musician);
            // Optionally update the hash to #members (removes /Name)
            if (window.location.hash.startsWith('#members')) {
                history.replaceState(null, '', '#members');
            }
        });
    });

    // Handle clicks on links with data-anchor (from header)
    document.body.addEventListener('click', function(e) {
        var a = e.target.closest('a[href="#members"][data-anchor]');
        if (a) {
            var member = a.getAttribute('data-anchor');
            setTimeout(function() {
                showMember(member);
            }, 400); // Adjust delay if needed
        }
    });

    // Reset when article is shown without anchor
    window.addEventListener('hashchange', function() {
        if (window.location.hash === "#members") {
            setTimeout(resetMembers, 300);
        }
    });
});