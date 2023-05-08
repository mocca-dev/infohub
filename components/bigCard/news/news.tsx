/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { FunctionComponent, useEffect, useState } from 'react';
import styles from './news.module.css';
import { NewsItem, Option } from '@/types/types';
import ShareBtn from '@/components/shareBtn/shareBtn';
import TooltipMenu from '@/components/tooltipMenu/tooltipMenu';
import useShareCopy from '@/hooks/useShareCopy';

type Props = {
  news: NewsItem;
  onShareSucces: any;
};

const News: FunctionComponent<Props> = ({ news, onShareSucces }) => {
  const { link, pubDate, source, title } = news;
  const onShareCopy = useShareCopy(link, onShareSucces);
  const [time, setTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const menuOptions: Option[] = [
    { label: 'Compartir', action: () => onShareCopy(false) },
    { label: 'Copiar', action: () => onShareCopy(true) },
    { label: 'Abrir', action: () => window.open(link, '_blank') },
  ];

  useEffect(() => {
    const pub = new Date(pubDate);
    const now = new Date();
    const res = now.getTime() - pub.getTime();
    const time = Math.floor(res / 1000 / 60 / 60);

    if (time <= 0) {
      const mins = Math.floor(res / 1000 / 60);
      setTime(`Hace ${mins} min${mins > 1 ? 's' : ''}`);
    } else if (time < 24) {
      setTime(`Hace ${time} hora${time > 1 ? 's' : ''}`);
    } else {
      const day = Math.floor(time / 24);
      setTime(`Hace ${day} día${day > 1 ? 's' : ''}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <TooltipMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        menuOptions={menuOptions}
      />
      <div className={styles.source}>
        <img
          src={source.url + '/favicon.ico'}
          alt="Icono de la fuente de la noticia."
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.className = styles.hidden;
          }}
        />
        <Link href={source.url} rel="noopener noreferrer" target="_blank">
          {source.text}
        </Link>
      </div>
      <button className={styles.btnText} onClick={() => setIsOpen(true)}>
        {title}
      </button>
      <div className={styles.time}>{time}</div>
    </div>
  );
};

export default News;
