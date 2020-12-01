import styles from './SkeletonWind.module.css';

const SkeletonWind = () => (
  <div className={styles.container}>
    <div className={styles.title}></div>
    <div className={styles.info}></div>
    <div className={styles.infoBottom}></div>
  </div>
);

export default SkeletonWind;