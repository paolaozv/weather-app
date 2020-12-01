import styles from './SkeletonDay.module.css';

const SkeletonDay = () => (
  <div className={styles.container}>
    <div className={styles.title}></div>
    <div className={styles.image}></div>
    <div className={styles.footer}>
      <div className={styles.max}></div>
      <div className={styles.min}></div>
    </div>
  </div>
);

export default SkeletonDay;