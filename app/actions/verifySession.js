"use server";

import { cookies } from "next/headers";

export const verifySession = async () => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("eventsTingUser");

  if (!userCookie) {
    return null;
  }

  try {
    const user = JSON.parse(userCookie.value);
    return user;
  } catch (error) {
    console.error("Failed to parse user cookie:", error);
    return null;
  }
};
