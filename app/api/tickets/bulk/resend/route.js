import { cookies } from "next/headers";
import api from "@/lib/api";
import { urls } from "@/lib/urls";

/**
 * POST /api/tickets/bulk/resend
 * Resend tickets to selected registrations (force resend even if already sent)
 *
 * Request body:
 * {
 *   "ids": ["registration-id-1", "registration-id-2"],
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
    const response = await api.post(urls.tickets.bulkResend, body, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    return Response.json(response.data);
  } catch (error) {
    console.error("Bulk resend error:", error);
    return Response.json(
      {
        status: "error",
        message: error.response?.data?.message || "Failed to resend tickets",
      },
      { status: error.response?.status || 500 }
    );
  }
}
