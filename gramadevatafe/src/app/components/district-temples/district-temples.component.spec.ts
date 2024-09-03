import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictTemplesComponent } from './district-temples.component';

describe('DistrictTemplesComponent', () => {
  let component: DistrictTemplesComponent;
  let fixture: ComponentFixture<DistrictTemplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictTemplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistrictTemplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
