import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Pago } from './pago.interface';
import { PAGOS } from './pagos';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { SortDirection } from './sortable.directive';

/**
 * Interface que define la estructura de una busqueda.
 * @Pago[] Listado de pagos a buscar
 * @total cantidad de pagos que resultaron en la busqueda
 */
interface SearchResult {
  pagos: Pago[];
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
 * Metodo para comparar dos atributos de dos pagos
 * @param v1 atributo 1 del credito
 * @param v2 atributo 2 del credito
 */
function compare(v1, v2) {
  //console.log(v1 + " " + v2);
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

/**
 * Metodo encargardo de ordenar (asc-desc) por columna los registros de la tabla
 * @param pagos Array de pagos actual en la tabla
 * @param column Columna seleccionada para ordenar
 * @param direction Direccion escogida a ordenar (asc-desc)
 */
function sort(pagos: Pago[], column: string, direction: string): Pago[] {
  //console.log("Entro a sort de service "+column+" "+direction +" "+pagos)
  if (direction === '') {
    return pagos;
  } else {

    return [...pagos].sort((a, b) => {
      //console.log("Dentro de return" + mostrarPropiedades(a, "a"));
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

/**
 * Funcion encargada buscar un texto especifico en un credito
 * @param credito Pago individual a comprar el termino
 * @param term  texto a buscar
 * @param pipe metodo para transformar numeros en string
 */
function matches(credito: Pago, term: string, pipe: PipeTransform): Pago[] {
  // Se filtran los pagos por nombre, cedula,estado,celular,cupo y id
  //console.log("nombre "+credito.nombre);
  const term2 = term.toLocaleLowerCase();
  return credito.cliente.toLowerCase().includes(term2)
    || credito.almacen.toLowerCase().includes(term2)
    || credito.recogido.toLowerCase().includes(term2)
    || credito.informesFecha.includes(term)
    || pipe.transform(credito.valor).includes(term)
    || pipe.transform(credito.credito).includes(term);

}


@Injectable({ providedIn: 'root' })
export class PagoService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _pagos$ = new BehaviorSubject<Pago[]>([]);
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
      this._pagos$.next(result.pagos);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get pagos$() { return this._pagos$.asObservable(); }
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
    let pagos = sort(PAGOS, sortColumn, sortDirection);

    // 2. filter
    pagos = pagos.filter(credito => matches(credito, searchTerm, this.pipe));
    const total = pagos.length;

    // 3. paginate
    pagos = pagos.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ pagos, total });
  }
}
