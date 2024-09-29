import { FunctionComponent, useEffect, useState } from 'react';
import styles from './dollarCard.module.css';
import { DollarData } from '@/types/types';
import Arrow from '@/components/icons/arrow';
import CopyIcon from '@/components/icons/copy';
import SwapIcon from '@/components/icons/swap';

type Props = {
  onCopied: any;
  onToggle: any;
  data: DollarData;
};

const DollarCardBody: FunctionComponent<Props> = ({
  onCopied,
  onToggle,
  data,
}) => {
  const [colorClass, setColorClass] = useState(styles.white);
  const [isEqual, setIsEqual] = useState(false);
  const { value, official, mep } = data;
  const copiedValue = () => {
    navigator.clipboard
      .writeText(value?.replace('$', '') + '')
      .then(() => {
        onCopied('Valor Blue $' + value?.replace('$', '') + ' copiado!');
      })
      .catch((err) => {
        console.log(err);
        onCopied('No se pudo copiar el valor del dolar Blue');
      });
  };

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
    <div className={styles.cardValue}>
      <div
        className={`${styles.blueValue} ${colorClass}  ${
          isEqual ? styles.center : styles.left
        }`}
      >
        <span>{value}</span>
        {isEqual ? null : <Arrow />}
      </div>
      <div className={styles.smallSizeValue}>Dólar Oficial: ${official}</div>
      <div className={styles.smallSizeValue}>Dólar Mep: ${mep}</div>
      <div className={styles.buttonBar}>
        <button onClick={onToggle} className={styles.btn}>
          Convertir <SwapIcon />
        </button>
        <button onClick={copiedValue} className={styles.btn}>
          Copiar Blue
          <CopyIcon />
        </button>
      </div>
    </div>
  );
};

export default DollarCardBody;
