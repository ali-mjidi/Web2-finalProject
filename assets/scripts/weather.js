// ----------------------------------------------------------------- inputs
const apiUrl =
    "https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403&lang=fa&theme=light";
const currentTemperature = document.querySelector(".weather__temperature");
const minTemperature = document.querySelector(".min-temperature");
const maxTemperature = document.querySelector(".max-temperature");
const weatherStatus = document.querySelector(".weather__status");
const weatherIcon = document.querySelector(".weather__icon");

// ----------------------------------------------------------------- inputs
window.addEventListener("load", async () => {
    const data = await getData();
    const {
        current,
        max,
        min,
        customDescription: { text, emoji },
        weather: { icon },
        textColor,
    } = data;
    let newImageSrc;

    currentTemperature.innerText = changeNumberFormat(Math.round(current));
    maxTemperature.innerText = changeNumberFormat(Math.round(max));
    minTemperature.innerText = changeNumberFormat(Math.round(min));

    weatherStatus.innerText = text + " " + emoji;

    newImageSrc = weatherIcon.src;
    newImageSrc = newImageSrc.slice(0, newImageSrc.lastIndexOf("/") + 1)
    newImageSrc += icon + ".svg";

    weatherIcon.src = newImageSrc;

    currentTemperature.style.setProperty(
        "--weather-temperature-color",
        textColor
    );
});

// -------------------------------------------------------------- functions
async function getData() {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data[0];
}

function changeNumberFormat(number) {
    const persianNumbers = "۰۱۲۳۴۵۶۷۸۹".split("");

    number = String(number);
    number = number.split("");
    for (let char of number) {
        number[number.indexOf(char)] = persianNumbers[char];
    }

    return number.join("");
}
