export function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col rounded-sm border border-gray-100/80 bg-white p-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
      <div className="mb-8 aspect-4/3 w-full rounded bg-gray-200" />
      <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
      <div className="mb-1 h-4 w-1/3 rounded bg-gray-200" />
      <div className="mb-4 h-3 w-1/4 rounded bg-gray-200" />
      <div className="mb-4 flex gap-2">
        <div className="h-3 w-12 rounded bg-gray-200" />
        <div className="h-3 w-10 rounded bg-gray-200" />
        <div className="h-3 w-14 rounded bg-gray-200" />
      </div>
      <div className="mt-auto h-10 w-full rounded-sm bg-gray-200" />
    </div>
  );
}
