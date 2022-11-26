import { useContext, useEffect, useState } from 'react';

import { WheaterContext } from '../stores/WheaterContext';

import { 
  Container,
  Box,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';

const MainBox = styled(Box) ( ({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  gap: '20px',
  //jeśli jest większy niż sm wyświetl co w nawiasach, nie to co na górze
  [theme.breakpoints.up('md')]:{
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
    justifyContent: 'space-evenly',
  },
}));

const HomePage = () => {
  const [location, setLocation] = useState('kraków');
  const { wheaterData, fetchData } = useContext(WheaterContext);

  useEffect( () => {
    const abortCont = new AbortController();
    fetchData(location);

    return () => abortCont.abort();
  }, [location]);

  // const sunrise = new Date(parseInt( wheaterData.data ? wheaterData.data.sunrise : null) * 1000).toLocaleTimeString();
  // const sunset = new Date(parseInt( wheaterData.data ? wheaterData.data.sunset : null) * 1000).toLocaleTimeString();

  return (
    <Container>
      <Stack spacing={2}>
        <TextField sx={{
          margin: '0 auto',
          marginTop: '3rem',
          width: '50%'
        }}
          label="City Name" 
          color="primary" 
          focused 
          value={location} 
          onChange={(event) => setLocation(event.target.value)} 
        />
        <MainBox sx={{
        // display: 'flex',
        // gap: '2rem',
        // justifyContent: 'space-evenly',
        }}>
          <Typography variant="h3" sx={{
            marginTop: '3rem',
          }}>
            Temperatura:  {wheaterData.data ? wheaterData.data.temp : null} &#x2103;
          </Typography>
          <Typography variant="h3" sx={{
            marginTop: '3rem',
          }}>
            Temperatura oczuwalna:  {wheaterData.data ? wheaterData.data.feels_like : null} &#x2103;
          </Typography>
        </MainBox>
        <MainBox sx={{
          // display: 'flex',
          // gap: '2rem',
          // justifyContent: 'space-evenly',

        }}>
          <Typography variant="h3" sx={{
            marginTop: '3rem',
          }}>
            Wilgotość:  {wheaterData.data ? wheaterData.data.humidity : null}%
          </Typography>
          </MainBox>

        {/* <MainBox sx={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'space-evenly',

        }}>
          <Typography variant="h3" sx={{
            marginTop: '3rem',
          }}>
            Wschód słońca:  {String(sunrise)}
          </Typography>
          <Typography variant="h3" sx={{
            marginTop: '3rem',
          }}>
            Zachód słońca:  {String(sunset)}
          </Typography>
          </MainBox> */}
      </Stack>
    </Container>
  )
};

export default HomePage;