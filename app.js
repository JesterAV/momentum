/// Date and Time

const watch = document.getElementById('watch');
const dateAndDay = document.getElementById('dayAndDate');

const dayOfWeekRU = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const dayOfWeekEN = [];

const monthListRU = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];
const monthListEN = [];

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

    if (hour >= 22 || hour < 6) {
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

const cityName = document.getElementById('cityName');

const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const windSpeed = document.getElementById('windSpeed');
const humidity = document.getElementById('humidity');
const weatherDiscription = document.getElementById('weatherDiscriptionInfo');

async function getWeather(city) {
    const apiKey = '8f8888b555d073695608699843286db8';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&lang=ru&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    
    const oldClass = Array.from(weatherIcon.classList).find(cls => cls.startsWith('owf-'));
    if (oldClass) {
        weatherIcon.classList.remove(oldClass);
    }

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    cityName.value = data.name; 
    temperature.textContent = `${data.main.temp | 0}°C`;
    weatherDiscription.textContent = `${data.weather[0].main}`;
    windSpeed.textContent = `Wind speed: ${data.wind.speed} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
}

getWeather('Минск');

/// Input Values

const greetingsInput = document.getElementById('greetingsInput');

let timeout;

cityName.addEventListener('input', () => {

    timeout = setTimeout(() => {
        completeInput();
    }, 2000);

    function completeInput() {
        const cityInput = cityName.value;
        localStorage.setItem('city', cityInput);

        getWeather(cityInput);
    }
});

greetingsInput.addEventListener('input', () => {
    const inputValue = greetingsInput.value;

    localStorage.setItem('greetingsInput', inputValue);
});

/// background image

const root = document.getElementById('root');

const imagesList = [];
let currentImageIndex = -1;

async function getImage() {
    const accesKey = '-bCYGYOFTNih-GnchL2Vh78aFkemAX0ZFa4JE6MTCM4';
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=${accesKey}`;

    const res = await fetch(url);
    const data = await res.json();

    root.classList.add('hidden');

    setTimeout(() => {
        root.style.backgroundImage = `url(${data.urls.regular})`;
        root.classList.remove('hidden');
    }, 500);

    imagesList.push(data.urls.regular);
    currentImageIndex++;
}

getImage();

const rightSliderButton = document.getElementById('rightSliderButton');
const leftSliderButton = document.getElementById('leftSliderButton');



leftSliderButton.addEventListener('click', () => {
    if (imagesList.length === 0 || currentImageIndex <= 0) {
        return;
    }

    currentImageIndex--;
    
    root.classList.add('hidden');

    setTimeout(() => {
        root.style.backgroundImage = `url(${imagesList[currentImageIndex]})`;
        root.classList.remove('hidden');
    }, 500);
});

rightSliderButton.addEventListener('click', getImage);

/// Quote

const quote = document.getElementById('quote');
const author = document.getElementById('author');

async function getQuote() {
    const url = 'https://api.api-ninjas.com/v1/quotes';
    const apiKey = 'Lq08Jds9xI+iQDfO4EBD9w==HKa2xMNgCTem72pP';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        quote.textContent = `${data[0].quote}`
        author.textContent = `${data[0].author}`
        console.log(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

getQuote();

const changeQuoteButton = document.getElementById('changeQuote');

changeQuoteButton.addEventListener('click', getQuote);

/// Player

const walkmanJZButton = document.getElementById('walkmanJZ');
const walkmanJZ = '/momentum/songs/walkmanJZ.json';
const walkmanNGHTButton = document.getElementById('walkmanNGHT');
const walkmanNGHT = '/momentum/songs/walkmanNGHT.json'

let nameSong = [];
let songs = [];
let songCounter = 0;

const songList = document.getElementById('songs');


function readPlayList(playlist) {
    fetch(playlist)
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            songs.push(item.song);
            nameSong.push(item.name);
        });

        for (let i = 0; i < songs.length; i++) {
            const song = document.createElement('li');
            songList.appendChild(song);
            song.classList.add('song');
        
            song.innerText = nameSong[i];
        }
    })
}

const volume = document.getElementById('volume');

const playButton = document.getElementById('playButton');
const playNextButton = document.getElementById('play-next');
const prevButton = document.getElementById('play-prev');

const audioPlayer = document.getElementById('audioPlayer');

function createSongsList() {

}

let isPlaying = false;

function playSong() {
    document.querySelectorAll('.song').forEach(song => {
        song.classList.remove('active-song');
    });

    if (isPlaying) {
        audioPlayer.pause();
        playButton.classList.remove('active');
    } else {
        if (audioPlayer.currentTime > 0) {
            audioPlayer.play();
            playButton.classList.add('active');
            document.querySelectorAll('.song')[songCounter].classList.add('active-song');
            isPlaying = !isPlaying;
            return;
        }

        audioPlayer.src = songs[songCounter];
        audioPlayer.play();

        playButton.classList.add('active');
        document.querySelectorAll('.song')[songCounter].classList.add('active-song');
    }

    isPlaying = !isPlaying;
}

const prevButtonFunction = () => {
    if (songCounter === 0) {
        return;
    }

    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    isPlaying = false;
    audioPlayer.src = '';

    songCounter--;
    playSong();
};

const playNextButtonFunction = () => {
    audioPlayer.pause();
    audioPlayer.src = '';

    if (songCounter === songs.length -1) {
        songCounter = 0;
    } else {
        songCounter++;
    }

    audioPlayer.currentTime = 0;
    isPlaying = false;

    playSong();
};

const playButtonFunction = () => {
    playSong();
};

prevButton.addEventListener('click', prevButtonFunction);
playNextButton.addEventListener('click', playNextButtonFunction);
playButton.addEventListener('click', playButtonFunction);

// prevButton.removeEventListener('click', prevButtonFunction);
// playNextButton.removeEventListener('click', playNextButtonFunction);
// playButton.removeEventListener('click', playButtonFunction);

volume.addEventListener('input', () => {
    const realValue = volume.value / 100;
    audioPlayer.volume = realValue;

    localStorage.setItem('savedVolume', realValue);
});

window.addEventListener('load', () => {
    greetingsInput.value = localStorage.getItem('greetingsInput');

    const savedVolume = localStorage.getItem('savedVolume');

    if (savedVolume != null) {
        volume.value = savedVolume * 100;
        audioPlayer.volume = savedVolume;
    }
});

const toggleMenu = document.getElementById('toggleMenu');
const playListsMenu = document.getElementById('playListsMenu');

toggleMenu.addEventListener('click', () => {
    playListsMenu.classList.toggle('active');
    toggleMenu.classList.toggle('active');
});

walkmanJZButton.addEventListener('click', () => {
    songs = [];
    nameSong = [];

    songList.innerHTML = '';
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    audioPlayer.src = '';
    isPlaying = false;
    songCounter = 0;

    readPlayList(walkmanJZ);
    playListsMenu.classList.remove('active');
    toggleMenu.classList.remove('active');
});

walkmanNGHTButton.addEventListener('click', () => {
    songs = [];
    nameSong = [];

    songList.innerHTML = '';
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    audioPlayer.src = '';
    isPlaying = false;
    songCounter = 0;


    readPlayList(walkmanNGHT);
    playListsMenu.classList.remove('active');
    toggleMenu.classList.remove('active');
});

audioPlayer.addEventListener('ended', () => {
    if (songCounter === songs.length -1) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        audioPlayer.src = '';
        isPlaying = false;
        songCounter = 0;
        return;
    }

    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    audioPlayer.src = '';
    isPlaying = false;
    songCounter++;
    playSong();
});

alert('Улыбнись, Солнышко!');