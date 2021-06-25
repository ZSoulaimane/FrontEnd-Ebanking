import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationFormComponent } from './operation-form.component';

describe('OperationFormComponent', () => {
  let component: OperationFormComponent;
  let fixture: ComponentFixture<OperationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
