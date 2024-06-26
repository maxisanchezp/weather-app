import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
import { clear } from '@testing-library/user-event/dist/clear'

export const WeatherApp = () => {

    let api_key = '73398cb65d23943bebbaced0e18e5e7b'
    const [wicon, setWicon] = useState(cloud_icon);
    const [error, setError] = useState(null);
    
    const search = async () => {
      const element = document.getElementsByClassName('city-input')
      if (element[0].value.trim() === '') {
        alert('Ingrese una ciudad válida.');
        return;
      }

      setError(null)
      
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    
      try{
        let response = await fetch(url);
        if (!response.ok) {
          alert('No se encontró la ciudad o pais, intentelo de nuevo.');
          return;
        }  
        
          let data = await response.json();
          const humidity = document.getElementsByClassName('humidity-percent')
          const wind = document.getElementsByClassName('wind-speed')
          const temperature = document.getElementsByClassName('weather-temp')
          const city = document.getElementsByClassName('weather-location')

          humidity[0].innerHTML = data.main.humidity + ' %';
          wind[0].innerHTML = data.wind.speed + ' km/h';
          temperature[0].innerHTML = data.main.temp.toFixed(0) + '°C';
          city[0].innerHTML = data.name;

          if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n'){
            setWicon(clear_icon)
          } else if(data.weather[0].icon === '02d' || data.weather[0].icon === '02n'){
            setWicon(cloud_icon)
          } else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n'){
            setWicon(drizzle_icon)
          } else if(data.weather[0].icon === '04d' || data.weather[0].icon === '04d'){
            setWicon(drizzle_icon)
          } else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n'){
            setWicon(rain_icon)
          } else if(data.weather[0].icon === '10d' || data.weather[0].icon === '10n'){
            setWicon(rain_icon)
          } else if(data.weather[0].icon === '13d' || data.weather[0].icon === '13n'){
            setWicon(snow_icon)
          } else {
            setWicon(clear_icon)
          }

        } catch (error){
          console.error('API request failed:', error);
          alert('No se pudo obtener la información meteorológica. Por favor, inténtelo de nuevo.');
  }
      }

  return (
    <div className="container">
      <div className='container2'>
        <div className="top-bar">
            <input type="text" className="city-input" placeholder='Buscar'
            onKeyDown={(event) => {
              if(event.key === 'Enter'){
                search();
              }
            }}/>
            <div className="search-icon" onClick={() => {search()}}>
                <img src={search_icon} alt="" />
            </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">---</div>
        <div className="weather-location">-------</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">---</div>
              <div className="text">Humedad</div>
            </div>
            
          </div>
          <div className="element">
            <img src= {wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-speed">---</div>
              <div className="text">Veloc. Viento</div>
            </div>            
          </div>
        </div>
    </div>
    <div className="footer">
      <h3>Developed by <a href="https://www.linkedin.com/in/maxisanchezp/" target='blank'>Maximiliano Sánchez</a></h3>
    </div>
    </div>
  )
}

export default WeatherApp;