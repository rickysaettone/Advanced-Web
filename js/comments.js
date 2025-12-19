/**
 * CENTRALIZED COMMENT SYSTEM
 * Manages reviews for Hotels, Restaurants, Museums, etc.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Check user session (via auth.js)
    const currentUser = localStorage.getItem('currentUser'); 

    // 2. Locate all sections that allow comments
    const commentSections = document.querySelectorAll(
        '.restaurant-comments, .hotel-comments, .landmark-comments, .museum-comments, .nightlife-comments'
    );

    commentSections.forEach(section => {
        const form = section.querySelector('.comment-form');
        const list = section.querySelector('.comments-list');
        
        // Extract the place name from the 'data-...' attribute
        const itemKey = section.getAttribute('data-restaurant') || 
                        section.getAttribute('data-hotel') || 
                        section.getAttribute('data-landmark') || 
                        section.getAttribute('data-museum') || 
                        section.getAttribute('data-nightlife');

        const storageKey = 'comments-' + itemKey;

        // --- VISIBILITY LOGIC ---
        if (!currentUser && form) {
            form.style.display = 'none'; // Hide if not logged in
            const msg = document.createElement('p');
            msg.innerHTML = '🔒 <strong>Log in</strong> to write a review.';
            msg.style.color = '#d4192f';
            section.insertBefore(msg, list);
        }

        // --- LOAD LOGIC ---
        let comments = JSON.parse(localStorage.getItem(storageKey)) || [];

        function renderComments() {
            list.innerHTML = '';
            comments.forEach(c => {
                const li = document.createElement('li');
                li.style.marginBottom = "10px";
                li.innerHTML = `
                    <strong>${c.username}</strong> <span style="color: #f1c40f;">${'⭐'.repeat(c.rating)}</span><br>
                    <small style="color: #999;">${c.date}</small><br>
                    <span>${c.comment}</span>
                `;
                list.appendChild(li);
            });
        }

        // --- SAVE LOGIC ---
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const newEntry = {
                    username: currentUser,
                    rating: form.rating.value,
                    comment: form.comment.value.trim(),
                    date: new Date().toLocaleDateString()
                };
                comments.push(newEntry);
                localStorage.setItem(storageKey, JSON.stringify(comments));
                renderComments();
                form.reset();
            });
        }

        renderComments(); // Initial load when opening the page
    });
});