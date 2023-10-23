import { FunctionComponent } from 'react';
import styles from './holidayCard.module.css';
import { HolidayData } from '@/types/types';

const HolidayCard: FunctionComponent<HolidayData> = ({
  day,
  month,
  left,
  reason,
  isWeekend,
  dayName,
}) => (
  <>
    <div className={styles.day}>
      <span>{day}</span> {month}
    </div>
    <div className={`${styles.dayName} ${isWeekend ? styles.isWeekend : ''}`}>
      {dayName}
    </div>
    <div className={styles.left}>{left}</div>
    <div className={styles.reason}>{reason}</div>
  </>
);

export default HolidayCard;
