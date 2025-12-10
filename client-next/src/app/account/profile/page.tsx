"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginUserSchema } from "@/app/(auth)/auth.schema";
import { useAuth } from "@/hooks/useAuth";

const page = () => {
  const { loading } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginUserSchema),
  });
  return (
    <div className=" w-full">
      <h2 className=" text-3xl font-semibold text-shari-mohol-primary mb-8">
        Your Profile
      </h2>

      <form action="" className=" mt-5">
        <div className="grid w-full items-center gap-1.5 mb-5">
          <Label
            className=" text-cd-primary font-cd-bangla text-[20px] font-semibold text-shari-mohol-primary"
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

        <div className="grid w-full items-center gap-1.5 mb-5">
          <Label
            className=" text-cd-primary font-cd-bangla text-[20px] font-semibold text-shari-mohol-primary"
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
        <div className="grid w-full items-center gap-1.5 mb-5">
          <Label
            className=" text-cd-primary font-cd-bangla text-[20px] font-semibold text-shari-mohol-primary"
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

        <div className="grid w-full items-center gap-1.5 mb-5">
          <Label
            className=" text-cd-primary font-cd-bangla text-[20px] font-semibold text-shari-mohol-primary"
            htmlFor="address"
          >
            Your Address
          </Label>
          <Input
            {...register("address")}
            className=" font-cd-poppins font-medium w-full block"
            type="text"
            id="address"
            placeholder="Address"
          />
          {errors.address && (
            <p className="text-sm text-destructive">{errors.address.message}</p>
          )}
        </div>

        <Button
          disabled={loading}
          type="submit"
          className="bg-shari-mohol-primary cursor-pointer mt-8 hover:bg-shari-mohol-primary/90"
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
};

export default page;
