import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { CreateUser } from '../models/User';

export class UserController {
    static async getUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
    static async createUser(req: Request, res: Response) {
        try{
            const user: CreateUser = req.body;
            await UserService.createUser(user);
            res.status(201).json({message: "User created successfully"});
        }
        catch(err: any){
            res.status(500).json({message: err.message});
        }
    }
}

