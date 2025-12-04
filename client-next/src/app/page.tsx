import AllProducts from "@/components/screens/Home/AllProducts";
import Banner from "@/components/screens/Home/Banner";
import TopCategories from "@/components/screens/Home/TopCategories";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Banner />
      <TopCategories />
      <AllProducts />
    </main>
  );
}
