import axios from "axios";
import Cookies from "js-cookie";

export const userLogout = async (id, dispatch, action) => {
  try {
    let res = await axios.post(`${import.meta.env.VITE_API}/auth/logout/${id}`);

    console.log(res);

    Cookies.remove("accessToken");
    Cookies.remove("sessionToken");
    dispatch(action(""));
    location.reload();
  } catch (error) {
    console.log(error);
  }
};
