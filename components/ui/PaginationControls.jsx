"use client";

import CustomSelect from "@/components/ui/CustomSelect";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

/**
 * Reusable pagination controls component
 * Uses Links for SEO-friendly and server-side compatible navigation
 * Supports page size selection and numbered page links
 */
export default function PaginationControls({
  currentPage,
  totalPages,
  limit = 20,
  totalItems,
  onPageChange,
  onLimitChange,
}) {
  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const limitOptions = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  const handleLimitChange = (newLimit) => {
    if (onLimitChange) {
      onLimitChange(Number(newLimit));
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6 gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center sm:justify-start">
        <p className="text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
          Showing{" "}
          <span className="font-medium">
            {Math.min((currentPage - 1) * limit + 1, totalItems)}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(currentPage * limit, totalItems)}
          </span>{" "}
          of <span className="font-medium">{totalItems}</span> results
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <label htmlFor="limit-select" className="whitespace-nowrap">
            Rows per page:
          </label>
          <CustomSelect
            id="limit-select"
            value={limit}
            onChange={handleLimitChange}
            options={limitOptions}
            className="w-full sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-center w-full sm:w-auto">
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 ${
              currentPage <= 1 ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0 dark:text-gray-400 dark:ring-gray-600"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </span>
              );
            }

            const isCurrent = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                aria-current={isCurrent ? "page" : undefined}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${
                  isCurrent
                    ? "z-10 bg-theme-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-primary"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 ${
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
}
