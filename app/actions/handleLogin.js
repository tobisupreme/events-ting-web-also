"use server";

import api from "@/lib/api";
import { urls } from "@/lib/urls";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await api.post(urls.login, { email, password });

    const data = response.data;
    const user = data.data.user;

    const cookieStore = await cookies();

    cookieStore.set({
      name: "eventsTingAuthToken",
      value: data.data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    });

    cookieStore.set({
      name: "eventsTingUser",
      value: JSON.stringify(user),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    });
  } catch (error) {
    console.error(error);
    if (error.response) {
      return {
        error: error.response.data.message || "Login failed. Please try again.",
      };
    }
    return { error: "An unexpected error occurred. Please try again." };
  }

  redirect("/events");
}
