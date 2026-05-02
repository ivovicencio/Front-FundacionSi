import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteoOcasa } from './conteo-ocasa';

describe('ConteoOcasa', () => {
  let component: ConteoOcasa;
  let fixture: ComponentFixture<ConteoOcasa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteoOcasa],
    }).compileComponents();

    fixture = TestBed.createComponent(ConteoOcasa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
