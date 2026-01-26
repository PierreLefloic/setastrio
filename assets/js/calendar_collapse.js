// Smooth collapse animation for calendar details element
document.addEventListener('DOMContentLoaded', function() {
    const details = document.querySelector('.calendar-section details');
    
    if (!details) return;
    
    const summary = details.querySelector('summary');
    const content = details.querySelector('.event-list');
    
    // Prevent default toggle behavior
    summary.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (details.hasAttribute('open')) {
            // Closing
            const startHeight = content.scrollHeight;
            content.style.height = startHeight + 'px';
            
            requestAnimationFrame(() => {
                content.style.transition = 'height 0.4s ease, opacity 0.3s ease';
                content.style.height = '0px';
                content.style.opacity = '0';
            });
            
            setTimeout(() => {
                details.removeAttribute('open');
                content.style.height = '';
                content.style.opacity = '';
                content.style.transition = '';
            }, 400);
        } else {
            // Opening
            details.setAttribute('open', '');
            content.style.height = '0px';
            content.style.opacity = '0';
            
            requestAnimationFrame(() => {
                const endHeight = content.scrollHeight;
                content.style.transition = 'height 0.5s ease, opacity 0.4s ease';
                content.style.height = endHeight + 'px';
                content.style.opacity = '1';
            });
            
            setTimeout(() => {
                content.style.height = '';
                content.style.transition = '';
            }, 500);
        }
    });
});
