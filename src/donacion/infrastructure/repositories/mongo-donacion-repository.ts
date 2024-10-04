import { Donacion } from "../../domain/donacion";
import { DonacionRepository } from "../../domain/donacion-repository";
import { DonacionModel } from "../schemas/donacion-schema"; // Esquema de Mongoose

export class MongoDonacionRepository implements DonacionRepository {
  async save(donacion: Donacion): Promise<Donacion> {
    const newDonacion = new DonacionModel({
      uuid: donacion.uuid,
      id_pago: donacion.id_pago,
      cantidad: donacion.cantidad,
      moneda: donacion.moneda,
      estado_pago: donacion.estado_pago
    });

    const savedDonacion = await newDonacion.save();
    return new Donacion(
      savedDonacion.id,
      savedDonacion.uuid,
      savedDonacion.id_pago,
      savedDonacion.cantidad,
      savedDonacion.moneda,
      savedDonacion.estado_pago
    );
  }

  async getAll(): Promise<Donacion[]> {
    const donaciones = await DonacionModel.find();
    
    return donaciones.map(donacion => new Donacion(
      donacion.id,
      donacion.uuid,
      donacion.id_pago,
      donacion.cantidad,
      donacion.moneda,
      donacion.estado_pago
    ));
  }

}
