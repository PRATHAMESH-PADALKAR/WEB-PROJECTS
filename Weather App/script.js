const userTab =document.querySelector("[data-userWeather]")
const searchTab = document.querySelector("[data-searchWeather]")
const userContainer = document.querySelector(".weather-container")
const grantAccess = document.querySelector(".grant-location-container")
const searchForm = document.querySelector("[data-searchForm]")
const loadingScreen = document.querySelector(".loading-container")
const userInfoContainer = document.querySelector(".user-info-container")

let currentTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c"
currentTab.classList.add("current-tab")
getFromSessionStorage();

userTab.addEventListener('click', ()=>{
    switchTab(userTab);
})

searchTab.addEventListener('click',()=>{
    switchTab(searchTab);
})

function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab")
        currentTab = clickedTab
        currentTab.classList.add("current-tab")

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active")
            grantAccess.classList.remove("active")
            searchForm.classList.add("active")
        }
        else{
            searchForm.classList.remove("active")
            userInfoContainer.classList.remove("active")
            getFromSessionStorage();
        }
    }
}

function getFromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates")
    if(!localCoordinates){
        grantAccess.classList.add("active")
    }
    else{
        const coordinates = JSON.parse(localCoordinates)
        fetchWeatherInfo(coordinates);
    }
}

async function fetchWeatherInfo(coordinates){
    const {lat,lon} = coordinates;
    grantAccess.classList.remove("active")
    loadingScreen.classList.add("active")

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        const data = await response.json();
        loadingScreen.classList.remove("active")
        userInfoContainer.classList.add("active")

        renderWeatherInfo(data);
    }
    catch(err){
        loadingScreen.classList.remove("active")
    }
}

function renderWeatherInfo(weatherInfo){
    const cityName = document.querySelector("[data-cityName]")
    const countryIcon = document.querySelector("[data-countryIcon]")
    const desc = document.querySelector("[data-weatherDes]")
    const weatherIcon = document.querySelector("[data-weatherIcon]")
    const temp = document.querySelector("[data-temp]")
    const windSpeed = document.querySelector("[ data-windSpeed]")
    const humidity = document.querySelector("[data-humidity]")
    const cloudyness = document.querySelector("[data-cloudiness]")

    cityName.innerText = weatherInfo?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`
    temp.innerText = `${weatherInfo?.main?.temp}°C`;
    windSpeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText =`${weatherInfo?.main?.humidity} %`;
    cloudyness.innerText = `${ weatherInfo?.clouds?.all} %`;
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else{
        alert("position not available")
    }
}

function showPosition(position){
    const userCoordinate = {
        lat : position.coords.latitude,
        lon : position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinate))
    fetchWeatherInfo(userCoordinate)
}

const grantAccessButton = document.querySelector("[data-grantAccess]")
grantAccessButton.addEventListener("click", getLocation())
 
const searchInput = document.querySelector("[data-searchInput]")

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    if(searchInput.value === "" ) 
        return;
    else
        fetchWeatherInfo(searchInput.value)
})

async function fetchWeatherInfo(city){
    loadingScreen.classList.add("active")
    userInfoContainer.classList.remove("active")
    grantAccess.classList.remove("active")

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        const data = await response.json()
        loadingScreen.classList.remove("active")
        userInfoContainer.classList.add("active")
        renderWeatherInfo(data)
    }
    catch(err){

    }
}
