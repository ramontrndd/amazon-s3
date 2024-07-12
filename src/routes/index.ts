import express from "express";
import { UserController } from "../controllers/User.Controller";
import { uploadController } from "../controllers/UploadController";

const router = express.Router();

router.get("/getUsers", UserController.getUsers);
router.post("/createUser", UserController.createUser);
router.post("/upload",uploadController.uploadMiddleware,uploadController.uploadImage);

export default router;
