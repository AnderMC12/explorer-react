import type { Country } from '../../types/country';
import { CardSkeleton } from '../molecules/CardSkeleton';
import { CountryCard } from '../molecules/CountryCard';
import { EmptyState } from '../molecules/EmptyState';
import { ErrorState } from '../molecules/ErrorState';

/**
 * ORGANISMO · CountryGrid
 *
 * Rejilla adaptable de tarjetas y responsable de los tres estados de la lista.
 *
 * La distribución crece con el ancho disponible: una columna en móvil, dos a
 * partir de 640 px, tres en escritorio y cuatro en pantallas amplias.
 */
export type GridStatus = 'loading' | 'ready' | 'error';

export interface CountryGridProps {
  status: GridStatus;
  countries: readonly Country[];
  query: string;
  region: string;
  errorMessage: string;
  onSelect: (code: string) => void;
  onRetry: () => void;
  onReset: () => void;
}

const GRID = 'grid gap-md grid-cols-1 compact:grid-cols-2 desktop:grid-cols-3 wide:grid-cols-4';

export function CountryGrid({
  status,
  countries,
  query,
  region,
  errorMessage,
  onSelect,
  onRetry,
  onReset,
}: CountryGridProps) {
  if (status === 'loading') {
    return (
      <div className={GRID}>
        {Array.from({ length: 8 }, (_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={GRID}>
        <ErrorState message={errorMessage} onRetry={onRetry} />
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className={GRID}>
        <EmptyState query={query} region={region} onReset={onReset} />
      </div>
    );
  }

  return (
    <ul className={GRID}>
      {countries.map((country, index) => (
        <li key={country.code}>
          {/* La animación solo escalona las primeras tarjetas: más allá se
              vuelve ruido y retrasa el contenido sin aportar nada. */}
          <CountryCard
            country={country}
            onSelect={onSelect}
            delay={index < 12 ? index * 35 : 0}
          />
        </li>
      ))}
    </ul>
  );
}
