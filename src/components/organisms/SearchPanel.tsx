import { FilterChips } from '../molecules/FilterChips';
import { RegionFilter } from '../molecules/RegionFilter';
import { SearchField } from '../molecules/SearchField';

/**
 * ORGANISMO · SearchPanel
 *
 * Zona de controles: búsqueda, filtro por región, filtros activos y conteo de
 * resultados.
 *
 * Todo lo que ocurre aquí sube al padre mediante callbacks. El organismo no
 * filtra nada ni sabe cuántos países hay: recibe el número ya calculado.
 */
export interface SearchPanelProps {
  query: string;
  region: string;
  regions: readonly string[];
  resultsLabel: string;
  onQueryChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onClearQuery: () => void;
  onClearRegion: () => void;
}

export function SearchPanel({
  query,
  region,
  regions,
  resultsLabel,
  onQueryChange,
  onRegionChange,
  onClearQuery,
  onClearRegion,
}: SearchPanelProps) {
  return (
    <section aria-label="Búsqueda y filtros" className="sticky top-[72px] z-20">
      {/* Barra flotante: se queda a la vista al desplazar sin ocupar todo el
          ancho, de modo que no provoca desbordamiento en pantallas estrechas. */}
      <div className="glass-bar rounded-card border border-line px-md py-md shadow-card tablet:px-lg">
        {/* El formulario no envía a ninguna parte: el filtrado ocurre en
            memoria mientras se escribe. Se evita la recarga al pulsar Enter. */}
        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="grid gap-sm tablet:grid-cols-[1fr_280px] tablet:items-center"
        >
          <SearchField value={query} onChange={onQueryChange} onClear={onClearQuery} />
          <RegionFilter value={region} regions={regions} onChange={onRegionChange} />
        </form>

        <div className="mt-sm flex flex-wrap items-center gap-sm">
          {/* Región viva: el lector de pantalla anuncia el nuevo conteo tras
              cada cambio de los filtros. */}
          <p className="text-label text-ink-muted" role="status" aria-live="polite">
            {resultsLabel}
          </p>
          <FilterChips
            query={query}
            region={region}
            onClearQuery={onClearQuery}
            onClearRegion={onClearRegion}
          />
        </div>
      </div>
    </section>
  );
}
