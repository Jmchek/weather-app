

async function getWeather(location, tempScale) {
    const weatherInfoTagsGrbbr = document.querySelector(".weatherInfoTags");
    const tempContainerGrbbr = document.querySelector(".tempContainer");
    const searchWeatherGrbbr = document.querySelector("#weatherSearch");
    const tempScaleChckbxGrbbr = document.querySelector(".tempScaleChckbx");
    const switchContainerGrbbr = document.querySelector(".switchContainer");

    switchContainerGrbbr.classList.remove("hidden");

    tempScaleChckbxGrbbr.addEventListener("click", y => {
        if(tempScaleChckbxGrbbr.checked){
            getTemperature(location, "c").then(x => tempContainerGrbbr.children[0].innerText = `Temperature: ` + x);
        } else {
            getTemperature(location, "f").then(y => tempContainerGrbbr.children[0].innerText = `Temperature: ` + y);
        }
    });

    createWeatherObj(location, tempScale).then( x => {
        weatherInfoTagsGrbbr.children[0].innerText = `Location: ${x.location}`,
        weatherInfoTagsGrbbr.children[1].innerText = `Country: ${x.country}`,
        weatherInfoTagsGrbbr.children[2].innerText = `Region: ${x.region}`,
        tempContainerGrbbr.children[0].innerText = `Temperature: ` + x.temperature,
        weatherInfoTagsGrbbr.children[4].innerText = `Precipitation: ${x.precipitation}`,
        weatherInfoTagsGrbbr.children[5].innerText = `Humidity: ${x.humidity}`,
        weatherInfoTagsGrbbr.children[6].innerText = `Wind speed: ${x.windSpeed}`
    }).catch(err => {
        alert("Cannot find that location, please try again.");
        searchWeatherGrbbr.value = "";
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