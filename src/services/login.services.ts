import format from 'pg-format';
import { userSchemaLogin } from '../schema';

const login = (payload: any) => {
    const loginBody = userSchemaLogin.parse(payload)


}


export default { login }
