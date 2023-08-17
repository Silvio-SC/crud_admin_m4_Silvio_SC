import { z } from "zod";


const courseSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(15).nonempty(),
    description: z.string()
})

const courseSchemaCreate = courseSchema.omit({id: true})

export { courseSchema, courseSchemaCreate }