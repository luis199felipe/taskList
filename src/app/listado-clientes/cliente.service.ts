import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Cliente } from './cliente.interface';
import { CLIENTES } from './clientes';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { SortDirection } from './sortable.directive';

/**
 * Interface que define la estructura de una busqueda.
 * @Cliente[] Listado de clientes a buscar
 * @total cantidad de clientes que resultaron en la busqueda
 */
interface SearchResult {
  clientes: Cliente[];
  total: number;
}

/**
 * Interface que define el estado de una tabla
 * @att page posicion actual de la pagina.
 * @att pageSize cantidad de paginas de la tabla
 * @att seachTerm Vinculo que se tiene con el html para buscar un termino
 * @att sortColumn Columna con la cual ha sido ordenada la tabla.
 * @att sortDirection Direccion (asc - desc) la cual ha sido ordenada la tabla.
 */

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

/**
 * Metodo para comparar dos atributos de dos clientes
 * @param v1 atributo 1 del cliente
 * @param v2 atributo 2 del cliente
 */
function compare(v1, v2) {
  //console.log(v1 + " " + v2);
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

/**
 * Metodo encargardo de ordenar (asc-desc) por columna los registros de la tabla
 * @param clientes Array de clientes actual en la tabla
 * @param column Columna seleccionada para ordenar
 * @param direction Direccion escogida a ordenar (asc-desc)
 */
function sort(clientes: Cliente[], column: string, direction: string): Cliente[] {
  //console.log("Entro a sort de service "+column+" "+direction +" "+clientes)
  if (direction === '') {
    return clientes;
  } else {

    return [...clientes].sort((a, b) => {
      //console.log("Dentro de return" + mostrarPropiedades(a, "a"));
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

/**
 * Funcion encargada buscar un texto especifico en un cliente
 * @param cliente Cliente individual a comprar el termino
 * @param term  texto a buscar
 * @param pipe metodo para transformar numeros en string
 */
function matches(cliente: Cliente, term: string, pipe: PipeTransform): Cliente[] {
  // Se filtran los clientes por nombre, cedula,estado,celular,cupo y id
  //console.log("nombre "+cliente.nombre);
  return cliente.nombre.toLowerCase().includes(term)
    || cliente.estado.toLowerCase().includes(term)
    || cliente.celular.includes(term)
    || cliente.cedula.includes(term)
    || pipe.transform(cliente.id).includes(term)
    || pipe.transform(cliente.cupo).includes(term);

}


@Injectable({ providedIn: 'root' })
export class ClienteService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _clientes$ = new BehaviorSubject<Cliente[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._clientes$.next(result.clientes);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get clientes$() { return this._clientes$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let clientes = sort(CLIENTES, sortColumn, sortDirection);

    // 2. filter
    clientes = clientes.filter(cliente => matches(cliente, searchTerm, this.pipe));
    const total = clientes.length;

    // 3. paginate
    clientes = clientes.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ clientes, total });
  }
}
