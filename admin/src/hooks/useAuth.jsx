import { useEffect, useState } from "react";
import {
  changeAdminRoleRequest,
  fetchAllUsersRequest,
  forgotPasswordRequest,
  loginRequest,
  logoutRequest,
  passwordResetRequest,
  registerRequest,
  resendVerificationEmailRequest,
  userPasswordUpdateRequest,
  userRequest,
  userUpdateRequest,
  verifyResetPasswordTokenRequest,
} from "../api/auth";
import { useLocation, useNavigate } from "react-router";
// import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { adminLoginReducer } from "../redux/features/AdminSlice";

const useAuth = () => {
  const loggedInUser = useSelector((state) => state.admin.admin);
  const [msg, setMsg] = useState("");
  // const [user, setUser] = useState(null);
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get all admins
  const getUsers = async () => {
    setMsg(null);

    try {
      setLoading(true);
      let res = await fetchAllUsersRequest();
      console.log(res);

      if (res.success) {
        setUsers(res.data);
        setLoading(false);
      } else {
        // setMsg(res.response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // change admin role
  const changeAdminRole = async (data) => {
    setMsg(null);
    try {
      setLoading(true);
      let res = await changeAdminRoleRequest(data);
      if (!res.success) {
        setMsg(res.response.data);
        setLoading(false);
        toast.error(res.response.data.message);
        return;
      }
      toast.success(res.message);
      setMsg(res.message);
      setLoading(false);
      await getAdmins();
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.message);
      setLoading(false);
    }
  };

  // login
  const login = async (email, password) => {
    setMsg(null);

    try {
      setLoading(true);
      let res = await loginRequest(email, password);
      console.log(res);

      if (!res.success) {
        dispatch(adminLoginReducer(null));
        setMsg(res.response.data);
        setLoading(false);
        return;
      }
      await getUser();
      toast.success(res.message);
      navigate("/");
    } catch (error) {
      dispatch(adminLoginReducer(null));
      setMsg(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  // register
  const register = async (data) => {
    setMsg(null);
    try {
      setLoading(true);
      let res = await registerRequest(data);
      if (!res.success) {
        setMsg(res.response.data);
        setLoading(false);
        toast.error(res.response.data.message);
        return;
      }
      toast.success(res.message);
      setMsg(res.message);
      setLoading(false);
      await getAdmins();
      navigate("/adminManagement");
    } catch (error) {
      setMsg(res.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  // resend verification email
  const resendVerificationEmail = async (email) => {
    setMsg(null);
    try {
      setLoading(true);
      let res = await resendVerificationEmailRequest(email);
      if (!res.success) {
        setMsg(res.response.data);
        setLoading(false);
        toast.error(res.response.data.message);
        return;
      }
      toast.success(res.message);
      setMsg(res.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.message);
      setLoading(false);
    }
  };

  // update user
  const updateUser = async (data) => {
    setMsg(null);
    try {
      setLoading(true);
      let res = await userUpdateRequest(data);
      if (!res.success) {
        setMsg(res.response.data);
        setLoading(false);
        toast.error(res.response.data.message);
        return;
      }
      toast.success(res.message);
      setMsg(res.message);
      setLoading(false);
      await getUser();
    } catch (error) {
      setMsg(res.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  // update password
  const updatePassword = async (oldPassword, newPassword, confirmPassword) => {
    setMsg(null);
    try {
      setLoading(true);
      let res = await userPasswordUpdateRequest(
        oldPassword,
        newPassword,
        confirmPassword,
      );
      if (!res.success) {
        setMsg(res.response.data);
        setLoading(false);
        toast.error(res.response.data.message);
        return;
      }
      toast.success(res.message);
      setMsg(res.message);
      setLoading(false);
      await getUser();
    } catch (error) {
      setMsg(res.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  // forgot password
  const forgotPassword = async (email) => {
    setMsg(null);
    try {
      setLoading(true);
      let res = await forgotPasswordRequest(email);
      if (!res.success) {
        setMsg(res.response.data);
        setLoading(false);
        toast.error(res.response.data.message);
        return;
      }
      toast.success(res.message);
      setMsg(res.message);
      setLoading(false);
    } catch (error) {
      setMsg(res.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  // verify reset password token
  const verifyResetPasswordToken = async (token) => {
    setMsg(null);
    try {
      setLoading(true);
      let res = await verifyResetPasswordTokenRequest(token);
      console.log(res);
      if (!res.success) {
        console.log(res.response.data);

        setMsg(res.response.data);
        setLoading(false);
        toast.error(res.response.data.message);
        return;
      }
      // toast.success(res.message);
      // setMsg(res.message);
      setLoading(false);
      return res.data;
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.message);
      setLoading(false);
    }
  };

  // password reset
  const passwordReset = async (token, newPassword, confirmPassword) => {
    setMsg(null);
    try {
      setLoading(true);
      let res = await passwordResetRequest(token, newPassword, confirmPassword);
      if (!res.success) {
        setMsg(res.response.data);
        setLoading(false);
        toast.error(res.response.data.message);
        return;
      }
      toast.success(res.message);
      setMsg(res.message);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.message);
      setLoading(false);
    }
  };

  // get user
  const getUser = async () => {
    setMsg(null);
    try {
      setLoading(true);
      let res = await userRequest();
      console.log(res);

      if (res.success) {
        // setUser(res.data);
        dispatch(adminLoginReducer(res.data));
        setLoading(false);

        if (
          pathname == "/login" ||
          pathname == "/forgot" ||
          pathname == "/otp" ||
          pathname == "/reset-password"
        ) {
          // setLoading(true);
          navigate("/");
          setLoading(false);
        }
      } else {
        dispatch(adminLoginReducer(null));
        setLoading(false);
        // if (pathname == "/" || pathname?.startsWith("/")) {
        //   navigate("/login");
        //   // Optional: force reload to ensure fresh state
        //   window.location.replace("/login");
        //   window.history.pushState(null, null, window.location.href);
        //   window.onpopstate = function () {
        //     window.history.go(1);
        //   };

        //   return;
        // }
      }
    } catch (error) {
      dispatch(adminLoginReducer(null));
      console.log(error);
      if (pathname == "/" || pathname?.startsWith("/")) {
        navigate("/login", { replace: true });
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
          window.history.go(1);
        };
      }

      setLoading(false);
    }
  };

  // logout
  const logout = async () => {
    setMsg(null);
    dispatch(adminLoginReducer(null));
    try {
      setLoading(true);
      let res = await logoutRequest();
      console.log(res);

      dispatch(adminLoginReducer(null));
      setMsg(null);
      navigate("/login", { replace: true });
      setLoading(false);
      // Optional: force reload to ensure fresh state
      window.location.replace("/login");
    } catch (error) {
      console.log(error);
      setUser(null);
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    console.log("Hit");
    if (
      pathname == "/forgot" ||
      pathname == "/reset-password" ||
      pathname.startsWith("/reset-password")
    )
      return;
    getUser();
  }, [pathname]);

  useEffect(() => {
    getUsers();
  }, [loggedInUser]);

  return {
    login,
    register,
    resendVerificationEmail,
    getUser,
    getUsers,
    updateUser,
    updatePassword,
    changeAdminRole,
    forgotPassword,
    verifyResetPasswordToken,
    passwordReset,
    logout,
    users,
    msg,
    user: loggedInUser,
    loading,
  };
};

export default useAuth;

// export const useAuth = () => useContext(AuthContext);
