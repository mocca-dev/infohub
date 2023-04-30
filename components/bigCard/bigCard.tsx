import styles from './bigCard.module.css';
import RefreshIcon from '../icons/refresh';
import { FunctionComponent } from 'react';
import News from './news/news';
import { GNewsCardData } from '@/types/interfaces';
import { NewsItem } from '@/types/types';

type Props = {
  card: GNewsCardData;
  refresh: any;
};

const BigCard: FunctionComponent<Props> = ({ card, refresh }) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <div className={styles.cardTitle}>{card.title}</div>
      <button onClick={refresh} className={styles.refreshBtn}>
        <RefreshIcon />
      </button>
    </div>
    <div className={styles.cardBody}>
      {card.title === '' ? (
        <div className={styles.loading}>Cargando...</div>
      ) : (
        <>
          {card.data.value?.items.map((news: NewsItem) => (
            <News key={news.guid.text} {...news} />
          ))}
        </>
      )}
    </div>
    <div className={styles.cardFooter}>{card.footer}</div>
  </div>
);

export default BigCard;
