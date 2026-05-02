import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteoSemanal } from './conteo-semanal';

describe('ConteoSemanal', () => {
  let component: ConteoSemanal;
  let fixture: ComponentFixture<ConteoSemanal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteoSemanal],
    }).compileComponents();

    fixture = TestBed.createComponent(ConteoSemanal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
