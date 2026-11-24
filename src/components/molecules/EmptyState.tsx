import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';

/**
 * MOLÉCULA · EmptyState
 *
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
    <div className="col-span-full rounded-card border border-dashed border-line-strong bg-surface/70 p-xl text-center">
      <span className="mx-auto mb-md grid size-12 place-items-center rounded-pill bg-brand-soft text-brand">
        <Icon name="search" size={24} />
      </span>
      <p className="break-words text-card text-ink">
        Sin coincidencias para {criterios || 'esa búsqueda'}
      </p>
      <p className="mx-auto mt-xs max-w-reading text-body text-ink-muted">
        Revisa la ortografía o amplía la región a «Todas las regiones».
      </p>
      <Button variant="quiet" onClick={onReset} className="mt-md">
        Limpiar filtros
      </Button>
    </div>
  );
}
