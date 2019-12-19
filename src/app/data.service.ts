import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from './curso.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {

  }

  getData() {
    return this.http.get<Curso[]>('https://my-json-server.typicode.com/luis199felipe/taskList/curso');
  }

  getCurso(id) {
    let r = this.http.get<Curso>('https://my-json-server.typicode.com/luis199felipe/taskList/curso/1');
    console.log("response" + r);
    return r;

  }
}
