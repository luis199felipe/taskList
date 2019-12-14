import { Component, OnInit } from '@angular/core';
import { Curso } from "../curso.interface";
import { DataService } from "../data.service";

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  cursos:Curso[];

  constructor(private data:DataService) {

    this.data.getData().subscribe(data=>{
      console.log(data);
    })
  }

  ngOnInit() {
  }

}
