import aws from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import { v4 as uuidv4 } from 'uuid';
import { Image, saveImage } from '../models/ImageModel';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export const uploadService = {
  async uploadImage(file: Express.Multer.File): Promise<Image> {
    const params: S3.Types.PutObjectRequest = {
      Bucket: process.env.S3_BUCKET || '',
      Key: `${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    const data: ManagedUpload.SendData = await s3.upload(params).promise();

    const image: Image = {
      name: file.originalname,
      url: data.Location
    };

    return new Promise((resolve, reject) => {
      saveImage(image, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(image);
      });
    });
  }
};
