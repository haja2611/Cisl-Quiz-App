import React, { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from '../api/axiosInstance';

function QuestionItem({ question, quizId, refresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editQ, setEditQ] = useState({
    ...question,
    options: Array.isArray(question.options)
      ? question.options
      : JSON.parse(question.options),
  });

  const handleDelete = async () => {
    if (window.confirm("Delete this question?")) {
      await axios.delete(
        `/api/admin/question/${question.id}`
      );
      refresh();
    }
  };

  const saveEdit = async () => {
    await axios.put(`/api/admin/question/${question.id}`, {
      question: editQ.question,
      options: editQ.options, // ✅ Array, not string
      answer: editQ.answer,
    });
    setIsEditing(false);
    refresh();
  };

  const handleOptionChange = (value, index) => {
    const updatedOptions = [...editQ.options];
    updatedOptions[index] = value;
    setEditQ({ ...editQ, options: updatedOptions });
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        {isEditing ? (
          <>
            <Form.Control
              value={editQ.question}
              onChange={(e) => setEditQ({ ...editQ, question: e.target.value })}
              className="mb-2"
            />
            {editQ.options.map((opt, idx) => (
              <Form.Control
                key={idx}
                value={opt}
                onChange={(e) => handleOptionChange(e.target.value, idx)}
                className="mb-2"
              />
            ))}
            <Form.Control
              placeholder="Correct Answer"
              value={editQ.answer}
              onChange={(e) => setEditQ({ ...editQ, answer: e.target.value })}
              className="mb-2"
            />
            <Button size="sm" onClick={saveEdit}>
              Save
            </Button>{" "}
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <p>
              <strong>Q:</strong> {question.question}
            </p>
            <ul>
              {question.options.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
            <p>
              <strong>Answer:</strong> {question.answer}
            </p>
            <Button size="sm" onClick={() => setIsEditing(true)}>
              Edit
            </Button>{" "}
            <Button size="sm" variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default QuestionItem;
