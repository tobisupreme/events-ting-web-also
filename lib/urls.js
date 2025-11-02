const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const EVENT_ID = process.env.NEXT_PUBLIC_EVENT_ID;

export const urls = {
  login: `${API_HOST}/api/v2/auth/login`,
  getRegistration: (ticketIdOrEmail) =>
    `${API_HOST}/events/${EVENT_ID}/registrations/${ticketIdOrEmail}`,
  checkIn: (ticketId) =>
    `${API_HOST}/events/${EVENT_ID}/registrations/${ticketId}`,
};
