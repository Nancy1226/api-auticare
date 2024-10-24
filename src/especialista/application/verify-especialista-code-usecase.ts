export class VerifyEspecialistaCodeUseCase {
  constructor() {}

  async execute(providedCode: string, actualCode: string): Promise<boolean> {
    // Comparar el código proporcionado por el cliente con el código real enviado por el servidor
    if (providedCode !== actualCode) {
      return false;
    }

    // Código válido
    return true;
  }
}
