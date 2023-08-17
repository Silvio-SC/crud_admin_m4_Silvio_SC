import { Router } from "express";
import { userControllers } from "../controllers";
import middleware from "../middleware";


const userRouter: Router = Router()

userRouter.post("", middleware.emailExists, userControllers.create)

userRouter.use(middleware.verifyToken)
userRouter.use(middleware.verifyUserPermission)

userRouter.get("", userControllers.readAll)
userRouter.get("/:id/courses", userControllers.readUserCourses )

export default userRouter