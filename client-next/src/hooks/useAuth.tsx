"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  forgotPasswordRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  resetPasswordRequest,
  resetPasswordTokenVerifyRequest,
  userPasswordUpdateRequest,
  userRequest,
  userUpdateRequest,
} from "@/api/auth-api";
import {
  ChangePasswordData,
  EmailValidatorType,
  LoginUserData,
  RegisterUserData,
  UserProfileData,
} from "@/app/(auth)/auth.schema";
import { User } from "@/types/User";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [msg, setMsg] = useState<string | null>("");
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathName = usePathname();

  // login
  const login = async (data: LoginUserData) => {
    try {
      setLoading(true);
      let res = await loginRequest(data);
      if (!res.success) {
        setMsg(res.message);
        setLoading(false);
        return;
      }
      await getUser();
      //   toast.success(res.message);
      router.push("/");
    } catch (error) {
      setMsg("Failed to login");
      setLoading(false);
      console.log(error);
    }
  };

  // register
  const registerUser = async (data: RegisterUserData) => {
    try {
      setLoading(true);
      let res = await registerRequest(data);

      if (!res.success) {
        setMsg(res.message);
        setLoading(false);
        // toast.error(res.message);
        return;
      }

      toast.success(res.message);
      // await login(email, password);
      return res;
    } catch (error) {
      toast.error("Failed to register");
      setMsg("Failed to register");
      setLoading(false);
      console.log(error);
    }
  };

  // update user
  const updateUser = async (data: UserProfileData) => {
    try {
      setLoading(true);
      let res = await userUpdateRequest(data);
      if (!res.success) {
        setMsg(res.message);
        setLoading(false);
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      setMsg(res.message);
      setLoading(false);
      await getUser();
    } catch (error) {
      setMsg("Failed to update user");
      setLoading(false);
      console.log(error);
    }
  };

  const updatePassword = async (data: ChangePasswordData) => {
    try {
      setLoading(true);
      let res = await userPasswordUpdateRequest(data);
      if (!res.success) {
        setMsg(res.message);
        setLoading(false);
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      setMsg(res.message);
      setLoading(false);
      await getUser();
    } catch (error) {
      setMsg("Failed to update user");
      setLoading(false);
      console.log(error);
    }
  };

  // send forgot password request
  const forgotPassword = async (email: EmailValidatorType) => {
    try {
      setLoading(true);
      let res = await forgotPasswordRequest(email);
      if (!res.success) {
        setMsg(null);
        setLoading(false);
        toast.error(res.message);
        return;
      }
      setLoading(false);
      setMsg(res.message);
      return res;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const verifyResetPasswordToken = async (token: string) => {
    try {
      let res = await resetPasswordTokenVerifyRequest(token);
      return res.success;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const passwordReset = async (
    token: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      setLoading(true);
      let res = await resetPasswordRequest(token, newPassword, confirmPassword);
      if (!res.success) {
        setMsg(null);
        setLoading(false);
        toast.error(res.message);
        return;
      }
      setLoading(false);
      toast.success(res.message);
      router.push("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // logout
  const logout = async () => {
    try {
      let res = await logoutRequest();
      setUser(undefined);
      setMsg(null);
      router.push("/");
      await getUser();
    } catch (error) {
      console.log(error);
    }
  };

  // get user
  const getUser = async () => {
    try {
      setLoading(true);
      let res = await userRequest();
      console.log(res);

      if (res.success) {
        setUser(res);
        setLoading(false);

        if (
          pathName == "/login" ||
          pathName == "/register" ||
          pathName == "/forgot-password" ||
          pathName == "/reset-password"
        ) {
          router.push("/");
        }
      } else {
        setUser(undefined);
        setLoading(false);
        if (pathName == "/checkout" || pathName.startsWith("/account")) {
          router.push("/login");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // return {
  //   login,
  //   // register,
  //   getUser,
  //   // updateUser,
  //   // updatePassword,
  //   // verifyEmail,
  //   // forgotPassword,
  //   // verifyResetPasswordToken,
  //   // passwordReset,
  //   logout,
  //   msg,
  //   user,
  //   loading,
  // };

  return (
    <AuthContext.Provider
      value={{
        login,
        registerUser,
        getUser,
        updateUser,
        updatePassword,
        // verifyEmail,
        forgotPassword,
        verifyResetPasswordToken,
        passwordReset,
        logout,
        msg,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
