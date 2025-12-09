import React from "react";
import { getProductById } from "@/api/product-api";
import Container from "@/components/common/Container";
import { Metadata, ResolvingMetadata } from "next";
import { PageProps } from "./../../../types/Params";
import DisplayProductImage from "@/components/screens/product-details/DisplayProductImage";
import DetailSection from "@/components/screens/product-details/DetailSection";

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
    title: `${product?.data?.name} || Shari Mohol`,
    description: product?.data?.description,
  };
}

const page = async ({ params }: PageProps) => {
  let id = (await params).id;

  const { data } = await getProductById(id);
  // console.log(data);

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
