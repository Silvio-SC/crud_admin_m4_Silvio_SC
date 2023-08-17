import format from 'pg-format';
import { Course, QueryResultCourse, QueryResultUserCourse, UserCourse } from '../interfaces';
import { client } from '../database';
import { courseSchema, courseSchemaCreate, userCourseSchema, userCourseSchemaCreate } from '../schema';
import { AppError } from '../errors';


const create = async (payload: any): Promise<Course> => {
    const verifyPayload = courseSchemaCreate.parse(payload)

    const queryFormat: string = format(
        'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
        Object.keys(verifyPayload),
        Object.values(verifyPayload)
    ) 

    const queryResult: QueryResultCourse = await client.query(queryFormat)

    const courseCreateResp: Course = courseSchema.parse(queryResult.rows[0])

    return courseCreateResp
}

const readAll = async (): Promise<Course[]> => {

    const queryResult: QueryResultCourse = await client.query(
        'SELECT * FROM "courses"'
    )

    return queryResult.rows
}

const registerUserOnCourse = async (req: any): Promise<UserCourse> => {
    const bodyReq = {
        active: true, 
        userId: Number(req.params.userId), 
        courseId: Number(req.params.courseId)
    }

    const queryFormat: string = format(
        'INSERT INTO "userCourses" (%I) VALUES (%L) RETURNING *;',
        Object.keys(bodyReq),
        Object.values(bodyReq)
    ) 

    const queryResult: QueryResultUserCourse = await client.query(queryFormat)

    return queryResult.rows[0]
}

const DeleteUserFromCourse = async (req: any): Promise<UserCourse> => {

    const queryResult: QueryResultUserCourse = await client.query(
        `
            UPDATE "userCourses" 
            SET ("active") = ROW ('false')
            WHERE "id" = $1
            RETURNING *;
        `,
        [req.params.userId])

console.log(queryResult.rows[0])

    return queryResult.rows[0]
}

const readCourseUsers = async (req: any) => {
    const queryFormat: string = format(`
        SELECT
            "uc"."userId",
            "u"."name" AS "userName",
            "uc"."courseId",
            "c"."name" AS "courseName",
            "c"."description" AS "courseDescription",
            "uc"."active" AS "userActiveInCourse"
        FROM "courses" AS "c"
        JOIN "userCourses" AS "uc"
            ON "uc"."courseId" = "c"."id"
        JOIN "users" AS "u"
            ON "u"."id" = "uc"."userId"
        WHERE "c"."id" = $1;
        `
    ) 

    const queryResult = await client.query(queryFormat, [req.params.id])

    return queryResult.rows
}



export default { create,  readAll, registerUserOnCourse, DeleteUserFromCourse, readCourseUsers}