import { QueryResult } from "pg"
import { z } from "zod"
import { userSchema, userSchemaCreate, userSchemaCreateResp } from "../schema"

type User = z.infer<typeof userSchema>

type UserCreate = z.infer<typeof userSchemaCreate>
type ResponseUserCreate = z.infer<typeof userSchemaCreateResp>
type QueryResultUser = QueryResult<User>

export { User, UserCreate, ResponseUserCreate, QueryResultUser}