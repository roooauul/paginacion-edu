import { Usuario } from "./Usuario.models";

export class Calificacion
{
  public constructor(init?: Partial<Calificacion>)
  {
    Object.assign(this, init);
  }
  Nota!: number;
  Comentario!: String;
  Periodo!: number;
  UsuarioCalificadoId!: number;
  UsuarioCalificado!: Usuario;
  UsuarioCalificadorId!: number;
  UsuarioCalificador!: Usuario;
}
