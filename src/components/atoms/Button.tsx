import type { ReactNode } from 'react';

/**
 * ÁTOMO · Button
 *
 * Un solo control, con sus variantes de estilo. No decide qué ocurre al
 * pulsarse: recibe el comportamiento desde fuera mediante `onClick`.
 */
export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'quiet' | 'ghost';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

const VARIANTS: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-brand text-on-brand shadow-card hover:bg-brand-deep',
  quiet: 'border border-line-strong bg-surface text-ink hover:bg-brand-soft',
  ghost: 'text-brand hover:bg-brand-soft',
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
      className={`inline-flex min-h-11 items-center justify-center gap-sm rounded-field px-md text-button transition-colors duration-150 disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-ink ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
