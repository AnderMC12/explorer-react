import { Skeleton } from '../atoms/Skeleton';

/**
 * MOLÉCULA · CardSkeleton
 * Reproduce la silueta de una tarjeta mientras llegan los datos, de modo que
 * la rejilla no dé un salto cuando el contenido aparece.
 */
export function CardSkeleton() {
  return (
    <div className="flex h-full flex-col gap-sm rounded-card border border-border bg-surface p-[12px]">
      <Skeleton className="aspect-[3/2] w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="mt-auto grid gap-xs">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
    </div>
  );
}
