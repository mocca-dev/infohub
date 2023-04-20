import { FunctionComponent } from 'react';
import styles from './hollidayCard.module.css';

type Props = {
  day: string;
  remaining: string;
  reason: string;
};

const HollidayCard: FunctionComponent<Props> = ({ day, remaining, reason }) => (
  <>
    <div className={styles.day}>{day}</div>
    <div className={styles.remaining}>{remaining}</div>
    <div className={styles.reason}>{reason}</div>
  </>
);

export default HollidayCard;
