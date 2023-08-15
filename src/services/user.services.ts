import format from 'pg-format';
import { QueryResultUser, ResponseUserCreate, User } from '../interfaces';
import { client } from '../database';
import { userSchemaCreateResp } from '../schema';


const create = async (payload: any): Promise<ResponseUserCreate> => {
    const queryFormat: string = format(
        'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    ) 

    const queryResult: QueryResultUser = await client.query(queryFormat)

    const UserCreateResponse: ResponseUserCreate = userSchemaCreateResp.parse(queryResult.rows[0])

    return UserCreateResponse
}

const readAll = async (): Promise<User[]> => {

    const queryResult: QueryResultUser = await client.query(
        'SELECT * FROM "users"'
    )

    return queryResult.rows
}



export default { create,  readAll}