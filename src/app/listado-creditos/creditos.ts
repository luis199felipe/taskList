import { Credito } from './credito.interface';

export const CREDITOS: Credito[] = [
  {
    cliente: 'Andres Giraldo',
    valorCredito: 2500000,
    valorCuota: 185300,
    fechaAprovacion: '2020/02/01',
    codigoOTP: '195',
    estado: 'En curso'
  },
  {
    cliente: 'Julian Perez',
    valorCredito: 350000,
    valorCuota: 62000,
    fechaAprovacion: '2020/01/01',
    codigoOTP: '3541',
    estado: 'Terminado'
  },
  {
    cliente: 'Juan Padilla',
    valorCredito: 3960000,
    valorCuota: 270300,
    fechaAprovacion: '2020/02/01',
    codigoOTP: '1532',
    estado: 'En curso'
  },
  {
    cliente: 'Jhon Ariza',
    valorCredito: 1000000,
    valorCuota: 120000,
    fechaAprovacion: '2020/02/05',
    codigoOTP: '165',
    estado: 'invalidado'
  },
  {
    cliente: 'Oscar Lozano',
    valorCredito: 9500000,
    valorCuota: 850000,
    fechaAprovacion: '2020/02/09',
    codigoOTP: '612',
    estado: 'En verificación'
  },
  {
    cliente: 'Daniela Sanchez',
    valorCredito: 2560000,
    valorCuota: 120000,
    fechaAprovacion: '2020/01/25',
    codigoOTP: '798',
    estado: 'Aceptado'
  },
  {
    cliente: 'Alexandra Rios',
    valorCredito: 450000,
    valorCuota: 60200,
    fechaAprovacion: '2020/02/28',
    codigoOTP: '620',
    estado: 'Terminado'
  }

];
