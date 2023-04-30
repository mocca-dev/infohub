import styles from './card.module.css';
import RefreshIcon from '../icons/refresh';
import { FunctionComponent } from 'react';
import { CardShellData } from '@/types/types';

type Props = {
  children: any;
  data: CardShellData;
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
      {data.title === '' ? (
        <div className={styles.loading}>Cargando...</div>
      ) : (
        <>{children}</>
      )}
      <div className={styles.cardFooter}>{data.footer}</div>
    </div>
  );
};

export default Card;
