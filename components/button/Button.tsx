import clsx from 'clsx';
import Link from 'next/link';
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import getMod from '../../utils/get-mod';

import styles from './button.module.css';

type CommonProps = {
  mods?: string;
  mod?: string | string[];
} & PropsWithChildren;

type ButtonProps = ComponentPropsWithoutRef<'button'> &
  CommonProps & {
    href?: never;
  };

type AnchorProps = ComponentPropsWithoutRef<'a'> &
  CommonProps & {
    href: string;
  };

type Props = ButtonProps | AnchorProps;

const isAnchorProps = (props: Props): props is AnchorProps => 'href' in props;

export const Button = (props: Props) => {
  const { mod, children, ...restProps } = props;
  const classes = clsx(styles.button, getMod(styles, 'button', mod));

  if (isAnchorProps(props)) {
    const { href, ...anchorProps } = restProps as AnchorProps;
    return (
      <Link className={classes} href={href} {...anchorProps}>
        {children}
      </Link>
    );
  } else {
    const { type, ...buttonProps } = restProps as ButtonProps;
    return (
      <button className={classes} type={type || 'button'} {...buttonProps}>
        {children}
      </button>
    );
  }
};
