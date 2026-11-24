/**
 * MOLÉCULA · NavLinks
 *
 * Lista de enlaces de navegación. Se reutiliza tal cual en la barra de
 * escritorio y dentro del menú móvil: el mismo contenido, distinta
 * disposición.
 */
export interface NavLink {
  href: string;
  label: string;
}

export interface NavLinksProps {
  links: readonly NavLink[];
  direction?: 'row' | 'column';
  /** Permite al menú móvil cerrarse cuando se elige un destino. */
  onNavigate?: () => void;
}

export function NavLinks({ links, direction = 'row', onNavigate }: NavLinksProps) {
  const column = direction === 'column';

  return (
    <ul className={column ? 'flex flex-col gap-xs' : 'flex items-center gap-xs'}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={onNavigate}
            className={`inline-flex min-h-11 items-center rounded-field px-md text-label text-ink no-underline transition-colors duration-150 hover:bg-brand-soft ${
              column ? 'w-full border border-line-strong bg-surface' : ''
            }`}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
