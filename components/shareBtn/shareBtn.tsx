import { FunctionComponent, useEffect, useState } from 'react';
import styles from './shareBtn.module.css';
import IOSShare from '../icons/iosShare';
import AndroidShare from '../icons/androidShare';

type Props = {
  onShareSucces: Function;
};

const ShareBtn: FunctionComponent<Props> = ({ onShareSucces }) => {
  const [isChrome, setIsChrome] = useState(false);

  useEffect(() => {
    setIsChrome(navigator.userAgent.toLowerCase().includes('chrome'));
  }, []);

  const handleShare = () => {
    const url = 'https://infohub.vercel.app';
    if (navigator.share) {
      navigator
        .share({
          title: 'InfoHub',
          text: 'Enterate del valor del dólar blue y más...',
          url,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url);
      onShareSucces(true);
    }
  };

  return (
    <button onClick={handleShare} className={styles.shareBtn}>
      {isChrome ? <AndroidShare /> : <IOSShare />}
    </button>
  );
};

export default ShareBtn;
