/**
 * Role definitions for the Events Ting application
 * All role strings are defined here as constants to ensure consistency
 * and prevent typos throughout the codebase.
 */

// Individual role definitions
export const ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  STAFF: "STAFF",
};

/**
 * Role groups for common permission patterns
 * These define which roles have access to specific features
 */
export const ROLE_GROUPS = {
  // Roles that can access analytics features (summary, leaderboard, event analytics)
  ANALYTICS_ACCESS: [ROLES.ADMIN, ROLES.MANAGER],

  // Roles that can check in attendees at events
  CHECK_IN_ACCESS: [ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF],
};
