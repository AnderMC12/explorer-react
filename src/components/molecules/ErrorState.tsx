import { Button } from '../atoms/Button';

/**
 * MOLÉCULA · ErrorState
 * Aviso de que los datos no pudieron obtenerse, con la causa concreta y la
 * posibilidad de reintentar sin recargar la página.
 */
export interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="col-span-full rounded-card border border-border-strong bg-surface p-xl text-center">
      <p className="text-card text-text-primary">No se pudieron cargar los países</p>
      <p className="mx-auto mt-xs max-w-reading text-body text-text-secondary">{message}</p>
      <Button onClick={onRetry} className="mt-md">
        Reintentar
      </Button>
    </div>
  );
}
