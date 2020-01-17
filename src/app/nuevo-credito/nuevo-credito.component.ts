import { Component, OnInit, Renderer2, ViewChild, ElementRef, Directive, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


@Directive({ selector: 'div' })
export class div {
  @Input() id !: string;
}

@Component({
  selector: 'app-nuevo-credito',
  templateUrl: './nuevo-credito.component.html',
  styleUrls: ['./nuevo-credito.component.css']
})
export class NuevoCreditoComponent implements OnInit {
  myForm: FormGroup;
  myForm2: FormGroup;
  hoy: string;

  @ViewChild(div, { static: false }) acordionForm: ElementRef;

  constructor(public fb: FormBuilder) {

  }
  saveData() {

    console.log("Entro a saveData");

    console.log(this.myForm.value.valor);
    this.myForm2 = this.fb.group({
      valor: [this.myForm.value.valor, [Validators.required, Validators.minLength(5), Validators.maxLength(7)]],
      duracion: [this.myForm.value.duracion, [Validators.required]],
      selectCiclos: [this.myForm.value.selectCiclos, [Validators.required]],
      fechaPrimerAbono: [this.myForm.value.fechaPrimerAbono, [Validators.required, this.validateFechaAbono]],
    });
  }
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const dateLength = 10;
    this.hoy = new Date().toISOString().substr(0, 10);


    this.myForm = this.fb.group({
      valor: ['250000', [Validators.required, Validators.minLength(5), Validators.maxLength(7)]],
      duracion: ['1', [Validators.required]],
      selectCiclos: ['Mensual', [Validators.required]],
      fechaPrimerAbono: [this.hoy, [Validators.required, this.validateFechaAbono]],
    });
    this.myForm2 = this.fb.group({
      valor: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(7)]],
      duracion: ['', [Validators.required]],
      selectCiclos: ['Mensual', [Validators.required]],
      fechaPrimerAbono: [this.hoy, [Validators.required, this.validateFechaAbono]],
    });
  }

  validateFechaAbono(control: AbstractControl) {
    const fecha = control.value;
  }

}
