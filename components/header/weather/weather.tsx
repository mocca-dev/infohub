import { FunctionComponent } from 'react';
import styles from './weather.module.css';

type Props = {
  data: { temperature: string };
};

const Weather: FunctionComponent<Props> = ({ data }) => {
  return (
    <>
      {data ? (
        <span className={styles.weatherContainer}>
          <span>Bahía Blanca,</span> {data?.temperature}°C
          {/* {weather?.data.status} */}
        </span>
      ) : null}
    </>
  );
};

export default Weather;
