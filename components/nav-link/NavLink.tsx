'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import styles from './nav-link.module.css';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = useMemo(() => pathname === href, [pathname, href]);

  return (
    <Link
      href={href}
      className={clsx(styles['nav-link'], {
        [styles['nav-link--active']]: isActive,
      })}
    >
      {children}
    </Link>
  );
};
