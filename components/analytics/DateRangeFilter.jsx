"use client";

import { Calendar } from "lucide-react";
import { useState } from "react";

export default function DateRangeFilter({
  onFilterChange,
  initialStartDate = "",
  initialEndDate = "",
}) {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApply = () => {
    onFilterChange({ startDate, endDate });
    setIsExpanded(false);
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    onFilterChange({ startDate: "", endDate: "" });
    setIsExpanded(false);
  };

  const hasActiveFilters = startDate || endDate;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm md:text-base font-medium text-gray-900 dark:text-white w-full"
      >
        <Calendar
          size={18}
          className="text-theme-primary dark:text-theme-primary_focus"
        />
        <span>Date Range Filter</span>
        {hasActiveFilters && (
          <span className="ml-auto bg-theme-primary/10 text-theme-primary dark:bg-theme-primary/20 dark:text-theme-primary_focus px-2 py-1 rounded-full text-xs font-semibold">
            Active
          </span>
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={endDate || undefined}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-theme-primary focus:border-theme-primary block p-2.5"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || undefined}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-theme-primary focus:border-theme-primary block p-2.5"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={handleClear}
              className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleApply}
              className="px-3 py-2 text-sm font-medium text-white bg-gradient-to-br from-theme-primary to-theme-primary_dark rounded-lg hover:shadow-lg transition-all"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
