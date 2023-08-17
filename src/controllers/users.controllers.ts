import { Request, Response } from "express";
import { userServices } from "../services";
import { userSchemaCreate } from "../schema";


const create = async (req: Request, res: Response): Promise<Response> => {
    const verifyReq = userSchemaCreate.parse(req.body)
    const response = await userServices.create(verifyReq);

    return res.status(201).json(response);
};

const readAll = async (req: Request, res: Response): Promise<Response> => {
    
    const response = await userServices.readAll();

    return res.status(200).json(response);
};

const readUserCourses = async (req: Request, res: Response): Promise<Response> => {
    
    const response = await userServices.readUserCourses(req);

    return res.status(200).json(response);
};




export default { create, readAll, readUserCourses }