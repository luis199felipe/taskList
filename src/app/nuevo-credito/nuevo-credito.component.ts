import { Component, OnInit, Renderer2, ViewChild, ElementRef, Directive, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from "@angular/router"
declare var $: any;


@Component({
  selector: 'app-nuevo-credito',
  templateUrl: './nuevo-credito.component.html',
  styleUrls: ['./nuevo-credito.component.css']
})
export class NuevoCreditoComponent implements OnInit {
  myForm: FormGroup;
  myForm2: FormGroup;

  hoy: string;
  valorMinimo: number = 0;
  valorMaximo: number = 0;
  duracionMaxima: number = 0;
  diasMaximos: number = 0;

  FormCompleto: boolean = false;

  ciclos = [
    { id: 0, valor: 'Mensual' },
    { id: 1, valor: 'Quincenal' }
  ];

  constructor(public fb: FormBuilder, private router: Router) {
    this.valorMinimo = 30000; //30.000
    this.valorMaximo = 5500000; //5'500.000
    this.duracionMaxima = 36;
    this.diasMaximos = 30;


  }
  /**
   * Este metodo esta encargado de realizar la consulta al backed para guardar.
   */
  saveData() {
    if (this.FormCompleto === true) {
      //Aquí se puede guardar
      alert("Se guardo el credito");
      //Se redirecciona a la tabla de creditos
      this.router.navigate(['/creditos']);
    } else {
      $('#modalError').modal('show');
    }

  }


  continue() {
    console.log("Entro a sav eDat a" + JSON.stringify(this.myForm.value));

    if (!this.myForm.valid) {

      $('#modalError').modal('show');
      //alert("Por favor corrija los errores para poder continuar.");
      return;
    }

    this.myForm2 = this.fb.group({
      valorRO: [this.myForm.value.valor, []],
      duracionRO: [this.myForm.value.duracion, []],
      selectCiclosRO: [this.ciclos[this.myForm.value.selectCiclos].valor, []],
      fechaPrimerAbonoRO: [this.myForm.value.fechaPrimerAbono, []],
    });
    $('#collapseTwo').collapse('show');
    $("#btnForm").prop('disabled', true);
    $("#btnForm2").prop('disabled', false);
    this.FormCompleto = true;
  }

  habilitarForm() {
    $("#btnForm").prop('disabled', false);
    $('#collapseOne').collapse('show');
    this.myForm2 = this.fb.group({
      valorRO: ['', []],
      duracionRO: ['', []],
      selectCiclosRO: ['', []],
      fechaPrimerAbonoRO: ['', []],
    });
    this.FormCompleto = false;
  }

  ngOnInit() {
    $("#btnForm2").prop('disabled', true);
    this.buildForm();
  }

  buildForm() {
    const dateLength = 10;
    this.hoy = new Date().toISOString().substr(0, 10);


    this.myForm = this.fb.group({
      valor: ['250000', [Validators.required, this.validateValor]],
      duracion: ['1', [Validators.required, this.validateDuracion]],
      selectCiclos: [0, [Validators.required]],
      fechaPrimerAbono: [this.hoy, [Validators.required, this.validateFechaAbono]],
    });
    this.myForm2 = this.fb.group({
      valorRO: ['', []],
      duracionRO: ['', []],
      selectCiclosRO: ['', []],
      fechaPrimerAbonoRO: ['', []],
    });

  }

  validateValor(control: AbstractControl): { [key: string]: any } | null {

    const val = parseInt(control.value);
    if (val < 20000 || val > 2550000) {
      return { invalidRange: true };
    } else {
      return null;
    }
  }

  validateDuracion(control: AbstractControl): { [key: string]: any } | null {
    const val = parseInt(control.value);
    //console.log(this.duracionMaxima);
    if (val < 1 || val >= 36) {//this.duracionMaxima
      return { invalidRange: true };
    } else {
      return null;
    }

  }

  validateFechaAbono(control: AbstractControl) {
    const fecha = new Date(control.value);
    console.log("Entro va a " + fecha);
    let fechaMax = new Date();

    fechaMax.setDate(new Date().getDate() + 30);//this.diasMaximos
    if (fecha > fechaMax) {
      return { invalidRange: true };
    } else {
      return null;
    }


  }

}
