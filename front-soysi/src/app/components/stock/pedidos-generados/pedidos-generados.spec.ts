import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosGenerados } from './pedidos-generados';

describe('PedidosGenerados', () => {
  let component: PedidosGenerados;
  let fixture: ComponentFixture<PedidosGenerados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosGenerados],
    }).compileComponents();

    fixture = TestBed.createComponent(PedidosGenerados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
