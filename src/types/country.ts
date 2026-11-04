/**
 * Modelo de dominio. Es plano y sin valores nulos a propósito: los componentes
 * reciben datos ya normalizados y no tienen que decidir qué hacer con un campo
 * ausente. Esa decisión vive en la capa de API.
 */
export interface Country {
  readonly code: string;
  readonly name: string;
  readonly flagUrl: string;
  readonly population: number;
  readonly region: Region;
  readonly capital: readonly string[];
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
