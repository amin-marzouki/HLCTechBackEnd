import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationActiveDetailComponent } from './formation-active-detail.component';

describe('FormationActiveDetailComponent', () => {
  let component: FormationActiveDetailComponent;
  let fixture: ComponentFixture<FormationActiveDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormationActiveDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormationActiveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
