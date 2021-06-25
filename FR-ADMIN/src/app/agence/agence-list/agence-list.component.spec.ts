import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceListComponent } from './agence-list.component';

describe('AgenceListComponent', () => {
  let component: AgenceListComponent;
  let fixture: ComponentFixture<AgenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgenceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
