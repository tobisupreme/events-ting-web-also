import { cookies } from "next/headers";
import api from "@/lib/api";
import { urls } from "@/lib/urls";

/**
 * GET /api/tickets/bulk/status/[jobId]
 * Get the status of a bulk email job
 *
 * Response:
 * {
 *   "status": "success",
 *   "data": {
 *     "jobId": "12345",
 *     "state": "active|waiting|completed|failed",
 *     "progress": {
 *       "total": 25,
 *       "completed": 10,
 *       "failed": 0
 *     },
 *     "returnvalue": [...],
 *     "failedReason": null,
 *     "finishedOn": 1732012345678
 *   }
 * }
 */
export async function GET(request, { params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  if (!token) {
    return Response.json(
      { status: "error", message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { jobId } = await params;
    const response = await api.get(urls.tickets.bulkStatus(jobId), {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    return Response.json(response.data);
  } catch (error) {
    console.error("Get job status error:", error);
    return Response.json(
      {
        status: "error",
        message: error.response?.data?.message || "Failed to get job status",
      },
      { status: error.response?.status || 500 }
    );
  }
}
