import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const useProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = Cookies.get("accessToken"); // access token
  const sessionToken = Cookies.get("sessionToken"); // access token

  // handle profile update
  const handleProfileUpdate = async (userID, data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      // formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      if (data.photo) {
        formData.append("photo", data.photo);
      }

      let res = await axios.patch(
        `${import.meta.env.VITE_API}/auth/update/${userID}`,
        formData,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/formdata",
            Cookie: `accessToken=${accessToken};sessionToken=${sessionToken}`,
          },
        }
      );

      //   await fetchUpdateUser();

      setIsLoading(false);
      Swal.fire({
        title: res.data.msg,
        showConfirmButton: true,
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
        icon: "success",
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error);

      Swal.fire({
        title: error.response.data.msg,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "Ok",
        cancelButtonColor: "red",
        icon: "error",
      })
        .then((result) => {
          if (result.isDismissed) {
            location.reload();
          }
        })
        .finally(() => {
          location.reload();
          setIsLoading(false);
        });
    }
  };

  return { handleProfileUpdate, isLoading };
};

export default useProfile;
