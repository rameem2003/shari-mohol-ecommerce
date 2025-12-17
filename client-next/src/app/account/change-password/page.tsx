"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import {
  ChangePasswordData,
  changePasswordSchema,
} from "@/app/(auth)/auth.schema";

const page = () => {
  const { updatePassword, loading } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordData) => {
    console.log(data);
    await updatePassword(data);
  };

  return (
    <div className=" w-full">
      <h2 className=" text-3xl font-semibold text-shari-mohol-primary mb-8">
        Update Your Password
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className=" mt-5">
        <div className="grid w-full items-center gap-1.5 mb-5">
          <Label
            className=" text-cd-primary font-cd-bangla text-[20px] font-semibold text-shari-mohol-primary"
            htmlFor="oldPassword"
          >
            Old Password
          </Label>
          <Input
            {...register("oldPassword")}
            className=" font-cd-poppins font-medium w-full block"
            type="text"
            id="oldPassword"
            placeholder="Old Password"
          />
          {errors.oldPassword && (
            <p className="text-sm text-destructive">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        <div className="grid w-full items-center gap-1.5 mb-5">
          <Label
            className=" text-cd-primary font-cd-bangla text-[20px] font-semibold text-shari-mohol-primary"
            htmlFor="newPassword"
          >
            New Password
          </Label>
          <Input
            {...register("newPassword")}
            className=" font-cd-poppins font-medium w-full block"
            type="text"
            id="newPassword"
            placeholder="New Password"
          />
          {errors.newPassword && (
            <p className="text-sm text-destructive">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div className="grid w-full items-center gap-1.5 mb-5">
          <Label
            className=" text-cd-primary font-cd-bangla text-[20px] font-semibold text-shari-mohol-primary"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </Label>
          <Input
            {...register("confirmPassword")}
            className=" font-cd-poppins font-medium w-full block"
            type="text"
            id="confirmPassword"
            placeholder="Confirm Password"
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
          className="bg-shari-mohol-primary cursor-pointer mt-8 hover:bg-shari-mohol-primary/90"
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  );
};

export default page;
