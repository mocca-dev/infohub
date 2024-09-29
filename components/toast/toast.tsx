import { FunctionComponent, useEffect, useState } from 'react';
import styles from './toast.module.css';

type Props = {
  text: string;
  show: boolean;
  resetShow: Function;
};

const Toast: FunctionComponent<Props> = ({ text, show, resetShow }) => {
  const [innerShow, setInnerShow] = useState(false);

  useEffect(() => {
    setInnerShow(show);
    setTimeout(() => {
      setInnerShow(false);
      resetShow(false);
    }, 5000);
  }, [show, resetShow]);

  return (
    <>{innerShow ? <div className={styles.container}>{text}</div> : null}</>
  );
};

export default Toast;
