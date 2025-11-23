"use client";

import { useState } from "react";
import Modal from "@/components/shared/Modal";
import { Filter, Loader2, Send, AlertTriangle } from "lucide-react";

/**
 * Modal to send tickets to all registrations with optional filters
 * Includes preview count and confirmation flow
 */
export default function SendAllModal({ eventId, isOpen, onClose, onJobStart, totalRegistrations }) {
  const [filters, setFilters] = useState({
    emailSent: false, // Only send to those who haven't received emails
    ticketStatus: [], // Filter by ticket status (empty = all)
  });
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    setIsSending(true);
    setError(null);

    try {
      const response = await fetch("/api/tickets/bulk/send-by-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          filters,
        }),
      });

      const result = await response.json();

      if (result.status === "error") {
        throw new Error(result.message || "Failed to send tickets");
      }

      // Notify parent component of job start
      onJobStart(result.data.jobId);
      onClose();
    } catch (err) {
      console.error("Failed to send tickets:", err);
      setError(err.message);
    } finally {
      setIsSending(false);
    }
  };

  const handleTicketStatusToggle = (status) => {
    setFilters((prev) => ({
      ...prev,
      ticketStatus: prev.ticketStatus.includes(status)
        ? prev.ticketStatus.filter((s) => s !== status)
        : [...prev.ticketStatus, status],
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send All Tickets">
      <div className="space-y-6">
        {/* Warning */}
        <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
              Bulk Email Operation
            </p>
            <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
              This will queue emails for all matching registrations. Use filters to
              target specific groups.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold">
            <Filter className="w-5 h-5" />
            <h3>Filters</h3>
          </div>

          {/* Email sent filter */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.emailSent === false}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, emailSent: !e.target.checked }))
              }
              className="w-4 h-4 rounded border-gray-300 text-theme-primary focus:ring-theme-primary"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Only send to attendees who haven't received emails yet
            </span>
          </label>

          {/* Ticket status filter */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ticket Status (leave empty for all)
            </p>
            <div className="flex flex-wrap gap-2">
              {["Pending", "Confirmed"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleTicketStatusToggle(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filters.ticketStatus.includes(status)
                      ? "bg-theme-primary text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview count */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Estimated recipients:{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              Up to {totalRegistrations} registrations
            </span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Actual count will be determined by backend filters
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isSending}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={isSending}
            className="px-4 py-2 bg-gradient-to-br from-theme-primary to-theme-primary_dark text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Queueing...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send All Tickets</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
