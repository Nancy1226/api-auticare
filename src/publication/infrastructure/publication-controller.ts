// publication-controller.ts
import { Request, Response, NextFunction } from 'express';
import CreatePublicationUseCase from '../application/create-publication-usecase';
import GetPublicationListUseCase from '../application/get-publicationlist-usecase';
import { GetPublicationByID } from '../application/get-publicationById-usecase';
import UpdatePublicationUseCase from '../application/update-publication-usecase';
import DeletePublicationUseCase from '../application/delete-publication-usecase';
import { s3 } from './aws-config';
import fs from 'fs';
// import path from 'path';

class PublicationController {
  constructor(
    private getPublicationListUseCase: GetPublicationListUseCase,
    private createPublicationUseCase: CreatePublicationUseCase,
    private getPublicationByID: GetPublicationByID,
    private updatePublicationUseCase: UpdatePublicationUseCase,
    private deletePublicationUseCase: DeletePublicationUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void | any> {
    try {
      const publicationPayload = req.body;
      const file = req.file;
  
      if (!file) {
        return res.status(400).send('No file uploaded');
      }
  
      // La ruta del archivo ya está definida por Multer
      const localPath = file.path;
  
      // Subir imagen a S3
      const fileKey = `images/${Date.now()}-${file.originalname}`;
      const params = {
        Bucket: 'mymantenimientobucket',
        Key: fileKey,
        Body: fs.createReadStream(localPath),
        ContentType: file.mimetype
      };
  
      const uploadResult = await s3.upload(params).promise();
      console.log('S3 Upload Result:', uploadResult);
  
      const publicationData = { ...publicationPayload, image: localPath, image_s3: uploadResult.Location };
      const publication = await this.createPublicationUseCase.execute(publicationData);
  
      res.status(201).json(publication);
    } catch (error) {
      next(error);
    } finally {
      if (req.file) {
        console.log("Publicacion creada con exito")
        // fs.unlink(req.file.path, (err) => {
        //   if (err) console.error('Error deleting local file:', err);
        // });
      }
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const publications = await this.getPublicationListUseCase.execute();
      res.json(publications);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const publication = await this.getPublicationByID.run(req.params.id);
      res.json(publication);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void | any> {
    try {
      const publicationId = req.params.id;
      const publicationPayload = req.body;
      const file = req.file;

      // Obtener la publicación existente
      const existingPublication = await this.getPublicationByID.run(publicationId);
      if (!existingPublication) {
        return res.status(404).send('Publication not found');
      }

      // Eliminar imagen antigua si existe una nueva
      if (file) {
        // Eliminar imagen de S3
        const oldS3Key = existingPublication.image_s3.split('/').pop();
        if (oldS3Key) {
          await s3.deleteObject({ Bucket: 'mymantenimientobucket', Key: `images/${oldS3Key}` }).promise();
        }

        // Eliminar imagen del almacenamiento local
        if (existingPublication.image) {
          fs.unlinkSync(existingPublication.image);
        }

        // Subir nueva imagen a S3
        const localPath = file.path;
        const fileKey = `images/${Date.now()}-${file.originalname}`;
        const params = {
          Bucket: 'mymantenimientobucket',
          Key: fileKey,
          Body: fs.createReadStream(localPath),
          ContentType: file.mimetype
        };
  
        const uploadResult = await s3.upload(params).promise();
        console.log('S3 Upload Result:', uploadResult);

        publicationPayload.image = localPath;
        publicationPayload.image_s3 = uploadResult.Location;
      }

      const updatedPublication = await this.updatePublicationUseCase.execute(publicationId, publicationPayload);
      res.json(updatedPublication);
    } catch (error) {
      next(error);
    } finally {
      if (req.file) {
        console.log("Publicacion creada con exito");
      }
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void | any> {
    try {
      const publicationId = req.params.id;

      // Obtener la publicación existente
      const existingPublication = await this.getPublicationByID.run(publicationId);
      if (!existingPublication) {
        return res.status(404).send('Publication not found');
      }

      // Eliminar imagen de S3
      const oldS3Key = existingPublication.image_s3.split('/').pop();
      if (oldS3Key) {
        await s3.deleteObject({ Bucket: 'mymantenimientobucket', Key: `images/${oldS3Key}` }).promise();
      }

      // Eliminar imagen del almacenamiento local
      if (existingPublication.image) {
        fs.unlinkSync(existingPublication.image);
      }

      const result = await this.deletePublicationUseCase.execute(publicationId);
      res.status(result ? 200 : 404).json({ success: result });
    } catch (error) {
      next(error);
    } finally {
      if (req.file) {
        console.log("Publicacion creada con exito");
      }
    }
  }

}

export default PublicationController;
