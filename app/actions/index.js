"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/v2/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Login failed. Please try again." };
    }

    (await cookies()).set({
      name: "eventsTingAuthToken",
      value: data.data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    });
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred. Please try again." };
  }

  redirect("/");
}

export const verifySession = async (session) => {
  return !!session;
};
