export function getEventStatus(startDate, endDate) {
  const now = new Date();
  const eventStartDate = new Date(startDate);

  // If endDate is not provided, default it to the end of the startDate
  const eventEndDate = endDate
    ? new Date(endDate)
    : new Date(new Date(eventStartDate).setHours(23, 59, 59, 999));

  const isUpcoming = eventStartDate > now;
  const isPast = eventEndDate < now;
  const isOngoing = !isUpcoming && !isPast;

  let status;
  if (isUpcoming) {
    status = "Upcoming";
  } else if (isOngoing) {
    status = "Live";
  } else {
    status = "Past";
  }

  return {
    isUpcoming,
    isOngoing,
    isPast,
    status,
  };
}
