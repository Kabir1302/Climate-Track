import React from 'react';
import icon from './images/icon.png'

const WeatherData = (props) => {

  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };

  return (
    <div className='weatherData'>
      <div className='currtemp'>
        <div className='tempAndLogo'>
          <div>
            <img src={icon} width={100} alt='icon' className="iconImage" />
          </div>
          <div>
            {Math.round(props.weatherData.temp)}&deg;C
            <p>{props.weather.description}</p>
          </div>
        </div>

      </div>
      <div id='scrolledItem' className='forcastdata'>
        {/* <div>

          <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/sunrise.svg'} width={100} alt='icon' />

        </div> */}
        <div>
          <p className='heading'>{props.lang ? 'SUNRISE' : 'सूर्योदय'}</p>

          <p>{getTime(props.city.sunrise)}</p>
        </div>
        <div>
          <p className='heading'>{props.lang ? 'WIND' : 'हवा'}</p>

          <p>{props.windData.speed}&nbsp;mph</p>
        </div>
        <div>
          <p className='heading'>{props.lang ? 'HUMIDITY' : 'नमी'}</p>

          <p>{props.weatherData.humidity}&nbsp;mm</p>
        </div>
        {/* <div>

          <img src={'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/sunset.svg'} width={100} alt='icon' />

        </div> */}
      </div>
      <a href="https://www.linkedin.com/in/kabir-ahuja-4910b1230/" className='link' target="_blank" >&copy;Kabir Ahuja</a>
    </div>
  )
}

export default WeatherData
