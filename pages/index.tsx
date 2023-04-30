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
} from '@/types/interfaces';
import useFetch from '@/hooks/useFetch';

const Home = () => {
  const [dollarCard, isDollarLoading, refreshDollar] = useFetch<DollarCardData>(
    '/api/dollar',
    true
  );
  const [holiDayCard, isHolidayLoading, refreshHoliday] =
    useFetch<HolidayCardData>('/api/holiday', false);
  const [gNewsCard, isGNewsLoading, refreshGNews] = useFetch<GNewsCardData>(
    '/api/googleNews',
    false
  );

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
      <main className={styles.main}>
        <Header />
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
