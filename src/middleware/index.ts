import { userOrCourseExists } from './userOrCourseExists.middleware';
import { verifyUserPermission } from './verifyUserPermission.middleware';
import { verifyToken } from './verifyToken.middleware';
import { handleErrors } from './hendleErrors.middleware';
import { emailExists } from "./emailExists.middleware"

export default { emailExists, handleErrors, verifyToken, verifyUserPermission, userOrCourseExists } 