import { LoginUseCase } from "../application/login-usecase";
import { LogoutUseCase } from "../application/logout-usecase";
import { AuthController } from "../infrastructure/controllers/auth-controller";
import { JWTTokenService } from "../infrastructure/jwt-token-service";
import { MySQLAuthRepository } from "../infrastructure/repositories/mysql-auth-repository";

const secretKey = process.env.JWT_SECRET || "supersecretkey";

const authRepository = new MySQLAuthRepository(); // O MongoAuthRepository según sea necesario
const tokenService = new JWTTokenService(secretKey);

const loginUseCase = new LoginUseCase(authRepository, tokenService);
const logoutUseCase = new LogoutUseCase();

const authController = new AuthController(loginUseCase, logoutUseCase);

export { authController };
