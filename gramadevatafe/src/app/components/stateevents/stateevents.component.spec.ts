import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateeventsComponent } from './stateevents.component';

describe('StateeventsComponent', () => {
  let component: StateeventsComponent;
  let fixture: ComponentFixture<StateeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateeventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StateeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
