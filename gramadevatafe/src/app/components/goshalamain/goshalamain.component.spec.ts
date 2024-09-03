import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoshalamainComponent } from './goshalamain.component';

describe('GoshalamainComponent', () => {
  let component: GoshalamainComponent;
  let fixture: ComponentFixture<GoshalamainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoshalamainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoshalamainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
