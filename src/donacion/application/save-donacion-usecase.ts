import { Donacion } from "../domain/donacion";
import { DonacionRepository } from "../domain/donacion-repository";

class SaveDonacionUseCase {
  constructor(private tutorRepository: DonacionRepository) {}

  async execute(
    donacionPayload: Omit<Donacion, "id" | "uuid">
  ): Promise<Donacion> {
    const donacion = new Donacion(
      null, // Usamos el UUID generado
      donacionPayload.id_pago,
      donacionPayload.cantidad,
      donacionPayload.moneda,
      donacionPayload.estado_pago
    );

    return this.tutorRepository.save(donacion);
  }
}

export default SaveDonacionUseCase;
