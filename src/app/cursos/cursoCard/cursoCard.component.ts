import { Component, OnInit, Input } from '@angular/core';
import { Curso } from '../shared/curso.interface';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-cursoCard',
  templateUrl: './cursoCard.component.html',
  styleUrls: ['./cursoCard.component.css']
})
export class CursoCardComponent implements OnInit {

  @Input()
  cursoCard: Curso;

  constructor() {

  }

  ngOnInit() {
    console.log('Este es mi nombre ' + this.cursoCard);
  }

}
