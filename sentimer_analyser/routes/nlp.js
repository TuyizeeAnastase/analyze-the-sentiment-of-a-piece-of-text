import express from "express";
import nlpcontroller from "../controllers/npl.controllers";

const router = express.Router();

router.post("/s-analyzer", nlpcontroller.postReview);

export default router;
