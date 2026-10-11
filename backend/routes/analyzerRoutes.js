import { Router } from "express";
import multer from "multer";
import { analyzeResume } from "../controller/analyzerController.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, callback) => callback(null, file.mimetype === "application/pdf"),
});

router.post("/", upload.single("resume"), analyzeResume);
export default router;
