import React from "react";
import Container from "../../common/Container";
import Title from "../../common/Title";
import Flex from "../../common/Flex";
import shopAvatar from "../../../assets/undraw_groceries_4via.png";

const Conclusion = () => {
  return (
    <section className=" mt-10 my-20">
      <Container>
        <Flex className=" w-full flex-col md:flex-row items-center rounded-lg border-[2px] border-purple-600 px-4 py-10">
          <div className=" w-full md:w-9/12">
            <Title title="Let's Shopping" />

            <p className=" mt-10">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consectetur nesciunt nostrum eaque, omnis tempora repellat velit
              at nobis eveniet dolorem debitis odio blanditiis dolores veritatis
              explicabo ullam corrupti id! Minus saepe iusto non eum qui dolorum
              officia facere eius, quisquam eos beatae, magnam eveniet
              laboriosam eaque. Totam, dolorem. Vel, iure!
            </p>
          </div>
          <div className=" w-full md:w-3/12">
            <img src={shopAvatar} alt="image" />
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export default Conclusion;
