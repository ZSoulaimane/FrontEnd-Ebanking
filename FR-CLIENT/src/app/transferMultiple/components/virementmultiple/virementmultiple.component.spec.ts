import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirementmultipleComponent } from './virementmultiple.component';

describe('VirementmultipleComponent', () => {
  let component: VirementmultipleComponent;
  let fixture: ComponentFixture<VirementmultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirementmultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirementmultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
