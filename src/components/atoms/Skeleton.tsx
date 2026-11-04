/**
 * ÁTOMO · Skeleton
 * Bloque gris animado que ocupa el sitio del contenido mientras llega.
 */
export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div aria-hidden="true" className={`animate-pulse rounded-flag bg-surface-raised ${className}`} />;
}
