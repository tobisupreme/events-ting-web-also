"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleTokenSubmit = async (formData) => {
  const cookieStore = await cookies();

  console.log(formData.get("token"));

  if (formData.get("token") === "ypit") {
    cookieStore.set({
      name: "ypitScannerAccessToken",
      value: formData.get("token"),
    });
  }

  redirect("/");
};

export const verifyToken = async (token) => {
  if (token === "ypit") {
    return true;
  }
  return false;
}