import Skeleton from 'react-loading-skeleton';

export function ProductTableSkeleton() {
  return (
    <article
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(320px,2fr)_minmax(160px,1fr)_minmax(160px,1fr)_minmax(120px,.8fr)_minmax(120px,.8fr)] lg:items-center lg:px-8 lg:py-5"
    >
      {/* product */}
      <div className="flex items-center gap-4">
        <Skeleton circle width={44} height={44} />
        <div className="space-y-2">
          <Skeleton width={140} height={12} />
          <Skeleton width={90} height={10} />
        </div>
      </div>

      {/* category */}
      <Skeleton width={90} height={12} />

      {/* brand */}
      <Skeleton width={90} height={12} />

      {/* status */}
      <Skeleton width={70} height={18} />

      {/* actions */}
      <div className="flex gap-2">
        <Skeleton width={32} height={32} />
        <Skeleton width={32} height={32} />
      </div>
    </article>
  );
}
