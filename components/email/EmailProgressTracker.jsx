"use client";

import { useBulkEmailProgress } from "@/lib/hooks/useBulkEmailProgress";
import ProgressBar from "@/components/analytics/ProgressBar";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";

/**
 * Real-time progress tracker for bulk email jobs
 * Uses existing ProgressBar component pattern from analytics
 */
export default function EmailProgressTracker({ jobId, onComplete }) {
  const { status, isPolling, error } = useBulkEmailProgress(jobId);

  if (!jobId || !status) return null;

  const percentage = status.progress
    ? Math.round((status.progress.completed / status.progress.total) * 100)
    : 0;

  const isComplete = status.state === "completed";
  const isFailed = status.state === "failed";
  const isActive = status.state === "active" || status.state === "waiting";

  // Call onComplete callback when job finishes
  if ((isComplete || isFailed) && onComplete) {
    onComplete(status);
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        {isActive && <Loader2 className="w-6 h-6 text-theme-primary animate-spin" />}
        {isComplete && <CheckCircle2 className="w-6 h-6 text-green-600" />}
        {isFailed && <XCircle className="w-6 h-6 text-red-600" />}

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {isActive && "Sending Tickets..."}
          {isComplete && "Sending Complete"}
          {isFailed && "Sending Failed"}
        </h3>
      </div>

      {/* Progress bar */}
      {status.progress && (
        <div className="mb-4">
          <ProgressBar
            percentage={percentage}
            label={`${status.progress.completed} of ${status.progress.total}`}
          />
        </div>
      )}

      {/* Status details */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Total</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {status.progress?.total || 0}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Sent</p>
          <p className="text-lg font-semibold text-green-600">
            {status.progress?.completed || 0}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Failed</p>
          <p className="text-lg font-semibold text-red-600">
            {status.progress?.failed || 0}
          </p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Failed reason from backend */}
      {isFailed && status.failedReason && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm font-medium text-red-600 dark:text-red-400">
            Error: {status.failedReason}
          </p>
        </div>
      )}
    </div>
  );
}
