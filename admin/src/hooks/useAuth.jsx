import { useEffect, useState } from "react";
import {
  fetchAllUsersRequest,
  forgotPasswordRequest,
  loginRequest,
  logoutRequest,
  passwordResetRequest,
  registerRequest,
  resendVerificationEmailRequest,
  updateUserRoleRequest,
  userPasswordUpdateRequest,
  userRequest,
  userUpdateRequest,
  verifyResetPasswordTokenRequest,
} from "../api/auth";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { adminLoginReducer } from "../redux/features/AdminSlice";
import { toast } from "react-toastify";

const useAuth = () => {
  const loggedInUser = useSelector((state) => state.admin.admin);
  const [msg, setMsg] = useState("");
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

      if (res.success) {
        setUsers(res.data);
        setLoading(false);
      } else {
        setMsg(res.response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // user role update
  const updateUserRole = async (id, role) => {
    setMsg(null);
    try {
      setLoading(true);
      let res = await updateUserRoleRequest(id, role);
      if (!res.success) {
        setMsg(res.response.data);
        setLoading(false);
        toast.error(res.response.data.message);
        return;
      }
      toast.success(res.message);
      setMsg(res.message);
      setLoading(false);
      await getUsers();
    } catch (error) {
      console.log(error);
      return error;
      throw new Error("Failed to update user role: " + error.message);
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
      console.log(error);
      setMsg(error.response.data.message);
      setLoading(false);
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
          console.log(pathname);

          // setLoading(true);
          navigate("/");
          setLoading(false);
        }
      } else {
        dispatch(adminLoginReducer(null));
        setLoading(false);
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
      dispatch(adminLoginReducer(null));
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    getUsers();
  }, [loggedInUser]);

  useEffect(() => {
    getUser();
  }, [pathname]);

  return {
    login,
    register,
    resendVerificationEmail,
    getUser,
    getUsers,
    updateUser,
    updatePassword,
    updateUserRole,
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
