import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

function StudentRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    institute: "",
    department: "",
    year: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/register", form);
      alert(res.data.msg);
      navigate("/"); // Change `details` to `phone` to match QuizPage expectation
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <Container style={{ maxWidth: "600px", marginTop: "40px" }}>
      <h3 className="text-center mb-4">Student Registration</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="Enter name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Institute</Form.Label>
          <Form.Control
            placeholder="Enter institute"
            value={form.institute}
            onChange={(e) => setForm({ ...form, institute: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Department</Form.Label>
          <Form.Control
            placeholder="Enter department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Year</Form.Label>
          <Form.Select
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            required
          >
            <option value="">Select Year</option>
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
          </Form.Select>
        </Form.Group>

        <div className="d-grid">
          <Button type="submit" variant="primary">
            Register
          </Button>
          <p className="mt-3 text-center">
            Already Registered? <a href="/">Login here</a>
          </p>
        </div>
      </Form>
    </Container>
  );
}

export default StudentRegister;
