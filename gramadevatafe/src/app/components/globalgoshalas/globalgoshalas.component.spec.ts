import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalgoshalasComponent } from './globalgoshalas.component';

describe('GlobalgoshalasComponent', () => {
  let component: GlobalgoshalasComponent;
  let fixture: ComponentFixture<GlobalgoshalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalgoshalasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalgoshalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
