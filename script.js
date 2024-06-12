async function getWeather(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=405b9413895a483db38183130242905&q=${location}`, {mode: 'cors'});
    const weatherData = await response.json();
    
    console.log(`Current temperature in ${location.charAt(0).toUpperCase() + location.slice(1)}: ` + weatherData.current.temp_f + "°F");
    console.log(`Precipitation is at: ${weatherData.current.precip_mm}%`);
    console.log(`Humidity is at: ${weatherData.current.humidity}%`);
    console.log(`Wind speed is at: ${weatherData.current.wind_mph} mph`);
}

getWeather("ontario CA");