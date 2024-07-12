import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudformationComponent } from './crudformation.component';

describe('CrudformationComponent', () => {
  let component: CrudformationComponent;
  let fixture: ComponentFixture<CrudformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
