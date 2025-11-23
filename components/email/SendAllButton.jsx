"use client";

import { Send } from "lucide-react";

/**
 * Button to open the "Send All" modal
 * Standardized to match BulkEmailButton styles
 */
export default function SendAllButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-gradient-to-br from-theme-primary to-theme-primary_dark text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      <Send className="w-4 h-4" />
      <span>Send All</span>
    </button>
  );
}
