import type { Country } from '../types/country';
import type { RawCountry } from '../types/rest-countries';
import {
  translateCurrency,
  translateLanguage,
  translateRegion,
  translateSubregion,
} from '../utils/locale';

/**
 * Fuente de datos.
 *
 * Se lee un archivo servido junto con la aplicación. REST Countries retiró las
 * versiones v1 a v4 de su API: el endpoint antiguo devuelve un aviso de versión
 * obsoleta y, al llegar sin cabeceras CORS, el navegador lo reporta como fallo
 * de CORS. La versión v5 sigue disponible, pero exige una clave de acceso que
 * en un sitio estático quedaría expuesta en el repositorio público.
 *
 * Para cambiar de fuente basta con reemplazar esta constante por una URL
 * absoluta; el resto del módulo no cambia, porque `fetch` sirve igual un
 * archivo estático que un endpoint remoto.
 */
export const DATA_SOURCE = './countries.json';

/** Milisegundos antes de abandonar la petición. */
const TIMEOUT_MS = 10_000;

/** Qué falló exactamente, para poder mostrar un mensaje útil. */
export type CountriesErrorKind = 'red' | 'respuesta' | 'formato';

export class CountriesError extends Error {
  readonly kind: CountriesErrorKind;

  constructor(kind: CountriesErrorKind, message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'CountriesError';
    this.kind = kind;
  }
}

/**
 * Comprueba en tiempo de ejecución que un elemento traiga lo imprescindible
 * para construir una tarjeta: un código que lo identifique y un nombre que
 * mostrar. El resto se resuelve con valores por defecto en `toCountry`.
 *
 * Una anotación de tipo no haría este trabajo: `as RawCountry[]` solo
 * silenciaría al compilador y dejaría pasar cualquier cosa que llegue por red.
 */
function isRawCountry(value: unknown): value is RawCountry {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as RawCountry;
  return (
    typeof candidate.cca3 === 'string' &&
    candidate.cca3.length > 0 &&
    typeof candidate.name?.common === 'string' &&
    candidate.name.common.length > 0
  );
}

/** Convierte un elemento ya validado al modelo de dominio. */
function toCountry(raw: RawCountry): Country {
  const common = raw.name?.common as string;
  const spanish = raw.translations?.['spa']?.common;

  const currencies = Object.values(raw.currencies ?? {})
    .map((currency) => currency?.name)
    .filter((name): name is string => typeof name === 'string' && name.length > 0)
    .map(translateCurrency);

  return {
    code: raw.cca3 as string,
    name: spanish ?? common,
    officialName: raw.name?.official ?? common,
    flagUrl: raw.flags?.svg ?? raw.flags?.png ?? '',
    population: typeof raw.population === 'number' ? raw.population : 0,
    region: translateRegion(raw.region),
    subregion: translateSubregion(raw.subregion),
    capital: raw.capital ?? [],
    languages: Object.values(raw.languages ?? {}).map(translateLanguage),
    currencies,
    borders: raw.borders ?? [],
  };
}

/**
 * Obtiene la lista de países.
 *
 * El retorno explícito `Promise<Country[]>` hace que cualquier cambio en el
 * mapeo se detecte al compilar y no en el navegador.
 *
 * @throws {CountriesError} si falla la red, si la respuesta trae un código de
 * error o si el cuerpo no tiene la forma esperada.
 */
export async function fetchCountries(signal?: AbortSignal): Promise<Country[]> {
  let response: Response;

  try {
    response = await fetch(DATA_SOURCE, {
      signal: signal ?? AbortSignal.timeout(TIMEOUT_MS),
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
    throw new CountriesError('formato', 'Se esperaba una lista de países y se recibió otra cosa.');
  }

  const countries = payload.filter(isRawCountry).map(toCountry);

  if (countries.length === 0) {
    throw new CountriesError('formato', 'Ningún país tiene la estructura esperada.');
  }

  return countries.sort((a, b) => a.name.localeCompare(b.name, 'es'));
}
