import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatetemplesComponent } from './statetemples.component';

describe('StatetemplesComponent', () => {
  let component: StatetemplesComponent;
  let fixture: ComponentFixture<StatetemplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatetemplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatetemplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
