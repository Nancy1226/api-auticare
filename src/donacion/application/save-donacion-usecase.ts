import { DonacionRepository } from '../domain/donacion-repository';
import { Donacion } from '../domain/donacion';

class SaveDonacionUseCase {
  constructor(private tutorRepository: DonacionRepository) {}

  async execute(donacionPayload: Omit<Donacion, 'id'>): Promise<Donacion> {

    const donacion = new Donacion(
      null,
      donacionPayload.uuid, // Usamos el UUID generado
      donacionPayload.id_pago,
      donacionPayload.cantidad,
      donacionPayload.moneda,
      donacionPayload.estado_pago
    );

    return this.tutorRepository.save(donacion);
  }
}

export default SaveDonacionUseCase;
