import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Curso } from '../shared/curso.interface';
import { Tarea } from '../shared/Tarea.interface';

import { CursoService } from '../shared/curso.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {




  modelTarea: any = {};
  modelEditTarea: any = {};

  /*
  idCurso: number;
  miCurso: Curso = {
    idCurso: 0,
    profesor: "---",
    nombre: "Materia",
    color: null,
    Parciales:
      [{
        calificacion: 0,
        nombre: null,
        fecha: null
      }],
    Tareas: [{
      idTarea: 0,
      calificacion: 0,
      nombre: null,
      descripcion: null,
      fecha: null
    }]
  };

  data.cursoTasks: Tarea[];/* = [
    {
      idTarea: 1,
      calificacion: 4,
      nombre: "Tarea Diapositiva",
      descripcion: "Tarea sobre",
      fecha: "02/04/2019"
    }
  ];*/


  // tslint:disable-next-line: variable-name
  constructor(private _route: ActivatedRoute, private data: CursoService) {
    let idCurso = parseInt(this._route.snapshot.paramMap.get('id'), 10);
    //console.log("Este es mi curso " + this.miCurso);
    //this.obtenerCurso();
  }
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form === null) {
      form.resetForm();
    }
    this.data.formData = {
      idCurso: null,
      profesor: '',
      nombre: '',
      color: null,
    };
    this.data.cursoTasks = [];
  }

  addTarea() {
    console.log("va a ingresar " + JSON.stringify(this.modelTarea));
    this.data.cursoTasks.push(this.modelTarea);
  }

  editTarea(indice) {
    this.modelEditTarea.idTarea = this.data.cursoTasks[indice].idTarea;
    this.modelEditTarea.nombre = this.data.cursoTasks[indice].nombre;
    this.modelEditTarea.calificacion = this.data.cursoTasks[indice].calificacion;
    this.modelEditTarea.descripcion = this.data.cursoTasks[indice].descripcion;

    this.modelEditTarea.fecha = this.data.cursoTasks[indice].fecha;
  }

  deleteTarea(id) {

  }

  updateTarea() {

  }



}
