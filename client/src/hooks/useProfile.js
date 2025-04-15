import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { AccountReducer } from "../redux/slices/AccountSlice";

const useProfile = () => {
  const dispatch = useDispatch();
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

      await fetchUserUpdate(userID);

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

  // handle password change
  const handlePasswordChange = async (userID, data) => {
    setIsLoading(true);
    try {
      let res = await axios.patch(
        `${import.meta.env.VITE_API}/auth/changepassword/${userID}`,
        data,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `accessToken=${accessToken};sessionToken=${sessionToken}`,
          },
        }
      );

      setIsLoading(false);

      Swal.fire({
        title: res.data.msg,
        showConfirmButton: true,
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
        icon: "success",
      });
      // .then((result) => {
      //   if (result.isConfirmed) {
      //     handleLogout(admin.id);
      //   }
      // })
      // .finally(() => {
      //   handleLogout(admin.id);
      // });
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

  // handle fetch update user
  const fetchUserUpdate = async (userID) => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_API}/auth/user/${userID}`
      );

      console.log(res);
      dispatch(AccountReducer(res.data.user));
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return { handleProfileUpdate, handlePasswordChange, isLoading };
};

export default useProfile;
