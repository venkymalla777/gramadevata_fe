import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiaeventsComponent } from './indiaevents.component';

describe('IndiaeventsComponent', () => {
  let component: IndiaeventsComponent;
  let fixture: ComponentFixture<IndiaeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndiaeventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndiaeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
