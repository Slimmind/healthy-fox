import NavLink from '@/components/nav-link';
import { mainNavConfig } from '@/configs/main-nav.config';

import styles from './mainNav.module.css';

export const MainNav = () => {
  return (
    <nav className={styles.mainNav}>
      <ul>
        {mainNavConfig.map(({ name, link }) => (
          <li key={name}>
            <NavLink href={link}>{name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
