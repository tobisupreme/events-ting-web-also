"use client";

import { useState } from "react";
import BulkEmailButton from "./BulkEmailButton";
import EmailProgressTracker from "./EmailProgressTracker";
import RegistrationsTable from "./RegistrationsTable";
import ResendButton from "./ResendButton";
import SendAllButton from "./SendAllButton";
import SendAllModal from "./SendAllModal";

/**
 * Main component to manage registrations and bulk email operations
 * Coordinates all email-related components and state
 */
export default function RegistrationsManager({
  eventId,
  initialRegistrations,
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [jobId, setJobId] = useState(null);
  const [isSendAllModalOpen, setIsSendAllModalOpen] = useState(false);

  const handleJobStart = (newJobId) => {
    setJobId(newJobId);
    setSelectedIds([]); // Clear selection after starting job
  };

  const handleJobComplete = (status) => {
    // Optionally refresh registrations or show completion message
    console.log("Job completed:", status);
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

      {/* Registrations table */}
      <RegistrationsTable
        registrations={initialRegistrations}
        onSelectionChange={setSelectedIds}
        isLoading={false}
      />

      {/* Send all modal */}
      <SendAllModal
        eventId={eventId}
        isOpen={isSendAllModalOpen}
        onClose={() => setIsSendAllModalOpen(false)}
        onJobStart={handleJobStart}
        totalRegistrations={initialRegistrations.length}
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
