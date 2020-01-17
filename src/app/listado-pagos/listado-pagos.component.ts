import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Pago } from './pago.interface';
import { PagoService } from './pago.service';

import { NgbdSortableHeader, SortEvent } from './sortable.directive';


@Component({
  selector: 'app-listado-pagos',
  templateUrl: './listado-pagos.component.html',
  styleUrls: ['./listado-pagos.component.css'],
  providers: [PagoService, DecimalPipe]
})
export class ListadoPagosComponent {

  pagos$: Observable<Pago[]>;
  total$: Observable<number>;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public pagoService: PagoService) {
    this.pagos$ = pagoService.pagos$;
    this.total$ = pagoService.total$;
  }

  /**
   * Metodo encargado de ordenar por columna
   * @param column Columna seleccionada a ordenar
   * @param direction sentido para ordenar (asc-desc)
   */
  onSort({ column, direction }: SortEvent) {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.pagoService.sortColumn = column;
    this.pagoService.sortDirection = direction;

  }

}
