/** Marca visual para un dato que la fuente no proporciona. */
export const SIN_DATO = 'No disponible';

export function formatPopulation(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return SIN_DATO;
  return new Intl.NumberFormat('es-ES').format(value);
}

/** Quita acentos y pasa a minúsculas: «japon» encuentra «Japón». */
export function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function listOrFallback(values: readonly string[]): string {
  return values.length > 0 ? values.join(', ') : SIN_DATO;
}
