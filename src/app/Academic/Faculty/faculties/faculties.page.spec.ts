import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultiesPage } from './faculties.page';

describe('FacultiesPage', () => {
  let component: FacultiesPage;
  let fixture: ComponentFixture<FacultiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
