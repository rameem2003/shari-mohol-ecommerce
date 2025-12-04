"use server";
export const getBanner = async () => {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner/all`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch cart");
  }
};
