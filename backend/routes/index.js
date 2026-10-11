import { Router } from "express";
import analyzerRoutes from "./analyzerRoutes.js";

const router = Router();
router.get("/health", (req, res) => res.json({ status: "ok" }));
router.use("/analyze", analyzerRoutes);

export default router;
