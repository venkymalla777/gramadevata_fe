import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocktemplesComponent } from './blocktemples.component';

describe('BlocktemplesComponent', () => {
  let component: BlocktemplesComponent;
  let fixture: ComponentFixture<BlocktemplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlocktemplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlocktemplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
