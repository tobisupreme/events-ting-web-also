"use client";

import PaginationControls from "@/components/ui/PaginationControls";
import api from "@/lib/api";
import { urls } from "@/lib/urls";
import { Award, RefreshCw } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import useSWR from "swr";
import AnalyticsEmpty from "./AnalyticsEmpty";
import LeaderboardTable from "./LeaderboardTable";
import LeaderboardTableSkeleton from "./LeaderboardTableSkeleton";

// Fetcher function for SWR
const fetcher = async ([url, eventId, page, limit, token]) => {
  const params = {};

  if (eventId) params.eventId = eventId;
  if (page) params.page = page;
  if (limit) params.limit = limit;

  const response = await api.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  return response.data?.data || null;
};

export default function LeaderboardManager({ token, initialEventId }) {
  // URL state management
  const [eventId] = useQueryState(
    "eventId",
    parseAsString
      .withDefault(initialEventId || "")
      .withOptions({ shallow: true })
  );
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: true })
  );
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(20).withOptions({ shallow: true })
  );

  // SWR with auto-refresh every 20 seconds
  const { data, isLoading, error, mutate, isValidating } = useSWR(
    [urls.analytics.leaderboard, eventId, page, limit, token],
    fetcher,
    {
      refreshInterval: 20000, // 20 seconds
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
      keepPreviousData: false,
    }
  );

  const leaderboardData = data?.leaderboard || [];
  const pagination = data?.pagination || {
    total: 0,
    page: 1,
    limit: 20,
  };

  // Loading state (initial load only)
  if (isLoading && !data) {
    return <LeaderboardTableSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <AnalyticsEmpty
        icon={Award}
        message="Failed to load leaderboard data. Please try again."
      />
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Summary with Manual Refresh */}
      {pagination && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Total Users:{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {pagination.total}
                </span>
              </span>
              {pagination.page && (
                <span className="text-gray-600 dark:text-gray-400">
                  Page {pagination.page} of{" "}
                  {Math.ceil(pagination.total / pagination.limit)}
                </span>
              )}
            </div>

            {/* Manual Refresh Button */}
            <button
              onClick={() => mutate()}
              disabled={isValidating}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Refresh leaderboard"
            >
              <RefreshCw
                size={16}
                className={isValidating ? "animate-spin" : ""}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      )}

      {/* Pagination (Top) */}
      {pagination.total > 0 && (
        <PaginationControls
          currentPage={pagination.page}
          totalPages={Math.ceil(pagination.total / pagination.limit)}
          totalItems={pagination.total}
          limit={pagination.limit}
          onPageChange={setPage}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      )}

      {/* Leaderboard Table */}
      {leaderboardData && leaderboardData.length > 0 ? (
        <LeaderboardTable
          leaderboard={leaderboardData}
          onRefresh={() => mutate()}
        />
      ) : (
        <AnalyticsEmpty icon={Award} message="No leaderboard data available" />
      )}

      {/* Pagination (Bottom) */}
      {pagination.total > 0 && (
        <PaginationControls
          currentPage={pagination.page}
          totalPages={Math.ceil(pagination.total / pagination.limit)}
          totalItems={pagination.total}
          limit={pagination.limit}
          onPageChange={setPage}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      )}
    </div>
  );
}
