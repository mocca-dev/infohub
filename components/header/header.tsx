import styles from './header.module.css';
import Logo from '../icons/logo';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Logo />
      </div>
    </div>
  );
};

export default Header;
