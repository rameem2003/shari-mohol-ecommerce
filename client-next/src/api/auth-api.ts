import {
  EmailValidatorType,
  LoginUserData,
  RegisterUserData,
} from "@/app/(auth)/auth.schema";

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

export const registerRequest = async (data: RegisterUserData) => {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to register: " + error.message);
  }
};

export const userRequest = async () => {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "no-cache",
    });

    return res.json();
  } catch (error: any) {
    console.log(JSON.stringify(error));

    throw new Error("Failed to get user: " + error?.message);
  }
};

export const forgotPasswordRequest = async (email: EmailValidatorType) => {
  console.log(email);

  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.email }),
      }
    );
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to send forgot password email: " + error.message);
  }
};

export const resetPasswordTokenVerifyRequest = async (token: string) => {
  // working in progress
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password-verify/${token}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to verify reset token: " + error.message);
  }
};

export const resetPasswordRequest = async (
  token: string,
  newPassword: string,
  confirmPassword: string
) => {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${token}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, confirmPassword }),
      }
    );
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to reset password: " + error.message);
  }
};

export const logoutRequest = async () => {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to logout: " + error.message);
  }
};
