document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.restaurant-comments').forEach(section => {
        const form = section.querySelector('.comment-form');
        const list = section.querySelector('.comments-list');
        const restaurant = section.getAttribute('data-restaurant');

        // Cargar comentarios si existen en localStorage
        let comments = JSON.parse(localStorage.getItem('comments-' + restaurant)) || [];

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
            localStorage.setItem('comments-' + restaurant, JSON.stringify(comments));
            renderComments();
            form.reset();
        });
    });
});
