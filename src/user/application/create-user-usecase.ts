import {UserRepository} from '../domain/user-repository';
import { User } from '../domain/user';

class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userPayload: User): Promise<User> {
    const user = new User(
      null,
      userPayload.name,
      userPayload.email,
      userPayload.password
    );

    return this.userRepository.create(user);
  }
}

export default CreateUserUseCase;
