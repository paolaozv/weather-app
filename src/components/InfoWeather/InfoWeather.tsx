import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './InfoWeather.module.css';
import { useGlobalContext } from '../../context';

const InfoWeather = () => {
  const { language, setLanguage } = useGlobalContext();
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownEl = useRef<HTMLUListElement>(null);

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
    </div>
  );
};

export default InfoWeather;