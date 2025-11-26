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
    // Build query parameters from search params
    const queryParams = {};

    if (searchParams.get("term")) {
      queryParams.term = searchParams.get("term");
    }
    if (searchParams.get("status")) {
      queryParams.status = searchParams.get("status");
    }
    if (searchParams.get("page")) {
      queryParams.page = searchParams.get("page");
    }
    if (searchParams.get("limit")) {
      queryParams.limit = searchParams.get("limit");
    }
    if (searchParams.get("sortBy")) {
      queryParams.sortBy = searchParams.get("sortBy");
    }
    if (searchParams.get("sortDirection")) {
      queryParams.sortDirection = searchParams.get("sortDirection");
    }

    const response = await api.get(urls.users.list, {
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

export async function POST(request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const response = await api.post(urls.users.create, body, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: error.response?.data?.message || "An error occurred." },
      { status: error.response?.status || 500 }
    );
  }
}
