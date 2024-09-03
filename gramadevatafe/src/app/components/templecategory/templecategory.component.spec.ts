import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplecategoryComponent } from './templecategory.component';

describe('TemplecategoryComponent', () => {
  let component: TemplecategoryComponent;
  let fixture: ComponentFixture<TemplecategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplecategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
