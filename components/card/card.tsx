import styles from './card.module.css';
import RefreshIcon from '../icons/refresh';
import { FunctionComponent } from 'react';

type CardData = {
  title: string;
  footer: string;
};

type Props = {
  children: any;
  data: CardData;
  refresh: any;
};

const Card: FunctionComponent<Props> = ({ children, data, refresh }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>{data.title}</div>
        <button onClick={refresh} className={styles.refreshBtn}>
          <RefreshIcon />
        </button>
      </div>
      {children}
      <div className={styles.cardFooter}>{data.footer}</div>
    </div>
  );
};

export default Card;
