import axios from "axios";
import { useEffect, useState } from "react";
import { Details } from "./components";

function App() {
  const [countries, setCountries] = useState([]);
  const [searcher, setsearcher] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  const handleSearcher = (event)=> {

    const countrySearched = event.target.value;
    setsearcher(countrySearched);

    const filterCountries = countries.filter(country => country.name.common.toLowerCase().includes(countrySearched))
    setFilteredCountries(filterCountries);

    if (event.target.value === 'show') {
      const countryName = event.target.getAttribute('data-country');
      const filterCountry = countries.find(country => 
        country.name.common.toLowerCase() === countryName.toLowerCase()
      );
      console.log("🚀 ~ file: App.jsx:23 ~ handleSearcher ~ filterCountry:", filterCountry)
      setFilteredCountries(filterCountry ? [filterCountry]: []);
    }


  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });

    return () => {
      console.log('logica desmontado');
    }
  }, []);

  return (
    <>
      <div>
        <label htmlFor="search">find countries  </label>
        <input type="text" name="search" value={searcher} onChange={handleSearcher} />
      </div>
      <div>
        {
          filteredCountries.length === 1  ? 
          filteredCountries.map((el, idx) => (<Details key={idx} name={el.name.common} languages={Object.values(el.languages)} capital={el.capital[0]} population={el.population} flag={el.flags}/>))
          
            : searcher !== '' && filteredCountries.length <= 10 ? 
              filteredCountries.map((el, idx)=> 
              (
              <p key={idx}>{el.name.common} <input onClick={handleSearcher}   data-country={el.name.common}  type="button" value='show' /></p>
              )
              )
              : <p>Too many matches, specify another filter</p>
        }
      </div>
    </>
  )
}

export default App;
