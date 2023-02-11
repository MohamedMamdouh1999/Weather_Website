let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let date = new Date()
let data = []
async function getData(town = "Cairo"){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=be96ddbcdf954a5f95f140330232401&q=${town}&days=3&aqi=no&alerts=no`)
    response = await response.json()
    data = response
    displayFirstDay()
    displaySecondDay()
    displayThirdDay()
}
getData()
function displayFirstDay(){
    let temp = `
    <div class="head1 p-2 d-flex justify-content-between">
        <span>${days[date.getDay()]}</span>
        <span>${date.toDateString().split(" ").slice(2,3).toString()} ${date.toDateString().split(" ").slice(1,2).toString()}</span>
    </div>
    <div class="body1 px-3 py-4">
        <p class="fs-3 m-0">${data.location.name}</p>
        <div class="d-flex align-items-center">
            <h1 class="fw-bolder">${data.current.temp_c}<sup>o</sup>C</h1>
            <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
        </div>
        <div class="d-flex flex-wrap justify-content-start pb-2">
            <div class="d-flex justify-content-center align-items-center">
                <img src="IMGS/wind.png" alt="wind degree">
                <span class="ps-1 pe-2">${data.current.wind_degree}%</span>
            </div>
            <div class="d-flex justify-content-center align-items-center">
                <img src="IMGS/speed.png" alt="wind speed">
                <span class="ps-1 pe-2">${data.current.wind_kph}km/h</span>
            </div>
            <div class="pt-2 pt-sm-0 d-flex justify-content-center align-items-center">
                <img src="IMGS/direction.png" alt="wind direction">
                <span class="ps-1 pe-2">${data.current.wind_dir}</span>
            </div>
        </div>
    </div>`
    document.getElementById("firstDay").innerHTML = temp
}
function displaySecondDay(){
    let secondDay = data.forecast.forecastday[1].day
    let term = `
        <div class="head2 py-2">${days[new Date(data.forecast.forecastday[1].date).getDay()]}</div>
        <div class="body2 py-5">
            <img src="${secondDay.condition.icon}" alt="${secondDay.condition.text}">
            <h4 class="fw-bolder py-4 m-0">${secondDay.avgtemp_c}<sup>o</sup>C</h4>
            <span>${Math.round(secondDay.maxwind_kph)}%</span>
        </div>`
    document.getElementById("secondDay").innerHTML = term
}
function displayThirdDay(){
    let thirdDay = data.forecast.forecastday[2].day
    let term = `
        <div class="head1 py-2">${days[new Date(data.forecast.forecastday[2].date).getDay()]}</div>
        <div class="body1 py-5">
            <img src="${thirdDay.condition.icon}" alt="${thirdDay.condition.text}">
            <h4 class="fw-bolder py-4 m-0">${thirdDay.avgtemp_c}<sup>o</sup>C</h4>
            <span>${Math.round(thirdDay.maxwind_kph)}%</span>
        </div>`
    document.getElementById("thirdDay").innerHTML = term
}
document.addEventListener("keyup",(event)=>{
    if(event.key === "Enter"){
        searchTown()
    };
})
document.getElementById("btnSearch").addEventListener("click",_=>{
    searchTown()
})
function searchTown(){
    let inputValue = document.getElementById("searchInput").value;
    if(inputValue !== ""){
        getData(inputValue)
    }
}
