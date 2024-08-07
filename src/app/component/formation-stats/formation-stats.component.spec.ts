import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationStatsComponent } from './formation-stats.component';

describe('FormationStatsComponent', () => {
  let component: FormationStatsComponent;
  let fixture: ComponentFixture<FormationStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormationStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormationStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
