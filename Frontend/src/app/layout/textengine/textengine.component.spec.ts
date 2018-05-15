import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextengineComponent } from './textengine.component';

describe('TextengineComponent', () => {
  let component: TextengineComponent;
  let fixture: ComponentFixture<TextengineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextengineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextengineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
