import { useEffect } from 'react';
import { IconButton } from '../atoms/IconButton';
import { Logo } from '../atoms/Logo';
import { NavLinks, type NavLink } from '../molecules/NavLinks';

/**
 * ORGANISMO · Header
 *
 * Reúne la marca, la navegación y el control del menú de pantallas pequeñas.
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
  // Escape cierra el menú y el fondo deja de desplazarse mientras está
  // abierto: es lo que espera quien navega con teclado o con el pulgar.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onCloseMenu();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen, onCloseMenu]);

  return (
    <header className="glass-bar sticky top-0 z-40 border-b border-line">
      <div className="app-shell flex h-16 items-center justify-between gap-md">
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
        <>
          <div
            className="fixed inset-0 top-16 z-30 bg-ink/25 tablet:hidden"
            aria-hidden="true"
            onClick={onCloseMenu}
          />
          <nav
            id="menu-movil"
            aria-label="Navegación principal"
            className="relative z-40 border-t border-line bg-surface shadow-raised tablet:hidden"
          >
            <div className="app-shell py-md">
              <NavLinks links={links} direction="column" onNavigate={onCloseMenu} />
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
