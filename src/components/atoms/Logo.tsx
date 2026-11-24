import { Icon } from './Icon';

/**
 * ÁTOMO · Logo
 *
 * Marca de la aplicación: un distintivo y el nombre. Enlaza al listado y no
 * recibe comportamiento propio.
 */
export function Logo() {
  return (
    <a
      href="#/"
      className="group inline-flex items-center gap-sm text-subtitle text-ink no-underline"
    >
      <span className="grid size-9 place-items-center rounded-field bg-brand text-on-brand shadow-card transition-transform duration-200 group-hover:-rotate-6">
        <Icon name="globe" size={20} strokeWidth={2} />
      </span>
      <span className="tracking-tight">Explorer App</span>
    </a>
  );
}
