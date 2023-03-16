import express from "express";
import usersRouter from "./users";
import nlpRouter from "./nlp";

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/users", usersRouter);
router.use("/api/nlp", nlpRouter);

export default router;
