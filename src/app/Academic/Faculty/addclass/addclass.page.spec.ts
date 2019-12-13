import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclassPage } from './addclass.page';

describe('AddclassPage', () => {
  let component: AddclassPage;
  let fixture: ComponentFixture<AddclassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddclassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddclassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
