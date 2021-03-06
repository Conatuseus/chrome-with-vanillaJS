const weather = document.querySelector(".js-weather");
const coordsDelBtn = document.createElement("button");
const API_KEY = "15b4f215ee8a4b59fc4d3b15227d1e3b";
const COORDS = "coords";

function deleteCoords() {
    localStorage.removeItem(COORDS);
    weather.remove();
    coordsDelBtn.remove();
}

function handleCoords() {
    coordsDelBtn.innerText = "위치 정보 삭제";
    coordsDelBtn.addEventListener("click",deleteCoords);
    clockContainer.appendChild(coordsDelBtn);
}

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
    handleCoords();
}

function handleGeoError() {
    console.log("error");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    }
    else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
        handleCoords();
    }
}

function init() {
    loadCoords();
}

init();