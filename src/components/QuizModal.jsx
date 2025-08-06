import  { useEffect, useState } from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import axios from '../api/axiosInstance';
import QuestionItem from "./QuestionItem";

function QuizModal({ quiz, onClose, refresh }) {
  const [questions, setQuestions] = useState([]);
  const [isActive, setIsActive] = useState(quiz.is_active);

const fetchQuestions = async () => {
  try {
    const res = await axios.get(`/api/admin/quiz/${quiz.id}/questions`);
    if (res.data && Array.isArray(res.data.questions)) {
      setQuestions(res.data.questions);
    } else {
      console.error("Unexpected format:", res.data);
      setQuestions([]); // fallback to empty
    }
  } catch (err) {
    console.error("Failed to fetch questions", err);
  }
};


  const toggleQuizStatus = async () => {
    await axios.put(`/api/admin/quiz/${quiz.id}/toggle`);
    setIsActive(!isActive);
    refresh();
  };

  const deleteQuiz = async () => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await axios.delete(`/api/admin/quiz/${quiz.id}`);
      onClose();
      refresh();
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <Modal show onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {quiz.title}{" "}
          {isActive ? (
            <Badge bg="success">Active</Badge>
          ) : (
            <Badge bg="secondary">Inactive</Badge>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {questions.map((q, i) => (
          <QuestionItem
            key={q.id}
            question={q}
            quizId={quiz.id}
            refresh={fetchQuestions}
          />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant={isActive ? "secondary" : "success"} onClick={toggleQuizStatus}>
          {isActive ? "Deactivate" : "Activate"}
        </Button>
        <Button variant="danger" onClick={deleteQuiz}>
          Delete Quiz
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QuizModal;
