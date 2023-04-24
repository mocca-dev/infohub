import { FunctionComponent } from 'react';
import styles from './HolidayCard.module.css';

type Props = {
  day: string;
  left: string;
  reason: string;
};

const HolidayCard: FunctionComponent<Props> = ({ day, left, reason }) => (
  <>
    <div className={styles.day}>{day}</div>
    <div className={styles.left}>{left}</div>
    <div className={styles.reason}>{reason}</div>
  </>
);

export default HolidayCard;
