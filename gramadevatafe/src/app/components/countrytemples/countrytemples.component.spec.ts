import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrytemplesComponent } from './countrytemples.component';

describe('CountrytemplesComponent', () => {
  let component: CountrytemplesComponent;
  let fixture: ComponentFixture<CountrytemplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrytemplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountrytemplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
