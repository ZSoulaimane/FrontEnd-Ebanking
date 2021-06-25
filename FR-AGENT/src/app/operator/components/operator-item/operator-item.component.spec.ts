import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorItemComponent } from './operator-item.component';

describe('OperatorItemComponent', () => {
  let component: OperatorItemComponent;
  let fixture: ComponentFixture<OperatorItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
