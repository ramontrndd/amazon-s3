import { Request, Response } from "express";
import multer from "multer";
import { uploadService } from "../services/UploadService";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limite de 5MB
  },
});

export const uploadController = {
  uploadMiddleware: upload.single('imagem'),

  async uploadImage(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).send("Nenhuma imagem selecionada.");
    }

    try {
      const result = await uploadService.uploadImage(req.file);
      res
        .status(200)
        .send({ message: "Upload realizado com sucesso.", image: result });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao realizar upload da imagem.");
    }
  },
};
