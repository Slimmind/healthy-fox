import MainNav from '../main-nav';
import SiteLogo from '../site-logo';

import styles from './header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <SiteLogo />
      <MainNav />
      <div>{/* <AuthMenu /> */}</div>
    </header>
  );
};
