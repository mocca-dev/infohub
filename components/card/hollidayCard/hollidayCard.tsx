import { FunctionComponent } from 'react';
import styles from './hollidayCard.module.css';

type Props = {
  day: string;
  left: string;
  reason: string;
};

const HollidayCard: FunctionComponent<Props> = ({ day, left, reason }) => (
  <>
    <div className={styles.day}>{day}</div>
    <div className={styles.left}>{left}</div>
    <div className={styles.reason}>{reason}</div>
  </>
);

export default HollidayCard;
