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
    </div>
  );
};

export default CardDay;