import { Parcial } from './Parcial.interface';
import { Tarea } from './Tarea.interface';

export interface Curso {

  profesor: string;
  nombreCurso: string;
  Parciales: Parcial[];
  Tareas: Tarea[];
}
