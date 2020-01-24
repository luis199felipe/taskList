import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../listado-clientes/cliente.service';
import { Cliente } from '../listado-clientes/cliente.interface';
import { CLIENTES } from '../listado-clientes/clientes';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private clientes: Cliente[];
  private optionsClientes: Cliente[];

  constructor(private router: Router) {

    this.clientes = CLIENTES;

    console.log(this.clientes);
  }

  buscar(term: string) {
    this.optionsClientes = this.clientes.filter(cliente => this.match(cliente, term));

    if (this.optionsClientes.length > 0) {
      $('#buttonCrearCliente').prop("hidden", true);
      let cedula = this.optionsClientes[0].cedula;

      if (cedula === term) {
        //AQUI DEBE PONER LA DIRECCION A LA CUAL QUIERA REDIRIGIR EL CLIENTE ["cliente",this.optionsClientes[0].id]
        this.router.navigate(["curso", term]);
      }
    } else {
      $('#buttonCrearCliente').removeAttr('hidden');
      console.log("El cliente no existe desea crear uno?");
    }
  }



  match(cliente: Cliente, term: string) {
    return cliente.cedula.includes(term);
  }
  ngOnInit() {
  }

}
