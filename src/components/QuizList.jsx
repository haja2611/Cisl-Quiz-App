import  { useState } from "react";
import QuizModal from "./QuizModal";
import { Button } from "react-bootstrap";

function QuizList({ quizzes, refresh }) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div>
      <ul className="list-group">
        {quizzes.map((quiz) => (
          <li
            key={quiz.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{quiz.title}</span>
            <Button variant="primary" onClick={() => setSelectedQuiz(quiz)}>
              View Details
            </Button>
          </li>
        ))}
      </ul>

      {selectedQuiz && (
        <QuizModal
          quiz={selectedQuiz}
          onClose={() => setSelectedQuiz(null)}
          refresh={refresh}
        />
      )}
    </div>
  );
}

export default QuizList;
