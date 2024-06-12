async function getWeather(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=405b9413895a483db38183130242905&q=${location}`, {mode: 'cors'});
    const weatherData = await response.json();
    
    console.log(`Current temperature in ${location.charAt(0).toUpperCase() + location.slice(1)}: ` + weatherData.current.temp_f + "°F");
    console.log(`Precipitation is at: ${weatherData.current.precip_mm}%`);
    console.log(`Humidity is at: ${weatherData.current.humidity}%`);
    console.log(`Wind speed is at: ${weatherData.current.wind_mph} mph`);
}

async function getTemperature(location, scale){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=405b9413895a483db38183130242905&q=${location}`, {mode: 'cors'});
    const tempData = await response.json();

    return (scale == "f") ? tempData.current.temp_f + "°F": tempData.current.temp_c + "°C";
    // return tempData;
}

// const temperature = (location) => fetch(`https://api.weatherapi.com/v1/current.json?key=405b9413895a483db38183130242905&q=${location}`, {mode: 'cors'})
//   .then((response) => response.json())
//   .then((x) => {
//     return x.current.temp_f;
//   });

async function createWeatherObj(location, scale){
    const weatherObj = {
        temperature: await getTemperature(location, scale),
    }

    return weatherObj;
}

// getWeather("ontario CA");

// getTemperature("canada", "f").then(temp => console.log(temp));

createWeatherObj("ontario CA", "c").then(x => console.log(x));

// console.log(temperature("ontario CA"));