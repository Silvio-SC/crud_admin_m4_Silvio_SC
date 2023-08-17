import { z } from "zod";

const userCourseSchema = z.object({
    id: z.number().positive(),
    active: z.boolean(),
    userId: z.number().positive(),
    courseId: z.number().positive()
})

const userCourseSchemaCreate = userCourseSchema.omit({id: true})

export { userCourseSchema, userCourseSchemaCreate }