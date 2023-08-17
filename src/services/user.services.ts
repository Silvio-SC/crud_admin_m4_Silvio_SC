import format from 'pg-format';
import { QueryResultUser, ResponseUserCreate, User } from '../interfaces';
import { client } from '../database';
import { userSchemaCreate, userSchemaCreateResp } from '../schema';
import { AppError } from '../errors';
import { hash } from 'bcryptjs';
import { QueryResult } from 'pg';


const create = async (payload: any): Promise<ResponseUserCreate> => {
    payload.password = await hash(payload.password, 10)
    
    const queryFormat: string = format(
        'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
        ) 
        
        const queryResult: QueryResultUser = await client.query(queryFormat)
        const verifyResult = userSchemaCreateResp.parse(queryResult.rows[0])
        
        return verifyResult
    }
    
    const readAll = async (): Promise<ResponseUserCreate[]> => {

    const queryResult: QueryResult<ResponseUserCreate> = await client.query(
        'SELECT ("id", "name", "email", "admin") FROM "users"'
    )

    return queryResult.rows
}

const readUserCourses = async (req: any) => {
    const queryFormat: string = format(`
        SELECT
            "uc"."courseId",
            "u"."name" AS "userName",
            "c"."name" AS "courseName",
            "c"."description" AS "courseDescription",
            "uc"."active" AS "userActiveInCourse",
            "uc"."userId",
            "u"."name" AS "userName"
        FROM "users" AS "u"
        JOIN "userCourses" AS "uc"
            ON "uc"."userId" = "u"."id"
        JOIN "courses" AS "c"
            ON "c"."id" = "uc"."courseId"
        WHERE "u"."id" = $1;
    
        `
    ) 

    const queryResult = await client.query(queryFormat, [req.params.id])

    if (!queryResult.rowCount) throw new AppError("No course found", 404)

    return queryResult.rows
}

export default { create,  readAll, readUserCourses}