"use client";

import { getInitials } from "@/lib/tableUtils";
import { Search, UserPlus } from "lucide-react";

export default function UsersTable({
  users = [],
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  sortDirection,
  onSort,
  onCreateUser,
}) {
  const getRoleBadgeColor = (roleName) => {
    switch (roleName) {
      case "ADMIN":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200";
      case "MANAGER":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200";
      case "STAFF":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusBadge = (status) => {
    if (status) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
          <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200">
        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
        Inactive
      </span>
    );
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-theme-primary focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-theme-primary"
            >
              <option value="all">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            {/* Create User Button */}
            <button
              onClick={onCreateUser}
              className="inline-flex items-center gap-2 px-4 py-2 bg-theme-primary hover:bg-theme-primary_dark text-white font-medium rounded-lg transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Create User</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th
                onClick={() => onSort("name")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                User <SortIcon column="name" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th
                onClick={() => onSort("createdAt")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Created <SortIcon column="createdAt" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => {
              const roleName = user.roles?.[0]?.role?.name || "No Role";
              return (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-theme-primary to-theme-primary_dark flex items-center justify-center text-white font-semibold">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(
                        roleName
                      )}`}
                    >
                      {roleName}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {users.map((user) => {
          const roleName = user.roles?.[0]?.role?.name || "No Role";
          return (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-theme-primary to-theme-primary_dark flex items-center justify-center text-white font-semibold text-lg">
                  {getInitials(user.name)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(
                    roleName
                  )}`}
                >
                  {roleName}
                </span>
                {getStatusBadge(user.status)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400">No users found</p>
        </div>
      )}
    </div>
  );
}
