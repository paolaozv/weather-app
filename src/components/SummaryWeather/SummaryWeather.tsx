import React from 'react';
import styles from './SummaryWeather.module.css';
import { useGlobalContext } from '../../context';

const SummaryWeather = () => {
  const { translate } = useGlobalContext();

  return (
    <div className={styles.container}>
      <input
        type='text'
        className={styles.input}
        placeholder={translate('searchInput')}
      />
    </div>
  );
};

export default SummaryWeather;