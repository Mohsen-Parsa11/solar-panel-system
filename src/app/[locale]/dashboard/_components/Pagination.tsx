import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
}: PaginationProps) {
  const t = useTranslations('pagination');

  const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = useMemo(() => {
    const arr: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        arr.push(i);
      }
      return arr;
    }

    arr.push(1);

    if (currentPage > 3) {
      arr.push('...');
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      arr.push(i);
    }

    if (currentPage < totalPages - 2) {
      arr.push('...');
    }

    arr.push(totalPages);

    return arr;
  }, [currentPage, totalPages]);

  return (
    <div dir="ltr" className="mt-9 flex flex-col gap-5 text-[14px] text-[#667085] sm:flex-row sm:items-center sm:justify-between">
      {/* Left info */}
      <p className="font-semibold text-[#394150]">
        {
          t('showing', {
            from: start,
            to: end,
            total: totalItems,
          })
        }
      </p>

      {/* Pagination */}
      <div className="flex items-center gap-3">
        {/* Prev */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="grid h-9 w-9 place-items-center rounded-md border border-[#d4dbe7] text-[#a4afbd] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft />
        </button>

        {/* Pages */}
        {pages.map(page =>
          page === '...'
            ? (
                <span key={page} className="px-1 text-[#4b5565]">
                  ...
                </span>
              )
            : (
                <button
                  key={page}
                  type="button"
                  onClick={() => onPageChange(page as number)}
                  className={`grid h-9 w-9 place-items-center rounded-md transition ${
                    currentPage === page
                      ? 'bg-primary-400 font-semibold text-white'
                      : 'text-[#4b5565] hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ),
        )}

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="grid h-9 w-9 place-items-center rounded-md border border-[#c8d2e2] text-[#4b5565] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
