import aws from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import { v4 as uuidv4 } from 'uuid';
import { Image, saveImage } from '../models/ImageModel';

// Configuração do cliente S3 com as credenciais e região do AWS
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Chave de acesso AWS
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Chave secreta AWS
  region: process.env.AWS_REGION // Região do bucket S3
});

export const uploadService = {
  /**
   * Faz o upload de uma imagem para o Amazon S3 e salva suas informações no banco de dados.
   * @param {Express.Multer.File} file - O arquivo de imagem a ser carregado.
   * @returns {Promise<Image>} - Uma promessa que resolve para um objeto Image contendo o nome e a URL da imagem.
   */
  async uploadImage(file: Express.Multer.File): Promise<Image> {
    // Configura os parâmetros do objeto de upload S3
    const params: S3.Types.PutObjectRequest = {
      Bucket: process.env.S3_BUCKET || '', 
      Key: `${uuidv4()}-${file.originalname}`, 
      Body: file.buffer, 
      ContentType: file.mimetype, 
      ACL: 'public-read' 
    };

    // Realiza o upload para o S3 e espera a conclusão
    const data: ManagedUpload.SendData = await s3.upload(params).promise();

    // Cria um objeto Image com o nome e a URL do arquivo
    const image: Image = {
      name: file.originalname,
      url: data.Location // URL do arquivo no S3
    };

    // Retorna uma promessa que salva a imagem no banco de dados e resolve para o objeto Image
    return new Promise((resolve, reject) => {
      saveImage(image, (err, result) => {
        if (err) {
          return reject(err); // Rejeita a promessa em caso de erro
        }
        resolve(image); // Resolve a promessa com o objeto Image
      });
    });
  }
};
