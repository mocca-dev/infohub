import { FunctionComponent, useEffect, useState } from 'react';
import styles from './dollarCard.module.css';
import { DollarData } from '@/types/types';
import Arrow from '@/components/icons/arrow';

const DollarCard: FunctionComponent<DollarData> = ({
  value,
  official,
  mep,
}) => {
  const [colorClass, setColorClass] = useState(styles.white);
  const [isEqual, setIsEqual] = useState(false);

  useEffect(() => {
    const lastValue = localStorage.getItem('lastValue');
    const currentValue = value?.replace('$', '');

    if (lastValue) {
      let lastValueNumber: number = parseInt(lastValue);
      if (currentValue && parseInt(currentValue) > lastValueNumber) {
        setColorClass(styles.green);
        setIsEqual(false);
      } else if (currentValue && parseInt(currentValue) === lastValueNumber) {
        setColorClass(styles.white);
        setIsEqual(true);
      } else {
        setColorClass(styles.red);
        setIsEqual(false);
      }
    } else {
      setColorClass(styles.green);
    }
    if (currentValue) localStorage.setItem('lastValue', currentValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${styles.cardValue} ${colorClass} ${
        isEqual ? styles.center : styles.left
      }`}
    >
      <div className={styles.blueValue}>
        <span>{value}</span>
        {isEqual ? null : <Arrow />}
      </div>
      <div className={styles.smallSizeValue}>Dólar Oficial: ${official}</div>
      <div className={styles.smallSizeValue}>Dólar Mep: ${mep}</div>
    </div>
  );
};

export default DollarCard;
