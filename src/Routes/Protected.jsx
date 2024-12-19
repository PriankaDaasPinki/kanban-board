import React from "react";
import { useSelector } from "react-redux";
import {
  useIsLoggedIn,
  useToken,
  useUser,
} from "../Components/Authentication/authSlice"; // Assuming this is the correct import for the selector
import { Navigate } from "react-router-dom";

const Protected = ({ page }) => {
  const isLoggedIn = useSelector(useIsLoggedIn); // Directly passing the selector to useSelector
  const token = useSelector(useToken); // Directly passing the selector to useSelector
  const user = useSelector(useUser); // Directly passing the selector to useSelector
  console.log("page protected ", isLoggedIn);
  console.log("token protected ", token);
  console.log("user protected ", user);
  // console.log("local Storage ", localStorage);

  return isLoggedIn ? page : <Navigate to="/login" replace />;
};

export default Protected;
