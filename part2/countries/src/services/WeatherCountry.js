import axios from 'axios';
import { useEffect, useState } from 'react';

export const WeatherCountry = ({ objCountry }) => {

    const [weather, setweather] = useState([]);

    useEffect(() => {
        const params = {
            access_key: process.env.REACT_APP_API_KEY,
            query: objCountry
        }

        axios.get('http://api.weatherstack.com/current',{params})
        .then(response => {
            console.log(response.data);
            setweather([response.data]);
        }).catch(error => {
            console.log(error)
        });

    },[objCountry]);

    if(weather.length !== 0){
        return(
            <>
                <h1>{`Weather in ${objCountry}`}</h1>
                <p><strong>temperature:</strong>{` ${weather[0].current.temperature} Celcius`}</p>
                <img alt='weather-img' src={weather[0].current.weather_icons[0]} />
                <p><strong>wind:</strong>{` ${weather[0].current.wind_speed} mph, direction: ${weather[0].current.wind_dir}`}</p>
            </>
        );
    }else{
        return <p>Loading</p>
    }

}