/**
 * Forma de los datos tal como llegan de la fuente.
 *
 * Casi todos los campos son opcionales porque hay territorios sin capital, sin
 * idiomas o sin moneda, en los que la clave entera no aparece en el JSON.
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
  subregion?: string;
  capital?: string[];
  /** Diccionario de código de idioma a nombre: `{ spa: "Spanish" }`. */
  languages?: Record<string, string>;
  /** Diccionario de código de moneda a datos: `{ USD: { name: "..." } }`. */
  currencies?: Record<string, { name?: string } | undefined>;
  cca3?: string;
  borders?: string[];
}
