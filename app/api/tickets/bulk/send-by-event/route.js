import { cookies } from "next/headers";
import api from "@/lib/api";
import { urls } from "@/lib/urls";

/**
 * POST /api/tickets/bulk/send-by-event
 * Bulk send tickets to all registrations in an event (with optional filters)
 *
 * Request body:
 * {
 *   "eventId": "event-uuid",
 *   "filters": {
 *     "emailSent": false,
 *     "ticketStatus": ["Confirmed", "Pending"],
 *     "dateRange": {
 *       "from": "2024-01-01T00:00:00.000Z",
 *       "to": "2024-12-31T23:59:59.999Z"
 *     }
 *   },
 *   "template": "optional-template-name"
 * }
 */
export async function POST(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  if (!token) {
    return Response.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const response = await api.post(urls.tickets.bulkSendByEvent, body, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    return Response.json(response.data);
  } catch (error) {
    console.error("Bulk send by event error:", error);
    return Response.json(
      {
        status: "error",
        message: error.response?.data?.message || "Failed to send tickets",
      },
      { status: error.response?.status || 500 }
    );
  }
}
