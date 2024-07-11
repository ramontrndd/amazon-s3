import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    static async getUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}

