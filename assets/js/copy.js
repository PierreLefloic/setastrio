document.addEventListener('DOMContentLoaded', function() {
    var email = document.getElementById('copy-email');
    var confirm = document.getElementById('copy-confirm');
    if(email) {
        email.addEventListener('click', function() {
            navigator.clipboard.writeText(email.textContent).then(function() {
                if(confirm) {
                    confirm.style.opacity = '1';
                    setTimeout(function() {
                        confirm.style.opacity = '0';
                    }, 1200);
                }
            });
        });
    }
});