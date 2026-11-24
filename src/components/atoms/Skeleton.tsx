/**
 * ÁTOMO · Skeleton
 *
 * Bloque animado que ocupa el sitio del contenido mientras llega, para que la
 * página no dé un salto cuando aparece.
 */
export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div aria-hidden="true" className={`animate-pulse rounded-flag bg-surface-sunken ${className}`} />
  );
}
