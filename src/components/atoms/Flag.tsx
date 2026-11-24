/**
 * ÁTOMO · Flag
 *
 * Imagen de la bandera, con su propio estado de ausencia.
 *
 * El texto alternativo va vacío cuando la bandera acompaña al nombre del país,
 * porque repetirlo obligaría al lector de pantalla a decir dos veces lo mismo
 * en cada una de las doscientas cincuenta tarjetas. En la ficha de detalle, en
 * cambio, la bandera es el contenido principal y sí recibe descripción.
 */
export interface FlagProps {
  src: string;
  /** Descripción para los casos en los que la bandera es el contenido. */
  alt?: string;
  className?: string;
}

export function Flag({ src, alt = '', className = '' }: FlagProps) {
  if (!src) {
    return (
      <span
        className={`grid aspect-[3/2] w-full place-items-center rounded-flag bg-surface-sunken text-label text-ink-muted ${className}`}
      >
        Bandera no disponible
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`aspect-[3/2] w-full rounded-flag bg-surface-sunken object-cover ${className}`}
    />
  );
}
