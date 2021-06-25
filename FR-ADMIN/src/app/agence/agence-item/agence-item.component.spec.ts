import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceItemComponent } from './agence-item.component';

describe('AgenceItemComponent', () => {
  let component: AgenceItemComponent;
  let fixture: ComponentFixture<AgenceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgenceItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
