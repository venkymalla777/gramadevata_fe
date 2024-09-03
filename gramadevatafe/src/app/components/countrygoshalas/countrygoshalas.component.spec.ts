import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrygoshalasComponent } from './countrygoshalas.component';

describe('CountrygoshalasComponent', () => {
  let component: CountrygoshalasComponent;
  let fixture: ComponentFixture<CountrygoshalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrygoshalasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountrygoshalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
