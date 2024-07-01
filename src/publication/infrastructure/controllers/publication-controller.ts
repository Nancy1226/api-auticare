// publication-controller.ts
import { Request, Response, NextFunction } from 'express';
import CreatePublicationUseCase from '../../application/create-publication-usecase';
import GetPublicationListUseCase from '../../application/get-publicationlist-usecase';
import { GetPublicationByID } from '../../application/get-publicationById-usecase';
import UpdatePublicationUseCase from '../../application/update-publication-usecase';
import DeletePublicationUseCase from '../../application/delete-publication-usecase';
import { LocalFileStorage } from '../adapters/storages/local-file-storage';
import { S3FileStorage } from '../adapters/storages/s3-file-storage';

const localFileStorage = new LocalFileStorage();
const s3FileStorage = new S3FileStorage();


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

      // Guardar archivo localmente
      const localFilePath = await localFileStorage.uploadFile(file);

      // Subir imagen a S3
      const s3FilePath = await s3FileStorage.uploadFile(file);

      const publicationData = { ...publicationPayload, image: localFilePath, image_s3: s3FilePath };
      const publication = await this.createPublicationUseCase.execute(publicationData);

      res.status(201).json(publication);
    } catch (error) {
      next(error);
    } finally {
      if (req.file) {
        console.log("Publicacion creada con exito")
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
        await localFileStorage.deleteFile(existingPublication.image);
        await s3FileStorage.deleteFile(existingPublication.image_s3);

        // Guardar archivo localmente
        const localFilePath = await localFileStorage.uploadFile(file);

        // Subir imagen a S3
        const s3FilePath = await s3FileStorage.uploadFile(file);

        publicationPayload.image = localFilePath;
        publicationPayload.image_s3 = s3FilePath;
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
      await s3FileStorage.deleteFile(existingPublication.image_s3);

      // Eliminar imagen del almacenamiento local
      await localFileStorage.deleteFile(existingPublication.image);

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
