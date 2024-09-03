import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoshalacategoryComponent } from './goshalacategory.component';

describe('GoshalacategoryComponent', () => {
  let component: GoshalacategoryComponent;
  let fixture: ComponentFixture<GoshalacategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoshalacategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoshalacategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
