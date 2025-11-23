"use client";

import { Mail, MailCheck, Ticket } from "lucide-react";
import { useState } from "react";

/**
 * Table component to display registrations with checkbox selection
 * Includes email sent status indicators
 */
export default function RegistrationsTable({
  registrations,
  onSelectionChange,
  isLoading,
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
      onSelectionChange([]);
    } else {
      const allIds = registrations.map((r) => r.id);
      setSelectedIds(allIds);
      onSelectionChange(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id) => {
    const newSelection = selectedIds.includes(id)
      ? selectedIds.filter((sid) => sid !== id)
      : [...selectedIds, id];

    setSelectedIds(newSelection);
    onSelectionChange(newSelection);
    setSelectAll(newSelection.length === registrations.length);
  };

  if (registrations.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <Ticket className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
          No Registrations Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          There are no registrations for this event yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-theme-primary focus:ring-theme-primary"
                  aria-label="Select all"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Ticket Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                Email Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {registrations.map((registration) => {
              const isSelected = selectedIds.includes(registration.id);
              // Extract email sent status (if available from backend)
              const emailSent = registration.emailSent || false;
              // Extract ticket status from first ticket in tickets array
              const ticketStatus =
                registration.tickets?.[0]?.status || "Pending";

              return (
                <tr
                  key={registration.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    isSelected ? "bg-purple-50 dark:bg-purple-900/20" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectRow(registration.id)}
                      className="w-4 h-4 rounded border-gray-300 text-theme-primary focus:ring-theme-primary"
                      aria-label={`Select ${
                        registration.attendee?.name || "registration"
                      }`}
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                    {registration.attendee?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {registration.attendee?.email || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ticketStatus === "Confirmed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {ticketStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {emailSent ? (
                      <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                        <MailCheck className="w-4 h-4" />
                        <span className="text-sm font-medium">Sent</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">Not sent</span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selection summary */}
      {selectedIds.length > 0 && (
        <div className="bg-purple-50 dark:bg-purple-900/20 border-t border-purple-200 dark:border-purple-800 px-4 py-3">
          <p className="text-sm font-medium text-purple-900 dark:text-purple-200">
            {selectedIds.length} registration
            {selectedIds.length !== 1 ? "s" : ""} selected
          </p>
        </div>
      )}
    </div>
  );
}
