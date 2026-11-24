/**
 * Modelo de dominio.
 *
 * Es plano y sin valores nulos a propósito: los componentes reciben datos ya
 * normalizados y no tienen que decidir qué hacer con un campo ausente. Esa
 * decisión vive una sola vez, en la capa de API.
 */
export interface Country {
  /** Código ISO 3166-1 alpha-3. Identifica al país en la URL del detalle. */
  readonly code: string;
  /** Nombre en español cuando la fuente lo ofrece; si no, el nombre común. */
  readonly name: string;
  /** Nombre oficial, en el idioma original de la fuente. */
  readonly officialName: string;
  readonly flagUrl: string;
  readonly population: number;
  readonly region: Region;
  /** Subregión traducida al español. Vacía cuando la fuente no la trae. */
  readonly subregion: string;
  readonly capital: readonly string[];
  readonly languages: readonly string[];
  readonly currencies: readonly string[];
  /** Códigos alpha-3 de los países fronterizos. Vacío en islas. */
  readonly borders: readonly string[];
}

export type Region =
  | 'África'
  | 'América'
  | 'Antártida'
  | 'Asia'
  | 'Europa'
  | 'Oceanía'
  | 'Sin región';

/** Criterios de búsqueda. Ambos se aplican de forma combinada. */
export interface Filters {
  readonly query: string;
  readonly region: string;
}
