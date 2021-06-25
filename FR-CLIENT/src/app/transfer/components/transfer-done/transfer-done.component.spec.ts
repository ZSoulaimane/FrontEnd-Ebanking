import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDoneComponent } from './transfer-done.component';

describe('TransferDoneComponent', () => {
  let component: TransferDoneComponent;
  let fixture: ComponentFixture<TransferDoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferDoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
