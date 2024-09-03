import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiatemplesComponent } from './indiatemples.component';

describe('IndiatemplesComponent', () => {
  let component: IndiatemplesComponent;
  let fixture: ComponentFixture<IndiatemplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndiatemplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndiatemplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
