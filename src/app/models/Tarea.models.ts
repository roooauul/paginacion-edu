export class Tarea
{

  public constructor(init?: Partial<Tarea>) {
    Object.assign(this, init);
  }

  esPeriodica!: boolean;
  nombreTarea!: string;
  descripcionTarea!: string;
  fotoTarea!: string;
  fechainicioTarea!: Date;
  fechaterminoTarea!: Date;
  horainicioTarea!: Date;
  horaterminoTarea!: Date;
  calificacionTarea!: number;
  tipoUsuarioTarea!: number;
  comentario!: string;
  estadoTarea!: EstadoTarea;
  id!: number;
}

export enum EstadoTarea {
  Creada = 0,
  Asignada = 1,
  EnProceso = 2,
  Terminada = 3,
  Calificada = 4
}

export const EstadoTareaDescripcion = {
  [EstadoTarea.Creada]: "Creada",
  [EstadoTarea.Asignada]: "Asignada",
  [EstadoTarea.EnProceso]: "En Proceso",
  [EstadoTarea.Terminada]: "Terminada",
  [EstadoTarea.Calificada]: "Calificada",
}
