"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for polling bulk email job status
 * Automatically starts polling when jobId is provided
 * Stops polling when job completes or fails
 *
 * @param {string|null} jobId - The job ID to track
 * @param {number} pollingInterval - Polling interval in milliseconds (default: 2000)
 * @returns {Object} - { status, isPolling, error, startPolling, stopPolling }
 */
export function useBulkEmailProgress(jobId, pollingInterval = 2000) {
  const [status, setStatus] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState(null);

  const startPolling = useCallback(() => {
    if (!jobId) return;
    setIsPolling(true);
    setError(null);
  }, [jobId]);

  const stopPolling = useCallback(() => {
    setIsPolling(false);
  }, []);

  useEffect(() => {
    if (!jobId || !isPolling) return;

    const poll = async () => {
      try {
        const response = await fetch(`/api/tickets/bulk/status/${jobId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch job status");
        }

        const result = await response.json();
        setStatus(result.data);

        // Stop polling if job is complete or failed
        if (
          result.data.state === "completed" ||
          result.data.state === "failed"
        ) {
          stopPolling();
        }
      } catch (err) {
        console.error("Polling error:", err);
        setError(err.message);
        stopPolling();
      }
    };

    // Initial poll
    poll();

    // Set up interval
    const intervalId = setInterval(poll, pollingInterval);

    return () => clearInterval(intervalId);
  }, [jobId, isPolling, pollingInterval, stopPolling]);

  // Auto-start polling when jobId changes
  useEffect(() => {
    if (jobId) {
      startPolling();
    }
  }, [jobId, startPolling]);

  return {
    status,
    isPolling,
    error,
    startPolling,
    stopPolling,
  };
}
