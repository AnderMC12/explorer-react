import type { ReactNode } from 'react';

/**
 * ÁTOMO · Button
 * Un solo control, con sus variantes de estilo. No decide qué hace al pulsarse:
 * recibe el callback desde fuera mediante `onClick`.
 */
export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'quiet';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

const VARIANTS: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary text-on-primary hover:bg-text-primary/90',
  quiet: 'border border-border-strong bg-surface text-text-primary hover:bg-surface-raised',
};

export function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-11 items-center justify-center gap-sm rounded-field px-md text-button transition-colors disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-text ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
