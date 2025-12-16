"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/common/Container";
import { useAuth } from "@/hooks/useAuth";
import { notFound, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordData, resetPasswordSchema } from "../(auth)/auth.schema";
const ResetPasswordComponent = () => {
  const { loading, passwordReset, verifyResetPasswordToken } = useAuth();
  const params = useSearchParams();
  const token = params.get("token");
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const checkVerificationToken = async () => {
    try {
      setIsLoading(true);
      let res = await verifyResetPasswordToken(token as string);
      console.log(res);

      if (!res) {
        setIsValidToken(false);
      } else {
        setIsValidToken(true);
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      setIsValidToken(false);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ResetPasswordData) => {
    try {
      const result = await passwordReset(
        token as string,
        data.newPassword,
        data.confirmPassword
      );
      console.log(result);

      // console.log(result);

      //   if (result.status === "SUCCESS") toast.success(result.message);
      //   else toast.error(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      notFound();
      return;
    }
    checkVerificationToken();
  }, [token]);

  // If token is invalid, redirect to 404
  useEffect(() => {
    if (isValidToken === false) {
      notFound();
    }
  }, [isValidToken]);

  // Show loading state while verifying
  if (isLoading) {
    return (
      <main>
        <Container>
          <div className=" min-h-[900px] flex items-center justify-center flex-col">
            <h2 className=" font-cd-bangla text-[36px] font-extrabold text-cd-primary text-center">
              Verifying Reset Token...
            </h2>
            <p className="text-gray-600 mt-4 font-cd-bangla text-center">
              Verifying your reset token. Please wait.
            </p>
          </div>
        </Container>
      </main>
    );
  }
  return (
    <main>
      <Container>
        <div className=" min-h-[900px] flex items-center justify-center flex-col">
          <h2 className=" font-cd-bangla text-[36px] font-extrabold text-cd-primary text-center">
            Create New Password
          </h2>
          <p className="text-gray-600 mt-4 font-cd-bangla text-center">
            Your token has been successfully verified. Please set your new
            password now.
          </p>
          {/* TODO: Add password reset form here */}

          <section className=" mt-10 max-w-[550px] w-full p-4 rounded-lg shadow-xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" flex flex-col w-full "
            >
              <div className="grid w-full items-center gap-3 mb-5">
                <Label
                  className=" text-cd-primary font-cd-bangla text-[20px] font-semibold"
                  htmlFor="password"
                >
                  New Password
                </Label>
                <Input
                  {...register("newPassword")}
                  className=" font-cd-poppins font-medium w-full block"
                  type="password"
                  id="password"
                  placeholder="New Password"
                />
                {errors.newPassword && (
                  <p className="text-sm text-destructive">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="grid w-full items-center gap-3 mb-5">
                <Label
                  className=" text-cd-primary font-cd-bangla text-[20px] font-semibold"
                  htmlFor="confirm-password"
                >
                  Confirm New Password
                </Label>
                <Input
                  {...register("confirmPassword")}
                  className=" font-cd-poppins font-medium w-full block"
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm New Password"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                disabled={loading}
                type="submit"
                className="bg-shari-mohol-primary hover:bg-shari-mohol-primary/80 cursor-pointer mt-8"
              >
                {loading ? "Please wait..." : "Reset Password"}
              </Button>
            </form>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default ResetPasswordComponent;
