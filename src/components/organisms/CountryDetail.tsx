import type { Country } from '../../types/country';
import { Button } from '../atoms/Button';
import { Flag } from '../atoms/Flag';
import { Icon } from '../atoms/Icon';
import { Pill } from '../atoms/Pill';
import { Skeleton } from '../atoms/Skeleton';
import { Stat } from '../atoms/Stat';
import { ErrorState } from '../molecules/ErrorState';
import { formatPopulation, listOrFallback, textOrFallback } from '../../utils/format';
import type { GridStatus } from './CountryGrid';

/**
 * ORGANISMO · CountryDetail
 *
 * Ficha completa de un país. Recibe el país ya resuelto y la lista entera,
 * que necesita únicamente para traducir los códigos de los países fronterizos
 * a sus nombres; no vuelve a pedir datos a la fuente.
 */
export interface CountryDetailProps {
  status: GridStatus;
  country: Country | undefined;
  countries: readonly Country[];
  errorMessage: string;
  onBack: () => void;
  onSelect: (code: string) => void;
  onRetry: () => void;
}

export function CountryDetail({
  status,
  country,
  countries,
  errorMessage,
  onBack,
  onSelect,
  onRetry,
}: CountryDetailProps) {
  if (status === 'loading') return <DetailSkeleton />;

  if (status === 'error') {
    return <ErrorState message={errorMessage} onRetry={onRetry} />;
  }

  if (!country) {
    return (
      <div className="rounded-card border border-line-strong bg-surface p-xl text-center shadow-card">
        <p className="text-card text-ink">Ese país no está en el catálogo</p>
        <p className="mx-auto mt-xs max-w-reading text-body text-ink-muted">
          El enlace apunta a un código que no corresponde a ningún país de la
          fuente de datos.
        </p>
        <Button onClick={onBack} className="mt-md">
          Volver al listado
        </Button>
      </div>
    );
  }

  const byCode = new Map(countries.map((item) => [item.code, item.name]));
  const neighbours = country.borders
    .map((code) => ({ code, name: byCode.get(code) }))
    .filter((item): item is { code: string; name: string } => Boolean(item.name));

  return (
    <article className="card-in">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex min-h-11 items-center gap-xs rounded-field pr-md text-body text-ink transition-colors hover:text-brand"
      >
        <Icon name="arrow-left" size={18} />
        Volver al listado
      </button>

      <div className="mt-md grid gap-lg desktop:grid-cols-[minmax(0,460px)_1fr] desktop:gap-xl">
        <div>
          <Flag
            src={country.flagUrl}
            alt={`Bandera de ${country.name}`}
            className="border border-line-strong shadow-raised"
          />
        </div>

        <div className="min-w-0">
          <h1 className="break-words text-display text-ink">{country.name}</h1>
          <p className="mt-xs break-words text-body text-ink-muted">{country.officialName}</p>

          <div className="mt-md flex flex-wrap gap-xs">
            <Pill>
              <Icon name="compass" size={13} />
              {country.region}
            </Pill>
            <Pill tone="outline">{country.code}</Pill>
          </div>

          <section
            className="mt-lg rounded-card border border-line-strong bg-surface p-md shadow-card"
            aria-labelledby="info-general"
          >
            <h2 id="info-general" className="text-subtitle text-ink">
              Información general
            </h2>

            <dl className="mt-sm grid gap-sm text-body tablet:grid-cols-2 tablet:gap-x-lg">
              <div className="border-b border-line pb-sm">
                <Stat
                  label="Capital"
                  value={listOrFallback(country.capital)}
                  icon={<Icon name="map-pin" size={15} />}
                />
              </div>
              <div className="border-b border-line pb-sm">
                <Stat
                  label="Población"
                  value={formatPopulation(country.population)}
                  icon={<Icon name="users" size={15} />}
                />
              </div>
              <div className="border-b border-line pb-sm">
                <Stat
                  label="Subregión"
                  value={textOrFallback(country.subregion)}
                  icon={<Icon name="compass" size={15} />}
                />
              </div>
              <div className="border-b border-line pb-sm">
                <Stat
                  label="Moneda"
                  value={listOrFallback(country.currencies)}
                  icon={<Icon name="coins" size={15} />}
                />
              </div>
            </dl>

            <div className="mt-md">
              <h3 className="flex items-center gap-xs text-label text-ink-muted">
                <Icon name="languages" size={15} />
                Idiomas
              </h3>
              <div className="mt-xs flex flex-wrap gap-xs">
                {country.languages.length > 0 ? (
                  country.languages.map((language) => <Pill key={language}>{language}</Pill>)
                ) : (
                  <p className="text-body text-ink-muted">No disponible</p>
                )}
              </div>
            </div>
          </section>

          <section className="mt-lg" aria-labelledby="fronteras">
            <h2 id="fronteras" className="text-subtitle text-ink">
              Países fronterizos
            </h2>

            {neighbours.length > 0 ? (
              <ul className="mt-sm flex flex-wrap gap-xs">
                {neighbours.map((neighbour) => (
                  <li key={neighbour.code}>
                    <a
                      href={`#/pais/${neighbour.code}`}
                      onClick={(event) => {
                        event.preventDefault();
                        onSelect(neighbour.code);
                      }}
                      className="inline-flex min-h-11 items-center rounded-pill border border-line-strong bg-surface px-md text-label text-ink no-underline transition-colors duration-150 hover:bg-brand-soft"
                    >
                      {neighbour.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-xs text-body text-ink-muted">
                {country.borders.length > 0
                  ? 'Los países fronterizos no están en este catálogo.'
                  : 'Sin fronteras terrestres.'}
              </p>
            )}
          </section>
        </div>
      </div>
    </article>
  );
}

/** Silueta de la ficha mientras llegan los datos. */
function DetailSkeleton() {
  return (
    <div className="grid gap-lg desktop:grid-cols-[minmax(0,460px)_1fr] desktop:gap-xl">
      <Skeleton className="aspect-[3/2] w-full rounded-card" />
      <div className="grid gap-sm">
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="mt-md h-40 w-full rounded-card" />
      </div>
    </div>
  );
}
