

async function getWeather(location, tempScale) {

    createWeatherObj(location, tempScale).then( x => {
        console.log(`Location: ${x.location}`),
        console.log(`Country: ${x.country}`),
        console.log(`Region: ${x.region}`),
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

async function getCountry(location){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=405b9413895a483db38183130242905&q=${location}`, {mode: 'cors'});
    const countryData = await response.json();

    return countryData.location.country;
}

async function getRegion(location){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=405b9413895a483db38183130242905&q=${location}`, {mode: 'cors'});
    const regionData = await response.json();

    return regionData.location.region;
}

async function getLocationName(location){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=405b9413895a483db38183130242905&q=${location}`, {mode: 'cors'});
    const locationData = await response.json();

    return locationData.location.name;
}

async function createWeatherObj(location, tempScale){
    const weatherObj = {
        location: await getLocationName(location),
        country: await getCountry(location),
        region: await getRegion(location),
        temperature: await getTemperature(location, tempScale),
        precipitation: await getPrecipitation(location),
        humidity: await getHumidity(location),
        windSpeed: await getWindSpeed(location)
    }

    return weatherObj;
}

async function searchWeather() {
    const searchWeatherGrbbr = document.querySelector("#weatherSearch");
    const searchWeatherBtnGrbbr = document.querySelector("#weatherSearchBtn");

    searchWeatherBtnGrbbr.addEventListener("click", x=> {
        let searchQuery = searchWeatherGrbbr.value;

        getWeather(searchQuery, "f");
    
    })

    searchWeatherGrbbr.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          searchWeatherBtnGrbbr.click();
        }
    })
}


// getWeather("los angeles", "f");
searchWeather();