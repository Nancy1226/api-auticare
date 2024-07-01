import { PublicationRepository } from '../domain/ports/publication-repository';

class DeletePublicationUseCase {
  constructor(private publicationRepository: PublicationRepository) {}

  async execute(publicationId: string): Promise<boolean> {
    const result = await this.publicationRepository.delete(publicationId);

    if (!result) {
      throw new Error(`No se pudo eliminar la publicacion con id: ${publicationId}`);
    }

    console.log(`Publicacion con id: ${publicationId} ha sido eliminado`);
    return result; // Devuelve un booleano
  }
}

export default DeletePublicationUseCase;
