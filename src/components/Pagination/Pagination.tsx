import { Button } from '@/components/ui';
import { generatePageNumbers } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePageChange = (pageNumber: number | string) => {
    if (typeof pageNumber === 'string' || pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    onPageChange(pageNumber);
  };

  const pages = generatePageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page, index) =>
        page === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-[var(--foreground)] dark:text-gray-400"
          >
            ...
          </span>
        ) : (
          <Button
            className={`${
              Number(page) === currentPage
                ? 'bg-blue-500 text-white dark:bg-blue-800'
                : 'bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            key={page}
            variant={Number(page) === currentPage ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        )
      )}

      <Button
        className="bg-[var(--card-bg)] border-[var(--border-color)] text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
