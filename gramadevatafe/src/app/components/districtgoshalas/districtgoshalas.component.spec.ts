import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictgoshalasComponent } from './districtgoshalas.component';

describe('DistrictgoshalasComponent', () => {
  let component: DistrictgoshalasComponent;
  let fixture: ComponentFixture<DistrictgoshalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictgoshalasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistrictgoshalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
