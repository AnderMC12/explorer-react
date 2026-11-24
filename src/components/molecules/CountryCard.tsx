import type { Country } from '../../types/country';
import { Flag } from '../atoms/Flag';
import { Icon } from '../atoms/Icon';
import { Pill } from '../atoms/Pill';
import { Stat } from '../atoms/Stat';
import { formatPopulation, listOrFallback } from '../../utils/format';

/**
 * MOLÉCULA · CountryCard
 *
 * Compone los átomos Flag, Pill y Stat para representar un país.
 *
 * Recibe el país entero como una sola prop tipada en lugar de cinco props
 * sueltas: si mañana la tarjeta muestra un dato más, cambia solo este
 * componente y no todos los lugares que lo usan.
 *
 * Es un enlace real para que el teclado y los lectores de pantalla la alcancen
 * igual que el ratón, y además avisa al padre con `onSelect`, que es quien
 * decide qué vista mostrar.
 */
export interface CountryCardProps {
  country: Country;
  onSelect: (code: string) => void;
  /** Retardo de la animación de entrada, en milisegundos. */
  delay?: number;
}

export function CountryCard({ country, onSelect, delay = 0 }: CountryCardProps) {
  return (
    <a
      href={`#/pais/${country.code}`}
      onClick={(event) => {
        event.preventDefault();
        onSelect(country.code);
      }}
      aria-label={`Ver el detalle de ${country.name}`}
      className="card-in group block h-full rounded-card no-underline"
      style={{ animationDelay: `${delay}ms` }}
    >
      <article className="flex h-full flex-col overflow-hidden rounded-card border border-line-strong bg-surface shadow-card transition-[transform,box-shadow] duration-200 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 group-hover:shadow-raised">
        <div className="relative overflow-hidden">
          <Flag
            src={country.flagUrl}
            className="transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-105"
          />
          <span className="absolute left-sm top-sm">
            <Pill className="bg-surface/90 backdrop-blur-sm">{country.region}</Pill>
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-sm p-md">
          <h3 className="flex items-start justify-between gap-sm break-words text-card text-ink">
            <span>{country.name}</span>
            <span className="mt-[2px] shrink-0 text-line-strong transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand">
              <Icon name="chevron-right" size={18} />
            </span>
          </h3>

          <dl className="mt-auto grid gap-xs border-t border-line pt-sm text-label">
            <Stat
              label="Población"
              value={formatPopulation(country.population)}
              icon={<Icon name="users" size={14} />}
            />
            <Stat
              label="Capital"
              value={listOrFallback(country.capital)}
              icon={<Icon name="map-pin" size={14} />}
            />
          </dl>
        </div>
      </article>
    </a>
  );
}
