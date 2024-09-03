import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetbyeventComponent } from './getbyevent.component';

describe('GetbyeventComponent', () => {
  let component: GetbyeventComponent;
  let fixture: ComponentFixture<GetbyeventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetbyeventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetbyeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
