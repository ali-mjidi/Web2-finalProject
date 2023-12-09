// ----------------------------------------------------------------- inputs
import { toPersianNumber, toEnglishNumber } from "./number-converter.js";

const timeApiUrl = "https://api.dastyar.io/express/clock/current";
const clockElement = document.querySelector(".time__clock");
const jalaliCalendarElement = document.querySelector(".jalali-calendar");
const gregorianCalendarElement = document.querySelector(".gregorian-calendar");
const hijriCalendarElement = document.querySelector(".hijri-calendar");

// ---------------------------------------------------------------- process
window.addEventListener("load", async () => {
    const timeData = await getTimeData();
    const time = new Date(timeData);
    let minute = time.getMinutes();
    let hour = time.getHours();
    const [jalaliDay, jalaliMonth] = time
        .toLocaleDateString("fa-IR", {
            day: "numeric",
            month: "long",
        })
        .split(" ");
    const gregorianYear = toPersianNumber(time.getFullYear());
    const gregorianMonth = time.toLocaleDateString("default", {
        month: "short",
    });
    const gregorianDay = toPersianNumber(time.getDate());
    const hijriMonth = time.toLocaleDateString("ar-SA", { month: "long" });
    const hijriYear = time
        .toLocaleDateString("ar-SA", { year: "numeric" })
        .split(" ")[0];
    const hijriDay = time.toLocaleDateString("ar-SA", { day: "2-digit" });

    minute =
        minute < 10 ? toPersianNumber("0" + minute) : toPersianNumber(minute);
    hour = hour < 10 ? toPersianNumber("0" + hour) : toPersianNumber(hour);
    clockElement.innerText = `${hour}:${minute}`;

    jalaliCalendarElement.innerText = jalaliDay + " " + jalaliMonth;

    gregorianCalendarElement.innerText = [
        gregorianYear,
        gregorianMonth,
        gregorianDay,
    ].join("/");

    hijriCalendarElement.innerText = [hijriYear, hijriMonth, hijriDay].join(
        "/"
    );
});

// -------------------------------------------------------------- functions
async function getTimeData() {
    const response = await fetch(timeApiUrl);
    const data = await response.json();

    return data.current;
}
