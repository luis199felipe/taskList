import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MateriasComponent } from './materias/materias.component';
import { CursoCardComponent } from './cursoCard/cursoCard.component';

import { DataService } from './data.service';
import { CursoComponent } from './curso/curso.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'materias', component: MateriasComponent },
  { path: 'curso/:idCurso', component: CursoComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AboutComponent,
    HomeComponent,
    MateriasComponent,
    CursoCardComponent,
    CursoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],

  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
