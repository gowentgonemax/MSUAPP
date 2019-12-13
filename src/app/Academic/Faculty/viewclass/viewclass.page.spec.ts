import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewclassPage } from './viewclass.page';

describe('ViewclassPage', () => {
  let component: ViewclassPage;
  let fixture: ComponentFixture<ViewclassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewclassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewclassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
