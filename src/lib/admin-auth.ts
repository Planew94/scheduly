"use server";

import { cookies } from "next/headers";

const ADMIN_EMAIL = "admin@scheduly.app";
const SESSION_COOKIE = "scheduly_admin_session";
const SESSION_VALUE = "authenticated";

export async function adminLogin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { success: false, error: "Admin password not configured. Add ADMIN_PASSWORD to .env.local" };
  }

  if (email !== ADMIN_EMAIL || password !== adminPassword) {
    return { success: false, error: "Invalid email or password" };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });

  return { success: true };
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}
