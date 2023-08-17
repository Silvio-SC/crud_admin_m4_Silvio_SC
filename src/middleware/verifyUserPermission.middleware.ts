import { QueryResult } from 'pg';
import { NextFunction, Request, Response } from "express";
import { client } from '../database';
import { AppError } from '../errors';


export const verifyUserPermission = async (req: Request, res: Response, next: NextFunction) => {
    
    const { userId } = req.params
    const { admin, sub } = res.locals.decoded

    if (admin) return next()

    if (userId !== sub) {
        throw new AppError("Insufficient permission", 403)
    }

    return next()
}