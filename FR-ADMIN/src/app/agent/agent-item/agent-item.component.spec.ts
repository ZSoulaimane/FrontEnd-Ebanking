import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentItemComponent } from './agent-item.component';

describe('AgentItemComponent', () => {
  let component: AgentItemComponent;
  let fixture: ComponentFixture<AgentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
