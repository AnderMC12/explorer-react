/**
 * Forma de los datos tal como llegan de la fuente. Casi todos los campos son
 * opcionales porque hay territorios sin capital, sin idiomas o sin moneda, en
 * los que la clave entera no aparece.
 *
 * Una interfaz describe lo que esperamos, no comprueba lo que llega: la
 * validación en tiempo de ejecución está en `src/api/countries.ts`.
 */
export interface RawCountry {
  name?: { common?: string; official?: string };
  translations?: Record<string, { common?: string } | undefined>;
  flags?: { svg?: string; png?: string };
  population?: number;
  region?: string;
  capital?: string[];
  cca3?: string;
}
