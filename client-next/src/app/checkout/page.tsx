import Container from "@/components/common/Container";
import React from "react";
import ShoppingCart from "./ShoppingCart";
import CheckoutForm from "./CheckoutForm";

const page = () => {
  return (
    <main className="">
      <Container>
        <section className=" flex items-start justify-between py-20 gap-8">
          <div className=" w-full lg:w-7/12">
            <h2 className=" text-3xl font-semibold text-shari-mohol-primary mb-8">
              Your Shipping Address
            </h2>

            <CheckoutForm />
          </div>
          <div className=" w-full lg:w-5/12">
            <h2 className=" text-3xl font-semibold text-shari-mohol-primary mb-8">
              Your Shopping
            </h2>

            <ShoppingCart />
          </div>
        </section>
      </Container>
    </main>
  );
};

export default page;
