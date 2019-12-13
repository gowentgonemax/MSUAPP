import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterclassPage } from './registerclass.page';

describe('RegisterclassPage', () => {
  let component: RegisterclassPage;
  let fixture: ComponentFixture<RegisterclassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterclassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterclassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
