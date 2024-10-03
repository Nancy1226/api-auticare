import { EspecialistaRepository } from "../domain/especialista-repository";

export class GetEspecialistaByID {
  constructor(private readonly especialistaRepository: EspecialistaRepository) {}

  async run(especialistaId: string) {
    const especialista = await this.especialistaRepository.getEspecialistaById(especialistaId);

    if (!especialista) {
      throw new Error(`Id: ${especialistaId} de especialista no encontrada`); 
    }
    // En el caso de que exista imprimira este
    console.log(especialista);
    
    return this.especialistaRepository.getEspecialistaById(especialistaId);
  }
}
