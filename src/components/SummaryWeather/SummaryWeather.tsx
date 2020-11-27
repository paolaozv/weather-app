import { useState } from 'react';
import styles from './SummaryWeather.module.css';
import { useGlobalContext } from '../../context';
import { ReactComponent as Search } from '../../assets/images/search.svg';
import { ReactComponent as Close } from '../../assets/images/close.svg';
import { ReactComponent as Arrow } from '../../assets/images/arrow.svg';
import Loader from '../Loader/Loader';

const SummaryWeather = () => {
  const { translate, setQuery, query, searchQuery, results, loading, getWeather } = useGlobalContext();
  const [showSearch, setShowSearch] = useState(false);

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

  return (
    <div className={styles.container}>
      <button
        className={styles.searchButton}
        onClick={() => setShowSearch(!showSearch)}
      >
        {translate('searchButton')}
      </button>
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
    </div>
  );
};

export default SummaryWeather;