import type { ReactNode } from 'react';

/**
 * ÁTOMO · Pill
 *
 * Etiqueta compacta para un dato suelto: una región, un idioma, una moneda.
 * Sin estado ni comportamiento.
 */
export interface PillProps {
  children: ReactNode;
  tone?: 'soft' | 'outline';
  className?: string;
}

const TONES: Record<NonNullable<PillProps['tone']>, string> = {
  soft: 'bg-brand-soft text-ink',
  outline: 'border border-line-strong text-ink-muted',
};

export function Pill({ children, tone = 'soft', className = '' }: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-xs rounded-pill px-[10px] py-[3px] text-label ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
