import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Submissions() {
  const { assignmentId } = useParams();
  const [fileUrl, setFileUrl] = useState("");
  const [note, setNote] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async () => {
    if (!fileUrl.trim()) {
      setError("File URL is required");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/assignments/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          assignmentId,
          fileUrl: fileUrl.trim(),
          note: note.trim()
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setResult({ grade: "Pending review", feedback: "Submitted successfully." });
      setFileUrl("");
      setNote("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
      <button className="btn primary" onClick={submit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {error && (
        <div className="alert error">
          {error}
        </div>
      )}
      {result && (
        <div className="alert success">
          <div>Grade: {result.grade}</div>
          <div>Feedback: {result.feedback}</div>
        </div>
      )}
    </div>
  );
}