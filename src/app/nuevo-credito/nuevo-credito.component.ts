import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-nuevo-credito',
  templateUrl: './nuevo-credito.component.html',
  styleUrls: ['./nuevo-credito.component.css']
})
export class NuevoCreditoComponent implements OnInit {
  myForm: FormGroup;
  hoy: string;

  constructor(public fb: FormBuilder) {

  }
  saveData() {
    console.log(this.myForm.value);
  }
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const dateLength = 10;
    this.hoy = new Date().toISOString().substr(0, 10);


    this.myForm = this.fb.group({
      valor: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(7)]],
      duracion: ['', [Validators.required]],
      selectDuracion: ['', [Validators.required]],
      selectCiclos: ['', [Validators.required]],
      fechaPrimerAbono: [this.hoy, [Validators.required, this.validateFechaAbono]],
    });

  }

  validateFechaAbono(control: AbstractControl) {
    const fecha = control.value;

    console.log("Fecha " + fecha);
  }

}
