import Image from 'next/image';
import Link from 'next/link';

import logoImg from '@/assets/logo.png';

import styles from './site-logo.module.css';

export const SiteLogo = () => {
  return (
    <Link className={styles['site-logo']} href="/" aria-label="site logo">
      <Image
        className={styles['site-logo__image']}
        src={logoImg}
        alt="A plate with food on it"
        priority
      />
    </Link>
  );
};
