import styles from './header.module.css';
import Logo from '../icons/logo';
import ShareBtn from '../shareBtn/shareBtn';
import { FunctionComponent } from 'react';

type Props = {
  onShareSucces: Function;
};

const Header: FunctionComponent<Props> = ({ onShareSucces }) => (
  <header className={styles.container}>
    <div className={styles.body}>
      <Logo />
      <ShareBtn onShareSucces={onShareSucces} />
    </div>
  </header>
);

export default Header;
