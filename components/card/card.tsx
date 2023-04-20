import styles from './card.module.css';
import RefreshIcon from '../icons/refresh';

const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>Dólar Blue</div>
        <div className={styles.refreshBtn}>
          <RefreshIcon />
        </div>
      </div>
      <div className={styles.cardValue}>$423</div>
      <div className={styles.cardFooter}>Actualizado el 19/04/23 07:01 PM</div>
    </div>
  );
};

export default Card;
