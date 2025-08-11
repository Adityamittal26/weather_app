const tempraturefeild = document.querySelector('#temp')
const locationfeild = document.querySelector('#location')
const datefeild = document.querySelector('#date')
const conditionfeild = document.querySelector('#condition')
const searchfeild = document.querySelector('.search')
const form = document.querySelector('form')

form.addEventListener('submit', search)

var btn = document.getElementById('btn')
let unit = 'C'

function leftClick() {
    btn.style.left = '0'
    unit = 'C'
    getWeather(target,unit)
}

function rightClick() {
    btn.style.left = '70px'
    unit = 'F'
    getWeather(target,unit)
}

let target='london'
const getWeather = async (city,X) => {
    try {
    let url = `https://api.weatherapi.com/v1/current.json?key=781984e2aa824aa1852141014252607&q=${city}&aqi=no`

    const res = await fetch(url)
    const data = await res.json()
    let temp
    if (X == 'C') {
        temp = data.current.temp_c
    }
    else {
        temp = data.current.temp_f
    }
    let location = data.location.name
    let date = data.location.localtime
    let condition = data.current.condition.text

    console.log(data)

    updateWeather(temp, location, date, condition)
    }
    catch (error) {
        alert('Could not fetch weather data. Please check the city name.')
        target = 'london'
        getWeather(target, unit)
    }

}

function updateWeather(temp, location, date, condition) {

    let splitDate = date.split(' ')[0]
    let splitTime = date.split(' ')[1]
    let day = getdayname(new Date(splitDate).getDay())

    tempraturefeild.innerHTML = `${temp}°${unit}`
    locationfeild.innerHTML = `in ${location}`
    datefeild.innerHTML = splitDate + ' ' + day + ' ' + splitTime
    conditionfeild.innerHTML = condition
}

function search(e) {
    e.preventDefault()
    target = searchfeild.value
    getWeather(target,unit)
    searchfeild.value = ''
}

function getdayname(number) {
    switch (number) {
        case 0:
            return 'Sunday'
            break
        case 1:
            return 'Monday'
            break
        case 2:
            return 'Tuesday'
            break
        case 3:
            return 'Wednesday'
            break
        case 4:
            return 'Thursday'
            break
        case 5:
            return 'Friday'
            break
        case 6:
            return 'Saturday'
            break
    }
}

navigator.geolocation.getCurrentPosition(success => {
  const { latitude, longitude } = success.coords;
  target = `${latitude},${longitude}`;
  getWeather(target, unit);
}, error => {
  console.error("Geolocation error: ", error.message);
  target = 'london';
  getWeather(target, unit);
});

