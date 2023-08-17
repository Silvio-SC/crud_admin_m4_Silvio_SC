import { Router } from "express";
import { coursesControllers } from "../controllers";
import middleware from "../middleware";


const courseRouter: Router = Router()

courseRouter.get("", coursesControllers.readAll)

courseRouter.use(middleware.verifyToken)
courseRouter.use(middleware.verifyUserPermission)

courseRouter.post("", coursesControllers.create)
courseRouter.get("/:id/users", coursesControllers.readCourseUsers)

courseRouter.post("/:courseId/users/:userId", 
    middleware.userOrCourseExists, 
    coursesControllers.registerUserOnCourse
)
courseRouter.delete("/:courseId/users/:userId",
    middleware.userOrCourseExists, 
    coursesControllers.DeleteUserFromCourse 
)

export default courseRouter