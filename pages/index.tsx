import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Card from '@/components/card/card';
import DollarCard from '@/components/card/dollarCard/dollarCard';
import HolidayCard from '@/components/card/holidayCard/holidayCard';
import Header from '@/components/header/header';
import { useEffect, useState } from 'react';
import BigCard from '@/components/bigCard/bigCard';

type DollarData = {
  value: string;
};

type HollidayData = {
  day: string;
  left: string;
  reason: string;
};

type NewsItem = {
  description: string;
  link: string;
  pubDate: string;
  guid: { text: string; isPermaLink: string };
  source: { text: string; url: string };
  title: string;
};

type GNewsData = {
  value: { items: NewsItem[] };
};

type CardData = {
  id: number;
  title: string;
  footer: string;
};

interface DollarCardData extends CardData {
  data: DollarData;
}

interface HolidayCardData extends CardData {
  data: HollidayData;
}
interface GNewsCardData extends CardData {
  data: GNewsData;
}

const Home = () => {
  const [dollarCard, setDollarCard] = useState<DollarCardData>({
    id: 0,
    data: { value: '' },
    footer: '',
    title: '',
  });
  const [holiDayCard, setHoliDayCard] = useState<HolidayCardData>({
    id: 0,
    data: { day: '', reason: '', left: '' },
    footer: '',
    title: '',
  });
  const [gNewsCard, setGNewsCard] = useState<GNewsCardData>({
    id: 0,
    data: { value: { items: [] } },
    footer: '',
    title: '',
  });

  useEffect(() => {
    fetchDollarData();
    const intervalId = setInterval(() => {
      fetchDollarData();
    }, 1000 * 300);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchHolidayData();
    // const intervalId = setInterval(() => {
    // }, 1000 * 5);
    // return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchGoogleNewsData();
  }, []);

  const fetchGoogleNewsData = async () => {
    const dollarResp = await fetch('/api/googleNews');
    const dollarData = await dollarResp.json();

    setGNewsCard(dollarData);
  };

  const fetchDollarData = async () => {
    const dollarResp = await fetch('/api/dollar');
    const dollarData = await dollarResp.json();

    setDollarCard(dollarData);
  };

  const fetchHolidayData = async () => {
    const holidayResp = await fetch('/api/holiday');
    const holidayData = await holidayResp.json();

    setHoliDayCard(holidayData);
  };

  return (
    <>
      <Head>
        <title>Infohub</title>
        <meta
          name="description"
          content="Recibí información actualizada del dolar y más..."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <div className={styles.cardContainer}>
          <Card
            data={{
              title: dollarCard.title,
              footer: dollarCard.footer,
            }}
            refresh={fetchDollarData}
          >
            <DollarCard value={dollarCard.data.value} />
          </Card>
          <Card
            data={{
              title: holiDayCard.title,
              footer: holiDayCard.footer,
            }}
            refresh={fetchHolidayData}
          >
            <HolidayCard
              day={holiDayCard.data.day}
              reason={holiDayCard.data.reason}
              left={holiDayCard.data.left}
            />
          </Card>
          <BigCard
            data={{
              title: gNewsCard.title,
              footer: gNewsCard.footer,
              value: gNewsCard.data.value,
            }}
            refresh={fetchGoogleNewsData}
          ></BigCard>
        </div>
      </main>
    </>
  );
};

export default Home;
