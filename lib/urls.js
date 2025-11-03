const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export const urls = {
  login: `${API_HOST}/api/v2/auth/login`,
  getAllEvents: `${API_HOST}/api/v2/events`,
  getRegistration: (eventId, ticketIdOrEmail) =>
    `${API_HOST}/api/v2/events/${eventId}/registrations/${ticketIdOrEmail}`,
  checkIn: (ticketId) => `${API_HOST}/api/v2/tickets/${ticketId}`,
};
