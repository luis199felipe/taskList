import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Cliente } from "./cliente.interface";
import { ClienteService } from "./cliente.service";

import { NgbdSortableHeader, SortEvent } from './sortable.directive';


@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css'],
  providers: [ClienteService, DecimalPipe]
})
export class ListadoClientesComponent {

  clientes$: Observable<Cliente[]>;
  total$: Observable<number>;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public clienteService: ClienteService) {
    this.clientes$ = clienteService.clientes$;
    this.total$ = clienteService.total$;
  }

  /**
   * Metodo encargado de ordenar por columna
   * @param column Columna seleccionada a ordenar
   * @param direction sentido para ordenar (asc-desc)
   */
  onSort({ column, direction }: SortEvent) {
    console.log("Entro a onSort");
    // resetting other headers
    this.headers.forEach(header => {
      //console.log(column+" Header sortable "+ header.sortable);
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    console.log(column + " " + direction);
    this.clienteService.sortColumn = column;
    this.clienteService.sortDirection = direction;

  }

}
