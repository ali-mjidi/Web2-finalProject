// ----------------------------------------------------------------- inputs
import { toPersianNumber, toEnglishNumber } from "./number-converter.js";

const timeApiUrl = "https://api.dastyar.io/express/clock/current";
const clockElement = document.querySelector(".time__clock");
const jalaliCalendarElement = document.querySelector(".jalali-calendar");
const wholePersianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
];

// ---------------------------------------------------------------- process
window.addEventListener("load", async () => {
    const timeData = await getTimeData();
    const time = new Date(timeData);
    const minute = toPersianNumber(time.getMinutes());
    const hour = toPersianNumber(time.getHours());
    const jalaliDate = time.toLocaleDateString("fa-IR").split("/");
    let [_, jalaliMonth, jalaliDay] = jalaliDate;

    jalaliMonth = wholePersianMonths[toEnglishNumber(jalaliMonth) - 1];

    clockElement.innerText = `${hour}:${minute}`;

    jalaliCalendarElement.innerText = jalaliDay + " " + jalaliMonth;
});

// -------------------------------------------------------------- functions
async function getTimeData() {
    const response = await fetch(timeApiUrl);
    const data = await response.json();

    return data.current;
}
