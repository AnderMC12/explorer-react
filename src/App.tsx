import { useCallback, useEffect, useMemo, useState } from 'react';

import { CountriesError, fetchCountries } from './api/countries';
import { BackToTop } from './components/organisms/BackToTop';
import { CountryDetail } from './components/organisms/CountryDetail';
import { CountryGrid, type GridStatus } from './components/organisms/CountryGrid';
import { Footer } from './components/organisms/Footer';
import { Header } from './components/organisms/Header';
import { SearchPanel } from './components/organisms/SearchPanel';
import type { NavLink } from './components/molecules/NavLinks';
import { useHashRoute } from './hooks/useHashRoute';
import type { Country } from './types/country';
import { availableRegions, filterCountries } from './utils/filter';

/**
 * PLANTILLA / PÁGINA · App
 *
 * Aquí vive todo el estado compartido de la aplicación. Los componentes hijos
 * no guardan copia: reciben el valor por props y piden los cambios mediante
 * callbacks. Con una sola fuente de verdad, la búsqueda, el filtro, el menú y
 * la vista activa no pueden quedar desincronizados entre sí.
 *
 *   App  ─ countries, status, query, region, isMenuOpen, route
 *    │
 *    ├── Header         ← isMenuOpen        → onToggleMenu, onCloseMenu
 *    ├── SearchPanel    ← query, region     → onQueryChange, onRegionChange
 *    ├── CountryGrid    ← lista filtrada    → onSelect, onRetry, onReset
 *    └── CountryDetail  ← país resuelto     → onBack, onSelect, onRetry
 */

const NAV_LINKS: readonly NavLink[] = [
  { href: '#/', label: 'Países' },
  { href: '#acerca', label: 'Acerca de' },
];

export default function App() {
  // --- Estado compartido -------------------------------------------------
  const [countries, setCountries] = useState<Country[]>([]);
  const [status, setStatus] = useState<GridStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('');
  const [isMenuOpen, setMenuOpen] = useState(false);

  // La vista activa se deriva del fragmento de la URL, de modo que una ficha
  // concreta se puede compartir, marcar como favorita y recargar.
  const { route, goToCountry, goToList } = useHashRoute();

  // --- Carga de datos ----------------------------------------------------
  const load = useCallback(async () => {
    setStatus('loading');
    try {
      setCountries(await fetchCountries());
      setStatus('ready');
    } catch (error) {
      setErrorMessage(
        error instanceof CountriesError
          ? error.message
          : 'Ocurrió un problema inesperado al obtener los datos.',
      );
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // --- Derivados ---------------------------------------------------------
  // Se recalculan solo cuando cambian sus dependencias, de modo que escribir
  // en el buscador no recorre la lista completa sin motivo.
  const regions = useMemo(() => availableRegions(countries), [countries]);

  const visibleCountries = useMemo(
    () => filterCountries(countries, { query, region }),
    [countries, query, region],
  );

  const selectedCountry = useMemo(
    () =>
      route.name === 'detalle'
        ? countries.find((country) => country.code === route.code)
        : undefined,
    [countries, route],
  );

  const resultsLabel = useMemo(() => {
    if (status === 'loading') return 'Cargando países…';
    if (status === 'error') return 'No se pudieron cargar los países';
    if (visibleCountries.length === 0) return 'Sin resultados';
    if (visibleCountries.length === countries.length) {
      return `${countries.length} países en el catálogo`;
    }
    return visibleCountries.length === 1
      ? '1 país encontrado'
      : `${visibleCountries.length} países encontrados`;
  }, [status, visibleCountries.length, countries.length]);

  // El título de la pestaña acompaña a la vista activa.
  useEffect(() => {
    document.title =
      route.name === 'detalle' && selectedCountry
        ? `${selectedCountry.name} — Explorer App`
        : 'Explorer App — Países del mundo';
  }, [route, selectedCountry]);

  // --- Callbacks que se entregan a los hijos -----------------------------
  const handleReset = useCallback(() => {
    setQuery('');
    setRegion('');
  }, []);

  const handleToggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
  const handleCloseMenu = useCallback(() => setMenuOpen(false), []);
  const handleClearQuery = useCallback(() => setQuery(''), []);
  const handleClearRegion = useCallback(() => setRegion(''), []);
  const handleRetry = useCallback(() => void load(), [load]);

  const isDetail = route.name === 'detalle';

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <Header
        links={NAV_LINKS}
        isMenuOpen={isMenuOpen}
        onToggleMenu={handleToggleMenu}
        onCloseMenu={handleCloseMenu}
      />

      <main id="contenido" className="app-shell pb-2xl pt-lg tablet:pt-xl">
        {isDetail ? (
          <CountryDetail
            status={status}
            country={selectedCountry}
            countries={countries}
            errorMessage={errorMessage}
            onBack={goToList}
            onSelect={goToCountry}
            onRetry={handleRetry}
          />
        ) : (
          <>
            <div className="max-w-reading">
              <h1 className="text-display text-ink">Países del mundo</h1>
              <p className="mt-sm text-body text-ink-muted">
                Busca por nombre o filtra por región para ver la bandera, la
                población y la capital de cada país. Abre cualquier tarjeta para
                consultar su ficha completa.
              </p>
            </div>

            <div className="mt-lg">
              <SearchPanel
                query={query}
                region={region}
                regions={regions}
                resultsLabel={resultsLabel}
                onQueryChange={setQuery}
                onRegionChange={setRegion}
                onClearQuery={handleClearQuery}
                onClearRegion={handleClearRegion}
              />
            </div>

            <div className="mt-lg">
              <CountryGrid
                status={status}
                countries={visibleCountries}
                query={query}
                region={region}
                errorMessage={errorMessage}
                onSelect={goToCountry}
                onRetry={handleRetry}
                onReset={handleReset}
              />
            </div>

            <section
              id="acerca"
              className="mt-2xl max-w-reading scroll-mt-32 rounded-card border border-line bg-surface/70 p-lg"
            >
              <h2 className="text-subtitle text-ink">Acerca de</h2>
              <p className="mt-xs text-body text-ink-muted">
                Interfaz construida con React y TypeScript siguiendo Atomic
                Design. Los datos se obtienen con una petición tipada y se
                filtran en el navegador: la búsqueda y el filtro por región se
                aplican de forma combinada, y el estado compartido vive en el
                componente padre.
              </p>
            </section>
          </>
        )}
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
