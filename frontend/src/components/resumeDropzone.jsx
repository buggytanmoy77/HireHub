import { useRef, useState } from "react";
import { uploadResume, validateResumeFile } from "../services/resume";
import Icon from "./icons";

export default function ResumeDropzone({ onUploaded }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | uploading | error
  const [error, setError] = useState("");

  function pick(selected) {
    const problem = validateResumeFile(selected);
    setFile(problem ? null : selected);
    setError(problem);
    setStatus(problem ? "error" : "idle");
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    pick(e.dataTransfer.files[0]);
  }

  async function handleUpload() {
    if (!file) return;
    setStatus("uploading");
    setError("");
    try {
      await uploadResume(file);
      onUploaded?.();
    } catch (err) {
      setStatus("error");
      setError(err.response?.data?.message || "Upload failed — please try again");
    }
  }

  const uploading = status === "uploading";

  return (
    <div className="dropzone-wrap">
      <div
        className={`dropzone${dragging ? " is-dragging" : ""}${file ? " has-file" : ""}`}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          hidden
          onChange={(e) => pick(e.target.files[0])}
        />
        <span className="dropzone-icon"><Icon name={file ? "file" : "upload"} size={24} /></span>
        {file ? (
          <>
            <strong className="dropzone-title">{file.name}</strong>
            <span className="dropzone-hint">{(file.size / 1024 / 1024).toFixed(2)} MB · click to change</span>
          </>
        ) : (
          <>
            <strong className="dropzone-title">Drop your resume here, or <u>browse</u></strong>
            <span className="dropzone-hint">PDF only · up to 5 MB</span>
          </>
        )}
      </div>

      {error && <p className="error-text" role="alert">{error}</p>}

      <button
        type="button"
        className="btn btn-primary btn-block"
        disabled={!file || uploading}
        onClick={handleUpload}
      >
        {uploading ? "Analyzing your resume…" : "Get my recommendations"}
      </button>
    </div>
  );
}
