// js/weather.js
document.addEventListener('DOMContentLoaded', () => {
    const weatherContainer = document.getElementById('weather-widget');
    
    // Coordenadas de Varsovia: 52.2297 N, 21.0122 E
    const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.23&longitude=21.01&current_weather=true';

    async function fetchWeather() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Error al conectar con el servicio de clima');
            
            const data = await response.json();
            const temp = data.current_weather.temperature;
            const wind = data.current_weather.windspeed;
            
            // Actualizar el DOM dinámicamente
            weatherContainer.innerHTML = `
                <div style="background: #e6ff81; padding: 10px; border-radius: 5px; display: inline-block; margin-top: 10px; color: #39536a; font-weight: bold;">
                    🌤️ Warsaw Weather: ${temp}°C | Wind: ${wind} km/h
                </div>
            `;
        } catch (error) {
            console.error(error);
            weatherContainer.innerHTML = '<small>Weather data unavailable</small>';
        }
    }

    if(weatherContainer) {
        fetchWeather();
    }
});