import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../api/axiosInstance";
import AdminLogin from "./AdminLogin"; // adjust path if needed
import {
  Form,
  Button,
  Container,
  Card,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

export default function LoginPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); // optional
  const navigate = useNavigate();

  const handleStudentLogin = async () => {
    try {
      const res = await axios.post("/api/student/login", { phone, email });
      navigate("/quiz", { state: { phone: phone } });
    } catch (err) {
      alert("Login failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
      <Card className="p-4 shadow-sm">
        <h3 className="text-center mb-4">
          {isAdmin ? "Admin Login" : "Student Login"}
        </h3>

        <div className="d-flex justify-content-center mb-3">
          <ToggleButtonGroup
            type="radio"
            name="userType"
            value={isAdmin ? 1 : 0}
          >
            <ToggleButton
              id="student-radio"
              variant={!isAdmin ? "primary" : "outline-primary"}
              value={0}
              onClick={() => setIsAdmin(false)}
            >
              Student
            </ToggleButton>
            <ToggleButton
              id="admin-radio"
              variant={isAdmin ? "primary" : "outline-primary"}
              value={1}
              onClick={() => setIsAdmin(true)}
            >
              Admin
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {isAdmin ? (
          <AdminLogin />
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="success" onClick={handleStudentLogin}>
                Login
              </Button>
            </div>

            <p className="mt-3 text-center">
              New Student? <Link to="/register">Register here</Link>
            </p>
          </Form>
        )}
      </Card>
    </Container>
  );
}
