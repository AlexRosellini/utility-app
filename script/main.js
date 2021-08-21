
/******************************************************************************************************************************************************/ 

async function getLocation() {
    
    async function success(position) {
        console.log(position)
        
        
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let unit = "Imperial"

        if (document.querySelector(".French").textContent == "Boite à Outil") {
             unit = "metric"
        }

        console.log(unit)
        const apiWUrl =  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=d24f35dccd27d67ccaa62ae5b282cafc&`
        const responseW = await fetch(apiWUrl);
        const meteo = await responseW.json();
        let htmlBuild = ""

        if (document.querySelector(".French").textContent == "Boite à Outil") {
            unit = "metric"
             htmlBuild = `<div class="weather">
                <div class="weather__city"><p>${meteo.name}</p></div>
                <div class="weather__weather">
                    <div class="weather__icon"><img src="./ressources/${meteo.weather[0].icon}.svg" alt=""></div>
                    <div class="weather__description"><p>${meteo.weather[0].description}</p></div>
                </div>
                <div class="weather__temperature">
                    <div class="weather__tempAverage"><p>Aujourd'huis, la température moyenne à ${meteo.name} est de : <span>${meteo.main.temp}°C</span></p></div>
                    <div class="weather__tempMaxLow"><p>Aujourd'huis, la température minimum est de : <span>${meteo.main.temp_min}°C</span></p>
                    <p>Aujourd'huis, la température maximum est de : <span>${meteo.main.temp_max}°C</span></p></div>
                </div>
            </div>`;
       } else {
             htmlBuild = `<div class="weather">
                        <div class="weather__city"><p>${meteo.name}</p></div>
                        <div class="weather__weather">
                            <div class="weather__icon"><img src="./ressources/${meteo.weather[0].icon}.svg" alt=""></div>
                            <div class="weather__description"><p>${meteo.weather[0].description}</p></div>
                        </div>
                        <div class="weather__temperature">
                            <div class="weather__tempAverage"><p>Today's temperature in ${meteo.name} is : <span>${meteo.main.temp}°F</span></p></div>
                            <div class="weather__tempMaxLow"><p>The minimum temperature for the day is : <span>${meteo.main.temp_min}°F</span></p>
                            <p>the maximum temperature for the day is : <span>${meteo.main.temp_max}°F</span></p></div>
                        </div>
                    </div>`;
            }
            let bloc = document.querySelector(".bloc");
            bloc.innerHTML = htmlBuild;

    }
    navigator.geolocation.getCurrentPosition(success)
}
getLocation();

/******************************************************************************************************************************************************/ 
