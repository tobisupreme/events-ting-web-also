import api from "@/lib/api";
import { urls } from "@/lib/urls";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
  const { eventId, ticketId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await api.get(urls.getRegistration(eventId, ticketId), {
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

export async function POST(_request, { params }) {
  const { ticketId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("eventsTingAuthToken");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await api.patch(
      urls.checkIn(ticketId),
      { status: "Confirmed" },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: error.response?.data?.message || "An error occurred." },
      { status: error.response?.status || 500 }
    );
  }
}
