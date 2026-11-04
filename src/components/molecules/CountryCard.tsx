import type { Country } from '../../types/country';
import { Flag } from '../atoms/Flag';
import { Stat } from '../atoms/Stat';
import { formatPopulation, listOrFallback } from '../../utils/format';

/**
 * MOLÉCULA · CountryCard
 * Compone los átomos Flag y Stat para representar un país.
 *
 * Recibe el país entero como prop tipada en lugar de seis props sueltas: si
 * mañana la tarjeta muestra un dato más, cambia solo este componente y no
 * todos los lugares que lo usan.
 */
export interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <article className="flex h-full flex-col gap-sm rounded-card border border-border-strong bg-surface p-[12px] shadow-card transition-shadow hover:shadow-raised">
      <Flag src={country.flagUrl} />

      <h3 className="break-words text-card text-text-primary">{country.name}</h3>

      <dl className="mt-auto grid gap-xs text-label">
        <Stat label="Población" value={formatPopulation(country.population)} />
        <Stat label="Región" value={country.region} />
        <Stat label="Capital" value={listOrFallback(country.capital)} />
      </dl>
    </article>
  );
}
