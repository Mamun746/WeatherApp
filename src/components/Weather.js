import React,{useState,useEffect} from 'react';

const apiKey='6214ac4346091240eb42743186af3551'

const Weather = () => {
    const [location,setLocation]=useState('')
    const [data,setData]=useState(null)
    const [message,setMessage]=useState('Type a city to find weather')

    

    return (
        <div>
            <h1>Weather-App</h1>
            <div>Current location {location}</div>
           <form>
           </form>
        </div>
    );
};

export default Weather;