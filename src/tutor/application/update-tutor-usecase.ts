import { TutorRepository } from '../domain/tutor-repository';
import { Tutor } from '../domain/tutor';

class UpdateTutorUseCase {
  constructor(private tutorRepository: TutorRepository) {}

  async execute(tutorId: string, tutorPayload: Partial<Tutor>): Promise<Tutor> {
    const result = await this.tutorRepository.updateTutor(tutorId, tutorPayload);

    if (!result) {
      throw new Error(`Id: ${tutorId} de tutor no encontrada`);
    }

    return result;
  }
}

export default UpdateTutorUseCase;
