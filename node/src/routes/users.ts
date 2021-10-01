import express, { Request, Response } from "express";
import { sendError, sendSuccess } from "../lib/httpSenders";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    let users  = req.app.locals.users.getAll(Boolean(req.query.withDeleted));
    sendSuccess(users, res);
});

router.get('/user/:id', (req: Request, res: Response) => {
    try {
        sendSuccess(req.app.locals.users.getUser(req.params.id), res);
    } catch (e: any) {
        sendError(e, res);
    }
});

router.patch('/user/:id', (req: Request, res: Response) => {
    try {
        req.app.locals.users.editUser(req.params.id, req.body);
        sendSuccess(req.app.locals.users.getUser(req.params.id), res);
    } catch (e: any) {
        sendError(e, res)
    }
});

router.post('/user', (req: Request, res: Response) => {
    try {
        let id = req.app.locals.users.addUser(req.body);
        sendSuccess(req.app.locals.users.getUser(id), res);
    } catch (e: any) {
        sendError(e, res);
    }
});

router.delete('/user/:id', (req: Request, res: Response) => {
    try{
        req.app.locals.users.deleteUser(req.params.id);
        sendSuccess(req.app.locals.users.getUser(req.params.id), res);
    } catch (e: any) {
        sendError(e, res);
    }
});

export default router;
