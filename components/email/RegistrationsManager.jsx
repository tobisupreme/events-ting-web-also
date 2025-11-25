"use client";

import PaginationControls from "@/components/ui/PaginationControls";
import api from "@/lib/api";
import { exportToCSV } from "@/lib/tableUtils";
import { urls } from "@/lib/urls";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import useSWR from "swr";
import RegistrationsTable from "./RegistrationsTable";
import RegistrationsTableSkeleton from "./RegistrationsTableSkeleton";

// Map frontend sort columns to API sort fields
const sortByMapping = {
  name: "attendee.name",
  email: "attendee.email",
  ticketStatus: "status",
  registrationDate: "createdAt",
};

// Fetcher function that accepts token and query params
const fetcher = async ([
  url,
  page,
  limit,
  term,
  status,
  sortBy,
  sortDirection,
  token,
]) => {
  const params = {
    page,
    limit,
  };

  // Add optional params if they exist
  if (term) params.term = term;
  if (status && status !== "all") params.status = status;
  if (sortBy) params.sortBy = sortBy;
  if (sortDirection) params.sortDirection = sortDirection;

  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
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
 * Main component to manage registrations
 * Handles server-side search, filtering, sorting, and pagination
 */
export default function RegistrationsManager({ eventId, token }) {
  // URL State for all filters
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: true })
  );
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(20).withOptions({ shallow: true })
  );
  const [searchQuery, setSearchQuery] = useQueryState(
    "term",
    parseAsString.withDefault("").withOptions({ shallow: true })
  );
  const [statusFilter, setStatusFilter] = useQueryState(
    "status",
    parseAsString.withDefault("all").withOptions({ shallow: true })
  );
  const [sortBy, setSortBy] = useQueryState(
    "sortBy",
    parseAsString.withDefault("createdAt").withOptions({ shallow: true })
  );
  const [sortDirection, setSortDirection] = useQueryState(
    "sortDirection",
    parseAsString.withDefault("desc").withOptions({ shallow: true })
  );

  // Local state for search input (for immediate UI feedback)
  const [searchInput, setSearchInput] = useState(searchQuery);

  // Debounce search query updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput !== searchQuery) {
        setSearchQuery(searchInput);
        setPage(1); // Reset to page 1 when search changes
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchInput, searchQuery, setSearchQuery, setPage]);

  // Sync searchInput with searchQuery when URL changes externally
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Data Fetching with all query params
  const { data, isLoading, mutate } = useSWR(
    [
      urls.registrations.byEvent(eventId),
      page,
      limit,
      searchQuery,
      statusFilter,
      sortBy,
      sortDirection,
      token,
    ],
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

  // Sort handler - updates URL state which triggers API refetch
  const handleSort = (column) => {
    const apiSortField = sortByMapping[column] || column;

    if (sortBy === apiSortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(apiSortField);
      setSortDirection("asc");
    }

    // Reset to page 1 when sorting changes
    setPage(1);
  };

  // Filter handlers
  const handleSearchChange = (value) => {
    // Update local state immediately (no lag in input)
    setSearchInput(value);
    // The useEffect hook will debounce and update URL state + reset page
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setPage(1);
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
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1); // Reset to page 1 when limit changes
            }}
          />

          <RegistrationsTable
            registrations={registrations}
            searchQuery={searchInput}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
            onExport={() => exportToCSV(registrations)}
            onRefresh={mutate}
          />

          {/* Pagination (Bottom) */}
          <PaginationControls
            currentPage={pagination.page}
            totalPages={Math.ceil(pagination.total / pagination.limit)}
            totalItems={pagination.total}
            limit={pagination.limit}
            onPageChange={setPage}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1); // Reset to page 1 when limit changes
            }}
          />
        </>
      )}
    </div>
  );
}
