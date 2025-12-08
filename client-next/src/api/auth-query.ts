"use server";

import { cookies } from "next/headers";

export const userRequest = async () => {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("access_token")?.value;
  let refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken || !refreshToken) {
    return { success: false, message: "No tokens found" };
  }

  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `access_token=${accessToken}; refresh_token=${refreshToken}`,
      },
    });

    return res.json();
  } catch (error: any) {
    console.log(JSON.stringify(error));

    throw new Error("Failed to get user: " + error?.message);
  }
};
