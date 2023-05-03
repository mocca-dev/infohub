import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Card from '@/components/card/card';
import DollarCard from '@/components/card/dollarCard/dollarCard';
import HolidayCard from '@/components/card/holidayCard/holidayCard';
import Header from '@/components/header/header';
import BigCard from '@/components/bigCard/bigCard';
import {
  DollarCardData,
  GNewsCardData,
  HolidayCardData,
  WeatherCardData,
} from '@/types/interfaces';
import useFetch from '@/hooks/useFetch';
import Toast from '@/components/toast/toast';
import { useState } from 'react';

const Home = () => {
  const [showToast, setShowToast] = useState(false);
  const [dollarCard, isDollarLoading, refreshDollar] = useFetch<DollarCardData>(
    '/api/dollar',
    300
  );
  const [holiDayCard, isHolidayLoading, refreshHoliday] =
    useFetch<HolidayCardData>('/api/holiday');
  const [gNewsCard, isGNewsLoading, refreshGNews] =
    useFetch<GNewsCardData>('/api/googleNews');
  const [weatherCard] = useFetch<WeatherCardData>('/api/weather', 900);

  return (
    <>
      <Head>
        <title>Infohub</title>
        <meta
          name="description"
          content="Recibí información actualizada del dólar y más..."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toast
        text="Copiado!"
        show={showToast}
        resetShow={() => setShowToast(false)}
      />
      <main className={styles.main}>
        <Header onShareSucces={setShowToast} weather={weatherCard} />
        <div className={styles.cardContainer}>
          <Card
            data={{
              title: dollarCard?.title,
              footer: dollarCard?.footer,
            }}
            isLoading={isDollarLoading}
            refresh={refreshDollar}
          >
            <DollarCard value={dollarCard?.data?.value} />
          </Card>
          <Card
            data={{
              title: holiDayCard?.title,
              footer: holiDayCard?.footer,
            }}
            isLoading={isHolidayLoading}
            refresh={refreshHoliday}
          >
            <HolidayCard
              day={holiDayCard?.data.day}
              reason={holiDayCard?.data.reason}
              left={holiDayCard?.data.left}
            />
          </Card>
          <BigCard
            card={gNewsCard}
            refresh={refreshGNews}
            isLoading={isGNewsLoading}
          ></BigCard>
        </div>
      </main>
    </>
  );
};

export default Home;
