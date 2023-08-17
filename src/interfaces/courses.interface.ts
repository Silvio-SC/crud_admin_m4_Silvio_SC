import { z } from "zod";
import { courseSchema, courseSchemaCreate } from "../schema";
import { QueryResult } from "pg";


type Course = z.infer<typeof courseSchema>

type CourseCreate = z.infer<typeof courseSchemaCreate>
type QueryResultCourse = QueryResult<Course>

export { Course, CourseCreate, QueryResultCourse }