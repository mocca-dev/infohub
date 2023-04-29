import styles from './bigCard.module.css';
import RefreshIcon from '../icons/refresh';
import { FunctionComponent } from 'react';
import News from './news/news';

type NewsItem = {
  description: string;
  link: string;
  pubDate: string;
  guid: { text: string; isPermaLink: string };
  source: { text: string; url: string };
  title: string;
};

type GNewsData = {
  title: string;
  footer: string;
  value: { items: NewsItem[] };
};

type Props = {
  data: GNewsData;
  refresh: any;
};

const BigCard: FunctionComponent<Props> = ({ data, refresh }) => (
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <div className={styles.cardTitle}>{data.title}</div>
      <button onClick={refresh} className={styles.refreshBtn}>
        <RefreshIcon />
      </button>
    </div>
    <div className={styles.cardBody}>
      {data.title === '' ? (
        <div className={styles.loading}>Cargando...</div>
      ) : (
        <>
          {data.value?.items.map((news) => (
            <News key={news.guid.text} {...news} />
          ))}
        </>
      )}
    </div>
    <div className={styles.cardFooter}>{data.footer}</div>
  </div>
);

export default BigCard;
