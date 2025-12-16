import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Typography.module.scss';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'button'
  | 'body'
  | 'small';

type TypographyOwnProps<T extends ElementType = 'span'> = {
  as?: T;
  variant: TypographyVariant;
  className?: string;
  children?: ReactNode;
  uppercase?: boolean;
};

export type TypographyProps<T extends ElementType = 'span'> =
  TypographyOwnProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof TypographyOwnProps>;

export const Typography = <T extends ElementType = 'span'>(
  props: TypographyProps<T>,
) => {
  const { as, variant, className, children, uppercase, ...restProps } = props;

  const Component = as || 'span';

  return (
    <Component
      className={classNames(
        styles[variant],
        { [styles.uppercase]: uppercase },
        className,
      )}
      {...restProps}
    >
      {children}
    </Component>
  );
};
