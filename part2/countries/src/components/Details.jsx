/* eslint-disable react/prop-types */

import axios from "axios"
import { useEffect, useState } from "react"
const apiKey = import.meta.env.VITE_API_KEY;

export const  Details = ({name, population, capital, languages, flag}) => {
  const [weather, setweather] = useState([])

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`)
    .then(response => {
      setweather(response.data)
    }).catch(err => console.log(err))
    return () => {
      console.log('unmoanting')
    }
  }, [])
  
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
        <p>wind: {weather.wind?.speed}</p>
        </>
        : <p>fetching...</p>
      }
    </div>
  )
}