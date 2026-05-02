import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteoMensual } from './conteo-mensual';

describe('ConteoMensual', () => {
  let component: ConteoMensual;
  let fixture: ComponentFixture<ConteoMensual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteoMensual],
    }).compileComponents();

    fixture = TestBed.createComponent(ConteoMensual);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
