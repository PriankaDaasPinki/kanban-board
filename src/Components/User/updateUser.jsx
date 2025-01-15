import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useUser } from "../Authentication/authSlice";
import { useSelector } from "react-redux";

const UpdateUser = () => {
  const user = useSelector(useUser);
  const [userData, setUserData] = useState(user.user);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const formData = new FormData();
  Object.keys(userData).forEach((key) => {
    if (userData[key]) {
      formData.append(key, userData[key]);
    }
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value, // Handle file input
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage(null);
      setError(null);

      // Prepare data for API
      const formData = new FormData();
      Object.keys(userData).forEach((key) => {
        if (userData[key]) {
          formData.append(key, userData[key]);
        }
      });

      // Send PATCH request to update user
      const response = await axios.patch(
        `http://127.0.0.1:8000/update-user/${userData.username}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-5">
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="full_name"
          value={userData.full_name || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter phone number"
          name="phone"
          value={userData.phone || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={userData.email || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDesignation">
        <Form.Label>Designation</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter designation"
          name="designation"
          value={userData.designation || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control type="file" name="image" onChange={handleChange} />
      </Form.Group>

      <Button variant="danger" type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update"}
      </Button>
    </Form>
  );
};

export default UpdateUser;
