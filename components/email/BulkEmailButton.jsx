"use client";

import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";

/**
 * Button to send tickets to selected registrations
 * Follows existing button patterns from Success.jsx
 */
export default function BulkEmailButton({ selectedIds, onJobStart, disabled }) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    if (selectedIds.length === 0) return;

    setIsSending(true);
    setError(null);

    try {
      const response = await fetch("/api/tickets/bulk/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      const result = await response.json();

      if (result.status === "error") {
        throw new Error(result.message || "Failed to send tickets");
      }

      // Notify parent component of job start
      onJobStart(result.data.jobId);
    } catch (err) {
      console.error("Failed to send tickets:", err);
      setError(err.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleSend}
        disabled={disabled || selectedIds.length === 0 || isSending}
        className="bg-gradient-to-br from-theme-primary to-theme-primary_dark text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isSending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Queueing...</span>
          </>
        ) : (
          <>
            <Mail className="w-4 h-4" />
            <span>Send Tickets ({selectedIds.length})</span>
          </>
        )}
      </button>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>
      )}
    </div>
  );
}
