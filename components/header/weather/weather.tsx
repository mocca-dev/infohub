import { FunctionComponent } from 'react';
import styles from './weather.module.css';
import { WeatherData } from '@/types/types';
import Image from 'next/image';

type Props = {
  data: WeatherData;
};

const Weather: FunctionComponent<Props> = ({ data }) => {
  console.log(data);
  return (
    <>
      {data ? (
        <span className={styles.weatherContainer}>
          <span>Bahía Blanca,</span> {data?.temperature}°C
          <Image src={data.icon} alt="weatherIcon" width="20" height="20" />
          {/* {weather?.data.status} */}
        </span>
      ) : null}
    </>
  );
};

export default Weather;
