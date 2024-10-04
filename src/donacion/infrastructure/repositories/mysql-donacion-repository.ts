import { query } from "../databases/mysql";
import { Donacion } from "../../domain/donacion";
import { DonacionRepository } from "../../domain/donacion-repository";

export class MySQLDonacionRepository implements DonacionRepository {

  async save(donacion: Donacion): Promise<Donacion> {
    // Primero, insertar en Usuarios
    const sql = `
      INSERT INTO Donaciones (uuid, id_pago, cantidad, moneda, estado_pago)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
      donacion.uuid, donacion.id_pago, donacion.cantidad, donacion.moneda, donacion.estado_pago
    ];
    const result: any = await query(sql, params);

    const donacionId = result.insertId;

    return new Donacion(
      donacionId,
      donacion.uuid,
      donacion.id_pago,
      donacion.cantidad,
      donacion.moneda,
      donacion.estado_pago
    );
  }

  async getAll(): Promise<Donacion[]> {
    const sql = `
      SELECT * FROM Donaciones
    `;
    const rows = await query(sql, []) as any[];

    return rows.map((row: any) => new Donacion(
      null,
      row.uuid,
      row.id_pago,
      row.cantidad,
      row.moneda,
      row.estado_pago
    ));
  }

}
