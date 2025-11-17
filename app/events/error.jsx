"use client";

import { AlertCircle, Home, RefreshCw, WifiOff } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function EventsError({ error, reset }) {
  useEffect(() => {
    console.error("Events page error:", error);
  }, [error]);

  // Determine error type
  const isNetworkError =
    error.message?.includes("socket hang up") ||
    error.message?.includes("ECONNREFUSED") ||
    error.message?.includes("Network Error") ||
    error.message?.includes("Failed to fetch") ||
    error.message?.includes("timeout");

  const isAuthError =
    error.message?.includes("401") ||
    error.message?.includes("403") ||
    error.message?.includes("Unauthorized");

  const isServerError =
    error.message?.includes("500") ||
    error.message?.includes("502") ||
    error.message?.includes("503");

  // Determine appropriate icon and message
  let Icon = AlertCircle;
  let title = "Something went wrong";
  let message =
    "We encountered an unexpected error while loading events. Please try again.";
  let bgColor = "bg-red-100 dark:bg-red-900/30";
  let iconColor = "text-red-600 dark:text-red-400";
  let borderColor = "border-red-200 dark:border-red-800";
  let textColor = "text-red-800 dark:text-red-300";

  if (isNetworkError) {
    Icon = WifiOff;
    title = "Connection Error";
    message =
      "Unable to connect to the server. Please check your internet connection and try again.";
    bgColor = "bg-orange-100 dark:bg-orange-900/30";
    iconColor = "text-orange-600 dark:text-orange-400";
    borderColor = "border-orange-200 dark:border-orange-800";
    textColor = "text-orange-800 dark:text-orange-300";
  } else if (isAuthError) {
    title = "Authentication Required";
    message = "Your session may have expired. Please log in again.";
  } else if (isServerError) {
    title = "Server Error";
    message =
      "The server is experiencing issues. Please try again in a few moments.";
  }

  return (
    <div className="container mx-auto px-3 md:px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Error Icon */}
          <div className={`rounded-full p-4 ${bgColor}`}>
            <Icon className={`w-16 h-16 ${iconColor}`} />
          </div>

          {/* Error Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>

          {/* Error Message */}
          <div
            className={`w-full rounded-lg p-4 border ${bgColor} ${borderColor}`}
          >
            <p className={`text-sm font-medium ${textColor}`}>{message}</p>
          </div>

          {/* Technical Details (collapsed) */}
          {error.message && (
            <details className="w-full bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-left">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                Technical details
              </summary>
              <pre className="mt-2 text-xs text-gray-600 dark:text-gray-400 overflow-x-auto">
                {error.message}
              </pre>
            </details>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-theme-primary to-theme-primary_dark text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              <RefreshCw size={18} />
              Try Again
            </button>

            <Link href="/" className="w-full sm:w-auto">
              <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200">
                <Home size={18} />
                Go Home
              </button>
            </Link>
          </div>

          {/* Help Tips */}
          {isNetworkError && (
            <div className="mt-6 space-y-2 text-left w-full">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Troubleshooting tips:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Check your internet connection</li>
                <li>• Try refreshing the page</li>
                <li>• Disable any VPN or proxy if active</li>
                <li>• Contact support if the issue persists</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
