/** Marca visual para un dato que la fuente no proporciona. */
export const SIN_DATO = 'No disponible';

/** Separador de miles al estilo español: 45.376.763. */
export function formatPopulation(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return SIN_DATO;
  return new Intl.NumberFormat('es-ES').format(value);
}

/** Quita acentos y pasa a minúsculas: «japon» encuentra «Japón». */
export function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

/** Devuelve el texto, o la marca de dato ausente si viene vacío. */
export function textOrFallback(value: string | null | undefined): string {
  return value && value.trim().length > 0 ? value : SIN_DATO;
}

/** Une una lista con comas, o devuelve la marca de dato ausente si está vacía. */
export function listOrFallback(values: readonly string[]): string {
  return values.length > 0 ? values.join(', ') : SIN_DATO;
}
