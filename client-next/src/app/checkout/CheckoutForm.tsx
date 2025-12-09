"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { checkoutSchema } from "./checkout.schema";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

const CheckoutForm = () => {
  const { confirmOrder, loading } = useCart();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    await confirmOrder(data);
  };

  return (
    <div className=" w-full">
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
        <div className="grid w-full items-center  mb-5">
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
            placeholder="Your Address"
          />
          {errors.address && (
            <p className="text-sm text-destructive">{errors.address.message}</p>
          )}
        </div>

        <div className="grid w-full items-center  mb-5">
          <Label
            className=" text-cd-primary font-cd-bangla text-[20px] font-semibold text-shari-mohol-primary"
            htmlFor="city"
          >
            Your City
          </Label>
          <Input
            {...register("city")}
            className=" font-cd-poppins font-medium w-full block"
            type="text"
            id="city"
            placeholder="Your City"
          />
          {errors.city && (
            <p className="text-sm text-destructive">{errors.city.message}</p>
          )}
        </div>
        <div className="grid w-full items-center  mb-5">
          <Label
            className=" text-cd-primary font-cd-bangla text-[20px] font-semibold text-shari-mohol-primary"
            htmlFor="postCode"
          >
            Your Postal Code
          </Label>
          <Input
            {...register("postCode")}
            className=" font-cd-poppins font-medium w-full block"
            type="text"
            id="postCode"
            placeholder="Your Postal Code"
          />
          {errors.postCode && (
            <p className="text-sm text-destructive">
              {errors.postCode.message}
            </p>
          )}
        </div>
        <div className="grid w-full items-center  mb-5">
          <Label
            className=" text-cd-primary font-cd-bangla text-[20px] font-semibold text-shari-mohol-primary"
            htmlFor="state"
          >
            Your State
          </Label>
          <Input
            {...register("state")}
            className=" font-cd-poppins font-medium w-full block"
            type="text"
            id="state"
            placeholder="Your State"
          />
          {errors.state && (
            <p className="text-sm text-destructive">{errors.state.message}</p>
          )}
        </div>
        <div className="grid w-full items-center  mb-5">
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
            placeholder="Your Phone"
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className=" mb-5">
          <Controller
            name="paymentMethod"
            control={control}
            render={({ field }) => (
              <RadioGroup value={field.value} onValueChange={field.onChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className=" text-shari-mohol-primary"
                    value="COD"
                    id="COD"
                  />
                  <Label htmlFor="COD">Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    className=" text-shari-mohol-primary"
                    value="online"
                    id="online"
                  />
                  <Label htmlFor="online">Online Payment</Label>
                </div>
              </RadioGroup>
            )}
          ></Controller>

          {errors.paymentMethod && (
            <p className="text-sm text-destructive">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        <Button
          disabled={loading}
          type="submit"
          className="bg-shari-mohol-primary cursor-pointer w-full hover:bg-shari-mohol-primary/90"
        >
          {loading ? "Placing Order...." : "Place Order"}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
