import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import ProductImagePreview from "../components/screens/product-details/ProductImagePreview";
import Flex from "../components/common/Flex";
import Container from "../components/common/Container";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import ProductCard from "../components/reusable/ProductCard";
import useCart from "../hooks/useCart";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import { FaHome } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { BsTruck } from "react-icons/bs";
import { PiToolboxLight } from "react-icons/pi";
import StarRating from "../components/common/StarRating";
import StartRatingInput from "../components/common/StartRatingInput";
import useProduct from "../hooks/useProduct";
import { useForm } from "react-hook-form";

const ProductDetails = () => {
  const { id } = useParams();
  const { fetchProduct, sendProductReview, msg, product, reviews } =
    useProduct();
  const { addToCart, updateCart } = useCart(); // cart hook
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm(); // react hook form
  const cart = useSelector((state) => state.cart.cart);
  const [relatedProducts, setRelatedProducts] = useState([]); // state for related products
  const [selectedColor, setSelectedColor] = useState(null); // state for color select button indicator
  const [color, setColor] = useState(""); // state for store the product color
  const [selectedSize, setSelectedSize] = useState(null); // state for color select button indicator
  const [size, setSize] = useState(""); // state for store the product size
  const [rating, setRating] = useState(0); // state for product rating
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,

    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,

    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  let matchToCart = cart.filter((item) => item._id == id);

  // fetch product
  const loadProduct = async () => {
    try {
      await fetchProduct(id);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch product by category
  const fetchProductByCategory = async () => {
    try {
      let res = await axios.get(`
        ${import.meta.env.VITE_API}/product/category/${
        product?.category?._id
      }`);
      setRelatedProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    loadProduct();
  }, [id]);

  useEffect(() => {
    fetchProductByCategory();
  }, [product?.category?._id]);

  useEffect(() => {
    setValue("rating", rating);
    setValue("id", id);
  }, [rating, id]);

  return (
    <main className=" py-[120px]">
      <Container>
        <p className=" flex items-center gap-2">
          <Link to="/">
            <FaHome className="text-2xl text-gray-400" />
          </Link>
          / <span className=" text-lg font-medium">{product?.name}</span>
        </p>

        <section className=" mt-10">
          <Flex className="flex-col gap-10 lg:flex-row">
            <div className="w-full lg:w-3/12 xl:w-4/12">
              {product ? (
                <ProductImagePreview data={product} />
              ) : (
                <Flex className="justify-between gap-5">
                  <div className="w-3/12">
                    <Skeleton count={3} className="h-[150px]" />
                  </div>

                  <div className="w-9/12">
                    <Skeleton count={1} className="h-full" />
                  </div>
                </Flex>
              )}
            </div>
            <div className="w-full lg:w-5/12 xl:w-5/12">
              <h1 className=" text-4xl text-black font-bold">
                {product?.name}
              </h1>

              <p className=" mt-4 text-gray-600 font-medium mb-5">
                {product?.description}
              </p>

              <p className=" mt-4 text-gray-600 font-medium capitalize mb-5">
                Category: {product?.category?.name}
              </p>
              <p className=" mt-4 text-gray-600 font-medium capitalize mb-5">
                Sub Category: {product?.subCategory}
              </p>

              <div className="flex items-center mt-2.5 mb-5">
                <StarRating rating={product?.ratingAverage} />

                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                  {product?.ratingAverage}
                </span>
              </div>

              <hr />

              {product?.sizes?.length > 0 && (
                <Flex className="my-6 items-center gap-6 hidden">
                  <p className="text-[20px] font-normal text-black">Size:</p>
                  <Flex className="gap-4">
                    {product?.sizes?.map((data, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedSize(i);
                          setSize(data);
                        }}
                        className={`rounded-[4px] ${
                          selectedSize == i
                            ? "border-transparent bg-purple-700 text-white"
                            : "border-[1px] border-black"
                        } px-3 py-[6px] text-[14px] font-medium uppercase text-black`}
                      >
                        {data}
                      </button>
                    ))}
                  </Flex>
                </Flex>
              )}

              {product?.colors?.length > 0 && (
                <Flex className="my-6 items-center gap-6 hidden">
                  <p className="text-[20px] font-normal text-black">Color:</p>

                  <Flex className="gap-4">
                    {product?.colors?.map((data, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedColor(i);
                          setColor(data);
                        }}
                        className={`rounded-[4px] ${
                          selectedColor == i
                            ? "border-transparent bg-purple-700 text-white"
                            : "border-[1px] border-black"
                        } px-3 py-[6px] text-[14px] font-medium uppercase text-black`}
                      >
                        {data}
                      </button>
                    ))}
                  </Flex>
                </Flex>
              )}

              <Flex className="mt-5 items-end gap-5">
                <span className=" text-2xl lg:text-4xl font-bold text-red-600">
                  BDT {product?.discountPrice}
                </span>
                <del className=" italic text-lg lg:text-xl text-gray-600">
                  BDT {product?.sellingPrice}
                </del>
              </Flex>

              <Flex className="mt-10 gap-5 flex-col md:flex-row">
                <Flex className=" w-full xl:w-4/12 border-[2px] border-black items-center justify-between">
                  <button
                    onClick={() => updateCart(id, +1)}
                    className=" text-center flex items-center justify-center w-1/3 px-4 py-2 font-bold hover:text-purple-700"
                  >
                    <FaPlus className="" />
                  </button>
                  <button
                    disabled
                    className=" text-center w-1/3 flex items-center justify-center px-4 py-2 font-bold"
                  >
                    {matchToCart[0]?.quantity ? matchToCart[0]?.quantity : 0}
                  </button>
                  <button
                    onClick={() => updateCart(id, -1)}
                    className="  text-center w-1/3 flex items-center justify-center px-4 py-2 font-bold hover:text-purple-700"
                  >
                    <FaMinus className="" />
                  </button>
                </Flex>

                <button
                  onClick={() => addToCart(product)}
                  className=" w-full flex items-center justify-center gap-2 border-[2px] border-purple-600 py-3 px-5 xl:w-8/12 text-white hover:text-purple-600 bg-purple-600 hover:bg-white"
                >
                  Add to cart
                </button>
              </Flex>
            </div>

            <div className="w-full md:w-5/12 lg:w-4/12 xl:w-3/12">
              <div className="p-3 border w-full rounded">
                <div className=" flex gap-5 items-center py-4 border-b-[1px] border-gray-200">
                  <BsTruck className=" text-5xl text" />
                  <p className="  text-xl font-bold">Easy Delivery</p>
                </div>
                <div className=" flex gap-5 items-center py-4 border-b-[1px] border-gray-200">
                  <PiToolboxLight className=" text-5xl text" />
                  <p className="  text-xl font-bold">Secure Payment</p>
                </div>
              </div>
            </div>
          </Flex>
        </section>

        <section>
          <h2 className=" text-2xl font-bold mt-10">
            Product Reviews ({reviews.length})
          </h2>

          <form
            onSubmit={handleSubmit(sendProductReview)}
            action=""
            className=" mt-5 max-w-[500px]"
          >
            <div className="mt-5">
              <label htmlFor="comment" className=" text-base font-bold">
                Comment <span className=" text-red-600">*</span>
              </label>
              <textarea
                name="comment"
                id="comment"
                {...register("comment", {
                  required: "Comment is required",
                })}
                cols="30"
                rows="5"
                placeholder="Write your review here"
                className=" w-full border-[1px] border-gray-200 p-3 rounded"
              ></textarea>
              {errors.comment && (
                <p className="text-red-500">{errors.comment.message}</p>
              )}
              {msg && <p className="text-red-500 mt-2">{msg}</p>}
            </div>

            <div className="mt-5">
              <label htmlFor="rating" className=" text-base font-bold">
                Rating
              </label>
              {/* <StarRating rating={rating} setRating={setRating} /> */}
              <StartRatingInput setValue={setRating} />
            </div>

            <div className="mt-5">
              <button
                disabled={isSubmitting}
                className=" w-full flex items-center justify-center gap-2 border-[2px] border-purple-600 py-3 px-5 text-white hover:text-purple-600 bg-purple-600 hover:bg-white"
              >
                {isSubmitting ? "Please Wait..." : "Submit Review"}
              </button>
            </div>
          </form>

          {reviews.length == 0 && (
            <h4 className=" text-base font-bold">No reviews yet</h4>
          )}

          <div className="mt-5">
            {reviews.map((review) => (
              <Flex
                className=" max-w-[500px] items-start gap-2 mb-2 border-b-[1px] border-gray-200 p-3
                rounded"
                key={review._id}
              >
                <div className=" w-[50px] h-[50px]">
                  <img
                    src={`${import.meta.env.VITE_MEDIA}/${review?.user?.photo}`}
                    alt={review?.user?.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <Flex className="items-center gap-1">
                    <h3 className=" text-xs font-bold">{review?.user?.name}</h3>
                    <StarRating rating={review?.rating} className="text-xs" />
                  </Flex>
                  <p className="text-base font-medium text-gray-800">
                    {review?.comment}
                  </p>
                  <span className=" text-xs text-gray-500">
                    {moment(review?.createdAt).fromNow()}
                  </span>
                </div>
              </Flex>
            ))}
          </div>
        </section>

        <section className=" mt-10 my-20">
          <h2 className=" text-2xl font-bold">Related Products</h2>

          <div className="mt-[31px]">
            {relatedProducts.length == 0 && (
              <Flex className="gap-4">
                <div className=" w-full md:w-1/3">
                  <Skeleton inline={true} className="h-[400px]" />
                </div>
                <div className="hidden md:block md:w-1/3">
                  <Skeleton inline={true} className="h-[400px]" />
                </div>
                <div className="hidden md:block md:w-1/3">
                  <Skeleton inline={true} className="h-[400px]" />
                </div>
              </Flex>
            )}
            <div className="slider-container">
              <Slider {...settings}>
                {relatedProducts.map((p, i) => (
                  <ProductCard className="w-full" data={p} key={p._id} />
                ))}
              </Slider>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default ProductDetails;
