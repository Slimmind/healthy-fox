'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './NavLink.module.css';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={clsx('', {
        [`${styles.linkActive}`]: pathname === href,
      })}
    >
      {children}
    </Link>
  );
};
