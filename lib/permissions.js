/**
 * Permission utilities for role-based access control
 * These functions provide a centralized way to check user permissions
 * and make the codebase more maintainable and scalable.
 */

import { ROLES, ROLE_GROUPS } from "./roles";

/**
 * Check if user has a specific role
 * @param {Object} user - User object with roles array
 * @param {string} role - Role to check for
 * @returns {boolean} True if user has the role
 */
export function hasRole(user, role) {
  if (!user?.roles || !Array.isArray(user.roles)) {
    return false;
  }
  return user.roles.includes(role);
}

/**
 * Check if user has any of the specified roles
 * @param {Object} user - User object with roles array
 * @param {string[]} roles - Array of roles to check
 * @returns {boolean} True if user has at least one of the roles
 */
export function hasAnyRole(user, roles) {
  if (!user?.roles || !Array.isArray(user.roles)) {
    return false;
  }
  return roles.some((role) => user.roles.includes(role));
}

/**
 * Permission: Can access analytics features
 * Includes: Analytics summary, leaderboard, event analytics
 * Roles: ADMIN, MANAGER
 * @param {Object} user - User object with roles array
 * @returns {boolean} True if user can access analytics
 */
export function canAccessAnalytics(user) {
  return hasAnyRole(user, ROLE_GROUPS.ANALYTICS_ACCESS);
}

/**
 * Permission: Can check in attendees at events
 * Roles: ADMIN, MANAGER, STAFF
 * @param {Object} user - User object with roles array
 * @returns {boolean} True if user can check in attendees
 */
export function canCheckInAttendees(user) {
  return hasAnyRole(user, ROLE_GROUPS.CHECK_IN_ACCESS);
}

/**
 * Permission: Is admin (for legacy compatibility)
 * Role: ADMIN only
 * @param {Object} user - User object with roles array
 * @returns {boolean} True if user is an admin
 */
export function isAdmin(user) {
  return hasRole(user, ROLES.ADMIN);
}
