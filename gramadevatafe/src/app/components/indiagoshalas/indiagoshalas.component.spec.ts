import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiagoshalasComponent } from './indiagoshalas.component';

describe('IndiagoshalasComponent', () => {
  let component: IndiagoshalasComponent;
  let fixture: ComponentFixture<IndiagoshalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndiagoshalasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndiagoshalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
