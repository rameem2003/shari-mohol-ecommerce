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
    console.log(error);
    throw new Error("Failed to login: " + error.message);
  }
};
