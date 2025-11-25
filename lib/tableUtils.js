/**
 * Utility functions for table operations
 */

/**
 * Format date to readable string
 */
export function formatDate(dateString) {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = (now - date) / (1000 * 60 * 60);

  // If less than 24 hours ago, show relative time
  if (diffInHours < 24) {
    const diffInMinutes = Math.floor(diffInHours * 60);
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    return `${Math.floor(diffInHours)}h ago`;
  }

  // Otherwise show formatted date
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

/**
 * Get initials from name
 */
export function getInitials(name) {
  if (!name) return "?";

  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

/**
 * Export data to CSV
 */
export function exportToCSV(registrations, filename = "registrations.csv") {
  const headers = [
    "Name",
    "Email",
    "Ticket ID",
    "Ticket Status",
    "Email Status",
    "Registration Date",
    "Check-in Time",
  ];

  const rows = registrations.map((reg) => [
    reg.attendee?.name || "N/A",
    reg.attendee?.email || "N/A",
    reg.tickets?.[0]?.ticketId || reg.tickets?.[0]?.id || "N/A",
    reg.tickets?.[0]?.status || "Pending",
    reg.emailSent ? "Sent" : "Not sent",
    reg.createdAt || "N/A",
    reg.tickets?.[0]?.checkedInAt || "Not checked in",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
