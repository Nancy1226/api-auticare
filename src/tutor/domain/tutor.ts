export class Tutor {
  id: number | null;
  uuid: string;  
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  sexo: string;
  correo: string;
  contrasena: string;
  telefono: string;
  fecha_nacimiento: string;
  tipo_usuario: string;
  cargo: string; /* Si es tipo TUTOR */

  constructor(id: number | null, uuid: string, nombre: string, apellido_paterno: string, apellido_materno: string, sexo: string, correo: string,
     contrasena: string, telefono: string, fecha_nacimiento: string, tipo_usuario: string, cargo: string) {
    this.id = id;
    this.uuid = uuid;  // Generar un nuevo UUID si no se pasa
    this.nombre = nombre;
    this.apellido_paterno = apellido_paterno;
    this.apellido_materno = apellido_materno;
    this.sexo = sexo;
    this.correo = correo;
    this.contrasena = contrasena;
    this.telefono = telefono;
    this.fecha_nacimiento = fecha_nacimiento;
    this.tipo_usuario = tipo_usuario;
    this.cargo = cargo;
  }
}
