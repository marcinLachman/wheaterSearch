import WheaterProvider from './stores/WheaterContext';

import HomePage from './components/HomePage';

import { Paper } from '@mui/material';
import bgImage from './assets/bg.jpg';

const App = () => {
  return (
    <Paper sx={{
      height: "100vh",
      backgroundImage: `url(${bgImage})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}>
      <WheaterProvider>
        <HomePage />
      </WheaterProvider>
    </Paper>
  );
}

export default App;
