"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { UserProfileData, userProfileSchema } from "@/app/(auth)/auth.schema";

const page = () => {
  const { user, updateUser, loading } = useAuth();
  console.log(user?.data);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<UserProfileData>({
    defaultValues: {
      name: (user?.data?.name || "") as string,
      // email: (user?.data?.email || "") as string,
      phone: (user?.data?.phone || "") as string,
      address: (user?.data?.address || "") as string,
    },
    resolver: zodResolver(userProfileSchema),
  });

  const onSubmit = async (data: UserProfileData) => {
    console.log("Profile Data:", data);
    await updateUser(data);
  };

  console.log(errors);

  useEffect(() => {
    if (user?.data) {
      reset({
        name: user.data.name || "",
        // email: user.data.email || "",
        phone: user.data.phone || "",
        address: user.data.address || "",
      });
    }
  }, [user, reset]);

  return (
    <div className=" w-full">
      <h2 className=" text-3xl font-semibold text-shari-mohol-primary mb-8">
        Your Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className=" mt-5">
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
            // {...register("email")}
            value={user?.data?.email}
            className=" font-cd-poppins font-medium w-full block"
            type="email"
            id="email"
            placeholder="Email"
          />
          {/* {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )} */}
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

        {!isDirty && (
          <p className="text-sm text-muted-foreground mt-8">
            No changes to save
          </p>
        )}
      </form>
    </div>
  );
};

export default page;
