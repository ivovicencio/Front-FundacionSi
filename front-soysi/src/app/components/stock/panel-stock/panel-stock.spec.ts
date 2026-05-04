import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelStock } from './panel-stock';

describe('PanelStock', () => {
  let component: PanelStock;
  let fixture: ComponentFixture<PanelStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelStock],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelStock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
