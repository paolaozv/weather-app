import React from 'react';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.container}>
    <div className={styles.loader}>
      <div></div>
    </div>
  </div>
);

export default Loader;