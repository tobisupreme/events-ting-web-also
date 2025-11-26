"use client";

import PaginationControls from "@/components/ui/PaginationControls";
import api from "@/lib/api";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import useSWR from "swr";
import CreateUserModal from "./CreateUserModal";
import UsersTable from "./UsersTable";
import UsersTableSkeleton from "./UsersTableSkeleton";

// Fetcher function for SWR
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
  const params = { page, limit };

  if (term) params.term = term;
  if (status && status !== "all") params.status = status;
  if (sortBy) params.sortBy = sortBy;
  if (sortDirection) params.sortDirection = sortDirection;

  const response = await api.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  const responseData = response.data?.data;
  const users = responseData?.rows || [];
  const pagination = responseData?.pagination || {
    total: 0,
    page: page,
    limit: limit,
  };

  return { users, pagination };
};

export default function UsersManager({ token }) {
  // URL State
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

  // Local state for search input (debouncing)
  const [searchInput, setSearchInput] = useState(searchQuery);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Debounce search query updates
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput !== searchQuery) {
        setSearchQuery(searchInput);
        setPage(1);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput, searchQuery, setSearchQuery, setPage]);

  // Sync searchInput with searchQuery when URL changes externally
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  // Data fetching with SWR
  const { data, isLoading, mutate } = useSWR(
    [
      "/api/users",
      page,
      limit,
      searchQuery,
      statusFilter,
      sortBy,
      sortDirection,
      token,
    ],
    fetcher,
    { keepPreviousData: false }
  );

  const users = data?.users || [];
  const pagination = data?.pagination || { total: 0, page: 1, limit: 20 };

  // Sort handler
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
    setPage(1);
  };

  // Search handler
  const handleSearchChange = (value) => {
    setSearchInput(value);
  };

  // Status filter handler
  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  // Create user handler
  const handleCreateUser = async (formData) => {
    setIsCreating(true);
    try {
      await api.post("/api/users", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      mutate(); // Refresh the list
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create user:", error);
      alert(error.response?.data?.message || "Failed to create user");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {isLoading ? (
        <UsersTableSkeleton />
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
              setPage(1);
            }}
          />

          {/* Users Table */}
          <UsersTable
            users={users}
            searchQuery={searchInput}
            onSearchChange={handleSearchChange}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSort={handleSort}
            onCreateUser={() => setIsModalOpen(true)}
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
              setPage(1);
            }}
          />
        </>
      )}

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateUser}
        isLoading={isCreating}
      />
    </div>
  );
}
