// ----------------------------------------------------------------- inputs
import { toPersianNumber } from "./number-converter.js";

const weatherApiUrl =
    "https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403&lang=fa&theme=light";
const currentTemperature = document.querySelector(".weather__temperature");
const minTemperature = document.querySelector(".min-temperature");
const maxTemperature = document.querySelector(".max-temperature");
const weatherStatus = document.querySelector(".weather__status");
const weatherIcon = document.querySelector(".weather__icon");

// ----------------------------------------------------------------- inputs
window.addEventListener("load", async () => {
    const weatherData = await getWeatherData();
    const {
        current,
        max,
        min,
        customDescription: { text, emoji },
        weather: { icon },
        textColor,
    } = weatherData;
    let newImageSrc;

    currentTemperature.innerText = toPersianNumber(Math.round(current));
    maxTemperature.innerText = toPersianNumber(Math.round(max));
    minTemperature.innerText = toPersianNumber(Math.round(min));

    weatherStatus.innerText = text + " " + emoji;

    newImageSrc = weatherIcon.src;
    newImageSrc = newImageSrc.slice(0, newImageSrc.lastIndexOf("/") + 1);
    newImageSrc += icon + ".svg";

    weatherIcon.src = newImageSrc;

    currentTemperature.style.setProperty(
        "--weather-temperature-color",
        textColor
    );
});

// -------------------------------------------------------------- functions
async function getWeatherData() {
    const response = await fetch(weatherApiUrl);
    const data = await response.json();

    return data[0];
}
