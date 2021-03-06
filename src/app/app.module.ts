import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursoCardComponent } from './cursos/cursoCard/cursoCard.component';

import { CursoService } from './cursos/shared/curso.service';
import { CursoComponent } from './cursos/curso/curso.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';

import { NgbdSortableHeader, SortEvent } from './listado-clientes/sortable.directive';
import { NuevoCreditoComponent } from './nuevo-credito/nuevo-credito.component';
import { ListadoCreditosComponent } from './listado-creditos/listado-creditos.component';
import { ListadoPagosComponent } from './listado-pagos/listado-pagos.component';
import { PerfilClienteComponent } from "./perfil-cliente/perfil-cliente.component";
import { FormPerfilClienteComponent } from './perfil-cliente/form-perfil-cliente/form-perfil-cliente.component';


const routes: Routes = [
  { path: '', redirectTo: 'cursos', pathMatch: 'full' },
  { path: 'creditos', component: ListadoCreditosComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cursos', component: CursosComponent },
  {
    path: 'curso', children: [
      { path: '', component: CursoComponent },
      { path: ':id', component: CursoComponent },
      { path: 'edit/:id', component: CursoComponent },
    ]
  },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AboutComponent,
    HomeComponent,
    CursosComponent,
    CursoCardComponent,
    CursoComponent,
    ListadoClientesComponent,
    NgbdSortableHeader,
    NuevoCreditoComponent,
    ListadoCreditosComponent,
    ListadoPagosComponent,
    PerfilClienteComponent,
    FormPerfilClienteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  exports: [NgbdSortableHeader, ListadoClientesComponent],
  providers: [CursoService],
  entryComponents: [ListadoClientesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
