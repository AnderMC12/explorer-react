import type { Country, Filters } from '../types/country';
import { normalize } from './format';

/**
 * Aplica búsqueda y región de forma combinada: un país se muestra solo si
 * cumple ambos criterios a la vez.
 *
 * Una cadena vacía equivale a «sin filtro» en los dos criterios, y de ahí sale
 * el comportamiento esperado sin lógica adicional: al limpiar el texto se
 * conserva la región, y al elegir «todas las regiones» se conserva el texto.
 */
export function filterCountries(
  countries: readonly Country[],
  { query, region }: Filters,
): Country[] {
  const needle = normalize(query);
  return countries.filter((country) => {
    const matchesQuery = needle === '' || normalize(country.name).includes(needle);
    const matchesRegion = region === '' || country.region === region;
    return matchesQuery && matchesRegion;
  });
}

/** Regiones presentes en los datos, para alimentar el selector. */
export function availableRegions(countries: readonly Country[]): string[] {
  return [...new Set(countries.map((c) => c.region))].sort((a, b) => a.localeCompare(b, 'es'));
}
