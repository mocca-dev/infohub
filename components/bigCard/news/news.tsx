import Link from 'next/link';
import { FunctionComponent, useEffect, useState } from 'react';
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
  const [time, setTime] = useState('');

  useEffect(() => {
    const pub = new Date(pubDate);
    const now = new Date();
    const res = now.getTime() - pub.getTime();
    const time = Math.floor(res / 1000 / 60 / 60);
    if (time < 24) {
      setTime(`Hace ${time} hora${time % 2 === 0 ? 's' : ''}`);
    } else {
      const day = Math.floor(time / 24);
      setTime(`Hace ${day} día${day % 2 === 0 ? 's' : ''}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className={styles.time}>{time}</div>
    </div>
  );
};

export default News;
