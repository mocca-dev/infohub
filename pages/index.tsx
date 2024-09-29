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
  const [toastText, setToastText] = useState('');
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
        text={toastText}
        show={showToast}
        resetShow={() => setShowToast(false)}
      />
      <main className={styles.main}>
        <Header
          onShareSucces={() => {
            setToastText('Copiado!');
            setShowToast(true);
          }}
          weather={weatherCard}
        />
        <div className={styles.cardContainer}>
          <Card
            data={{
              title: dollarCard?.title,
              footer: dollarCard?.footer,
            }}
            isLoading={isDollarLoading}
            refresh={refreshDollar}
          >
            <DollarCard
              onCopied={(text: string) => {
                setToastText(text);
                setShowToast(true);
              }}
              data={{
                value: dollarCard?.data?.value,
                official: dollarCard?.data?.official,
                mep: dollarCard?.data?.mep,
              }}
            />
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
              month={holiDayCard?.data.month}
              reason={holiDayCard?.data.reason}
              left={holiDayCard?.data.left}
              isWeekend={holiDayCard?.data.isWeekend}
              dayName={holiDayCard?.data.dayName}
            />
          </Card>
          <BigCard
            card={gNewsCard}
            refresh={refreshGNews}
            isLoading={isGNewsLoading}
            onShareSucces={setShowToast}
          ></BigCard>
        </div>
      </main>
    </>
  );
};

export default Home;
