import { Request, Response } from "express";
import { HttpError, ValidationError } from "./errors";

export function sendError(e: Error, res: Response) {
    let errors;
    let status = 400;

    if (e instanceof HttpError) {
        errors = [e.message];
        status = e.statusCode;
    } else if (e instanceof ValidationError) {
        errors = JSON.parse(e.message);
    } else {
        errors = [e.message];
    }

    res.status(status).json({result: false, errors: errors});
}

export function sendSuccess(data: any, res: Response) {
    res.json({result: data, errors: false});
}
