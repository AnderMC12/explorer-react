import { useEffect, useState } from 'react';
import { Icon } from '../atoms/Icon';

/**
 * ORGANISMO · BackToTop
 *
 * Con doscientos cincuenta países la lista es larga, así que aparece un atajo
 * para volver arriba una vez se ha desplazado lo suficiente como para que
 * haga falta. Se oculta por completo cuando no es útil.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = (): void => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-lg right-lg z-30 grid size-12 place-items-center rounded-pill border border-line-strong bg-surface text-ink shadow-raised transition-colors duration-150 hover:bg-brand-soft"
    >
      <span className="sr-only">Volver al inicio de la página</span>
      <Icon name="arrow-up" size={20} />
    </button>
  );
}
