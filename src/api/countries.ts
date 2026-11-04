import type { Country, Region } from '../types/country';
import type { RawCountry } from '../types/rest-countries';

/**
 * Fuente de datos.
 *
 * Se lee un archivo servido junto con la aplicación. REST Countries retiró las
 * versiones v1 a v4 de su API: el endpoint antiguo devuelve un aviso de versión
 * obsoleta y, al llegar sin cabeceras CORS, el navegador lo reporta como fallo
 * de CORS. La v5 exige una clave que en un sitio estático quedaría expuesta.
 *
 * Para cambiar de fuente basta con reemplazar esta constante por una URL
 * absoluta; el resto del módulo no cambia.
 */
export const DATA_SOURCE = './countries.json';

export type CountriesErrorKind = 'red' | 'respuesta' | 'formato';

export class CountriesError extends Error {
  readonly kind: CountriesErrorKind;

  constructor(kind: CountriesErrorKind, message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'CountriesError';
    this.kind = kind;
  }
}

const REGION_ES: Readonly<Record<string, Region>> = {
  Africa: 'África',
  Americas: 'América',
  Antarctic: 'Antártida',
  Asia: 'Asia',
  Europe: 'Europa',
  Oceania: 'Oceanía',
};

/**
 * Comprueba en tiempo de ejecución que un elemento traiga lo imprescindible
 * para construir una tarjeta. `as RawCountry[]` solo silenciaría al compilador
 * y dejaría pasar cualquier cosa.
 */
function isRawCountry(value: unknown): value is RawCountry {
  if (typeof value !== 'object' || value === null) return false;
  const c = value as RawCountry;
  return (
    typeof c.cca3 === 'string' &&
    c.cca3.length > 0 &&
    typeof c.name?.common === 'string' &&
    c.name.common.length > 0
  );
}

function toCountry(raw: RawCountry): Country {
  return {
    code: raw.cca3 as string,
    name: raw.translations?.['spa']?.common ?? (raw.name?.common as string),
    flagUrl: raw.flags?.svg ?? raw.flags?.png ?? '',
    population: typeof raw.population === 'number' ? raw.population : 0,
    region: REGION_ES[raw.region ?? ''] ?? 'Sin región',
    capital: raw.capital ?? [],
  };
}

/** Obtiene la lista de países con retorno explícito y errores clasificados. */
export async function fetchCountries(signal?: AbortSignal): Promise<Country[]> {
  let response: Response;

  try {
    response = await fetch(DATA_SOURCE, {
      signal: signal ?? AbortSignal.timeout(10_000),
      headers: { Accept: 'application/json' },
    });
  } catch (cause) {
    throw new CountriesError('red', 'No se pudieron obtener los datos. Revisa tu conexión.', {
      cause,
    });
  }

  if (!response.ok) {
    throw new CountriesError('respuesta', `La fuente respondió con el código ${response.status}.`);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (cause) {
    throw new CountriesError('formato', 'La respuesta recibida no es un JSON válido.', { cause });
  }

  if (!Array.isArray(payload)) {
    throw new CountriesError('formato', 'Se esperaba una lista de países.');
  }

  const countries = payload.filter(isRawCountry).map(toCountry);

  if (countries.length === 0) {
    throw new CountriesError('formato', 'Ningún país tiene la estructura esperada.');
  }

  return countries.sort((a, b) => a.name.localeCompare(b.name, 'es'));
}
