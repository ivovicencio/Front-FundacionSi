import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarStock } from './asignar-stock';

describe('AsignarStock', () => {
  let component: AsignarStock;
  let fixture: ComponentFixture<AsignarStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarStock],
    }).compileComponents();

    fixture = TestBed.createComponent(AsignarStock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
