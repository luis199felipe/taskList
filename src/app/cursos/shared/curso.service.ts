import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso.interface';
import { Tarea } from './Tarea.interface';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  formData: Curso;
  cursoTasks: Tarea[];



  constructor(private http: HttpClient) {

  }

  getCurso(id: number): Curso {
    const res = this.http.get<Curso[]>('https://my-json-server.typicode.com/luis199felipe/taskList/curso');
    let curso: Curso;
    res.subscribe(data => {
      data.forEach(element => {
        if (element.idCurso === id) {
          curso = element;
          console.log("Guardo el curso " + curso);
        }
      });
    });
    return curso;
  }

  getData() {
    return this.http.get<Curso[]>('https://my-json-server.typicode.com/luis199felipe/taskList/curso');
  }

}
