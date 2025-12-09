export const getCart = async () => {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Avoid caching
    });
    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch cart");
  }
};

export const addToCart = async (id: string) => {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);

    throw new Error("Failed to add course to cart");
  }
};

export const decrementToCart = async (id: string) => {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/decrement/${id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to decrement course from cart");
  }
};

export const removeFromCart = async (id: string) => {
  try {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.json();
  } catch (error) {
    throw new Error("Failed to remove course from cart");
  }
};

export const placeOrderRequest = async (orderData: any) => {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order/place`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    return res.json();
  } catch (error: any) {
    throw new Error("Failed to place order: " + error.message);
  }
};
