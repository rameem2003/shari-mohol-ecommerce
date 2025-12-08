import { LoginUserData } from "@/app/(auth)/auth.schema";

export const loginRequest = async (data: LoginUserData) => {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to login: " + error.message);
  }
};

export const userRequest = async () => {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
      method: "GET",
      credentials: "include",
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to get user: " + error.message);
  }
};
