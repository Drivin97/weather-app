import {config} from './config.mjs';

const api = {
    key: config.MY_KEY,
    base: "https://api.openweathermap.org/data/2.5/"
}

const selector = document.querySelector('.search-box');
selector.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if(evt.keyCode == 13) {
        console.log(selector.value);
        getResults(selector.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    let desc = document.querySelector('.current .desc');
    desc.innerText = weather.weather[0].main;

    let hi_low = document.querySelector('.current .hi-low');
    hi_low.innerHTML = `${Math.round(weather.main.temp_min)}<span>°F</span>/${Math.round(weather.main.temp_max)}<span>°F</span>`;
}

function dateBuilder(d) {
    let months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August',
                  'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year}`;
}