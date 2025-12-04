import React from "react";
import Container from "./Container";
import { Menu } from "lucide-react";
import Link from "next/link";
import NavRightSideComponent from "./NavRightSideComponent";
import SearchComponent from "./SearchComponent";

const Navigation = () => {
  return (
    <nav className=" bg-shari-mohol-primary py-4">
      <Container>
        <div className="slider-container mb-4 w-full flex-nowrap relative overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="marqueeSliderLeft flex items-center gap-5 ">
            <p className=" whitespace-nowrap text-white font-medium">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto
              soluta, atque distinctio aliquam ea libero, officiis et odio
              deserunt molestiae nam consequatur unde voluptatem maxime
              voluptates saepe corrupti perferendis ullam qui esse? Quo maiores
              nam quisquam accusantium non, itaque placeat corporis in esse aut
              ipsa facilis modi asperiores, molestias natus, nulla eius
              blanditiis harum. Vero, delectus! Laudantium illum consequuntur
              odio nisi, nemo culpa eos debitis ipsam minus quod distinctio sit
              iure consectetur corrupti. Nesciunt distinctio nulla optio error
              velit totam impedit eaque cum quibusdam laboriosam blanditiis quos
              sed ullam illo et nobis ratione, voluptatum doloremque debitis
              corporis necessitatibus. Beatae, ullam.
            </p>
          </div>
        </div>
        <div className=" flex items-center justify-between">
          <div className=" block lg:hidden w-4/12">
            <button>
              <Menu className=" text-2xl text-white" />
            </button>
          </div>
          <div className=" w-4/12 lg:w-2/12">
            <Link
              href="/"
              className=" block font-bold text-white text-center lg:text-left text-3xl"
            >
              LOGO
            </Link>
          </div>
          <div className=" hidden lg:block w-4/12 lg:w-6/12">
            <SearchComponent />
          </div>
          <div className=" w-4/12 lg:w-2/12">
            <NavRightSideComponent />
          </div>
        </div>

        <div className=" mt-2 block lg:hidden">
          <SearchComponent />
        </div>
      </Container>
    </nav>
  );
};

export default Navigation;
