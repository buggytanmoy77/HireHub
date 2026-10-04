import { useNavigate } from "react-router-dom";
import ResumeDropzone from "../components/resumeDropzone";

export default function ResumeUpload() {
  const navigate = useNavigate();

  return (
    <div className="shell page-pad">
      <div className="page-head">
        <h1>Upload your resume</h1>
        <p className="lede">We'll analyze your skills and experience, then match you to roles — with reasons.</p>
      </div>
      <div className="panel narrow">
        <ResumeDropzone onUploaded={() => navigate("/jobs")} />
      </div>
    </div>
  );
}
