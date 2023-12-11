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
    const time = new Date(timeData); // create date from given milliseconds

    // jalali date
    const [jalaliDay, jalaliMonth] = time
        .toLocaleDateString("fa-IR", {
            day: "numeric",
            month: "long",
        })
        .split(" ");

    // gregorian date
    const gregorianYear = toPersianNumber(time.getFullYear());
    const gregorianMonth = time.toLocaleDateString("default", {
        month: "short",
    });
    const gregorianDay = toPersianNumber(time.getDate());

    // hijri date
    const hijriMonth = time.toLocaleDateString("ar-SA", { month: "long" });
    const hijriYear = time
        .toLocaleDateString("ar-SA", { year: "numeric" })
        .split(" ")[0];
    const hijriDay = time.toLocaleDateString("ar-SA", { day: "2-digit" });

    // time
    let minute = time.getMinutes();
    let hour = time.getHours();

    // ----------------------------------------------------------- functions
    const convertMinuteToPersian = () =>
        (minute =
            minute < 10
                ? toPersianNumber("0" + minute)
                : toPersianNumber(minute));

    const convertHourToPersian = () =>
        (hour =
            hour < 10 ? toPersianNumber("0" + hour) : toPersianNumber(hour));

    const increaseHour = function () {
        // reset minute to zero
        minute = 0;

        // convert to english number, so then we can do mathematical operations
        hour = +toEnglishNumber(hour);
        hour++;
        hour >= 24 ? (hour = 0) : null;

        // then we change it back to persian
        convertHourToPersian();
    };

    const increaseMinute = function () {
        // convert to english number, so then we can do mathematical operations
        minute = +toEnglishNumber(minute);
        minute++;
        minute >= 60 && increaseHour();

        // then we change it back to persian
        convertMinuteToPersian();
        clockElement.innerText = `${hour}:${minute}`;
    };

    convertMinuteToPersian();
    convertHourToPersian();
    clockElement.innerText = `${hour}:${minute}`;

    jalaliCalendarElement.innerText = jalaliDay + " " + jalaliMonth;

    // creates a string of gregorian day, month and year and put it on element
    gregorianCalendarElement.innerText = [
        gregorianYear,
        gregorianMonth,
        gregorianDay,
    ].join("/");

    // creates a string of hijri day, month and year and put it on element
    hijriCalendarElement.innerText = [hijriYear, hijriMonth, hijriDay].join(
        "/"
    );

    // this timeout starts after minute actually increased
    setTimeout(() => {
        increaseMinute();

        // this interval works every 60 seconds
        setInterval(increaseMinute, 60000);
    }, (60 - time.getSeconds()) * 1000);
});

// -------------------------------------------------------------- functions
async function getTimeData() {
    const response = await fetch(timeApiUrl);
    const data = await response.json();

    return data.current;
}
