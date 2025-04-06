/// Date and Time

const watch = document.getElementById('watch');
const dateAndDay = document.getElementById('dayAndDate');

const dayOfWeekRU = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const dayOfWeekEN = [];

const monthListRU = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const greetings = document.getElementById('greetings');

function getRealTime() {
    const realTime = new Date();
    const currentTime = realTime.toLocaleTimeString();
    watch.innerText = currentTime;

    const hour = realTime.getHours();

    const dayIndex = realTime.getDay();
    const date = realTime.getDate();
    const monthIndex = realTime.getMonth();

    dateAndDay.innerText = `${dayOfWeekRU[dayIndex]}, ${monthListRU[monthIndex]} ${date}`;

    if (hour >= 22 && hour < 6) {
        greetings.innerText = 'Good night';
    } else if (hour >= 6 && hour < 12) {
        greetings.innerText = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
        greetings.innerText = 'Good day';
    } else if (hour >= 18 && hour < 22) {
        greetings.innerText = 'Good evening';
    }
}

setInterval(getRealTime, 1000);

getRealTime();

/// weather widget

const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const windSpeed = document.getElementById('windSpeed');
const humidity = document.getElementById('humidity');

async function getWeather() {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA&lang=ru&appid=8f8888b555d073695608699843286db8&units=metric';
    const res = await fetch(url);
    const data = await res.json();

    // weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp | 0}°C`
    console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
}

getWeather();

/// Input Values

const greetingsInput = document.getElementById('greetingsInput');

greetingsInput.addEventListener('input', () => {
    const inputValue = greetingsInput.value;

    localStorage.setItem('greetingsInput', inputValue);
});

window.addEventListener('load', () => {
    greetingsInput.value = localStorage.getItem('greetingsInput');
});