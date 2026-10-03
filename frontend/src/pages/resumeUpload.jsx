import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | uploading | error
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;

    setStatus("uploading");
    setError("");

    const formData = new FormData();
    formData.append("resume", file); // field name MUST match upload.single("resume")

    try {
      await api.post("/resume", formData);
      navigate("/jobs");
    } catch (err) {
      setStatus("error");
      setError(err.response?.data?.message || "Upload failed");
    }
  }

  return (
    <div>
      <h2>Upload Your Resume</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" disabled={!file || status === "uploading"}>
          {status === "uploading" ? "Uploading..." : "Upload"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}