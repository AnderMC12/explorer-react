import { useCallback, useEffect, useState } from 'react';

/**
 * Enrutado mínimo basado en el fragmento de la URL.
 *
 * Se eligió el fragmento y no una biblioteca de rutas por dos motivos: no
 * añade dependencias a un proyecto que no las necesita, y funciona en
 * cualquier servidor de archivos estáticos sin configurar reescrituras, que es
 * justo como se publica esta aplicación.
 *
 * Rutas reconocidas:
 *   #/                  listado de países
 *   #/pais/SLV          detalle de un país
 */
export type Route = { readonly name: 'listado' } | { readonly name: 'detalle'; readonly code: string };

function parse(hash: string): Route {
  const match = /^#\/pais\/([A-Za-z]{3})$/.exec(hash);
  if (match && match[1]) return { name: 'detalle', code: match[1].toUpperCase() };
  return { name: 'listado' };
}

export interface HashRoute {
  readonly route: Route;
  /** Navega al detalle de un país y lleva la vista al inicio de la página. */
  readonly goToCountry: (code: string) => void;
  /** Vuelve al listado conservando los filtros, que viven en el estado de App. */
  readonly goToList: () => void;
}

export function useHashRoute(): HashRoute {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));

  useEffect(() => {
    const onHashChange = (): void => setRoute(parse(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Al cambiar de vista la página vuelve arriba: de otro modo el detalle se
  // abriría a la altura a la que estaba desplazado el listado. La dependencia
  // es una clave de texto y no el objeto, para que un fragmento que solo
  // apunta a una sección de la misma vista no cancele su propio salto.
  const key = route.name === 'detalle' ? `detalle:${route.code}` : 'listado';
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [key]);

  const goToCountry = useCallback((code: string) => {
    window.location.hash = `#/pais/${code.toUpperCase()}`;
  }, []);

  const goToList = useCallback(() => {
    window.location.hash = '#/';
  }, []);

  return { route, goToCountry, goToList };
}
