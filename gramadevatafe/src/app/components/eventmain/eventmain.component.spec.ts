import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventmainComponent } from './eventmain.component';

describe('EventmainComponent', () => {
  let component: EventmainComponent;
  let fixture: ComponentFixture<EventmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventmainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
