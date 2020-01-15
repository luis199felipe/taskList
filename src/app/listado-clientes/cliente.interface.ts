/*
Interface que define la estructura de un objeto Cliente.
*/
export interface Cliente {
  id: number;
  nombre: string;
  cedula: string;
  cupo: number;
  celular: string;
  estado: string;
}
