import { z } from "zod";
import { userCourseSchema, userCourseSchemaCreate } from "../schema";
import { QueryResult } from "pg";


type UserCourse = z.infer<typeof userCourseSchema>

type UserCourseCreate = z.infer<typeof userCourseSchemaCreate>
type QueryResultUserCourse = QueryResult<UserCourse>

export { UserCourse, UserCourseCreate, QueryResultUserCourse }