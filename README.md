# Explore Warsaw - Interactive Travel Guide

A modern web application designed to help tourists explore the best experiences in Warsaw. Users can discover restaurants, hotels, and landmarks, manage a personal trip itinerary, and leave reviews for their favorite spots.

## 🚀 Key Features
- **User Authentication**: A custom-built login and registration system using `localStorage` for persistence.
- **Dynamic Trip Planner**: An itinerary manager where users can add/remove destinations from their personal list.
- **Interactive Review System**: Logged-in users can rate (1-5 stars) and comment on specific locations. Forms are automatically locked for guest users.
- **Real-time Weather Widget**: Integration with the [Open-Meteo API] to display current temperature and wind speed in Warsaw.
- **Offline Resources**: A dedicated section for downloading official PDF travel guides and maps.

## 🛠️ Tech Stack
- **Frontend**: Semantic HTML5 and CSS3 (utilizing Flexbox and CSS Grid for a responsive layout).
- **Logic**: Vanilla JavaScript (ES6+).
- **Data Management**: Browser `localStorage` API (No backend required for this prototype).
- **API Integration**: `Fetch API` used for asynchronous weather data retrieval.

## 📁 Project Structure
- `index.html`: Main landing page and Trip Planner dashboard.
- `/sections`: Category-specific pages (Hotels, Restaurants, Museums, etc.).
- `/js`: Modularized scripts (`auth.js`, `planner.js`, `comments.js`, `weather.js`).
- `/css`: Global styles and UI components.
- `/multimedia`: High-quality images and downloadable PDF guides.
