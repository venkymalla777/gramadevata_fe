import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistricteventsComponent } from './districtevents.component';

describe('DistricteventsComponent', () => {
  let component: DistricteventsComponent;
  let fixture: ComponentFixture<DistricteventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistricteventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistricteventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
