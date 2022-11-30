import { useContext, useEffect, useState } from 'react';

import { WheaterContext } from '../stores/WheaterContext';

import {
  Container, 
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  styled,
  Divider,
} from '@mui/material';

import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AirIcon from '@mui/icons-material/Air';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';


const TopBox = styled(Box) ( ({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',

  //jeśli jest większy niż sm wyświetl co w nawiasach, nie to co na górze
  [theme.breakpoints.up('md')]:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
}));

const MainBox = styled(Box) ( ({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems:'center',
    gap: '0.7rem',

  //jeśli jest większy niż sm wyświetl co w nawiasach, nie to co na górze
  [theme.breakpoints.up('md')]:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
}));

const DisplayTypoAura = styled(Typography) ({
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
});

const HomePage = () => {
  const { wheaterData, fetchData } = useContext(WheaterContext);
  const [input, setInput] = useState('');
  const [location, setLocation] = useState('kraków');

  useEffect( () => {
    const abortCont = new AbortController();
      fetchData(location);
    return () => abortCont.abort();
  }, [location]);

  const sunrise = new Date((wheaterData.data.sys ? wheaterData.data.sys.sunrise : null) * 1000).toLocaleTimeString();
  const sunset = new Date((wheaterData.data.sys ? wheaterData.data.sys.sunset : null) * 1000).toLocaleTimeString();
  const time = new Date((wheaterData.data ? wheaterData.data.dt : null) * 1000).toLocaleTimeString();
  const date = new Date((wheaterData.data ? wheaterData.data.dt : null) * 1000).toLocaleDateString();
  const icon = wheaterData.data.weather ? wheaterData.data.weather[0].icon : null;

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocation(input);

    if (event.key === 'Enter') {
      setLocation(input);;
      setInput('');
    }
  };

  return (
    <Container>
      <Stack spacing={2}>

        <form onSubmit={handleSubmit}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            marginTop: '1rem',
            border: '3px black solid',
            borderRadius: '20px',
            padding: '2rem',
            }}>
            <TextField sx={{
              width: '50%'
            }}
              label="City Name" 
              color="primary" 
              focused 
              value={input} 
              onChange={(event) => setInput(event.target.value)} 
            />
            <Button type='submit' variant="outlined">Pokaż</Button>

          </Box>
            <Typography variant="h3" sx={{
              textAlign: 'center'
            }}>
              {wheaterData.error ? 'Nie znaleiono miasta' : null}
            </Typography>
        </form>

        <TopBox>
          <Typography variant="h3" sx={{
            marginTop: '0.5rem',
            fontWeight: '700',
          }}>
            {wheaterData.data ? wheaterData.data.name : null} 
          </Typography>
          <Typography variant="h3" sx={{
            marginTop: '1rem',
          }}>
            {time}
          </Typography>
        </TopBox>

          <Box>
            <Typography variant="subtitle1">
              {date}
            </Typography>
          </Box>

          <MainBox>
            <Typography variant="h1" sx={{
              // display: 'flex',
              // flexDirection: 'row',
              // alignItems:'center',
              gap: '0.7rem',
              marginTop: '1rem',
            }}>
              {wheaterData.data.main ? Math.round(wheaterData.data.main.temp) : null} &#x2103;
              <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="Ikona pogody" /> 
            </Typography>

            <Divider orientation="vertical" variant="middle" flexItem sx={{
              backgroundColor: 'black',
              borderBottomWidth: 2,
              margin: '0.5rem',
            }} />

          <Box>
            <DisplayTypoAura variant="subtitle1" >
              <CloudQueueIcon /> {wheaterData.data.weather ? wheaterData.data.weather[0].description : null}
            </DisplayTypoAura>

            <DisplayTypoAura variant="subtitle1" >
              <ThunderstormIcon /> Wilgotność: {wheaterData.data.main ? wheaterData.data.main.humidity : null}%;
            </DisplayTypoAura>

            <DisplayTypoAura variant="subtitle1" >
              <AirIcon /> Wiatr: {wheaterData.data.wind ? wheaterData.data.wind.speed : null} m/sec
            </DisplayTypoAura>

            <DisplayTypoAura variant="subtitle1">
              <AirIcon /> Wschód słońca: {sunrise}
            </DisplayTypoAura>

            <DisplayTypoAura variant="subtitle1" >
              <AirIcon /> Zachód słońca: {sunset}
            </DisplayTypoAura>
          </Box>

        </MainBox>
      </Stack>
    </Container>
  )
};

export default HomePage;