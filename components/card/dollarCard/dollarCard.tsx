import { FunctionComponent, useEffect, useState } from 'react';
import styles from './dollarCard.module.css';
import { DollarData } from '@/types/types';
import DollarCardBody from './dollarCardBody';
import DollarCardConverter from './dollarCardConverter';

type Props = {
  onCopied: any;
  data: DollarData;
};

const DollarCard: FunctionComponent<Props> = ({ onCopied, data }) => {
  const [toggleView, setToggleView] = useState(true);

  return (
    <div className={styles.cardValue}>
      {toggleView ? (
        <DollarCardBody
          data={data}
          onCopied={onCopied}
          onToggle={() => setToggleView(false)}
        />
      ) : (
        <DollarCardConverter
          onToggle={() => setToggleView(true)}
          value={data.value + ''}
        />
      )}
    </div>
  );
};

export default DollarCard;
