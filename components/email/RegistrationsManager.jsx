"use client";

import PaginationControls from "@/components/ui/PaginationControls";
import api from "@/lib/api";
import { urls } from "@/lib/urls";
import { parseAsInteger, useQueryState } from "nuqs";
import useSWR from "swr";
import RegistrationsTable from "./RegistrationsTable";
import RegistrationsTableSkeleton from "./RegistrationsTableSkeleton";

// Fetcher function that accepts token
const fetcher = async ([url, page, limit, token]) => {
  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      limit,
    },
  });

  const responseData = response.data?.data;
  const rows = Array.isArray(responseData)
    ? responseData
    : responseData?.rows || [];
  const pagination = responseData?.pagination || {
    total: responseData?.count || 0,
    page: page,
    limit: limit,
  };

  return { rows, pagination };
};

/**
 * Main component to manage registrations and bulk email operations
 * Coordinates all email-related components and state
 */
export default function RegistrationsManager({ eventId, token }) {
  // URL State
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: true })
  );
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(20).withOptions({ shallow: true })
  );

  // Data Fetching
  const { data, isLoading } = useSWR(
    [urls.registrations.byEvent(eventId), page, limit, token],
    fetcher,
    {
      keepPreviousData: false, // Show skeleton on every page change
    }
  );

  const registrations = data?.rows || [];
  const pagination = data?.pagination || {
    total: 0,
    page: 1,
    limit: 20,
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Registrations table or Skeleton */}
      {isLoading ? (
        <RegistrationsTableSkeleton />
      ) : (
        <>
          {/* Pagination (Top) */}
          <PaginationControls
            currentPage={pagination.page}
            totalPages={Math.ceil(pagination.total / pagination.limit)}
            totalItems={pagination.total}
            limit={pagination.limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />

          <RegistrationsTable registrations={registrations} />

          {/* Pagination */}
          <PaginationControls
            currentPage={pagination.page}
            totalPages={Math.ceil(pagination.total / pagination.limit)}
            totalItems={pagination.total}
            limit={pagination.limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </>
      )}
    </div>
  );
}
