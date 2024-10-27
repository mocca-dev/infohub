import { FunctionComponent } from 'react';
import RangeBtn from './RangeBtn';
import styles from './historyNavbar.module.css';

type Props = {
  changeRange: any;
  selected: number;
};

const HistoryNavbar: FunctionComponent<Props> = ({ changeRange, selected }) => {
  const buttonList = [
    { label: '1S', value: 7 },
    { label: '1M', value: 30 },
    { label: '3M', value: 90 },
    { label: '6M', value: 180 },
    { label: '1A', value: 365 },
    { label: '2A', value: 720 },
    { label: '3A', value: 1825 },
    { label: 'Todo', value: 0 },
  ];

  return (
    <nav className={styles.nav}>
      {buttonList.map((button) => (
        <RangeBtn
          key={button.label}
          label={button.label}
          value={button.value}
          selected={selected}
          onSelect={changeRange}
        />
      ))}
    </nav>
  );
};

export default HistoryNavbar;
