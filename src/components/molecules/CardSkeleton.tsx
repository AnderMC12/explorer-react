import { Skeleton } from '../atoms/Skeleton';

/**
 * MOLÉCULA · CardSkeleton
 *
 * Reproduce la silueta de una tarjeta mientras llegan los datos, de modo que
 * la rejilla no dé un salto cuando el contenido aparece.
 */
export function CardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface">
      <Skeleton className="aspect-[3/2] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-sm p-md">
        <Skeleton className="h-5 w-2/3" />
        <div className="mt-auto grid gap-xs border-t border-line pt-sm">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      </div>
    </div>
  );
}
