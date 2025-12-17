import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import Container from "@/components/common/Container";
import DetailSection from "@/components/screens/product-details/DetailSection";
import DisplayProductImage from "@/components/screens/product-details/DisplayProductImage";
import { getProductById } from "@/api/product-api";
import { PageProps } from "./../../../types/Params";

type MetaProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id;
  // fetch post information
  const product = await getProductById(id);
  //   console.log(product);

  return {
    title: `${product?.data?.name || "404 Not Found"} || Shari Mohol`,
    description: product?.data?.description,
  };
}

const page = async ({ params }: PageProps) => {
  let id = (await params).id;

  const { data } = await getProductById(id);
  // console.log(data);

  if (!data) {
    return (
      <div className=" py-20 text-center text-2xl font-semibold">
        Product not found!
      </div>
    );
  }

  return (
    <main>
      <Container>
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 py-20">
          <DisplayProductImage data={data} />
          {/* Right side - Product details */}
          <DetailSection data={data} />
        </section>
      </Container>
    </main>
  );
};

export default page;
