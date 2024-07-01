import { PublicationRepository } from '../domain/ports/publication-repository';
import { Publication } from '../domain/publication';

class UpdatePublicationUseCase {
  constructor(private publicationRepository: PublicationRepository) {}

  async execute(publicationId: string, publicationPayload: Partial<Publication>): Promise<Publication> {
    const result = await this.publicationRepository.update(publicationId, publicationPayload);

    if (!result) {
      throw new Error(`Id: ${publicationId} de publicacion no encontrada`);
    }

    return result;
  }
}

export default UpdatePublicationUseCase;
