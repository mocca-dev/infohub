import { FunctionComponent } from 'react';
import styles from './rangeBtn.module.css';

type Props = {
  onSelect: any;
  selected: number;
  label: string;
  value: number;
};

const RangeBtn: FunctionComponent<Props> = ({
  onSelect,
  label,
  selected,
  value,
}) => {
  return (
    <button
      className={`btn ${styles.navPadding} ${
        selected === value ? styles.isActive : null
      }`}
      onClick={() => onSelect(value)}
    >
      {label}
    </button>
  );
};

export default RangeBtn;
