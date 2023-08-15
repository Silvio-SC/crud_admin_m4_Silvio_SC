import { z } from "zod"

const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50).nonempty(),
    email: z.string().email().max(50).nonempty(),
    password: z.string().max(120).nonempty(),
    admin: z.boolean().default(false),
});

const userSchemaCreate = userSchema.omit({id: true})
const userSchemaCreateResp = userSchema.omit({password: true})
const userSchemaLogin = userSchema.pick({email:true, password:true})

export { userSchema, userSchemaCreate, userSchemaCreateResp, userSchemaLogin }