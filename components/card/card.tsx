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
};

const Card: FunctionComponent<Props> = ({ children, data }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>{data.title}</div>
        <div className={styles.refreshBtn}>
          <RefreshIcon />
        </div>
      </div>
      {children}
      <div className={styles.cardFooter}>{data.footer}</div>
    </div>
  );
};

export default Card;
