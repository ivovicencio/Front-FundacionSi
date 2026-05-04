import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { MenuEditor } from './menu-editor';

describe('MenuEditor', () => {
  let component: MenuEditor;
  let fixture: ComponentFixture<MenuEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuEditor],
      providers: [{ provide: Router, useValue: { navigate: () => Promise.resolve(true) } }],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
