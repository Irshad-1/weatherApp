const api_key="dbb7ed2c5b8d20e04bff14fd1a695f11";

document.querySelector('form').addEventListener('submit',async()=>{
    event.preventDefault();
    let city=document.querySelector('form > input[type="text"]').value;
    
    let direction=await fetchDirectionJSON(city);
    let lat=direction[0].lat;
    let lon=direction[0].lon;
    let weather=await fetchWeatherJSON(lat,lon);
    console.log(weather);
    let temp=weather.main.temp;
    let pressure=weather.main.pressure;
    let humidity=weather.main.humidity;
    let wind_speed=weather.wind.speed;
    let sunrise=weather.sys.sunrise;
    let sunr = new Date(sunrise);
    sunrise=sunr.getHours();
    let sunset=weather.sys.sunset;
    let suns = new Date(sunset);
    sunset=suns.getHours();
    let description=weather['weather'][0].description;
    console.log(temp);
    console.log(pressure);
    console.log(humidity);
    console.log(wind_speed);
    console.log(sunrise);
    console.log(sunset);
    console.log(description);
    document.getElementById('display').innerHTML="";
    let temperature=document.createElement('h2');
    temperature.innerText=temp+" C";

    let outerBox=document.createElement('div'); 
    outerBox.style.display="grid";
    outerBox.style.gridTemplateColumns="repeat(2,1fr)";
    outerBox.style.gap="50px";

    let pressureBox=document.createElement('div');
    let pressur=document.createElement('h4');
    pressur.innerText="Pressure";
    let pressu=document.createElement('h4');
    pressu.innerText=pressure;
    pressureBox.append(pressur,pressu);
    let humidityBox=document.createElement('div');
    let humidit=document.createElement('h4');
    humidit.innerText="Humidity";
    let humidi=document.createElement('h4');
    humidi.innerText=humidity;
    humidityBox.append(humidit,humidi);
    let windBox=document.createElement('div');
    let win=document.createElement('h4');
    win.innerText="Wind Speed";
    let wi=document.createElement('h4');
    wi.innerText=wind_speed;
    windBox.append(win,wi);
    let sunriseBox=document.createElement('div');
    let sunris=document.createElement('h4');
    sunris.innerText="Sunrise";
    let sunri=document.createElement('h4');
    sunri.innerText=sunr;
    sunriseBox.append(sunris,sunri);
    let sunsetBox=document.createElement('div');
    let sunse=document.createElement('h4');
    sunse.innerText="Sunset";
    let sun=document.createElement('h4');
    sun.innerText=suns;
    sunsetBox.append(sunse,sun);
    let descBox=document.createElement('div');
    let descrip=document.createElement('h4');
    descrip.innerText="Weather Description";
    let decsri=document.createElement('h4');
    decsri.innerText=description;

    pressureBox.style.display="flex";
    pressureBox.style.justifyContent="space-between";

    humidityBox.style.display="flex";
    humidityBox.style.justifyContent="space-between";


    windBox.style.display="flex";
    windBox.style.justifyContent="space-between";


    sunriseBox.style.display="flex";
    sunsetBox.style.justifyContent="space-between";


    descBox.style.display="flex";
    descBox.style.justifyContent="space-between";



    descBox.append(descrip,decsri);
    outerBox.append(pressureBox,humidityBox,windBox,sunriseBox,sunsetBox,descBox);
    document.querySelector('#display').append(temperature,outerBox);

})

async function fetchWeatherJSON(lat,lon){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`);
        const weather = await response.json();
        return weather;
    }catch(err){
        console.log(err);
    }
  }

async function fetchDirectionJSON(city){
    try{
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}`);
        const weather = await response.json();
        console.log(weather);
        return weather;
    }catch(err){
        console.log(err);
    }
  }