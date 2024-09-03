import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorytemplesComponent } from './categorytemples.component';

describe('CategorytemplesComponent', () => {
  let component: CategorytemplesComponent;
  let fixture: ComponentFixture<CategorytemplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorytemplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategorytemplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
