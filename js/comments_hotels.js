document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.hotel-comments').forEach(section => {
        const form = section.querySelector('.comment-form');
        const list = section.querySelector('.comments-list');
        const hotel = section.getAttribute('data-hotel');

        // Cargar comentarios si existen en localStorage
        let comments = JSON.parse(localStorage.getItem('comments-' + hotel)) || [];

        function renderComments() {
            list.innerHTML = '';
            comments.forEach(({username, rating, comment}) => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${username}</strong> (${rating} ⭐): ${comment}`;
                list.appendChild(li);
            });
        }

        renderComments();

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = form.username.value.trim();
            const rating = form.rating.value;
            const comment = form.comment.value.trim();

            if (!username || !rating || !comment) return;

            comments.push({username, rating, comment});
            localStorage.setItem('comments-' + hotel, JSON.stringify(comments));
            renderComments();
            form.reset();
        });
    });
});
