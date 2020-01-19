import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cliente } from '../listado-clientes/cliente.interface';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  form: FormGroup;

  perfilActual: Cliente = {
    id: 27,
    nombre: "Luis Felipe Tejada",
    cedula: "1094978522",
    cupo: 850000,
    celular: "3103859510",
    estado: "Habilitado"
  }

  constructor(public fb: FormBuilder) {


  }

  ngOnInit() {

    this.form = this.fb.group({

    });
  }

}
