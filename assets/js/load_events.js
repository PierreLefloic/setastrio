document.addEventListener('DOMContentLoaded', function() {
    fetch('data/events.json')
        .then(response => response.json())
        .then(data => {
            let html = '<h3>Upcoming Events</h3>';
            if (data.upcoming && data.upcoming.length) {
                data.upcoming.forEach(event => {
                    html += `<p><b>${event.title}</b><br>
                        Date: ${event.date}<br>
                        Time: ${event.time}<br>
                        Location: ${event.location}</p>`;
                });
            } else {
                html += '<p>No upcoming events.</p>';
            }
            html += '<hr><h3>Past Events</h3>';
            if (data.past && data.past.length) {
                data.past.forEach(event => {
                    html += `<p><b>${event.title}</b><br>
                        Date: ${event.date}<br>
                        Time: ${event.time}<br>
                        Location: ${event.location}</p>`;
                });
            } else {
                html += '<p>No past events.</p>';
            }
            document.getElementById('events').innerHTML = html;
        });
});