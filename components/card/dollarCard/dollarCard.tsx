import { FunctionComponent } from 'react';
import styles from './dollarCard.module.css';
import { DollarData } from '@/types/types';

const DollarCard: FunctionComponent<DollarData> = ({ value }) => (
  <div className={styles.cardValue}>{value}</div>
);

export default DollarCard;
