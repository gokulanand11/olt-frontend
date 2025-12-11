import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Quiz() {
  const { assessmentId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Replace with GET /assessments/:id
    setQuestions([
      { id: "q1", text: "What hook manages state in React?", options: ["useEffect", "useState", "useRef"], correct: 1 },
      { id: "q2", text: "JSX stands for?", options: ["Java Syntax XML", "JavaScript XML", "JSON X"], correct: 1 }
    ]);
  }, [assessmentId]);

  const submit = () => {
    const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    const pass = Math.round((score / questions.length) * 100);
    setResult({ score: pass, passed: pass >= 70 });
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