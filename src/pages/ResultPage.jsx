import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { Card, Container, Row, Col } from "react-bootstrap";

function ResultPage() {
  const { state } = useLocation();
  const [showConfetti, setShowConfetti] = useState(true);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    setTimeout(() => setFlip(true), 100); // trigger flip after mount
    setTimeout(() => setShowConfetti(false), 10000); // stop confetti after 3s
  }, []);
  const toggleFlip = () => {
    //setFlip(true); // Reset flip
    setTimeout(() => setFlip(false), 100); // Trigger re-flip
    setTimeout(() => setFlip(true), 700);
  };

  return (
    <Container className="mt-5 text-center">
      {showConfetti && <Confetti />}

      {/* Clickable Score Card */}
      <div className="d-flex justify-content-center mb-4">
        <div
          className={`score-card ${flip ? "flip" : ""}`}
          onClick={toggleFlip}
        >
          <div className="front">Your Score</div>
          <div className="back">{state?.score}</div>
        </div>
      </div>

      <h4 className="mb-3">Your Answers:</h4>
      <Row className="justify-content-center">
        {state?.answers?.map((a, i) => (
          <Col xs={12} md={6} lg={4} key={i} className="mb-3">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Question {i+1}</Card.Title>
                <Card.Text>
                  <strong>Selected:</strong> {a.selected}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Styles */}
      <style>{`
        .score-card {
          width: 200px;
          height: 200px;
          perspective: 1000px;
          position: relative;
          cursor: pointer;
        }
        .score-card .front, .score-card .back {
          width: 100%;
          height: 100%;
          border-radius: 10px;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          background-color: #007bff;
          color: white;
          position: absolute;
          transition: transform 0.8s;
        }
        .score-card .back {
          background-color: #28a745;
          transform: rotateY(180deg);
        }
        .score-card.flip .front {
          transform: rotateY(180deg);
        }
        .score-card.flip .back {
          transform: rotateY(360deg);
        }
      `}</style>
    </Container>
  );
}

export default ResultPage;
