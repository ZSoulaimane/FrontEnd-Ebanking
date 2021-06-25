import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorOperationListComponent } from './operator-operation-list.component';

describe('OperatorOperationListComponent', () => {
  let component: OperatorOperationListComponent;
  let fixture: ComponentFixture<OperatorOperationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorOperationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorOperationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
