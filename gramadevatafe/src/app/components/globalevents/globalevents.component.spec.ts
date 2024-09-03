import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobaleventsComponent } from './globalevents.component';

describe('GlobaleventsComponent', () => {
  let component: GlobaleventsComponent;
  let fixture: ComponentFixture<GlobaleventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobaleventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobaleventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
