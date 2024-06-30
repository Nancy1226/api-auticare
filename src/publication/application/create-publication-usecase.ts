import { PublicationRepository } from '../domain/publication-repository';
import { Publication } from '../domain/publication';

class CreatePublicationUseCase {
  constructor(private publicationRepository: PublicationRepository) {}

  async execute(userPayload: Omit<Publication, 'id' >): Promise<Publication> {
    const publication = new Publication(
      null, // En MongoDB, el ID se genera automáticamente
      userPayload.title,
      userPayload.description,
      userPayload.price,
      userPayload.image,
      userPayload.image_s3
    );

    return this.publicationRepository.create(publication);
  }
}

export default CreatePublicationUseCase;
