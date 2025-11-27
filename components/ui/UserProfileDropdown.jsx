"use client";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Fragment } from "react";

/**
 * UserProfileDropdown - Displays user profile information in a dropdown
 * Shows user's name, email, and role(s) with an avatar
 *
 * @param {Object} user - User object with id, name, email, and roles array
 * @param {boolean} isMobile - Whether component is rendered in mobile view
 */
export default function UserProfileDropdown({ user, isMobile = false }) {
  // Generate user initials from name
  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Format role display (ADMIN -> Admin)
  const formatRole = (role) => {
    if (!role) return "";
    return role.charAt(0) + role.slice(1).toLowerCase();
  };

  const initials = getInitials(user?.name);

  if (!user) return null;

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className={`
              w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer
              transition-all duration-200 text-left
              ${
                open
                  ? "bg-purple-100 dark:bg-purple-500/20"
                  : isMobile
                  ? "hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 active:scale-[0.98]"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }
              ${isMobile ? "min-h-[44px]" : ""}
            `}
          >
            {/* Avatar Circle */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-theme-primary text-white flex items-center justify-center font-bold text-sm">
              {initials}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {user.email}
              </p>
            </div>

            {/* Chevron Icon */}
            <ChevronDown
              className={`flex-shrink-0 w-5 h-5 text-gray-400 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={`
                absolute left-0 right-0 bottom-full mb-2
                z-50 rounded-lg
                bg-white dark:bg-gray-900
                border border-gray-300 dark:border-gray-600
                shadow-lg
                p-4
                focus:outline-none
              `}
            >
              {/* Profile Header */}
              <div className="mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Profile Information
                </p>
              </div>

              {/* Name */}
              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {user.email}
                </p>
              </div>

              {/* Roles */}
              {user.roles && user.roles.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {user.roles.length === 1 ? "Role" : "Roles"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {user.roles.map((role) => (
                      <span
                        key={role}
                        className="px-2 py-1 text-xs font-semibold rounded-full bg-theme-primary/10 text-theme-primary dark:bg-theme-primary/20 dark:text-theme-primary_focus"
                      >
                        {formatRole(role)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
