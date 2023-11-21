const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const API_KEY = 'dcf69f52c20b52683cc9c63634509b24';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData() 

function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={hourly,minutely}&units={metric}&appid=${API_KEY}`).then(res => res.json()).then(data => {
           /* https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} */
        console.log(data)
        showWeatherData(data);
        })

    })

function showWeatherData (data){
    let{humidity,wind_speed} = data.current;
    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.latitude + 'N ' + data.longitude+'E'
currentWeatherItemsEl.innerHTML = ` <div class="weather-item2">
<div>Umidade</div>
<div>${humidity}%</div>
</div>

<div class="weather-item2">
<div>Velocidade do vento</div>
<div>${wind_speed}</div>
</div> `;
  



 let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="day">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += ` `
        }
})
weatherForecastEl.innerHTML = otherDayForcast;

}