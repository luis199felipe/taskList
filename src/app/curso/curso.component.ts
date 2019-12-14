import { Component, OnInit, Input } from '@angular/core';
import { Curso } from "../curso.interface";

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  @Input()
  nombre:string;
  @Input()
  profesor:string;

  constructor() { 
    
  }

  ngOnInit() {
    console.log("Este es mi nombre "+this.profesor)
  }

}
