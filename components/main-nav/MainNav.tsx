'use client';

import clsx from 'clsx';
import { useState } from 'react';

import NavLink from '@/components/nav-link';
import { mainNavConfig } from '@/configs/main-nav.config';

import styles from './main-nav.module.css';

export const MainNav = () => {
  const [active, setActive] = useState(false);

  const toggleMenu = () => setActive(!active);

  const navClasses = clsx(styles['main-nav'], {
    [styles['main-nav--active']]: active,
  });

  return (
    <nav className={navClasses}>
      <button
        className={styles['main-nav__menu-button']}
        onClick={toggleMenu}
      />
      <div className={styles['main-nav__content']}>
        <ul className={styles['main-nav__list']}>
          {mainNavConfig.map(({ text, url }) => (
            <li key={url} className={styles['main-nav__list-item']}>
              <NavLink href={url}>{text}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
