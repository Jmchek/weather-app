async function getWeather(location, tempScale) {

    createWeatherObj(location, tempScale).then( x => {
        console.log(`Location: ${x.location}`),
        console.log(`Temperature: ` + x.temperature),
        console.log(`Precipitation: ${x.precipitation}%`),
        console.log(`Humidity: ${x.humidity}%`),
        console.log(`Wind speed: ${x.windSpeed}`)
    });
}

async function getTemperature(location, tempScale){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=405b9413895a483db38183130242905&q=${location}`, {mode: 'cors'});
    const tempData = await response.json();

    return (tempScale == "f") ? tempData.current.temp_f + "°F": tempData.current.temp_c + "°C";
}

async function getPrecipitation(location){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=405b9413895a483db38183130242905&q=${location}`, {mode: 'cors'});
    const precipData = await response.json();

    return precipData.current.precip_mm + "%";
}

async function getHumidity(location){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=405b9413895a483db38183130242905&q=${location}`, {mode: 'cors'});
    const humidData = await response.json();

    return humidData.current.humidity + "%";
}

async function getWindSpeed(location){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=405b9413895a483db38183130242905&q=${location}`, {mode: 'cors'});
    const windSpdData = await response.json();

    return windSpdData.current.wind_mph + " mph";
}

async function createWeatherObj(location, tempScale){
    const weatherObj = {
        location: location.charAt(0).toUpperCase() + location.slice(1),
        temperature: await getTemperature(location, tempScale),
        precipitation: await getPrecipitation(location),
        humidity: await getHumidity(location),
        windSpeed: await getWindSpeed(location)
    }

    return weatherObj;
}


getWeather("los angeles", "f");