import { useState } from 'react';
import styles from './SummaryWeather.module.css';
import { useGlobalContext } from '../../context';
import { ReactComponent as Search } from '../../assets/images/search.svg';
import { ReactComponent as Close } from '../../assets/images/close.svg';
import { ReactComponent as Arrow } from '../../assets/images/arrow.svg';
import { ReactComponent as Location } from '../../assets/images/location.svg';
// import background from '../../assets/images/background.png';
import Loader from '../Loader/Loader';
import { formatterDate, getWeatherState } from '../../utils';

const SummaryWeather = () => {
  const { translate, setQuery, query, searchQuery, results, loading, getWeather, firstLoading, weather, location } = useGlobalContext();
  const [showSearch, setShowSearch] = useState(false);
  const date = formatterDate();

  const handleOnChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleOnClick = (e: any) => {
    e.preventDefault();
    searchQuery();
  };

  const handleGetWeather = (id: number) => {
    setShowSearch(false);
    getWeather(id);
  };

  if (firstLoading) {
    return (
      <div className={styles.containerLoader}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.searchButton}
        onClick={() => setShowSearch(!showSearch)}
      >
        {translate('searchButton')}
      </button>
      <div className={styles.summaryContainer}>
        {weather.slice(0, 1).map(({ id, the_temp, weather_state_abbr, weather_state_name }) => {
          const img = getWeatherState(weather_state_abbr);
          return (
            <div key={id} className={styles.summary}>
              <img src={img} alt='weather' />
              <p className={styles.temp}>{`${the_temp.toFixed(0)} °C`}</p>
              <p className={styles.state}>{weather_state_name}</p>
              <p className={styles.date}>{`Today · ${translate(date.day)}, ${date.dayNumber} ${translate(date.month)}`}</p>
              <p className={styles.location}>
                <Location />
                {location}
              </p>
            </div>
          );
        })}
      </div>
      <div className={`${styles.searchBox} ${showSearch && styles.openSearch}`}>
        <Close className={styles.closeIcon} onClick={() => setShowSearch(!showSearch)} />
        <form className={styles.form}>
          <label className={styles.label}>
            <Search className={styles.searchIcon} />
            <input
              type='text'
              value={query}
              onChange={handleOnChange}
              className={styles.input}
              placeholder={translate('searchLocation')}
            />
          </label>
          <button
            onClick={handleOnClick}
            className={styles.buttonForm}
          >
            {translate('search')}
          </button>
        </form>
        <div className={styles.loaderContainer}>
          {loading && <Loader />}
        </div>
        {!loading && results && results.length === 0 && (
          <p className={styles.noResults}>{translate('noResults')}</p>
        )}
        <div className={styles.results}>
          {!loading && results && results.map(({ woeid, title }) => (
            <div key={woeid} className={styles.item} onClick={() => handleGetWeather(woeid)}>
              <p>{title}</p>
              <Arrow className={styles.arrowIcon} />
            </div>
          ))}
        </div>
      </div>
      {/* <img src={background} alt='background' /> */}
    </div>
  );
};

export default SummaryWeather;