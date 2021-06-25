import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorFormComponent } from './operator-form.component';

describe('OperatorFormComponent', () => {
  let component: OperatorFormComponent;
  let fixture: ComponentFixture<OperatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
