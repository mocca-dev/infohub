import styles from './card.module.css';
import RefreshIcon from '../icons/refresh';
import { FunctionComponent, ReactElement } from 'react';
import { CardShellData } from '@/types/types';

type Props = {
  children: ReactElement;
  data: CardShellData;
  refresh: (event: React.MouseEvent) => void;
  isLoading: boolean;
  isBig?: boolean;
};

const Card: FunctionComponent<Props> = ({
  children,
  data,
  refresh,
  isLoading,
  isBig = false,
}) => (
  <div className={isBig ? styles.bigCard : styles.card}>
    <div className={styles.cardHeader}>
      <div className={styles.cardTitle}>{data.title}</div>
      <button onClick={refresh} className={styles.refreshBtn}>
        <RefreshIcon />
      </button>
    </div>
    {isLoading ? (
      <div className={styles.loading}>Cargando...</div>
    ) : (
      <>{children}</>
    )}
    {data.footer ? (
      <div className={styles.cardFooter}>{data.footer}</div>
    ) : null}
  </div>
);

export default Card;
