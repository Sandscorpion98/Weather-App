import { DateTime } from "luxon";

// API key for OpenWeatherMap
const API_KEY = "f20b0ab88b3bd65b8751dbde2972afa6"
// Base URL for OpenWeatherMap API
const BASE_URL = "https://api.openweathermap.org/data/2.5"



// Function to fetch weather data from OpenWeatherMap API
const getWeatherData = (infoType, searchParams) => {
    // Construct the URL with the specified infoType and search parameters
    const url = new URL(BASE_URL + "/" + infoType);

    url.search = new URLSearchParams({...searchParams, appid:API_KEY});

    
// Fetch the data and return it as a JSON object
    return fetch(url).then((res) => res.json());
};

// Function to generate the URL for weather icons
const iconUrlFromCode = (icon) => 
    `https://openweathermap.org/img/wn/${icon}@2x.png`;


// Function to format Unix timestamp to local time
const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs + offset, {zone: "utc"}).toFormat(format);

// Function to format the current weather data
const formatCurrentWeather = (data) => {

    // Destructure necessary fields from the data object
    const {
        coord: {lon, lat},
        weather,
        wind: {speed},
        name,
        sys : {country, sunrise, sunset},
        dt,
        main : {temp, feels_like, temp_min, temp_max, humidity},
        timezone,
    } = data;

    // Extract main weather details and icon
    const {main: details, icon}  = weather[0];

    // Format the local time
    const formatedLocalTime = formatToLocalTime(dt, timezone);

    // Return an object with formatted weather data
    return {formatedLocalTime, humidity,lon, lat, dt, timezone, country, temp_min, temp_max, speed, name, sunrise : formatToLocalTime(sunrise, timezone, "hh:mm a"), sunset : formatToLocalTime(sunset, timezone, "hh:mm a"), temp, feels_like, icon : iconUrlFromCode(icon), details}
}


// Function to format forecast weather data
const formatForcastWeather = (secs, offset, data) => {
  
    // Filter and map hourly forecast data
   const hourly = data.filter(f => f.dt > secs).slice(0, 5).map((f) => ({
        
            title : formatToLocalTime(f.dt, offset,  "hh:mm a"),
            temp : f.main.temp,
            icon : iconUrlFromCode(f.weather[0].icon),
            date : f.dt_txt,
        
    }));
    
    // Filter and map daily forecast data
    const daily = data.filter((f) => f.dt_txt.slice(-8) === "00:00:00").map(f => ({
        
            title : formatToLocalTime(f.dt, offset,  "ccc"),
            temp : f.main.temp,
            icon : iconUrlFromCode(f.weather[0].icon),
            date : f.dt_txt,
    
    }));


    return {daily, hourly};
}


// Function to get and format all weather data
const formattedWeatherData = async (searchParams) => {

    // Get and format current weather data
    const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrentWeather);

    // Destructure necessary fields from the current weather data
    const {lat, lon, dt, timezone} = formattedCurrentWeather;


    // Get and format forecast weather data
    const forcastWeather = await getWeatherData ("forecast", {
        lat, lon, units: searchParams.units, 
    }).then((d) => formatForcastWeather(dt, timezone, d.list));

    return {...formattedCurrentWeather, ...forcastWeather};
}



export default formattedWeatherData

export {formatToLocalTime, iconUrlFromCode};