import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Submissions() {
  const { assignmentId } = useParams();
  const [fileUrl, setFileUrl] = useState("");
  const [note, setNote] = useState("");
  const [result, setResult] = useState(null);

  const submit = async () => {
    // Replace with POST /submissions
    setResult({ grade: "Pending review", feedback: "Submitted successfully." });
  };

  return (
    <div className="card form-card">
      <h2>Submit assignment</h2>
      <p className="muted">Assignment ID: {assignmentId}</p>
      <label>File URL
        <input value={fileUrl} onChange={e => setFileUrl(e.target.value)} placeholder="Upload and paste URL" />
      </label>
      <label>Notes
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Optional message" />
      </label>
      <button className="btn primary" onClick={submit}>Submit</button>
      {result && (
        <div className="alert success">
          <div>Grade: {result.grade}</div>
          <div>Feedback: {result.feedback}</div>
        </div>
      )}
    </div>
  );
}