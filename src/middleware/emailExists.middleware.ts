import { QueryResult } from 'pg';
import { NextFunction, Request, Response } from "express";
import { client } from '../database';
import { AppError } from '../errors';


export const emailExists = async (req: Request, res: Response, next: NextFunction) => {
    const queryResult: QueryResult = await client.query(
        'SELECT "email" FROM "users"'
    )

    const foundedEmail = queryResult.rows.filter(user => user.email === req.body.email)
    
    if (foundedEmail.length !== 0) throw new AppError("Email already registered", 409)

    return next()
}