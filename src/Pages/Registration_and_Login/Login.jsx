import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";

// import BackgroundImage from "../../assets/images/background.png";
import BackgroundImage from "../../assets/images/backgroundImage.webp";
import "../../CSS/Authentication/login_signup.css";
import {
  logInUser,
  useIsLoggedIn,
} from "../../Components/Authentication/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const { isLoading, error } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(useIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let userInfo = {
      username,
      password,
    };
    dispatch(logInUser(userInfo));
  };

  const handlePassword = () => {};

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-2 text-center">Sign In</div>
        {/* ALert */}
        {error && (
          <Alert className="mb-2" variant="danger" dismissible>
            {error}
          </Alert>
        )}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        {isLoading ? (
          <Button className="w-100" variant="success" type="submit" disabled>
            Logging In...
          </Button>
        ) : (
          <Button className="w-100" variant="success" type="submit">
            Log In
          </Button>
        )}
        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={handlePassword}
          >
            Forgot password?
          </Button>
        </div>
      </Form>
      {/* Footer */}
    </div>
  );
};

export default Login;
