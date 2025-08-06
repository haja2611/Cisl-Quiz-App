import { useState } from "react";
import axios from '../api/axiosInstance';
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/admin/login",
        {
          username,
          password,
        }
      );
      alert(res.data.msg);
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <div className="d-grid">
        <Button type="submit" variant="primary">
          Login
        </Button>
      </div>
    </Form>
  );
}
export default AdminLogin;
