// infrastructure/mongo-publication-repository.ts
import { PublicationRepository } from '../../../domain/ports/publication-repository';
import { Publication } from '../../../domain/publication';
import { PublicationModel } from '../../publication-schema';

export class MongoPublicationRepository implements PublicationRepository {
  async getAll(): Promise<Publication[]> {
    const publications = await PublicationModel.find();
    return publications.map(pub => new Publication(pub.id, pub.title, pub.description, pub.price, pub.image, pub.image_s3));
  }

  async getById(id: string): Promise<Publication | null> {
    const publication = await PublicationModel.findById(id);
    return publication ? new Publication(publication.id, publication.title, publication.description, publication.price, publication.image, publication.image_s3) : null;
  }

  async create(publication: Publication): Promise<Publication> {
    const newPublication = new PublicationModel(publication);
    const savedPublication = await newPublication.save();
    return new Publication(savedPublication.id, savedPublication.title, savedPublication.description, savedPublication.price, savedPublication.image, savedPublication.image_s3);
  }

  async update(id: string, publication: Partial<Publication>): Promise<Publication | null> {
    const updatedPublication = await PublicationModel.findByIdAndUpdate(id, publication, { new: true });
    return updatedPublication ? new Publication(updatedPublication.id, updatedPublication.title, updatedPublication.description, updatedPublication.price, updatedPublication.image, updatedPublication.image_s3) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await PublicationModel.findByIdAndDelete(id);
    return result !== null;
  }
}
