"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";
import { AlertCircleIcon, Eye, EyeOff } from "lucide-react";
import { RegisterUserData, registerUserSchema } from "../auth.schema";

const RegisterForm = () => {
  const { registerUser, loading, msg } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserSchema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: RegisterUserData) => {
    // console.log(errors);

    try {
      const result = await registerUser(data);
      console.log(result);
      //   if (result.status === "SUCCESS") toast.success(result.message);
      //   else toast.error(result.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" min-h-[900px] flex items-center justify-center flex-col">
      <h3 className=" text-[30px] font-bold text-cd-primary text-center">
        Welcome to Shari Mohol!
      </h3>

      <h2 className=" text-[36px] font-extrabold text-cd-primary text-center">
        Create your account
      </h2>

      <section className=" mt-10 max-w-[550px] w-full p-4 rounded-lg shadow-xl">
        <div className=" mb-5">
          {msg && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>{msg}</AlertTitle>
            </Alert>
          )}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col w-full "
        >
          <div className="grid w-full items-center gap-3">
            <Label
              className=" text-cd-primary font-cd-bangla text-[20px] font-semibold"
              htmlFor="name"
            >
              Your Name
            </Label>
            <Input
              {...register("name")}
              className=" font-cd-poppins font-medium w-full block"
              type="text"
              id="name"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>
          <div className="grid w-full items-center gap-3">
            <Label
              className=" text-cd-primary font-cd-bangla text-[20px] font-semibold"
              htmlFor="email"
            >
              Your Email
            </Label>
            <Input
              {...register("email")}
              className=" font-cd-poppins font-medium w-full block"
              type="email"
              id="email"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="grid w-full items-center gap-3 mt-5 ">
            <Label
              className=" text-cd-primary font-cd-bangla text-[20px] font-semibold"
              htmlFor="password"
            >
              Your Password
            </Label>
            <div className=" relative">
              <Input
                {...register("password")}
                className=" font-cd-poppins font-medium w-full block"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
              />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Eye className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
            </div>

            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="grid w-full items-center gap-3">
            <Label
              className=" text-cd-primary font-cd-bangla text-[20px] font-semibold"
              htmlFor="phone"
            >
              Your Phone
            </Label>
            <Input
              {...register("phone")}
              className=" font-cd-poppins font-medium w-full block"
              type="text"
              id="phone"
              placeholder="Phone"
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="bg-shari-mohol-primary cursor-pointer mt-8"
          >
            {loading ? "Creating Account..." : "Create An Account"}
          </Button>
        </form>

        <div className=" mt-5 flex items-center justify-between">
          <Link
            className=" text-cd-primary font-cd-bangla text-base font-semibold"
            href="/login"
          >
            Already have an account? Log In
          </Link>

          <Link
            className=" text-cd-primary font-cd-bangla text-base font-semibold"
            href="/forgot-password"
          >
            Forgot your password?
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RegisterForm;
