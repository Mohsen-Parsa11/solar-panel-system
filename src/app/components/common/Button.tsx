import Link from 'next/link';
import React from 'react';
import { cn } from '@/libs/utils';

type ButtonVariant
  = | 'contained'
    | 'outlined'
    | 'text'
    | 'primary'
    | 'secondary';

type BaseProps = {
  'variant'?: ButtonVariant;
  'label'?: React.ReactNode;
  'children'?: React.ReactNode;
  'className'?: string;
  'disabled'?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
};

type LinkButtonProps = BaseProps & {
  isLink: true;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type NativeButtonProps = BaseProps & {
  isLink?: false;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
};

type Props = LinkButtonProps | NativeButtonProps;

const getButtonClasses = (
  variant: ButtonVariant,
  disabled = false,
) => {
  const baseClasses
    = 'cursor-pointer flex items-center text-sm text-white justify-center gap-x-2 rounded-sm px-6 py-2 font-medium transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantClasses = {
    contained: 'bg-primary-400 hover:bg-bg-primary-400/80',
    outlined: 'border border-gray-300 hover:bg-primary-400 hover:text-white text-black focus-visible:ring-gray-200',
    text: 'text-primary-500 hover:text-primary-400',
    primary: 'bg-primary-400 hover:bg-primary-500 focus-visible:ring-primary-400',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200',
  };

  return cn(
    baseClasses,
    variantClasses[variant],
    disabled && 'cursor-not-allowed opacity-50',
  );
};

export default function Button(props: Props) {
  const {
    variant = 'contained',
    label,
    children,
    className,
    disabled = false,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
  } = props;

  const content = label || children;
  const buttonClasses = getButtonClasses(
    variant,
    disabled,
  );

  if (props.isLink) {
    if (disabled) {
      return (
        <span
          className={cn(buttonClasses, className)}
          aria-disabled="true"
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
        >
          {content}
        </span>
      );
    }

    return (
      <Link
        href={props.href}
        onClick={props.onClick}
        className={cn(buttonClasses, className)}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={disabled}
      className={cn(buttonClasses, className)}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
    >
      {content}
    </button>
  );
}
