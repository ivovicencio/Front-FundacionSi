import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaForm } from './asistencia-form';

describe('AsistenciaForm', () => {
  let component: AsistenciaForm;
  let fixture: ComponentFixture<AsistenciaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AsistenciaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
