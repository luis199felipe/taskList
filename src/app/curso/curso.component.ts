import { Component, OnInit } from '@angular/core';
import { Curso } from "../curso.interface";

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  curso:Curso;

  constructor() { 
    
  }

  ngOnInit() {
  }

}
