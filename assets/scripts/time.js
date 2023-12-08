// ----------------------------------------------------------------- inputs
import { toPersianNumber, toEnglishNumber } from "./number-converter.js";

const timeApiUrl = "https://api.dastyar.io/express/clock/current";
const clockElement = document.querySelector(".time__clock");
const jalaliCalendarElement = document.querySelector(".jalali-calendar");

// ---------------------------------------------------------------- process
window.addEventListener("load", async () => {
    const timeData = await getTimeData();
    const time = new Date(timeData);
    const minute = toPersianNumber(time.getMinutes());
    const hour = toPersianNumber(time.getHours());
    const [jalaliDay, jalaliMonth] = time
        .toLocaleDateString("fa-IR", {
            day: "numeric",
            month: "long",
        })
        .split(" ");

    clockElement.innerText = `${hour}:${minute}`;

    jalaliCalendarElement.innerText = jalaliDay + " " + jalaliMonth;
});

// -------------------------------------------------------------- functions
async function getTimeData() {
    const response = await fetch(timeApiUrl);
    const data = await response.json();

    return data.current;
}
