"use client";

import { formatDate, getInitials } from "@/lib/tableUtils";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  Download as DownloadIcon,
  Mail,
  MailCheck,
  RefreshCw,
  Search,
  Ticket,
  XCircle,
} from "lucide-react";

/**
 * Status badge component with icons
 */
function StatusBadge({ status }) {
  const getStatusConfig = (status) => {
    const configs = {
      Confirmed: {
        icon: CheckCircle2,
        label: "Checked In",
        classes:
          "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300 dark:ring-1 dark:ring-green-500/30",
      },
      Pending: {
        icon: Clock,
        label: "Not Checked In",
        classes:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300 dark:ring-1 dark:ring-yellow-500/30",
      },
      Cancelled: {
        icon: XCircle,
        label: "Cancelled",
        classes:
          "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300 dark:ring-1 dark:ring-red-500/30",
      },
    };
    return configs[status] || configs.Pending;
  };

  const config = getStatusConfig(status);
  const StatusIcon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.classes}`}
    >
      <StatusIcon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}

/**
 * Sortable table header
 */
function SortableHeader({ children, column, sortBy, sortDirection, onSort }) {
  const isSorted = sortBy === column;

  return (
    <th
      onClick={() => onSort(column)}
      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200
               uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700
               transition-colors select-none"
    >
      <div className="flex items-center gap-2">
        {children}
        <div className="w-4">
          {isSorted ? (
            sortDirection === "asc" ? (
              <ArrowUp className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            ) : (
              <ArrowDown className="w-4 h-4 text-gray-700 dark:text-gray-200" />
            )
          ) : (
            <ArrowUpDown className="w-4 h-4 opacity-40 dark:opacity-60" />
          )}
        </div>
      </div>
    </th>
  );
}

/**
 * Mobile card view for registrations
 */
function RegistrationCard({ registration }) {
  const ticketStatus = registration.tickets?.[0]?.status || "Pending";
  const emailSent = registration.emailSent || false;
  const ticketId =
    registration.tickets?.[0]?.ticketId || registration.tickets?.[0]?.id;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-4 shadow-sm dark:shadow-gray-900/50">
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {/* Header with avatar and name */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-theme-primary to-purple-600
                          flex items-center justify-center flex-shrink-0"
            >
              <span className="text-sm font-semibold text-white">
                {getInitials(registration.attendee?.name)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {registration.attendee?.name || "N/A"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {registration.attendee?.email || "N/A"}
              </p>
            </div>
          </div>

          {/* Details grid */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Ticket ID:
              </span>
              <span className="font-mono text-gray-900 dark:text-white">
                {ticketId || "N/A"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Status:</span>
              <StatusBadge status={ticketStatus} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Email:</span>
              {emailSent ? (
                <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                  <MailCheck className="w-4 h-4" />
                  <span className="font-medium">Sent</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>Not sent</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Registered:
              </span>
              <span className="text-gray-900 dark:text-white">
                {formatDate(registration.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Main table component to display registrations
 */
export default function RegistrationsTable({
  registrations,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  sortDirection,
  onSort,
  onExport,
  onRefresh,
}) {
  if (registrations.length === 0 && !searchQuery && statusFilter === "all") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
        <Ticket className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
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
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, email, or ticket ID..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600
                       rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       placeholder-gray-500 dark:placeholder-gray-400
                       focus:ring-2 focus:ring-theme-primary focus:border-transparent
                       transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-theme-primary focus:border-transparent
                       transition-colors"
            >
              <option value="all">All Statuses</option>
              <option value="Confirmed">Checked In</option>
              <option value="Pending">Not Checked In</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              onClick={onRefresh}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors
                       flex items-center gap-2 justify-center"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={onExport}
              className="px-4 py-2 bg-theme-primary hover:bg-theme-primary_dark
                       text-white rounded-lg transition-colors flex items-center gap-2 justify-center"
            >
              <DownloadIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Empty State After Filtering */}
      {registrations.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
          <Search className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            No Results Found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-3">
            {registrations.map((registration) => (
              <RegistrationCard
                key={registration.id}
                registration={registration}
              />
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div
            className="hidden md:block bg-white dark:bg-gray-800 rounded-lg border border-gray-200
                        dark:border-gray-700 shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead
                  className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600
                               border-b border-gray-200 dark:border-gray-600"
                >
                  <tr>
                    <SortableHeader
                      column="name"
                      sortBy={sortBy}
                      sortDirection={sortDirection}
                      onSort={onSort}
                    >
                      Attendee
                    </SortableHeader>
                    <SortableHeader
                      column="email"
                      sortBy={sortBy}
                      sortDirection={sortDirection}
                      onSort={onSort}
                    >
                      Email
                    </SortableHeader>
                    <SortableHeader
                      column="ticketStatus"
                      sortBy={sortBy}
                      sortDirection={sortDirection}
                      onSort={onSort}
                    >
                      Ticket Status
                    </SortableHeader>
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300
                                 uppercase tracking-wider"
                    >
                      Email Status
                    </th>
                    <SortableHeader
                      column="registrationDate"
                      sortBy={sortBy}
                      sortDirection={sortDirection}
                      onSort={onSort}
                    >
                      Registered
                    </SortableHeader>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {registrations.map((registration, index) => {
                    const ticketStatus =
                      registration.tickets?.[0]?.status || "Pending";
                    const emailSent = registration.emailSent || false;
                    const ticketId =
                      registration.tickets?.[0]?.ticketId ||
                      registration.tickets?.[0]?.id;

                    return (
                      <tr
                        key={registration.id}
                        className={`
                          ${
                            index % 2 === 0
                              ? "bg-white dark:bg-gray-800"
                              : "bg-gray-50/50 dark:bg-gray-800/50"
                          }
                          hover:bg-gray-100 dark:hover:bg-gray-700/50
                          transition-all duration-150
                        `}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-full bg-gradient-to-br from-theme-primary
                                          to-purple-600 flex items-center justify-center flex-shrink-0"
                            >
                              <span className="text-sm font-semibold text-white">
                                {getInitials(registration.attendee?.name)}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium text-gray-900 dark:text-white truncate">
                                {registration.attendee?.name || "N/A"}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                Ticket #{ticketId || "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {registration.attendee?.email || "N/A"}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(registration.createdAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={ticketStatus} />
                        </td>
                        <td className="px-6 py-4">
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
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {formatDate(registration.createdAt)}
                          </div>
                          {registration.tickets?.[0]?.checkedInAt && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Checked in:{" "}
                              {formatDate(registration.tickets[0].checkedInAt)}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
