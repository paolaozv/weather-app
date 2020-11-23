import React from 'react';
import InfoWeather from './components/InfoWeather/InfoWeather';
import SummaryWeather from './components/SummaryWeather/SummaryWeather';
import styles from './styles/App.module.css';

const App = () => {
  return (
    <div className={styles.container}>
      <SummaryWeather />
      <InfoWeather />
    </div>
  );
};

export default App;
