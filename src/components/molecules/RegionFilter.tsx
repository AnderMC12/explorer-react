import { Icon } from '../atoms/Icon';
import { Select, type SelectOption } from '../atoms/Select';

/**
 * MOLÉCULA · RegionFilter
 * Desplegable de región con su indicador visual. La opción «todas» usa la
 * cadena vacía, que en la función de filtrado significa «sin filtro».
 */
export interface RegionFilterProps {
  value: string;
  regions: readonly string[];
  onChange: (value: string) => void;
}

export function RegionFilter({ value, regions, onChange }: RegionFilterProps) {
  const options: SelectOption[] = [
    { value: '', label: 'Todas las regiones' },
    ...regions.map((region) => ({ value: region, label: region })),
  ];

  return (
    <div className="flex h-12 w-full items-center gap-sm rounded-field border border-border-strong bg-surface px-md">
      <Select
        id="filtrar-region"
        value={value}
        onChange={onChange}
        label="Filtrar por región"
        options={options}
      />
      <span className="pointer-events-none shrink-0 text-text-secondary">
        <Icon name="chevron-down" size={18} />
      </span>
    </div>
  );
}
