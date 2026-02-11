"use client";
import React from "react";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { email, EmailValidatorType } from "../(auth)/auth.schema";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MailCheck } from "lucide-react";
// import { email } from "../(auth)/auth.schema";
const ForgotPasswordForm = () => {
  const { forgotPassword, loading, msg } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(email),
  });

  const onSubmit = async (data: EmailValidatorType) => {
    // console.log(errors);

    try {
      const result = await forgotPassword(data);
      // console.log(result);

      //   if (result.status === "SUCCESS") toast.success(result.message);
      //   else toast.error(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  if (msg) {
    return (
      <div className=" min-h-[900px] flex items-center justify-center flex-col">
        <Card className="w-full max-w-md mx-auto mt-6 shadow-lg border border-slate-200">
          <CardHeader className="flex flex-col items-center text-center space-y-2">
            <MailCheck className="w-10 h-10 text-shari-mohol-primary" />
            <h2 className="text-xl text-shari-mohol-primary font-semibold font-cd-bangla">
              Request Received
            </h2>
          </CardHeader>

          <CardContent className="text-center text-sm text-slate-600">
            <p className=" font-cd-bangla mt-2 text-lg">
              We have sent password reset instructions to your email. Please
              check your inbox and follow the provided link to reset your
              password.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="">
      <Container>
        <div className=" min-h-[500px] flex items-center justify-center flex-col">
          <h2 className=" font-cd-bangla text-[36px] font-extrabold text-cd-primary text-center">
            Recover Your Account
          </h2>

          <p className=" font-cd-bangla text-[20px] text-cd-primary text-center mt-4">
            Provide your email address to reset your password.
          </p>

          <section className=" mt-10 max-w-[550px] w-full p-4 rounded-lg shadow-xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" flex flex-col w-full "
            >
              <div className="grid w-full items-center gap-3">
                <Label
                  className=" text-cd-primary font-cd-bangla text-[20px] font-semibold"
                  htmlFor="email"
                >
                  Email Address
                </Label>
                <Input
                  {...register("email")}
                  className=" font-cd-poppins font-medium w-full block"
                  type="email"
                  id="email"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button
                disabled={loading}
                type="submit"
                className="bg-shari-mohol-primary text-white hover:bg-shari-mohol-primary/90 cursor-pointer mt-8"
              >
                {loading ? "Please wait..." : "Send Reset Link"}
              </Button>
            </form>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default ForgotPasswordForm;
