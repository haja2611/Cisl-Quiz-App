import { useState } from "react";
import axios from "../api/axiosInstance";
import { saveAs } from "file-saver";
import {
  Container,
  Card,
  Button,
  Form,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import "./chartSetup"; // adjust if needed
import QuestionCharts from "./QuestionCharts"; // adjust path
import QuizList from "../components/QuizList"; // adjust path
import { useEffect } from "react";
function AdminDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQ, setNewQ] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });
  const [quizId, setQuizId] = useState("");
  const [report, setReport] = useState([]);

  const createQuiz = async () => {
    await axios.post("/api/admin/create-quiz", {
      title,
      questions,
    });
    alert("Quiz Created");
    setQuestions([]);
    setNewQ({ question: "", options: ["", "", "", ""], answer: "" });
    // Do not reset title, as you want to enter multiple quizzes with same title
  };

  const fetchReport = async () => {
    const res = await axios.get(`/api/admin/report/${quizId}`);
    setReport(res.data);
  };

  const exportExcel = async () => {
    const res = await axios.get("/api/admin/export", {
      responseType: "blob",
    });
    saveAs(res.data, "report.xlsx");
  };

  const addQuestion = () => {
    if (
      newQ.question.trim() === "" ||
      newQ.answer.trim() === "" ||
      newQ.options.some((opt) => opt.trim() === "")
    ) {
      alert("Please fill all fields before adding a question");
      return;
    }
    setQuestions([...questions, newQ]);
    setNewQ({ question: "", options: ["", "", "", ""], answer: "" });
  };
  const fetchQuizzes = async () => {
    const res = await axios.get("/api/admin/quizzes");
    setQuizzes(res.data);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);
  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Create Quiz</h2>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Quiz Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Card className="p-3 bg-light mb-3">
            <h5>Add New Question</h5>
            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Question"
                value={newQ.question}
                onChange={(e) => setNewQ({ ...newQ, question: e.target.value })}
              />
            </Form.Group>

            {newQ.options.map((opt, i) => (
              <Form.Group className="mb-2" key={i}>
                <Form.Control
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const opts = [...newQ.options];
                    opts[i] = e.target.value;
                    setNewQ({ ...newQ, options: opts });
                  }}
                />
              </Form.Group>
            ))}

            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Correct Answer"
                value={newQ.answer}
                onChange={(e) => setNewQ({ ...newQ, answer: e.target.value })}
              />
            </Form.Group>

            <Button variant="primary" onClick={addQuestion}>
              Add Question
            </Button>
          </Card>

          {questions.length > 0 && (
            <div className="mb-3">
              <h6>Added Questions</h6>
              <ListGroup>
                {questions.map((q, idx) => (
                  <ListGroup.Item key={idx}>
                    <strong>{q.question}</strong> – [Ans: {q.answer}]
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}

          <Button variant="success" onClick={createQuiz} className="mt-2">
            Submit Quiz
          </Button>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h4>All Quizzes</h4>
          <QuizList quizzes={quizzes} refresh={fetchQuizzes} />
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h4>Quiz Report</h4>
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Col sm={8}>
              <Form.Select
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
              >
                <option value="">-- Select a Quiz --</option>
                {quizzes.map((quiz) => (
                  <option key={quiz.id} value={quiz.id}>
                    {quiz.title}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col sm={4}>
              <Button
                variant="info"
                onClick={fetchReport}
                className="me-2"
                disabled={!quizId}
              >
                View Report
              </Button>
              <Button variant="warning" onClick={exportExcel}>
                Export Excel
              </Button>
            </Col>
          </Form.Group>
        </Card.Body>
      </Card>
      {report.length > 0 && (
        <div className="mt-4">
          <h5>Question-wise Analysis</h5>
          <QuestionCharts report={report} />
        </div>
      )}
    </Container>
  );
}

export default AdminDashboard;
