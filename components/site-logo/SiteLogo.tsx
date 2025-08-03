import Link from "next/link";
import logoImg from '@/assets/logo.png';
import Image from "next/image";
import styles from './site-logo.module.css';

export const SiteLogo = () => {
	return (
    <Link className={styles.siteLogo} href='/' aria-label='site logo'>
      <Image className={styles.image} src={logoImg} alt='A plate with food on it' priority />
    </Link>
	);
};