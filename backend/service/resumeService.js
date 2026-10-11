import { PDFParse } from "pdf-parse";
import { SKILL_CATALOG } from "../utils.js";

export async function extractTextFromPdf(buffer) {
  const parser = new PDFParse({ data: buffer });
  try {
    return (await parser.getText()).text;
  } finally {
    await parser.destroy();
  }
}

export function compareResumeToJobDescription(resumeText, jobDescription) {
  const resume = resumeText.toLowerCase();
  const job = jobDescription.toLowerCase();
  const requestedSkills = SKILL_CATALOG.filter((skill) => skill.terms.some((term) => job.includes(term)));
  const presentSkills = requestedSkills
    .filter((skill) => skill.terms.some((term) => resume.includes(term)))
    .map((skill) => skill.name);
  const missingSkills = requestedSkills
    .filter((skill) => !presentSkills.includes(skill.name))
    .map((skill) => skill.name);
  const score = requestedSkills.length ? Math.round((presentSkills.length / requestedSkills.length) * 100) : 0;
  return { score, presentSkills, missingSkills };
}
