"use client";

import PaginationControls from "@/components/ui/PaginationControls";
import api from "@/lib/api";
import { urls } from "@/lib/urls";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import useSWR from "swr";
import BulkEmailButton from "./BulkEmailButton";
import EmailProgressTracker from "./EmailProgressTracker";
import RegistrationsTable from "./RegistrationsTable";
import RegistrationsTableSkeleton from "./RegistrationsTableSkeleton";
import ResendButton from "./ResendButton";
import SendAllButton from "./SendAllButton";
import SendAllModal from "./SendAllModal";

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
  const [selectedIds, setSelectedIds] = useState([]);
  const [jobId, setJobId] = useState(null);
  const [isSendAllModalOpen, setIsSendAllModalOpen] = useState(false);

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

  const handleJobStart = (newJobId) => {
    setJobId(newJobId);
    setSelectedIds([]); // Clear selection after starting job
  };

  const handleJobComplete = (status) => {
    // Optionally refresh registrations or show completion message
    console.log("Job completed:", status);
  };

  const registrations = data?.rows || [];
  const pagination = data?.pagination || {
    total: 0,
    page: 1,
    limit: 20,
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <BulkEmailButton
          selectedIds={selectedIds}
          onJobStart={handleJobStart}
          disabled={jobId !== null} // Disable if job is running
        />

        <ResendButton
          selectedIds={selectedIds}
          onJobStart={handleJobStart}
          disabled={jobId !== null}
        />

        <SendAllButton
          onClick={() => setIsSendAllModalOpen(true)}
          disabled={jobId !== null}
        />
      </div>

      {/* Progress tracker */}
      {jobId && (
        <EmailProgressTracker jobId={jobId} onComplete={handleJobComplete} />
      )}

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

          <RegistrationsTable
            registrations={registrations}
            onSelectionChange={setSelectedIds}
            isLoading={false}
          />

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

      {/* Send all modal */}
      <SendAllModal
        eventId={eventId}
        isOpen={isSendAllModalOpen}
        onClose={() => setIsSendAllModalOpen(false)}
        onJobStart={handleJobStart}
        totalRegistrations={pagination.total}
      />

      {/* Info box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Tip:</strong> Select individual registrations using
          checkboxes, or use "Send All" to send to all attendees with optional
          filters.
        </p>
      </div>
    </div>
  );
}
