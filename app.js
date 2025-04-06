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

/// Input Values

const greetingsInput = document.getElementById('greetingsInput');

greetingsInput.addEventListener('input', () => {
    const inputValue = greetingsInput.value;

    localStorage.setItem('greetingsInput', inputValue);
});

window.addEventListener('load', () => {
    greetingsInput.value = localStorage.getItem('greetingsInput');
});