import { useEffect } from 'react';
import { IconButton } from '../atoms/IconButton';
import { Logo } from '../atoms/Logo';
import { NavLinks, type NavLink } from '../molecules/NavLinks';

/**
 * ORGANISMO · Header
 * Reúne la marca, la navegación y el control del menú móvil.
 *
 * No guarda si el menú está abierto: ese dato vive en App, porque es estado
 * compartido de la aplicación. El organismo recibe `isMenuOpen` y pide los
 * cambios mediante `onToggleMenu` y `onCloseMenu`.
 */
export interface HeaderProps {
  links: readonly NavLink[];
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}

export function Header({ links, isMenuOpen, onToggleMenu, onCloseMenu }: HeaderProps) {
  // Escape cierra el menú: es lo que espera quien navega con teclado.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen, onCloseMenu]);

  return (
    <header className="sticky top-0 z-40 border-b border-border-strong bg-surface">
      <div className="app-shell flex h-14 items-center justify-between gap-md tablet:h-16">
        <Logo />

        {/* Navegación de escritorio */}
        <nav aria-label="Navegación principal" className="hidden tablet:block">
          <NavLinks links={links} />
        </nav>

        {/* Control del menú en pantallas pequeñas */}
        <div className="tablet:hidden">
          <IconButton
            icon={isMenuOpen ? 'close' : 'menu'}
            label={isMenuOpen ? 'Cerrar el menú' : 'Abrir el menú'}
            onClick={onToggleMenu}
            expanded={isMenuOpen}
            controls="menu-movil"
          />
        </div>
      </div>

      {/* Menú desplegable. Se desmonta al cerrarse para que su contenido no
          quede accesible por teclado estando oculto. */}
      {isMenuOpen && (
        <nav
          id="menu-movil"
          aria-label="Navegación principal"
          className="border-t border-border bg-surface tablet:hidden"
        >
          <div className="app-shell py-md">
            <NavLinks links={links} direction="column" onNavigate={onCloseMenu} />
          </div>
        </nav>
      )}
    </header>
  );
}
