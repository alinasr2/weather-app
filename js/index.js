let cards = document.querySelector(".cards");
let input = document.getElementById("location");
let button = document.getElementById("btnSearch");
button.onclick = function(){
    getWeather(input.value)
}
input.oninput = function(){
    getWeather(input.value)
}
async function getWeather(loc){
    let x = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=736205f94b894ef4932195014240809&q=${loc}&days=3`);
    let req  = await x.json();    
    let dayName = getDayName(req.current.last_updated);
    let dayName2 = getDayName(req.forecast.forecastday[1].date);
    let dayName3 = getDayName(req.forecast.forecastday[2].date);
    let days = getDays(req.current.last_updated);
    cards.innerHTML = `
    <div class="card">
        <div class="day d-flex justify-content-between p-2">
            <div>${dayName}</div>
            <div>${days}</div>
        </div>
        <div class="card-content py-5 px-3">
            <h3 class="fs-5">${req.location.name}</h3>
            <h2>${req.current.temp_c}<sup>o</sup>C</h2>
            <img src="https:${req.current.condition.icon}" alt="icon">
            <p class="text-info">${req.current.condition.text}</p>
            <div class="icons d-flex gap-3">
                <div class="d-flex align-items-center gap-1">
                    <img src="./images/icon-umberella.png" alt="icon-umberella">
                    <p class="mb-0">${req.current.humidity}%</p>
                </div>
                <div class="d-flex align-items-center gap-1">
                    <img src="./images/icon-wind.png" alt="icon-wind">
                    <p class="mb-0">${req.current.wind_kph} km/h</p>
            </div>
            <div class="d-flex align-items-center gap-1">
                <img src="./images/icon-compass.png" alt="icon-compass">
                <p class="mb-0">${req.current.wind_dir}</p>
            </div>
                </div>
                </div>
            </div>
            <div class="card" style="background-color: #262936;" >
            <div style="background-color: #222531;" class="day d-flex justify-content-center p-2">
                <div>${dayName2}</div>
            </div>
            <div class="card-content py-5 px-3 text-center">
            <img src="https:${req.forecast.forecastday[1].day.condition.icon}" alt="icon">
            <h2 class="fs-1">${req.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h2>
            <p style="font-size: 16px; ">${req.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</p>
                <p class="text-info">${req.forecast.forecastday[1].day.condition.text}</p>
                </div>
            </div>
            <div class="card">
                <div class="day d-flex justify-content-center p-2">
                    <div>${dayName3}</div>
                </div>
                <div class="card-content py-5 px-3 text-center">
                    <img src="https:${req.forecast.forecastday[2].day.condition.icon}" alt="icon">
                    <h2 class="fs-1">${req.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h2>
                    <p style="font-size: 16px; ">${req.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</p>
                    <p class="text-info">${req.forecast.forecastday[2].day.condition.text}</p>
                </div>
            </div>
    `
}
function getDayName(dateString) {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}
function getDays(dateString){
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April','May', 'June', 'July', 'August','September', 'October', 'November', 'December'];
    let x = date.getDate(); 
    return `${x} ${months[date.getMonth()]}`;
}
async function getWeatherFromCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function (position) {
            let lat = position.coords.latitude;  
            let lon = position.coords.longitude;   
            let x = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lon}&key=22542781c032493b98efa07817ff6b3d`);
            let req = await x.json();
            getWeather(req.results[0].components.state)
        })
    }
}
getWeatherFromCurrentLocation();
