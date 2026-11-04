/**
 * ÁTOMO · Flag
 * Imagen de la bandera, con su propio estado de ausencia.
 *
 * El texto alternativo va vacío a propósito: el nombre del país aparece junto
 * a la imagen dentro de la tarjeta, y repetirlo obligaría al lector de pantalla
 * a decir dos veces lo mismo en cada una de las doscientas cincuenta tarjetas.
 */
export interface FlagProps {
  src: string;
  className?: string;
}

export function Flag({ src, className = '' }: FlagProps) {
  if (!src) {
    return (
      <span
        className={`grid aspect-[3/2] w-full place-items-center rounded-flag border border-border bg-surface-raised text-label text-text-secondary ${className}`}
      >
        Bandera no disponible
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      className={`aspect-[3/2] w-full rounded-flag border border-border bg-surface-raised object-cover ${className}`}
    />
  );
}
