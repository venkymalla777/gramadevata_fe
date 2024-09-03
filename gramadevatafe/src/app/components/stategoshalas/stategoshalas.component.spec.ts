import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StategoshalasComponent } from './stategoshalas.component';

describe('StategoshalasComponent', () => {
  let component: StategoshalasComponent;
  let fixture: ComponentFixture<StategoshalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StategoshalasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StategoshalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
