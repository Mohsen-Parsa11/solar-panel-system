import Skeleton from 'react-loading-skeleton';

export function OrderTableSkeleton() {
  return (
    <article
      className="grid gap-4 p-5 text-[15px] sm:grid-cols-2 lg:min-h-20.5 lg:grid-cols-[minmax(120px,.75fr)_minmax(210px,1.15fr)_minmax(120px,.75fr)_minmax(95px,.55fr)_minmax(80px,.55fr)_minmax(92px,.55fr)_minmax(118px,.7fr)] lg:items-center lg:px-8 lg:py-4"
    >
      {/* Order ID */}
      <div>
        <Skeleton width={90} height={16} />
      </div>

      {/* Customer */}
      <div className="flex min-w-0 items-center gap-4">
        <Skeleton circle width={40} height={40} />
        <Skeleton width={140} height={16} />
      </div>

      {/* Date */}
      <div>
        <Skeleton width={100} height={16} />
      </div>

      {/* Total */}
      <div>
        <Skeleton width={70} height={16} />
      </div>

      {/* Payment */}
      <div>
        <Skeleton width={60} height={16} />
      </div>

      {/* Status */}
      <div>
        <Skeleton
          width={80}
          height={28}
          borderRadius={9999}
        />
      </div>

      {/* Actions */}
      <div>
        <Skeleton width={90} height={16} />
      </div>
    </article>
  );
}
