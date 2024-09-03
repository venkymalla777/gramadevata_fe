import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryeventsComponent } from './countryevents.component';

describe('CountryeventsComponent', () => {
  let component: CountryeventsComponent;
  let fixture: ComponentFixture<CountryeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryeventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
