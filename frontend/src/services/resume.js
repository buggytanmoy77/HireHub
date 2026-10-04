import api from "./api";

// Must match the backend multer config in upload.middleware.js
export const MAX_RESUME_BYTES = 5 * 1024 * 1024;

export function validateResumeFile(file) {
  if (!file) return "Choose a PDF to upload";
  if (file.type !== "application/pdf") return "Only PDF files are supported";
  if (file.size > MAX_RESUME_BYTES) return "File is larger than 5 MB";
  return "";
}

export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("resume", file); // field name MUST match upload.single("resume")
  const res = await api.post("/resume", formData);
  return res.data;
}
