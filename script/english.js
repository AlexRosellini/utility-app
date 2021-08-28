
/*******************************************************************************/
//Function that gets coordinates

async function getlocation() {
  return new Promise((resolve, reject) => {
    async function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const coordinates = [latitude, longitude];
      resolve(coordinates);
    }
    try {
      navigator.geolocation.getCurrentPosition(success, (error) =>
        reject(error)
      );
    } catch (err) {
      reject(err);
    }
  });
}

/*******************************************************************************/
//function apicall weather

async function apicall(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position[0]}&lon=${position[1]}&units=${unit}&appid=d24f35dccd27d67ccaa62ae5b282cafc&`
  const response = await fetch(apiUrl);
  if (!response.ok) {
    alert('Error fetching weather')
  }
  const result = response.json();
  return result
}

/*******************************************************************************/
//function to build html weather

async function buildHtml(weather) {
  let htmlBuild = `<div class="weather">
                      <div class="weather__city"><p>${weather.name}</p></div>
                      <div class="weather__weather">
                          <div class="weather__icon"><img src="./ressources/${weather.weather[0].icon}.svg" alt=""></div>
                          <div class="weather__description"><p>${weather.weather[0].description}</p></div>
                      </div>
                      <div class="weather__temperature">
                          <div class="weather__tempAverage"><p>Aujourd'huis, la température moyenne à ${weather.name} est de : <span>${weather.main.temp}°C</span></p></div>
                          <div class="weather__tempMaxLow"><p>Aujourd'huis, la température minimum est de : <span>${weather.main.temp_min}°C</span></p>
                          <p>Aujourd'huis, la température maximum est de : <span>${weather.main.temp_max}°C</span></p></div>
                      </div>
                  </div>`;
  let bloc = document.querySelector(".bloc");
  bloc.innerHTML = htmlBuild;
}

/*******************************************************************************/

async function apicallTime() {
  const responseT = await fetch("http://worldtimeapi.org/api/timezone/Europe/Paris");
  const resultT = responseT.json(); 
  return resultT
}

/*******************************************************************************/
//main function
async function main() {
    try {
        const position = await getlocation();
        const weather = await apicall(position);
        const time = await apicallTime();
        await buildHtml(weather, time);
        console.log(time)
    } catch (err) {
      console.log(err);
    }
}
main();
