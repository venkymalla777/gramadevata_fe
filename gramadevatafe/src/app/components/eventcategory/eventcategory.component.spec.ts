import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventcategoryComponent } from './eventcategory.component';

describe('EventcategoryComponent', () => {
  let component: EventcategoryComponent;
  let fixture: ComponentFixture<EventcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventcategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
