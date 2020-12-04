import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './InfoWeather.module.css';
import { useGlobalContext } from '../../context';
import SkeletonLoader from '../Skeleton/SkeletonLoader';
import CardDay from '../CardDay/CardDay';
import { formatDay, getWeatherState, windDirection } from '../../utils';
import { ReactComponent as Direction } from '../../assets/images/direction.svg';

const InfoWeather = () => {
  const { language, setLanguage, firstLoading, weather, translate } = useGlobalContext();
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownEl = useRef<HTMLUListElement>(null);
  const todayWeather = weather ? weather.slice(0, 1)[0] : null;
  const compass = todayWeather ? windDirection[`${todayWeather.wind_direction_compass}`] : 0;

  const handleClickOutside = useCallback((e) => {
    if (showDropDown && e.target.closest('.dropdownList') !== dropdownEl.current) {
      setShowDropDown(false);
    }
  }, [showDropDown, setShowDropDown, dropdownEl]);

  const chooseLanguage = (value: string) => {
    setShowDropDown(false);
    setLanguage(value);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [handleClickOutside]);

  if (firstLoading) {
    return (
      <SkeletonLoader />
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.dropdown}>
          <p className={styles.selected} onClick={() => setShowDropDown(!showDropDown)}>
            {language}
          </p>
          {showDropDown && (
            <ul className={styles.dropdownList} ref={dropdownEl}>
              <li onClick={() => chooseLanguage('EN')}>EN</li>
              <li onClick={() => chooseLanguage('ES')}>ES</li>
              <li onClick={() => chooseLanguage('DE')}>DE</li>
            </ul>
          )}
        </div>
      </header>
      <div className={styles.results}>
        <div className={styles.resultsDays}>
          {weather && weather.slice(0, 5).map(({
            applicable_date,
            id, max_temp,
            min_temp,
            weather_state_abbr
          }, index) => {
            const day = index === 0 ? 'Today' : formatDay(applicable_date);
            const img = getWeatherState(weather_state_abbr);
            return (
              <CardDay key={id} max={max_temp} min={min_temp} day={day} img={img} />
            )
          })}
        </div>
        <div className={styles.resultsToday}>
          <p>{translate('subtitle')}</p>
          <div className={styles.info}>
            <div className={styles.wind}>
              <p>{translate('status')}</p>
              <p className={styles.windSpeed}>
                {`${todayWeather && todayWeather.wind_speed.toFixed(0)} `}
                <span>mph</span>
              </p>
              <p className={styles.direction}>
                <Direction style={{transform: `rotate(${compass}deg)`}} />
                {`${todayWeather && todayWeather.wind_direction_compass}`}
              </p>
            </div>
            <div className={styles.humidity}>
              <p>{translate('humidity')}</p>
              <p className={styles.humidityPercent}>
                {`${todayWeather && todayWeather.humidity} `}
                <span>%</span>
              </p>
              <div className={styles.totalPercent}>
                <div className={styles.percent} style={{width: `${todayWeather && todayWeather.humidity}%`}}></div>
              </div>
            </div>
            <div className={styles.visibility}>
              <p>{translate('visibility')}</p>
              <p className={styles.quantity}>
                {`${todayWeather && todayWeather.visibility.toFixed(1)} `}
                <span>miles</span>
              </p>
            </div>
            <div className={styles.pressure}>
              <p>{translate('pressure')}</p>
              <p className={styles.quantity}>
                {`${todayWeather && todayWeather.air_pressure} `}
                <span>mb</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          @paolaozv - @DevChallenges.io
        </p>
      </footer>
    </div>
  );
};

export default InfoWeather;