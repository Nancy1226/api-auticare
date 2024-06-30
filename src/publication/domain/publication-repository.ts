// domain/publication-repository.ts
import { Publication } from './publication';

export interface PublicationRepository {
  getAll(): Promise<Publication[]>;
  getById(id: string): Promise<Publication | null>;
  create(publication: Publication): Promise<Publication>;
  update(id: string, publication: Partial<Publication>): Promise<Publication | null>;
  delete(id: string): Promise<boolean>;
}
