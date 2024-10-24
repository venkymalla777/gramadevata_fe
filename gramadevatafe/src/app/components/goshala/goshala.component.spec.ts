import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoshalaComponent } from './goshala.component';

describe('GoshalaComponent', () => {
  let component: GoshalaComponent;
  let fixture: ComponentFixture<GoshalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoshalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoshalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
