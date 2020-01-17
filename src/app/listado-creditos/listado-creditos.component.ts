import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Credito } from './credito.interface';
import { CreditoService } from './credito.service';

import { NgbdSortableHeader, SortEvent } from './sortable.directive';


@Component({
  selector: 'app-listado-creditos',
  templateUrl: './listado-creditos.component.html',
  styleUrls: ['./listado-creditos.component.css'],
  providers: [CreditoService, DecimalPipe]
})
export class ListadoCreditosComponent {

  creditos$: Observable<Credito[]>;
  total$: Observable<number>;


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public creditoService: CreditoService) {
    this.creditos$ = creditoService.creditos$;
    this.total$ = creditoService.total$;
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

    this.creditoService.sortColumn = column;
    this.creditoService.sortDirection = direction;

  }

}
