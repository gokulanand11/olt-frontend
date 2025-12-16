import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";

export default function Quiz() {
  const { assessmentId } = useParams();
  const courseId = assessmentId; // Using courseId as assessmentId for simplicity
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const data = await api.get(`/assessments/course/${courseId}`);
        setQuestions(data.questions.map((q, i) => ({
          id: i,
          text: q.text,
          options: q.options,
          correct: q.correctIndex
        })));
      } catch (error) {
        console.error("Failed to fetch assessment:", error);
      }
    };
    fetchAssessment();
  }, [assessmentId]);

  const submit = async () => {
    try {
      const answerArray = questions.map(q => answers[q.id] || 0);
      // First get the assessment ID from course
      const assessmentData = await api.get(`/assessments/course/${courseId}`);
      const data = await api.post(`/assessments/${assessmentData._id}/submit`, { answers: answerArray });
      setResult({ score: data.score, passed: data.passed });
    } catch (error) {
      console.error("Failed to submit assessment:", error);
      alert("Failed to submit quiz: " + error.message);
    }
  };

  return (
    <div className="card">
      <h2>Assessment</h2>
      <p className="muted">ID: {assessmentId}</p>
      <ol>
        {questions.map((q, qi) => (
          <li key={q.id} className="question">
            <div>{q.text}</div>
            <ul className="options">
              {q.options.map((opt, oi) => (
                <li key={oi}>
                  <label>
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === oi}
                      onChange={() => setAnswers({ ...answers, [q.id]: oi })}
                    />
                    {opt}
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <button className="btn primary" onClick={submit}>Submit</button>
      {result && (
        <div className={`alert ${result.passed ? "success" : "error"}`}>
          Score: {result.score}% — {result.passed ? "Passed" : "Try again"}
        </div>
      )}
    </div>
  );
}