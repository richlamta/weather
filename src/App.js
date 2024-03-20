import React , { useState } from 'react';

const api = {
  key: "9f9122cb5d57d5a4ea4ca8c91e05060b",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())    //promise
      .then(result => {           //promise
        setWeather(result);
        setQuery('');
        console.log(result);
    });    
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]    //returns number 0-6 to get the day of the week
    let date = d.getDate();
    let month = months[d.getMonth()]; //returns number 0-11 to get months
    let year = d.getFullYear();

    return `${day}, ${month} ${date}, ${year}`
  }


  return (
    <div className={
      (typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Please enter your city..."
            onChange={e => setQuery(e.target.value)}
            value={query}   //binding
            onKeyPress={search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp*1.8+32)}°F
            </div>
            <div className="weather">{weather.weather[0].main}</div>
            </div>
        </div>
        ) : ('')}

        </main>
    </div>
  );
}

export default App;
