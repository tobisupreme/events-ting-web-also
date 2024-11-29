"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleTokenSubmit = async (formData) => {
  const cookieStore = await cookies();

  if (formData.get("token") === process.env.ACCESS_TOKEN) {
    cookieStore.set({
      name: "ypitScannerAccessToken",
      value: formData.get("token"),
    });
  }

  redirect("/");
};

export const verifyToken = async (token) => {
  if (token === process.env.ACCESS_TOKEN) {
    return true;
  }
  return false;
}