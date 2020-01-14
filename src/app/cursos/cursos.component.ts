import { Component, OnInit } from '@angular/core';
import { Curso } from './shared/curso.interface';
import { CursoService } from './shared/curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  cursos: Curso[];
  filasArray: number[];
  matrix: Curso[][] = [];

  constructor(private data: CursoService) {
    // tslint:disable-next-line: no-shadowed-variable
    this.data.getData().subscribe(data => {

      this.cursos = data;
      this.tablaDinamica();
    });
  }

  tablaDinamica() {

    const cantCursos: number = this.cursos.length;

    const filas: number = Math.ceil(cantCursos / 3);
    // filas = cantCursos % 3 == 0 ? filas : filas + 1; //Otra forma de hacer Math.ceil()
    this.filasArray = Array(filas).fill(0).map((_, index) => index);


    let contCurso = 0;

    for (let i = 0; i < filas; i++) {
      this.matrix[i] = new Array(3);
      for (let x = 0; x < 3; x++) {
        if (contCurso < cantCursos) {
          this.matrix[i][x] = this.cursos[contCurso];
          contCurso++;
        }
      }
    }
    console.log('Matrix ', this.matrix);

  }

  ngOnInit() {



  }

}
