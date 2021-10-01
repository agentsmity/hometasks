import express, { Request, Response } from "express";
import { sendError, sendSuccess } from "../lib/httpSenders";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {

    try {
        sendSuccess(req.app.locals.users.matchUser(req.query.part, req.query.limit), res);
    } catch (e: any) {
        sendError(e, res);
    }
});

export default router;
