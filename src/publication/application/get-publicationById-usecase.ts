import { PublicationRepository } from "../domain/ports/publication-repository";

export class GetPublicationByID {
  constructor(private readonly publicationRepository: PublicationRepository) {}

  async run(publicationId: string) {
    const publication = await this.publicationRepository.getById(publicationId);

    if (!publication) {
      throw new Error(`Id: ${publicationId} de publicacion no encontrada`); //Lanza el error
    }
    console.log(publication);
    
    return publication;
  }
  
}
