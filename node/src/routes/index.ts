import express from "express";
import usersRouter from "./users"
import suggestRouter from "./suggest"

const router = express.Router();

router.use('/users', usersRouter);
router.use('/suggest', suggestRouter);

export default router;
