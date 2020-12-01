import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './InfoWeather.module.css';
import { useGlobalContext } from '../../context';
import SkeletonLoader from '../Skeleton/SkeletonLoader';
import CardDay from '../CardDay/CardDay';
import { formatDay, getWeatherState } from '../../utils';

const InfoWeather = () => {
  const { language, setLanguage, firstLoading, weather } = useGlobalContext();
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownEl = useRef<HTMLUListElement>(null);
  const weatherFormat = weather.splice(5, 2);

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
          {weather.map(({
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
      </div>
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          @paolaozv
        </p>
      </footer>
    </div>
  );
};

export default InfoWeather;