import { useState, useEffect } from "react";
import React from 'react'
import axios from "axios";

const DisplayInformation = ({list, setFilter, weather_api_key}) => {

  const [weather, setWeather] = useState(["","","",""]);

  const SetFilter = (countryname) => setFilter(countryname);  // Käytetään kun käyttäjä painaa show-nappia

  if(list.length > 10)
  {
    return <div>Too many matches, specify another filter</div>;
  }
  else if(list.length === 0)
  {
    return <div>No matches, specify another filter</div>;
  }
  else if(list.length === 1)
  {
    /*
      Koska list[0].languages ei ole taulukko vaan objekti
      niin pitää käyttää Object.keys tyyliä
    */

    // Haetaan säätiedot
    const GetWeatherInformation = (capital) => {
      axios.get(`http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${capital}`)
      .then(response => {
        console.log(response);
		if(response.statusText === "OK")  // Jos säätietojen haku on OK, tallennetaan tieto
		{
			let array = [response.data.current.temperature,
			  response.data.current.wind_speed + " mph direction " + response.data.current.wind_dir,
			  response.data.current.weather_icons[0]
			, capital]

			setWeather(array);
		}
		else		
			console.log("Response failed", response);
		
        console.log(response);
      });
    };
    
    // Jos nykyinen capital eroaa säätiedoissa olevasta capitalista, haetaan uusi säätieto
    if(list[0].capital !== weather[3])
      GetWeatherInformation(list[0].capital);

    return (
      <div>
        <h1>{list[0].name.common}</h1>
        capital {list[0].capital} <br />
        population {list[0].population}  <br />

        <h2>languages</h2>
        
        <ul>
          {
            Object.keys(list[0].languages).map( key => <li key={list[0].languages[key]}>{list[0].languages[key]}</li>)
          }
        </ul>

        <img src={list[0].flags.png} alt="Flag of this specific country" />

        <h2>Weather in {list[0].capital}</h2>
        <b>Temperature: </b>{weather[0]} <br />
        <img src={weather[2]} alt="WeatherIcon" /> <br />
        <b>Wind: {weather[1]} </b>

      </div>
    );
  }
  else
  {
    return list.map(country => <div key={country.name.common}>{country.name.common} <button onClick={() => SetFilter(country.name.common)}>Show</button></div>)
  }

}


function App() {

  const [filter, setFilter] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const weather_api_key = process.env.REACT_APP_API_KEY;

  const hook = () => {  // Haetaan lista maista ja niiden tiedoista
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountryList(response.data);
      setLoaded(true);
    });
  }; useEffect(hook, []);

  const onFilterChange = (event) => setFilter(event.target.value);
  
  if(loaded) {  // Odotetaan kunnes listan haku maista on valmis

    // Filtteroidaan lista
    const filteredList = countryList.filter( (country) => (country.name.common.toLowerCase().includes(filter.toLowerCase())));

    return (
      <div>
        <div>
        find countries <input value={filter} onChange={onFilterChange} />
        </div>

        <DisplayInformation list={filteredList} setFilter={setFilter} weather_api_key={weather_api_key} />

      </div>
    );
  }
  else
  {
    return(
      <div>Loading data . . .</div>
    );
  }
}


export default App;
