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
      <form>
        <label htmlFor="first">
          <input
            name="first"
            type="number"
            value={firstValue}
            onChange={(e) => {
              let targetValue = e.target.value;
              if (e.target.value === '') {
                setFirstValue('1');
                targetValue = '1';
              } else {
                setFirstValue(e.target.value);
              }
              setSecondValue(
                (
                  parseInt(targetValue) * parseInt(value.replace('$', ''))
                ).toString()
              );
            }}
          />
          USD
        </label>
        <div>
          <label htmlFor="second">
            <input
              name="second"
              type="number"
              value={secondValue}
              onChange={(e) => {
                let targetValue = e.target.value;
                if (e.target.value === '') {
                  setSecondValue('1');
                  targetValue = '1';
                } else {
                  setSecondValue(e.target.value);
                }
                setFirstValue(
                  (
                    parseInt(targetValue) / parseInt(value.replace('$', ''))
                  ).toString()
                );
              }}
            />
            ARS
          </label>
        </div>
      </form>
      <button className={styles.btn} onClick={onToggle}>
        Volver a la cotización
      </button>
    </div>
  );
};

export default DollarCardConverter;
