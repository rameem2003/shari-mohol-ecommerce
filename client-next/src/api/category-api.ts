"use server";
export const getCategories = async (
  offset?: number | null,
  limit?: number | null
) => {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category/all${
        offset || limit ? `?offset=${offset}&limit=${limit}` : ""
      }`,
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
