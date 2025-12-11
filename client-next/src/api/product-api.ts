// "use server";
export const getProducts = async (
  segment: "hotSell" | "featured" | "" = "",
  offset?: number | null,
  limit?: number | null,
  category?: string | null,
  price: "asc" | "desc" | null = "asc"
) => {
  try {
    let res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/products${`?offset=${offset}&limit=${limit}&category=${category}&price=${price}&segment=${segment}`}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch cart");
  }
};

export const searchProductsRequest = async (query: string) => {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/search?s=${query}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch cart");
  }
};

export const getProductById = async (id: string) => {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/single/${id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch cart");
  }
};
