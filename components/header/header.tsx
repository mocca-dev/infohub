import styles from './header.module.css';
import Logo from '../icons/logo';
import ShareBtn from '../shareBtn/shareBtn';
import { FunctionComponent } from 'react';
import { WeatherCardData } from '@/types/interfaces';
import Weather from './weather/weather';

type Props = {
  onShareSucces: Function;
  weather: WeatherCardData;
};

const Header: FunctionComponent<Props> = ({ onShareSucces, weather }) => (
  <header className={styles.container}>
    <div className={styles.body}>
      <Logo />
      <span className={styles.rightContainer}>
        <Weather data={weather?.data} />
        <ShareBtn
          url="https://infohub.vercel.app"
          onShareSucces={onShareSucces}
        />
      </span>
    </div>
  </header>
);

export default Header;
