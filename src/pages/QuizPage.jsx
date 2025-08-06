import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Button, Container, Form, Spinner, Alert } from "react-bootstrap";

function QuizPage() {
  const [quizId, setQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { phone } = location.state || {};

  useEffect(() => {
    axios
      .get("/api/quiz")
      .then((res) => {
        const quiz = res.data;
        setQuizId(quiz.quiz_id); // <-- FIX: Save quiz id
        setQuestions(quiz.questions || []);

        const initialAnswers = quiz.questions.map((q) => ({
          questionId: q.id,
          selected: "",
        }));
        setAnswers(initialAnswers);
      })
      .catch((err) => {
        console.error("Failed to fetch quiz", err);
        setQuestions([]); // Empty fallback
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSelect = (questionId, selected) => {
    const updated = answers.map((a) =>
      a.questionId === questionId ? { ...a, selected } : a
    );
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (!quizId) return alert("Quiz not loaded properly.");

    try {
      const res = await axios.post("/api/submit", {
        phone,
        quizId,
        answers,
      });
      alert(res.data.message || "Quiz submitted successfully!");
      navigate("/result", { state: { score: res.data.score, answers } });
    } catch (err) {
      console.error("Submission error:", err);
      console.log(err.response?.data);
      alert(err.response?.data.message || "Submission failed");
    }
  };

  return (
    <Container className="mt-4">
      {/* Loading spinner */}
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading quiz...</p>
        </div>
      ) : questions.length === 0 ? (
        // No quiz found
        <div className="text-center mt-5">
          <Alert variant="warning">
            <h4>No Active Quiz Available</h4>
            <p>Please check back later or contact your administrator.</p>
          </Alert>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Go Back
          </Button>
        </div>
      ) : (
        <>
          {/* Questions rendering */}
          {questions.map((q) => (
            <Card key={q.id} className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Question</Card.Title>
                <Card.Text>
                  <strong>{q.question}</strong>
                </Card.Text>

                <Form>
                  {q.options.map((opt, idx) => (
                    <Form.Check
                      type="radio"
                      id={`q-${q.id}-opt-${idx}`}
                      key={idx}
                      name={`q-${q.id}`}
                      label={opt}
                      value={opt}
                      checked={
                        answers.find((a) => a.questionId === q.id)?.selected ===
                        opt
                      }
                      onChange={() => handleSelect(q.id, opt)}
                      className="mb-2"
                    />
                  ))}
                </Form>
              </Card.Body>
            </Card>
          ))}

          <div className="text-center">
            <Button variant="primary" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default QuizPage;
