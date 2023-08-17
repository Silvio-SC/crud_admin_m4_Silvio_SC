import { QueryResult } from 'pg';
import { NextFunction, Request, Response } from "express";
import { client } from '../database';
import { AppError } from '../errors';


export const userOrCourseExists = async (req: Request, res: Response, next: NextFunction) => {

    const queryResultUser: QueryResult = await client.query(
        'SELECT * FROM "users" WHERE "id" = $1',
        [req.params.userId]
    )
    const queryResultCourse: QueryResult = await client.query(
        'SELECT * FROM "courses" WHERE "id" = $1',
        [req.params.courseId]
    )

    if (queryResultUser.rowCount === 0) throw new AppError("User/course not found", 404)
    if (queryResultCourse.rowCount === 0) throw new AppError("User/course not found", 404)

    return next()
}