import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailviewgoshalaComponent } from './detailviewgoshala.component';

describe('DetailviewgoshalaComponent', () => {
  let component: DetailviewgoshalaComponent;
  let fixture: ComponentFixture<DetailviewgoshalaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailviewgoshalaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailviewgoshalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
