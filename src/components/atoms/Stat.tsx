import type { ReactNode } from 'react';

/**
 * ÁTOMO · Stat
 *
 * Par etiqueta-valor. Se usa dentro de una lista de definición, por lo que la
 * relación entre ambos la anuncia el lector de pantalla.
 */
export interface StatProps {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
}

export function Stat({ label, value, icon }: StatProps) {
  return (
    <div className="flex items-baseline justify-between gap-sm">
      <dt className="flex items-center gap-xs text-ink-muted">
        {icon}
        {label}
      </dt>
      <dd className="min-w-0 break-words text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
