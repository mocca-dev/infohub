import { FunctionComponent } from 'react';
import styles from './holidayItem.module.css';
import { HolidayData } from '@/types/types';

const HolidayItem: FunctionComponent<HolidayData> = ({
  day,
  month,
  left,
  reason,
  isWeekend,
  dayName,
  isNextHoliday,
}) => (
  <div className={`${!isNextHoliday ? styles.pastHoliday : ''}`}>
    <div className={styles.day}>
      <div>{day}</div> {month}
    </div>
    <div className={`${styles.dayName} ${isWeekend ? styles.isWeekend : ''}`}>
      {dayName}
    </div>
    {isNextHoliday && <div className={styles.left}>{left}</div>}
    <div className={styles.reason}>{reason}</div>
  </div>
);

export default HolidayItem;
