import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';

/**
 * MOLÉCULA · ErrorState
 *
 * Aviso de que los datos no pudieron obtenerse, con la causa concreta y la
 * posibilidad de reintentar sin recargar la página.
 */
export interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="col-span-full rounded-card border border-line-strong bg-surface p-xl text-center shadow-card">
      <span className="mx-auto mb-md grid size-12 place-items-center rounded-pill bg-brand-soft text-brand">
        <Icon name="x-circle" size={24} />
      </span>
      <p className="text-card text-ink">No se pudieron cargar los países</p>
      <p className="mx-auto mt-xs max-w-reading text-body text-ink-muted">{message}</p>
      <Button onClick={onRetry} className="mt-md">
        Reintentar
      </Button>
    </div>
  );
}
