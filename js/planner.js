/**
 * TRIP PLANNER (Itinerary)
 * Allows saving favorite destinations in a global list.
 */

// Add a place to LocalStorage
function addToPlanner(placeName, category) {
    let itinerary = JSON.parse(localStorage.getItem('myTrip')) || [];
    
    // Duplicate check to avoid adding the same place twice
    if (!itinerary.some(item => item.name === placeName)) {
        itinerary.push({ name: placeName, category: category });
        localStorage.setItem('myTrip', JSON.stringify(itinerary));
        alert(`${placeName} added to your trip!`);
    } else {
        alert(`${placeName} is already in your trip.`);
    }
}

// Load the itinerary on the Home (index.html)
document.addEventListener('DOMContentLoaded', () => {
    const plannerList = document.getElementById('planner-list');
    if (!plannerList) return; // If we're not on the Home page, exit

    const itinerary = JSON.parse(localStorage.getItem('myTrip')) || [];
    
    if (itinerary.length === 0) {
        plannerList.innerHTML = '<li>Your trip is empty. Start exploring!</li>';
    } else {
        plannerList.innerHTML = '';
        itinerary.forEach((item, index) => {
            const li = document.createElement('li');
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.padding = "5px 0";
            li.innerHTML = `
                <span><strong>${item.name}</strong> (${item.category})</span>
                <button onclick="removeItem(${index})" style="background:none; border:none; color:red; cursor:pointer;">✖</button>
            `;
            plannerList.appendChild(li);
        });
    }
});

// Global function to remove items from the itinerary
function removeItem(index) {
    let itinerary = JSON.parse(localStorage.getItem('myTrip')) || [];
    itinerary.splice(index, 1);
    localStorage.setItem('myTrip', JSON.stringify(itinerary));
    location.reload(); // Refresh to show changes
}