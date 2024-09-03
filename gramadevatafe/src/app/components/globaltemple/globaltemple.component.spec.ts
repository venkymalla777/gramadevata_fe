import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobaltempleComponent } from './globaltemple.component';

describe('GlobaltempleComponent', () => {
  let component: GlobaltempleComponent;
  let fixture: ComponentFixture<GlobaltempleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobaltempleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobaltempleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
