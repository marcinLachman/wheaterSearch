import {createContext, useState } from 'react';
import axios from 'axios';

export const WheaterContext = createContext();

const initialState = {
  paramets: [],
  isLoading: true,
  error: false,
};

const WheaterProvider = ({ children }) => {
  const [ wheaterData, setWheaterData ] = useState(initialState);

  const fetchData = async (location) => {

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=33b8c88e24fd7520b39e5ab673cbc04c&units=metric`;

    // const URL = {
    //   method: 'GET',
    //   url: 'https://api.api-ninjas.com/v1/weather?city=' + location,
    //   headers: {
    //     'X-Api-Key': '9mOHnqV32jtdA1NoCrqU0w==0tjMDaNXxjVla68K'
    //   }
    // };

    try {
      const response = await axios.request(URL);
      const data = await response.data;
      if (data) {
        setWheaterData({
          data: data.results ? data.results : data,
          isLoading: false, 
          error: false,
        });
      };
    } catch (error) {
      if (axios.isCancel(error)) {
          console.log('Fetching Data Aborted');
        } else {
          console.log('Error occured', error);
        }
        setWheaterData({
          data: [],
          isLoading: false,
          error: true,
        }
      )
    }; 
  };

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