import { Icon } from '../atoms/Icon';

/**
 * MOLÉCULA · FilterChips
 *
 * Muestra los filtros activos y permite retirarlos de uno en uno. Hace
 * visible un estado que de otro modo solo vive dentro de los controles, y
 * explica por qué la lista está recortada.
 */
export interface FilterChipsProps {
  query: string;
  region: string;
  onClearQuery: () => void;
  onClearRegion: () => void;
}

interface Chip {
  key: string;
  label: string;
  remove: string;
  onRemove: () => void;
}

export function FilterChips({ query, region, onClearQuery, onClearRegion }: FilterChipsProps) {
  const chips: Chip[] = [];

  if (query.trim().length > 0) {
    chips.push({
      key: 'query',
      label: `“${query}”`,
      remove: 'Quitar el texto de búsqueda',
      onRemove: onClearQuery,
    });
  }

  if (region.length > 0) {
    chips.push({
      key: 'region',
      label: region,
      remove: `Quitar el filtro de región ${region}`,
      onRemove: onClearRegion,
    });
  }

  if (chips.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center gap-xs">
      {chips.map((chip) => (
        <li key={chip.key}>
          <button
            type="button"
            onClick={chip.onRemove}
            className="inline-flex max-w-full items-center gap-xs rounded-pill border border-line-strong bg-surface py-[5px] pl-[12px] pr-[8px] text-label text-ink transition-colors duration-150 hover:bg-brand-soft"
          >
            <span className="truncate">{chip.label}</span>
            <span className="sr-only">{chip.remove}</span>
            <Icon name="x" size={14} className="shrink-0 text-ink-muted" />
          </button>
        </li>
      ))}
    </ul>
  );
}
