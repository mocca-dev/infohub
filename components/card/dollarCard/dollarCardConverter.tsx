import { FunctionComponent, useState } from 'react';
import styles from './dollarCardConverter.module.css';

type Props = {
  onToggle: any;
  value: string;
};

const DollarCardConverter: FunctionComponent<Props> = ({ onToggle, value }) => {
  const [firstValue, setFirstValue] = useState('1');
  const [secondValue, setSecondValue] = useState(value.replace('$', ''));

  return (
    <div className={styles.container}>
      <form action="">
        <label htmlFor="first">
          <input
            name="first"
            type="text"
            value={firstValue}
            onChange={(e) => {
              setFirstValue(e.target.value);
              setSecondValue(
                (
                  parseInt(e.target.value) * parseInt(value.replace('$', ''))
                ).toString()
              );
            }}
          />
          USD
        </label>
        <label htmlFor="second">
          <input
            name="second"
            type="text"
            value={secondValue}
            onChange={(e) => {
              setSecondValue(e.target.value);
              setFirstValue(
                (
                  parseInt(e.target.value) / parseInt(value.replace('$', ''))
                ).toString()
              );
            }}
          />
          ARS
        </label>
      </form>
      <button className={styles.btn} onClick={onToggle}>
        Volver a la cotización
      </button>
    </div>
  );
};

export default DollarCardConverter;
