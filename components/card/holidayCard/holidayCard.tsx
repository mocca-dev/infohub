import { FunctionComponent, useEffect, useState } from 'react';
import styles from './holidayCard.module.css';
import { HolidayListData } from '@/types/types';
import HolidayItem from './holidayItem';
import Arrow from '@/components/icons/arrow';

const HolidayCard: FunctionComponent<HolidayListData> = ({ days }) => {
  const [current, setCurrent] = useState(0);

  const prevHoliday = () => {
    if (current > 0) setCurrent((prevCur) => prevCur - 1);
  };

  const nextHoliday = () => {
    if (current < days.length - 1) setCurrent((prevCur) => prevCur + 1);
  };

  useEffect(() => {
    if (days)
      for (let i = 0; i < days.length; i++) {
        if (days[i].isNextHoliday) {
          setCurrent(i);
          break;
        }
      }
  }, [days]);

  return (
    <div className={styles.holidayContainer}>
      {current >= 1 ? (
        <button className={styles.leftArrow} onClick={prevHoliday}>
          <Arrow />
        </button>
      ) : null}
      {days?.length >= 0 && (
        <HolidayItem
          day={days[current].day}
          month={days[current].month}
          left={days[current].left}
          reason={days[current].reason}
          isWeekend={days[current].isWeekend}
          dayName={days[current].dayName}
          isNextHoliday={days[current].isNextHoliday}
        />
      )}

      {current < days?.length - 1 ? (
        <button className={styles.rightArrow} onClick={nextHoliday}>
          <Arrow />
        </button>
      ) : null}
    </div>
  );
};

export default HolidayCard;
