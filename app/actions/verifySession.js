"use server";

export const verifySession = async (session) => {
  return !!session;
};
