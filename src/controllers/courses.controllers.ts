import { Request, Response } from "express";
import { coursesServices } from "../services";


const create = async (req: Request, res: Response): Promise<Response> => {
    
    const response = await coursesServices.create(req.body);

    return res.status(201).json(response);
};

const readAll = async (req: Request, res: Response): Promise<Response> => {
    
    const response = await coursesServices.readAll();

    return res.status(200).json(response);
};

const registerUserOnCourse = async (req: Request, res: Response): Promise<Response> => {
    
    await coursesServices.registerUserOnCourse(req);
    return res.status(201).json({ message: "User successfully vinculed to course" });
};

const DeleteUserFromCourse = async (req: Request, res: Response): Promise<Response> => {
    await coursesServices.DeleteUserFromCourse(req);
    return res.status(204).json();
};

const readCourseUsers = async (req: Request, res: Response): Promise<Response> => {
    const response = await coursesServices.readCourseUsers(req);
    return res.status(200).json(response);
};


export default { create, readAll, registerUserOnCourse, DeleteUserFromCourse, readCourseUsers }