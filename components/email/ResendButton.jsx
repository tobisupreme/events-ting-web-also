"use client";

import { Loader2, MailCheck } from "lucide-react";
import { useState } from "react";

/**
 * Button to resend tickets to selected registrations
 * Shows confirmation before resending
 */
export default function ResendButton({ selectedIds, onJobStart, disabled }) {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState(null);

  const handleResend = async () => {
    if (selectedIds.length === 0) return;

    setIsResending(true);
    setError(null);

    try {
      const response = await fetch("/api/tickets/bulk/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });

      const result = await response.json();

      if (result.status === "error") {
        throw new Error(result.message || "Failed to resend tickets");
      }

      // Notify parent component of job start
      onJobStart(result.data.jobId);
      setIsConfirming(false);
    } catch (err) {
      console.error("Failed to resend tickets:", err);
      setError(err.message);
    } finally {
      setIsResending(false);
    }
  };

  if (isConfirming) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleResend}
          disabled={isResending}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isResending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Resending...</span>
            </>
          ) : (
            <span>Confirm Resend</span>
          )}
        </button>
        <button
          onClick={() => setIsConfirming(false)}
          disabled={isResending}
          className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsConfirming(true)}
        disabled={disabled || selectedIds.length === 0}
        className="bg-gradient-to-br from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <MailCheck className="w-4 h-4" />
        <span>Resend ({selectedIds.length})</span>
      </button>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>
      )}
    </div>
  );
}
