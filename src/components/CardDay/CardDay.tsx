import React from 'react';
import styles from './CardDay.module.css';
import { useGlobalContext } from '../../context';


type TypeWeather = {
  day: string;
  max: number;
  min: number;
  img: string;
};

const CardDay: React.FC<TypeWeather> = ({ day, img, max, min }) => {
  const { translate } = useGlobalContext();

  return (
    <div className={styles.container}>
      <p>{translate(`${day}`)}</p>
      <img className={styles.img} src={img} alt={day} />
      <div className={styles.footer}>
        <p>{`${min.toFixed(0)}°C`}</p>
        <p>{`${max.toFixed(0)}°C`}</p>
      </div>
    </div>
  );
};

export default CardDay;