import "dotenv/config";
import { userSchemaLogin } from '../schema';
import { client } from '../database';
import { AppError } from '../errors';
import { sign } from 'jsonwebtoken';
import { QueryResultUser } from '../interfaces';
import { compare } from "bcryptjs";

const login = async (payload: any) => {
    const loginBody = userSchemaLogin.parse(payload)

    const emailExists: QueryResultUser = await client.query(
        'SELECT * FROM "users" WHERE "email" = $1',
        [loginBody.email]
    )

    const user = emailExists.rows[0]
    
    if (emailExists.rowCount === 0) {
        throw new AppError("Wrong email/password", 401)
    }

    const testPassword: boolean = await compare(loginBody.password, user.password)  
    console.log()
    if (!testPassword) {
        throw new AppError("Wrong email/password", 401)
    }

    const token: string = sign(
        {admin: user.admin, email: user.email}, 
        process.env.SECRET_KEY!, 
        {subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN!}
    )

    return { token }
}


export default { login }
