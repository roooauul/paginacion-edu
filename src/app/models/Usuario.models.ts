import { Calificacion } from "./Calificacion.models";

export class Usuario {
 
  public constructor(init?: Partial<Usuario>)
  {
    Object.assign(this, init);
  }

  id!: string;
  nombre!: string;
  rut!: string;
  telefono!: string;
  correo!: string;
  fecha!: Date;
  clave!: string;
  foto!: string;
  tipoCuentaBan!: string;
  bancoCuentaBan!: string;
  calificacion!: string;
  numeroCuentaBan!: string;
  tipoUsuario!: number;
  TipoUsuario!: TipoUsuario;
  Usuario!: Usuario;
  calificacionDeUsuarioLogueado!: Calificacion;
  calificaciones!: Calificacion[];
}

export enum TipoUsuario {
  Administrador = 0,
  CoAdministrador = 1,
  Pensionista = 2
}

export interface Opcion {
  valor: string;
  texto: string;
}
