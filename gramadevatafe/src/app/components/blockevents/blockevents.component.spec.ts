import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockeventsComponent } from './blockevents.component';

describe('BlockeventsComponent', () => {
  let component: BlockeventsComponent;
  let fixture: ComponentFixture<BlockeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockeventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlockeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
