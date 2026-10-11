import { compareResumeToJobDescription, extractTextFromPdf } from "../service/resumeService.js";

export async function analyzeResume(req, res, next) {
  try {
    const { jobDescription } = req.body;
    if (!req.file) return res.status(400).json({ message: "Please upload a PDF resume." });
    if (!jobDescription?.trim()) {
      return res.status(400).json({ message: "Please provide a job description." });
    }
    const resumeText = await extractTextFromPdf(req.file.buffer);
    return res.json(compareResumeToJobDescription(resumeText, jobDescription));
  } catch (error) {
    return next(error);
  }
}
