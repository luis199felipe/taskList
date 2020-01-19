import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPerfilClienteComponent } from './form-perfil-cliente.component';

describe('FormPerfilClienteComponent', () => {
  let component: FormPerfilClienteComponent;
  let fixture: ComponentFixture<FormPerfilClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPerfilClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPerfilClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
