import styles from './header.module.css';
import Logo from '../icons/logo';

const Header = () => (
  <header className={styles.container}>
    <div className={styles.body}>
      <Logo />
    </div>
  </header>
);

export default Header;
