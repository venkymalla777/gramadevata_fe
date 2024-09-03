import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockgoshalasComponent } from './blockgoshalas.component';

describe('BlockgoshalasComponent', () => {
  let component: BlockgoshalasComponent;
  let fixture: ComponentFixture<BlockgoshalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockgoshalasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlockgoshalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
