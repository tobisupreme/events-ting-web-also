import api from "@/lib/api";
import { urls } from "@/lib/urls";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Build query parameters from search params (startDate, endDate)
    const queryParams = {};
    if (searchParams.get("startDate")) {
      queryParams.startDate = searchParams.get("startDate");
    }
    if (searchParams.get("endDate")) {
      queryParams.endDate = searchParams.get("endDate");
    }

    const response = await api.get(urls.analytics.summary, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      params: queryParams,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: error.response?.data?.message || "An error occurred." },
      { status: error.response?.status || 500 }
    );
  }
}
