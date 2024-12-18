import React from "react";
import { useSelector } from "react-redux";
import { useIsLoggedIn } from "../Components/Authentication/authSlice"; // Assuming this is the correct import for the selector
import { Navigate } from "react-router-dom";

const Protected = ({ page }) => {
  const isLoggedIn = useSelector(useIsLoggedIn);  // Directly passing the selector to useSelector
  console.log("page protected ", page);
  console.log("isLoggedIn protected ", isLoggedIn);

  return isLoggedIn ? page : <Navigate to="/login" replace />;
};

export default Protected;
