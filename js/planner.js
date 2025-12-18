// js/planner.js

// Función para agregar item (se llamará desde los botones en HTML)
function addToPlanner(placeName, category) {
    let itinerary = JSON.parse(localStorage.getItem('myTrip')) || [];
    
    // Evitar duplicados
    if (!itinerary.some(item => item.name === placeName)) {
        itinerary.push({ name: placeName, category: category });
        localStorage.setItem('myTrip', JSON.stringify(itinerary));
        alert(`${placeName} added to your trip!`);
    } else {
        alert(`${placeName} is already in your trip.`);
    }
}

// Función para mostrar el itinerario (Solo corre en index.html)
document.addEventListener('DOMContentLoaded', () => {
    const plannerList = document.getElementById('planner-list');
    
    if (plannerList) {
        const itinerary = JSON.parse(localStorage.getItem('myTrip')) || [];
        
        if (itinerary.length === 0) {
            plannerList.innerHTML = '<li>No places added yet. Go explore!</li>';
        } else {
            plannerList.innerHTML = '';
            itinerary.forEach((item, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${item.name}</strong> <small>(${item.category})</small> 
                    <button class="remove-btn" data-index="${index}" style="margin-left:10px; color:red; cursor:pointer; border:none; background:none;">X</button>
                `;
                plannerList.appendChild(li);
            });

            // Event handling para borrar items
            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.target.getAttribute('data-index');
                    itinerary.splice(idx, 1);
                    localStorage.setItem('myTrip', JSON.stringify(itinerary));
                    location.reload(); // Recargar para actualizar lista
                });
            });
        }
    }
});