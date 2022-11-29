import {createContext, useState } from 'react';
import axios from 'axios';

export const WheaterContext = createContext();

const initialState = {
  data: [],
  isLoading: true,
  error: false,
};

const WheaterProvider = ({ children }) => {
  const [ wheaterData, setWheaterData ] = useState(initialState);

  //   const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=33b8c88e24fd7520b39e5ab673cbc04c&units=metric`;

    // const URL = {
    //   method: 'GET',
    //   url: 'https://api.api-ninjas.com/v1/weather?city=' + location,
    //   headers: {
    //     'X-Api-Key': '9mOHnqV32jtdA1NoCrqU0w==0tjMDaNXxjVla68K'
    //   }
    // };

  const fetchData = async (location) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=33b8c88e24fd7520b39e5ab673cbc04c&units=metric`;

    try {
      const response = await axios.get(URL);
      // if (!response.ok) {
      //   throw new Error('Network response was not OK');
      // }
      setWheaterData({
        data: response.data,
        isLoading: false,
        error: false
      })
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        setWheaterData({
          data: [],
          isLoading: false,
          error: true,
        });
      } else if (err.request) {
        console.log(err.request);
      } else {
        setWheaterData({
          data: [],
          isLoading: false,
          error: true,
        });
      }
    } 
  }

  return (
    <WheaterContext.Provider value={{
      wheaterData,
      fetchData,
    }}>
      { children }
    </WheaterContext.Provider>
  )
};

export default WheaterProvider;