import React, { Suspense } from "react";
import Container from "@/components/common/Container";
import DisplayProductsSection from "./DisplayProductsSection";

export async function generateMetadata() {
  return {
    title: "Shop, Explore Our Unique Collections || Shari Mohol",
    description: "Explore Our Unique Collections at Shari Mohol",
  };
}

const page = () => {
  return (
    <main>
      <Container>
        <section className=" py-20">
          <Suspense fallback={<div>Loading products...</div>}>
            <DisplayProductsSection />
          </Suspense>
        </section>
      </Container>
    </main>
  );
};

export default page;
