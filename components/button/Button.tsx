import clsx from 'clsx';
import {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';

import { getMod } from '../../utils/get-mod';

import styles from './btn.module.css';

type CommonProps = {
  mods?: string;
} & PropsWithChildren;

type ButtonProps = ComponentPropsWithoutRef<'button'> &
  CommonProps & {
    href?: never;
    onClick?: MouseEventHandler<HTMLButtonElement> | (() => void);
  };

type AnchorProps = ComponentPropsWithoutRef<'a'> &
  CommonProps & {
    href: string;
  };

type Props = ButtonProps | AnchorProps;

const isAnchorProps = (props: Props): props is AnchorProps => 'href' in props;

export const Button = (props: Props) => {
  const { mods = 'primary', children, ...restProps } = props;
  const classes = clsx(styles.btn, getMod(styles, 'btn', mods));

  if (isAnchorProps(props)) {
    const { href, ...anchorProps } = restProps as AnchorProps;
    return (
      <a className={classes} href={href} {...anchorProps}>
        {children}
      </a>
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
