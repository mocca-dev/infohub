import { FunctionComponent, useState } from 'react';
import styles from './dollarCardConverter.module.css';

type Props = {
  onToggle: any;
  value: string;
};

const DollarCardConverter: FunctionComponent<Props> = ({ onToggle, value }) => {
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');

  return (
    <div className={styles.container}>
      <form>
        <label htmlFor="first">
          <input
            name="first"
            type="number"
            placeholder="1"
            value={firstValue}
            onChange={(e) => {
              let targetValue = e.target.value;
              setFirstValue(targetValue);
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
              placeholder={value.replace('$', '')}
              value={secondValue}
              onChange={(e) => {
                let targetValue = e.target.value;
                setSecondValue(targetValue);
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
