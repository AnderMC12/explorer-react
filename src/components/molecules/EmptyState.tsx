import { Button } from '../atoms/Button';

/**
 * MOLÉCULA · EmptyState
 * Mensaje para cuando ningún país cumple los criterios.
 *
 * Dice qué se buscó, qué revisar y ofrece la acción siguiente. Es distinto del
 * estado de error a propósito: una búsqueda sin coincidencias no es un fallo
 * del sistema, y confundirlos haría creer que la aplicación está rota.
 */
export interface EmptyStateProps {
  query: string;
  region: string;
  onReset: () => void;
}

export function EmptyState({ query, region, onReset }: EmptyStateProps) {
  const criterios = [query && `“${query}”`, region && `la región ${region}`]
    .filter(Boolean)
    .join(' en ');

  return (
    <div className="col-span-full rounded-card border border-border-strong bg-surface p-xl text-center">
      <p className="break-words text-card text-text-primary">
        Sin coincidencias para {criterios || 'esa búsqueda'}.
      </p>
      <p className="mx-auto mt-xs max-w-reading text-body text-text-secondary">
        Revisa la ortografía o amplía la región a «Todas las regiones».
      </p>
      <Button variant="quiet" onClick={onReset} className="mt-md">
        Limpiar filtros
      </Button>
    </div>
  );
}
