import React, { useEffect, useRef, useState } from 'react'
import searchIcon from './search.svg'
import WeatherData from './WeatherData'
import linkIcon from './external-link.svg'
import rainyImage from './images/Rain.gif';
import cloudyImage from './images/cloudy.gif';
import clearSky from './images/clearSky.jpeg';
import Thunderstorm from './images/thunderstorm.gif';
import Snow from './images/Snow.gif'
const Main = () => {
  const inputValue = useRef();
  const [cityName, setCityName] = useState("Patiala");
  const [error, setError] = useState(true)
  const [lang, setLang] = useState(true)
  const [myData, setMyData] = useState([])
  const [cityDetails, setCityDetails] = useState([])
  const [dataWeather, setDataWeather] = useState([])
  const [windData, setWindData] = useState([]);
  const APP_KEY = "1d893f1f78b7ba5b746b1b654f565b39";

  useEffect(() => {
    (async _ => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${APP_KEY}&units=metric&lang=${lang ? ('en') : ('hi')}`);
      const data = await response.json();
      if (response.ok) {
        setCityDetails(data.city)
        setMyData(data.list[0].main)
        setDataWeather(data.list[0].weather[0])
        setWindData(data.list[0].wind)
        setError(true)
      } else {
        setError(false)
      }
    })();

  }, [cityName, lang])

  const onkeydownHandler = ((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setCityName(inputValue.current.value)
    }
  })
  const onSubmitHandler = ((e) => {
    e.preventDefault();
    setCityName(inputValue.current.value)
  })

  const getBackgroundImage = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return clearSky;
      case 'Clouds':
        return cloudyImage;
      case 'Rain':
      case 'Drizzle':
        return rainyImage;
      case 'Thunderstorm':
        return Thunderstorm;
      case Snow:
        return Snow;
      default:
        return cloudyImage; 
    }
  };

  const backgroundImage = getBackgroundImage(dataWeather.main);

  return (
    <div className='box' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className='cityName'>
        {error ? (<p>{cityDetails.name}, {cityDetails.country}<a href={`https://en.wikipedia.org/wiki/${cityDetails.name}`} target="_ "><img src={linkIcon} alt='link' /></a></p>) : (<p className='invalid'>{lang ? 'Invalid City Name' : 'अमान्य शहर का नाम'}</p>)}
        <div className='search'>
          <input type='text' ref={inputValue} onKeyDown={onkeydownHandler} placeholder='City Name' /><img style={{ cursor: 'pointer' }} onClick={onSubmitHandler} src={searchIcon} alt='searchIcon' />
        </div>

      </div>
      {/* {error?(<p>{cityDetails.name}, {cityDetails.country}<a  href={`https://en.wikipedia.org/wiki/${cityDetails.name}`} target="_ "><img src={linkIcon} alt='link'/></a></p>):(<p className='invalid'>{lang?'Invalid City Name':'अमान्य शहर का नाम'}</p>)} */}

      <WeatherData weatherData={myData} weather={dataWeather} city={cityDetails} lang={lang} windData={windData} />
      {/* <p onClick={() => setLang(!lang)} className='translater'>{lang ? ('हिंदी') : ('Eng')}</p> */}
    </div>
  )
}

export default Main


