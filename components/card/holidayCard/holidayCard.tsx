import { FunctionComponent } from 'react';
import styles from './holidayCard.module.css';
import { HolidayData } from '@/types/types';

const HolidayCard: FunctionComponent<HolidayData> = ({ day, left, reason }) => (
  <>
    <div className={styles.day}>{day}</div>
    <div className={styles.left}>{left}</div>
    <div className={styles.reason}>{reason}</div>
  </>
);

export default HolidayCard;
