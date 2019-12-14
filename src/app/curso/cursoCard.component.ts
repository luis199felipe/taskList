import { Component, OnInit, Input } from '@angular/core';
import { Curso } from "../curso.interface";

@Component({
  selector: 'app-cursoCard',
  templateUrl: './cursoCard.component.html',
  styleUrls: ['./cursoCard.component.css']
})
export class CursoCardComponent implements OnInit {

  @Input()
  curso:Curso;
  
  constructor() { 
    
  }

  ngOnInit() {
    console.log("Este es mi nombre "+this.curso)
  }

}
