import { CanvasFactory } from "pdf-parse/worker";
import { PDFParse } from "pdf-parse";
import { SKILL_CATALOG } from "../utils.js";

export async function extractTextFromPdf(buffer) {
  const parser = new PDFParse({ data: buffer, CanvasFactory });
  try {
    return (await parser.getText()).text;
  } finally {
    await parser.destroy();
  }
}

export function compareResumeToJobDescription(resumeText, jobDescription) {
  const requestedSkills = SKILL_CATALOG.filter((skill) => hasSkill(jobDescription, skill.terms));
  const presentSkills = requestedSkills
    .filter((skill) => hasSkill(resumeText, skill.terms))
    .map((skill) => skill.name);
  const missingSkills = requestedSkills
    .filter((skill) => !presentSkills.includes(skill.name))
    .map((skill) => skill.name);
  const score = requestedSkills.length ? Math.round((presentSkills.length / requestedSkills.length) * 100) : 0;
  return { score, presentSkills, missingSkills };
}

function hasSkill(text, terms) {
  return terms.some((term) => {
    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(^|[^a-z0-9+#])${escapedTerm}(?=$|[^a-z0-9+#])`, "i");
    return pattern.test(text);
  });
}
