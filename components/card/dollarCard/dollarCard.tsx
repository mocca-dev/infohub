import { FunctionComponent } from 'react';
import styles from './dollarCard.module.css';

type Props = {
  value: string;
};

const DollarCard: FunctionComponent<Props> = ({ value }) => (
  <div className={styles.cardValue}>{value}</div>
);

export default DollarCard;
