/* eslint-disable react/prop-types */

import axios from "axios"
import { useEffect, useState } from "react"
const apiKey = import.meta.env.VITE_API_KEY;

export const  Details = ({name, population, capital, languages, flag}) => {
  const [weather, setWeather] = useState([])
  const [weatherIcon, setWeatherIcon] = useState({})


  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`, {
          cancelToken: source.token
        });
        setWeather(response.data);
        const weatherIcon = response.data.weather[0].icon
        console.log(response.data.weather[0].description)
        setWeatherIcon({
          img: `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`,
          description: response.data.weather[0].description
        })
       

      } catch (error) {
        if (axios.isCancel(error)) {
          // La solicitud fue cancelada debido a desmontaje
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();

    return () => {
      // Cancela la solicitud cuando el componente se desmonta
      source.cancel('Componente desmontado');
    };
  }, []);
  
  return (
    <div>
      <h1>{name}</h1>
      <p>capital: {capital}.</p>
      <p>population: {population.toLocaleString()}</p>

      <h3>spoken languages</h3>
      <ul>
        {
          languages.map((lang, idx) => (<li key={`${idx}:${lang}`}>{lang}</li>))
        }

      </ul>
      <img width={120} height={120} src={flag.svg} alt={flag.alt} />
      <h3>weather in {capital}</h3>
      {
        weather.main?.temp && weather.wind?.speed ?
        <>
        <p>temperature: {weather.main?.temp}</p>
        <img className="imgIcon" width={80} height={60} src={weatherIcon.img} alt={weatherIcon.description} />
        <p>wind: {weather.wind?.speed}</p>
        </>
        : <p>fetching...</p>
      }
    </div>
  )
}