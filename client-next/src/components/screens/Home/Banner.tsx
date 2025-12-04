import Container from "@/components/common/Container";
import SliderComponent from "./SliderComponent";
import { getBanner } from "@/api/banner-api";

const Banner = async () => {
  const { data } = await getBanner();

  return (
    <section className=" py-2">
      <Container>
        <div className="slider-container">
          <SliderComponent data={data} />
        </div>
      </Container>
    </section>
  );
};

export default Banner;
