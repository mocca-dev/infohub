import Link from 'next/link';
import { FunctionComponent } from 'react';
import styles from './news.module.css';

type Props = {
  description: string;
  link: string;
  pubDate: string;
  guid: { text: string; isPermaLink: string };
  source: { text: string; url: string };
  title: string;
};

const News: FunctionComponent<Props> = ({ link, pubDate, source, title }) => {
  const calcTime = () => {
    const pub = new Date(pubDate);
    const now = new Date();
    const res = now.getTime() - pub.getTime();
    return Math.floor(res / 1000 / 60 / 60);
  };

  return (
    <div className={styles.container}>
      <div className={styles.source}>
        <Link href={source.url} rel="noopener noreferrer" target="_blank">
          {source.text}
        </Link>
      </div>
      <Link href={link} rel="noopener noreferrer" target="_blank">
        {title}
      </Link>
      <div className={styles.time}>Hace {calcTime()} horas</div>
    </div>
  );
};

export default News;
