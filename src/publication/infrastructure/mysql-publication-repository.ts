// infrastructure/mysql-publication-repository.ts
import { query } from './mysql';
import { Publication } from "../domain/publication";
import { PublicationRepository } from "../domain/publication-repository";

export class MySQLPublicationRepository implements PublicationRepository {
  
  async getAll(): Promise<Publication[]> {
    const sql = 'SELECT * FROM publications';
    const rows = await query(sql, []) as any[]; // Ajuste de tipo aquí
    
    return rows.map((row: any) => new Publication(
      row.id,
      row.title,
      row.description,
      row.price,
      row.image,
      row.image_s3
    ));
  }

  async getById(id: string): Promise<Publication | null> {
    const sql = 'SELECT * FROM publications WHERE id = ?';
    const params = [id];
    const [rows]: any[] = await query(sql, params);
    
    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    return new Publication(
      row.id,
      row.title,
      row.description,
      row.price,
      row.image,
      row.image_s3
    );
  }

  async create(publication: Publication): Promise<Publication> {
    const sql = 'INSERT INTO publications (title, description, price, image, image_s3) VALUES (?, ?, ?, ?, ?)';
    const params = [publication.title, publication.description, publication.price, publication.image, publication.image_s3];
    const result: any = await query(sql, params);

    return new Publication(result.insertId, publication.title, publication.description, publication.price, publication.image, publication.image_s3);
  }

  async update(id: string, publication: Partial<Publication>): Promise<Publication | null> {
    const sql = `UPDATE publications SET 
                 title = COALESCE(?, title), 
                 description = COALESCE(?, description), 
                 price = COALESCE(?, price), 
                 image = COALESCE(?, image), 
                 image_s3 = COALESCE(?, image_s3) 
                 WHERE id = ?`;
    const params = [
      publication.title,
      publication.description,
      publication.price,
      publication.image,
      publication.image_s3,
      id
    ];
    const result: any = await query(sql, params);

    if (result.affectedRows === 0) {
      return null;
    }

    return await this.getById(id); // Obtener la publicación actualizada para devolverla
  }

  async delete(id: string): Promise<boolean> {
    const sql = "DELETE FROM publications WHERE id = ?";
    const params = [id];
    const result: any = await query(sql, params);

    return result.affectedRows > 0;
  }
}
