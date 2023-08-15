import { Request, Response } from "express";
import { userServices } from "../services";


const create = async (req: Request, res: Response): Promise<Response> => {
    
    const response = await userServices.create(req.body);

    return res.status(201).json(response);
};

const readAll = async (req: Request, res: Response): Promise<Response> => {
    
    const response = await userServices.readAll();

    return res.status(200).json(response);
};


export default { create, readAll }