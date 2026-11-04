/**
 * ÁTOMO · Stat
 * Par etiqueta-valor. Se usa dentro de una lista de definición, por lo que
 * la relación entre ambos la anuncia el lector de pantalla.
 */
export interface StatProps {
  label: string;
  value: string;
}

export function Stat({ label, value }: StatProps) {
  return (
    <div className="flex items-baseline justify-between gap-sm">
      <dt className="text-text-secondary">{label}</dt>
      <dd className="break-words text-right text-text-primary">{value}</dd>
    </div>
  );
}
