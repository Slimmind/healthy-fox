import NavLink from '@/components/nav-link';
import { mainNavConfig } from '@/configs/main-nav.config';

import styles from './mainNav.module.css';

export const MainNav = () => {
  return (
    <nav className={styles['main-nav']}>
      <ul>
        {mainNavConfig.map(({ text, url }) => (
          <li key={url}>
            <NavLink href={url}>{text}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
