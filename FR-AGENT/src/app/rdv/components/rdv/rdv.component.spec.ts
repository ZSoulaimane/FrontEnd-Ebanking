import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvComponent } from './rdv.component';

describe('RdvComponent', () => {
  let component: RdvComponent;
  let fixture: ComponentFixture<RdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
