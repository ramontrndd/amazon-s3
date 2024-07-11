
import express from 'express';
import { UserController } from '../controllers/User.Controller';

const router = express.Router();

router.get('/getUsers', UserController.getUsers);

export default router;

