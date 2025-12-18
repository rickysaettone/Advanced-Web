document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser'); // Obtener usuario logueado

    document.querySelectorAll('.restaurant-comments, .hotel-comments').forEach(section => {
        const form = section.querySelector('.comment-form');
        const list = section.querySelector('.comments-list');
        // Detectar si es restaurante o hotel leyendo el atributo data
        const itemKey = section.getAttribute('data-restaurant') || 
                section.getAttribute('data-hotel') || 
                section.getAttribute('data-landmark') || 
                section.getAttribute('data-museum') || 
                section.getAttribute('data-nightlife');
        const storageKey = 'comments-' + itemKey;

        // 1. GESTIÓN DE VISIBILIDAD DEL FORMULARIO
        if (!currentUser) {
            // Si no hay usuario, ocultamos el formulario
            if(form) form.style.display = 'none';
            
            // Y mostramos un mensaje invitando a loguearse
            const message = document.createElement('p');
            message.style.color = '#d4192f';
            message.style.fontStyle = 'italic';
            message.innerHTML = '🔒 <strong>Log in</strong> to write a review.';
            section.insertBefore(message, list);
        }

        // 2. CARGAR COMENTARIOS (Esto se hace siempre, logueado o no)
        let comments = JSON.parse(localStorage.getItem(storageKey)) || [];

        function renderComments() {
            list.innerHTML = '';
            if (comments.length === 0) {
                list.innerHTML = '<li style="color:#777; font-size:0.9rem;">No reviews yet. Be the first!</li>';
                return;
            }
            comments.forEach(({username, rating, comment, date}) => {
                const li = document.createElement('li');
                // Agregamos un estilo simple al comentario
                li.style.marginBottom = '10px';
                li.style.borderBottom = '1px solid #eee';
                li.style.paddingBottom = '5px';
                
                li.innerHTML = `
                    <strong>${username}</strong> <span style="color: #f1c40f;">${'⭐'.repeat(rating)}</span><br>
                    <span style="color: #555;">${comment}</span>
                `;
                list.appendChild(li);
            });
        }

        renderComments();

        // 3. ENVIAR COMENTARIO (Solo si existe el formulario visible)
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Doble seguridad: si por alguna razón no hay usuario, no guardar
                if (!currentUser) {
                    alert("Please log in first.");
                    return;
                }

                // Ya no buscamos 'form.username.value' porque lo borramos del HTML
                const rating = form.rating.value;
                const comment = form.comment.value.trim();

                if (!rating || !comment) return;

                // Guardamos el objeto con el nombre del usuario logueado
                comments.push({
                    username: currentUser, // ¡Aquí usamos el login!
                    rating: rating,
                    comment: comment,
                    date: new Date().toLocaleDateString()
                });

                localStorage.setItem(storageKey, JSON.stringify(comments));
                renderComments();
                form.reset();
            });
        }
    });
});