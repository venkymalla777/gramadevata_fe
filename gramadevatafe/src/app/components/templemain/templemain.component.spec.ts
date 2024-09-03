import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplemainComponent } from './templemain.component';

describe('TemplemainComponent', () => {
  let component: TemplemainComponent;
  let fixture: ComponentFixture<TemplemainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplemainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplemainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
