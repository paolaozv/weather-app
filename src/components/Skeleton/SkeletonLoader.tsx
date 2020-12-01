import styles from './SkeletonLoader.module.css';
import SkeletonDay from '../Skeleton/SkeletonDay';
import SkeletonWind from '../Skeleton/SkeletonWind';
import SkeletonSpeed from '../Skeleton/SkeletonSpeed';

const SkeletonLoader = () => (
  <div className={styles.container}>
    <div className={styles.row}>
      <SkeletonDay />
      <SkeletonDay />
      <SkeletonDay />
      <SkeletonDay />
      <SkeletonDay />
    </div>
    <div className={styles.row}>
      <SkeletonWind />
      <SkeletonWind />
    </div>
    <div className={styles.row}>
      <SkeletonSpeed />
      <SkeletonSpeed />
    </div>
  </div>
);

export default SkeletonLoader;