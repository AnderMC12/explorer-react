/**
 * MOLÉCULA · NavLinks
 * Lista de enlaces de navegación. Se reutiliza tal cual en la barra de
 * escritorio y dentro del menú móvil: el mismo contenido, distinta disposición.
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
  return (
    <ul className={direction === 'row' ? 'flex items-center gap-xs' : 'flex flex-col gap-xs'}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            onClick={onNavigate}
            className={`inline-flex min-h-11 items-center rounded-field border border-border-strong bg-surface px-md text-label text-text-primary no-underline transition-colors hover:bg-surface-raised ${
              direction === 'column' ? 'w-full' : ''
            }`}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
